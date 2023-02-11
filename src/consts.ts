export enum APIVersion {
	V1 = 1,
}

export const DEFAULT_API_URL = "https://api.r6index.com";
export const DEFAULT_API_VERSION = APIVersion.V1;
export const DEFAULT_USER_AGENT = `NodeJS SDK (Node.js ${process.version})`;
export const DEFAULT_RETRIES = 3;
export const DEFAULT_TIMEOUT = 10_000;
