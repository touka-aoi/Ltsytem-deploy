export interface Ltviewers {
	user: Array<string>;
}

export interface Lts {
	Ltnames: Array<string>;
}

export abstract class LtviewerRequestInterface {
	abstract getLtsfromUser(username: string): Promise<Lts>;
	abstract getLtviewersFromID(id: Number): Promise<Ltviewers>;
	abstract getLtviewersfromLtname(Ltname: string): Promise<Ltviewers>;
	abstract upsertLtviewer(Ltname: string, username: string): Promise<void>;
	abstract delteLtviewer(Ltname: string, username: string): Promise<void>;
}
