import { RestClient } from "./RestClient";

export class Client {
	/**
	 * The client for performing requests
	 */
	readonly rest: RestClient;

	/**
	 * @param options The client options
	 */
	constructor(options: Client.Options) {
		this.rest = new RestClient(options.key, options.rest);
	}
}

export namespace Client {
	export interface Options {
		/**
		 * The API key to use for authentication
		 */
		key: string;

		/**
		 * The rest client options
		 */
		rest?: RestClient.Options;
	}
}
