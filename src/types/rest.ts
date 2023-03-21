export namespace Entity {
	export interface ExtendedProfile {
		profile: Profile;
		general: GeneralStats;
		game_bans: GameBan[];
		current_season_records: Record<Playlist, SeasonRecord>;
	}

	export interface Profile {
		profile_id: string;
		user_id: string;
		username: string;
		platform: string;
		visits: number;
		updated_at: string;
		avatar_url: string;
		small_avatar_url: string;
		username_history: UsernameAlias[];
	}

	export interface UsernameAlias {
		id: string;
		username: string;
	}

	export interface GeneralStats {
		level: number;
		headshot_rate: number;
	}

	export interface Battlepass {
		xp: number;
		tier: number;
		tier_xp: number;
		has_premium: boolean;
	}

	export interface GameBan {
		id: string;
		reason: string;
	}

	export interface SeasonRecord {
		kills: number;
		deaths: number;
		kd: number;
		wins: number;
		losses: number;
		wl: number;
		abandons: number;
		champion_position: number;
		rank_points: number;
		rank_points_delta: number;
		rank_points_change: number;
		max_rank_points: number;
		max_rank_points_delta: number;
		season: Season;
		rank: Rank;
		max_rank: Rank;
	}

	export interface Rank {
		id: number;
		name: string;
		asset_url: string;
	}

	export interface Season {
		id: number;
		name: string;
	}

	export enum Playlist {
		RANKED = "ranked",
		QUICK_MATCH = "casual",
		DEATHMATCH = "deathmatch",
		EVENT = "event",
	}

	export type Platform = "uplay" | "xbl" | "psn";
}

export namespace Rest {
	export type GetProfilesResult = Entity.ExtendedProfile;
	export type GetProfilesConnectedProfilesResult = Entity.ExtendedProfile[];
	export type GetProfileBattlepassResult = Entity.Battlepass;
}
