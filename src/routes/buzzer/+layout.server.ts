import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { doc, getDoc } from 'firebase/firestore';
import firestore from '$lib/firebase/firebase';
import type Game from '$lib/models/game';
 
export const load = (async ({ url }) => {
	if (!url.searchParams.has("roomCode")) {
		throw redirect(301, "/");
	}

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const roomCode = url.searchParams.get("roomCode")!;

	const gameDocument = await getDoc(
		doc(firestore, "games", roomCode.toUpperCase())
	);

	if (!gameDocument.exists()) {
		throw redirect(301, "/");
	}

	return {
		game: ({
			id: gameDocument.id,
			...gameDocument.data()
		}) as Game
	};
}) satisfies LayoutServerLoad;