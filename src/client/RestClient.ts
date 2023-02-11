import {
	APIVersion,
	DEFAULT_API_URL,
	DEFAULT_API_VERSION,
	DEFAULT_RETRIES,
	DEFAULT_TIMEOUT,
	DEFAULT_USER_AGENT,
} from "../consts";

import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { TypedEmitter } from "tiny-typed-emitter";

export class RestClient extends TypedEmitter<RestClient.Events> {
	/**
	 * The url for the API
	 */
	readonly url: string;

	/**
	 * The version of the API to use
	 */
	readonly version: APIVersion;

	/**
	 * The user agent header
	 */
	readonly userAgent: string;

	/**
	 * The number of retries for 5xx error responses
	 */
	readonly retries: number;

	/**
	 * The time in milliseconds before a request should timeout
	 */
	readonly timeout: number;

	/**
	 * The axios client
	 */
	readonly axios: AxiosInstance;

	/**
	 * @param options The rest client options
	 */
	constructor(key: string, options: RestClient.Options = {}) {
		super();

		this.url = options.url ?? DEFAULT_API_URL;
		this.version = options.version ?? DEFAULT_API_VERSION;
		this.userAgent = options.userAgent ?? DEFAULT_USER_AGENT;
		this.retries = options.retries ?? DEFAULT_RETRIES;
		this.timeout = options.timeout ?? DEFAULT_TIMEOUT;

		this.axios = Axios.create({
			baseURL: `${this.url}/v${this.version}`,
			timeout: this.timeout,
			headers: {
				Authorization: key,
				"User-Agent": this.userAgent,
			},
		});
	}

	/**
	 * Send a GET request
	 * @param route The route to hit
	 * @param config The request config
	 *
	 * @returns The response data
	 */
	get<D>(route: string, config: AxiosRequestConfig): Promise<D> {
		return this.request<D>({ ...config, method: "GET", url: route });
	}

	/**
	 * Send a POST request
	 * @param route The route to hit
	 * @param config The request config
	 *
	 * @returns The response data
	 */
	post<D>(route: string, config: AxiosRequestConfig): Promise<D> {
		return this.request<D>({ ...config, method: "POST", url: route });
	}

	/**
	 * Send a PUT request
	 * @param route The route to hit
	 * @param config The request config
	 *
	 * @returns The response data
	 */
	put<D>(route: string, config: AxiosRequestConfig): Promise<D> {
		return this.request<D>({ ...config, method: "PUT", url: route });
	}

	/**
	 * Send a PATCH request
	 * @param route The route to hit
	 * @param config The request config
	 *
	 * @returns The response data
	 */
	patch<D>(route: string, config: AxiosRequestConfig): Promise<D> {
		return this.request<D>({ ...config, method: "PATCH", url: route });
	}

	/**
	 * Send a DELETE request
	 * @param route The route to hit
	 * @param config The request config
	 *
	 * @returns The response data
	 */
	delete<D>(route: string, config: AxiosRequestConfig): Promise<D> {
		return this.request<D>({ ...config, method: "DELETE", url: route });
	}

	/**
	 * Send a request, handle errors, ratelimits and retrying
	 * @param config The request config
	 * @param retries The number of retries
	 *
	 * @returns The response data
	 */
	private async request<D>(config: AxiosRequestConfig, retries = 0): Promise<D> {
		try {
			const result = await this.axios<D>(config);
			return result.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const status = error.response?.status ?? 0;

				if (this.shouldRetry(status, retries)) {
					return this.request(config, ++retries);
				}

				// TODO: handle ratelimits

				// TODO: custom error class
				throw new Error("Request failed", {
					cause: error,
				});
			}

			throw error;
		}
	}

	/**
	 * Check whether a request should be retried
	 * @param status The error status
	 * @param retries The number of retry attempts
	 *
	 * @returns Whether a request should be retried
	 */
	private shouldRetry(status: number, retries: number): boolean {
		if (status < 500 || status > 599) return false;
		return retries < this.retries;
	}
}

export namespace RestClient {
	export interface Options {
		/**
		 * The url for the API
		 *
		 * @default https://api.r6index.com
		 */
		url?: string;

		/**
		 * The version of the API to use
		 *
		 * @default APIVersion.V1
		 */
		version?: APIVersion;

		/**
		 * The user agent header
		 */
		userAgent?: string;

		/**
		 * The number of retries for 5xx error responses
		 *
		 * @default 3
		 */
		retries?: number;

		/**
		 * The time in milliseconds before a request should timeout
		 *
		 * @default 10_000
		 */
		timeout?: number;
	}

	export interface Events {
		/**
		 * Emitted when debug mode is enabled
		 * @param message The debug message
		 */
		debug(message: string): void;

		/**
		 * Emitted on rest errors
		 * @param error The error
		 */
		error(error: Error): void;

		/**
		 * Emitted on API ratelimit
		 * @param details The ratelimit details
		 */
		ratelimited(details: RatelimitDetails): void;
	}

	export interface RatelimitDetails {
		/**
		 * The endpoint that's ratelimited
		 */
		endpoint: string;

		/**
		 * The date the ratelimit resets
		 */
		resetAt: Date;

		/**
		 * The time in seconds the ratelimit resets
		 */
		resetAfter: number;

		/**
		 * The bucket hash that's ratelimited, null for global
		 */
		bucket: string | null;
	}
}
