import { doc } from 'firebase/firestore';
import type { PageServerLoad } from './$types';
import firestore from '$lib/firebase/firebase';
 
export const load = (({ url }) => {

	if (!url.searchParams.has("roomCode")) {
		// TODO: error
		return;
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const document = doc(firestore, "games", url.searchParams.get("roomCode")!);

	return {
		document
	};
}) satisfies PageServerLoad;