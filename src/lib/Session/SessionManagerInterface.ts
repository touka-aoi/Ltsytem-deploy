export interface result {
	error: string | null;
}

export abstract class sessionManagserInterface {
	// abstract signIn(client: any): result;
	abstract signOut(): Promise<result>;
}
