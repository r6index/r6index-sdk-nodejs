import { RestClient } from "./RestClient";
import EventEmitter from "events";

export class Client extends EventEmitter {
	/**
	 * The client for performing requests
	 */
	readonly rest: RestClient;

	/**
	 * @param options The client options
	 */
	constructor(options: Client.Options) {
		super();

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
