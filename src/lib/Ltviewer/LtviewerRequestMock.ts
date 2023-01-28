import type { LtviewerRequestInterface, Lts, Ltviewers } from './LtviewerRequestInterface';

export class LtviewerRequestMock implements LtviewerRequestInterface {
	async getLtsfromUser(username: string): Promise<Lts> {
		return {
			Ltnames: ['第1回', '第2回', '第3回', '第4回']
		};
	}

	async getLtviewersNumfromLtname(Ltname: string): Promise<Number> {
		return 20;
	}

	async isLtviewer(Ltname: string, username: string): Promise<boolean> {
		return false;
	}

	async getLtviewersfromLtname(Ltname: string): Promise<Ltviewers> {
		return {
			usernames: ['hoge', 'fuga', 'supa', 'lira', 'rari']
		};
	}
	async upsertLtviewer(Ltname: string, username: string): Promise<boolean> {
		return true;
	}
	async delteLtviewer(Ltname: string, username: string): Promise<boolean> {
		return true;
	}
}
