export enum APIVersion {
	V1 = 1,
}

export const DEFAULT_API_URL = "https://api.r6index.com";
export const DEFAULT_API_VERSION = APIVersion.V1;
export const DEFAULT_USER_AGENT = `NodeJS SDK (Node.js ${process.version})`;
export const DEFAULT_RETRIES = 3;
export const DEFAULT_TIMEOUT = 10_000;

export const ROUTES = {
	PROFILES: "/profiles",
	PROFILES_PROFILE_ID: (profileId: string) => `/profiles/${profileId}`,
	PROFILES_CONNECTED_USER_ID: (userId: string) => `/profiles/${userId}/connected-profiles`,
	PROFILES_BATTLEPASS: (profileId: string) => `/profiles/${profileId}/battlepass`,
	BANS: "/bans",
};
