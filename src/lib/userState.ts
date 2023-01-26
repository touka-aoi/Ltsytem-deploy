import { writable } from 'svelte/store';

export const userState = writable({
	username: '',
	userId: ''
});

export function getUser() {
	let data = {
		username: '',
		userId: ''
	};
	const unsbscribe = userState.subscribe((value) => {
		data = value;
	});
	unsbscribe();
	return data;
}
