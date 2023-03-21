import { ROUTES } from "../consts";
import { Entity, Rest } from "../types";
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

	/**
	 * Get a profile by profile id
	 * @param profileId The profile id of the profile
	 *
	 * @returns The profile
	 */
	getProfileById(profileId: string): Promise<Entity.ExtendedProfile> {
		return this.rest.get<Rest.GetProfilesResult>(ROUTES.PROFILES_PROFILE_ID(profileId));
	}

	/**
	 * Get a profile by username
	 * @param username The username of the profile
	 * @param platform The platform of the profile
	 *
	 * @returns The profile
	 */
	getProfileByUsername(username: string, platform: Entity.Platform): Promise<Entity.ExtendedProfile> {
		return this.rest.get<Rest.GetProfilesResult>(ROUTES.PROFILES, {
			params: {
				username,
				platform,
			},
		});
	}

	/**
	 * Get the profiles connected by user id
	 * @param userId The user id of the profile
	 *
	 * @returns The connected profiles
	 */
	getConnectedProfiles(userId: string): Promise<Entity.ExtendedProfile[]> {
		return this.rest.get<Rest.GetProfilesConnectedProfilesResult>(
			ROUTES.PROFILES_CONNECTED_USER_ID(userId),
		);
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
