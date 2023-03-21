<div align="center">
<!-- <img src="" align="center" width="80%" alt="banner"> -->
<br>
<br>
<img src="https://img.shields.io/github/package-json/v/R6IndexAPI/r6index-sdk-nodejs" align="center" alt="">
<img src="https://img.shields.io/npm/dm/@r6indexapi/sdk" align="center" alt="">
<img src="https://img.shields.io/github/license/R6IndexAPI/r6index-sdk-nodejs" align="center" alt="">
<img src="https://img.shields.io/github/issues/R6IndexAPI/r6index-sdk-nodejs" align="center" alt="">
<img src="https://img.shields.io/github/issues-pr/R6IndexAPI/r6index-sdk-nodejs" align="center" alt="">
<br>
<br>

**_NodeJS kit for working with our Rainbow Six Siege API._**

</div>

## About

R6Index is a reliable API service for Rainbow Six Siege. We make it easy to fetch stats - you don't need to
store any data; we do it for you!

-   Fetch seasonal player stats
-   Query for platform-connected profiles
-   Access a player's match history, including the datacenter and gamemode
-   Retrieve a player's ban history
-   Lifetime stats

## Install

```sh
# NPM
> npm i @r6index/sdk

# YARN
> yarn add @r6index/sdk

# PNPM
> pnpm add @r6index/sdk
```

## Usage

#### Client

```ts
import { Client } from "@r6index/sdk";

const client = new Client({
	key: "your api key",
});
```

#### Methods

```ts
// Get extended profile by id
await client.getProfileById("f2f38d39-4a5d-4425-bdc1-f74c9a0c9da7");

// Get extended profile by username
await client.getProfileByUsername("head", "uplay");

// Get connected extended profiles by user id
await client.getConnectedProfiles("f2f38d39-4a5d-4425-bdc1-f74c9a0c9da7");

// Get battlepass by profile id
await client.getBattlepassByProfileId("f2f38d39-4a5d-4425-bdc1-f74c9a0c9da7");

// Get recent bans
await client.getBans();

// Get game status
await client.getGameStatus();
```
