export interface Ltviewers {
	usernames: Array<string>;
}

export interface Lts {
	Ltnames: Array<string>;
}

export abstract class LtviewerRequestInterface {
	abstract getLtsfromUser(username: string): Promise<Lts>;
	abstract getLtviewersfromLtname(Ltname: string): Promise<Ltviewers>;
	abstract upsertLtviewer(Ltname: string, username: string): Promise<void>;
	abstract delteLtviewer(Ltname: string, username: string): Promise<void>;
}
