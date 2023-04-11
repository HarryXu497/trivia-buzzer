import firestore from '$lib/firebase/firebase';
import { redirect, type Handle } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
 
export const handle = (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/buzzer')) {
		if (!event.url.searchParams.has("roomCode")) {
			throw redirect(303, "/")
		}

		// Cannot be null
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const roomCode = event.url.searchParams.get("roomCode")!;
		
		const roomDoc = await getDoc(
			doc(firestore, "games", roomCode.toUpperCase())
		);

		if (!roomDoc.exists()) {
			throw redirect(303, "/")
		}
	}
	
	const response = await resolve(event);
	return response;
}) satisfies Handle;