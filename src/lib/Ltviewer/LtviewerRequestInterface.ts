export interface Ltviewers {
	data: Array<{userid: string}>;
	error: error;
}

export interface viewLts {
	data: Array<{ltid: Number}>;
	error: error;
}

export interface error {
	message: string;
}

export abstract class LtviewerRequestInterface {
	abstract getLtsfromUser(userID: string): Promise<viewLts>;
	abstract getLtviewersFromID(LtID: Number): Promise<Ltviewers>;
	abstract upsertLtviewer(LtID: Number, userID: string): Promise<error>;
	abstract delteLtviewer(LtID: Number, userID: string): Promise<error>;

	static readonly NULLERR: error = {message: ""};
	static readonly NULLVIEWER:Ltviewers = {data: [], error: {message: ""}};
	static readonly NULLLTS:viewLts = {data: [], error: {message: ""}};
}
