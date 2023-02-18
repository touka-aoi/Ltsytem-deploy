import { LtHoldRequest } from '$lib/LtHold/LtHoldRequest';
import { LtHoldRequestPostgresql } from '$lib/LtHold/LtHoldRequestPostgresql';
import { LtSpeakerRequest } from '$lib/LtSpeaker/LtSpeakerRequest';
import { LtSpeakerRequestPostgresql } from './LtSpeaker/LtSpeakerRequestPostgres';
import { LtviewrRequest } from './Ltviewer/LtviewerRequest';
import { LtviewerRequestPostgresql } from './Ltviewer/LtviewerRequestpostgres';

export interface LtSpeakerInfomation {
	data: Array<{
    id: number;
    Ltname: string;
    LtID: number;
    LtLink: string;
    LtTitle: string;
    LtComment: string;
    tags: Array<string>;
    username: string;  
    avatarData: string;
  }>,
  error: {message: string}
}

export class LtInfoFacade {
	// DI
	LtHoldRequest: LtHoldRequest;
	LtSpeakerRequest: LtSpeakerRequest;
	LtviewerRequest: LtviewrRequest;

	constructor() {
		this.LtSpeakerRequest = new LtSpeakerRequest(new LtSpeakerRequestPostgresql());
		this.LtHoldRequest = new LtHoldRequest(new LtHoldRequestPostgresql());
		this.LtviewerRequest = new LtviewrRequest(new LtviewerRequestPostgresql());
	}
}
