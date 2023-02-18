import { supabase } from '$lib/databaseClient/supabaseClient';
import { ProfileRequestInterface } from './profileRequestInterface';
import type {profile, profileOutput, error} from "./profileRequestInterface";

export class ProfileRequestSupabase implements ProfileRequestInterface {

	async getProfile(id: string): Promise<profileOutput> {
		let Response = ProfileRequestInterface.NULL();
		try {
			const { data, error, status } = await supabase.from('profiles').select('username, avatar_url, id').eq('id', id).single();
			if (error && status !== 406) throw error;

			if (data) {
				Response["data"] = {
					id: data.id,
					avatarURL: data.avatar_url,
					username: data.username
				};}
		} catch (error) {
			if (error instanceof Error) {
				Response["error"] = {message: error.message}}
		}
		return Response;
	}

	async getProfileFromUsername(username: string): Promise<profileOutput> {
		let Response = ProfileRequestInterface.NULL();
		try {
			const { data, error, status } = await supabase.from('profiles').select('username, avatar_url, id').eq('username', username).single();
			if (error && status !== 406) throw error;

			if (data) {
				Response["data"] = {
					id: data.id,
					avatarURL: data.avatar_url,
					username: data.username
				};
			}
		} catch (error) {
			if (error instanceof Error) {
				Response["error"] = {message: error.message}}
		}
		return Response;
	}

	async upsertProfile(userProfile: profile): Promise<error> {
		let Response = ProfileRequestInterface.NULLERR();
		
		const profile = {
			id: userProfile.id,
			avatar_url: userProfile.avatarURL,
			username: userProfile.username
		};

		try {
			let { error } = await supabase.from('profiles').upsert(profile);
			if (error) throw error;
		} catch (error: any) {
			if (error instanceof Error) {
				Response = {message: error.message};}
		}
		return Response;
	}

	async deleteProfile(id: string): Promise<error> {
		let Response = ProfileRequestInterface.NULLERR();
		try {
			let { error } = await supabase.from('profiles').delete().eq('id', id);
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				Response = {message: error.message};}
		}
		return Response;
	}
}
