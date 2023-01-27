import { writable } from 'svelte/store';

export interface userStore {
	username: string,
	userid: string,
}

export const userState = writable({
	username: '',
	userid: ''
});

// Storeのデータを取得する
export function getUser() {
	let data: userStore = {
		username: '',
		userid: ''
	};
	const unsbscribe = userState.subscribe((value) => {
		data = value;
	});
	unsbscribe();
	return data;
}
