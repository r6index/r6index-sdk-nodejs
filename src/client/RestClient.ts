import {
	APIVersion,
	DEFAULT_API_URL,
	DEFAULT_API_VERSION,
	DEFAULT_RETRIES,
	DEFAULT_TIMEOUT,
	DEFAULT_USER_AGENT,
} from "../consts";

import Axios, { AxiosInstance } from "axios";

export class RestClient {
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
}
