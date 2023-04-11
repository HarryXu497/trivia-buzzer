import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import firestore from '$lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
 
export const actions = {
	default: async (event) => {
		const formData = await event.request.formData()
		const roomCode = formData.get("game-code")?.toString();

		if (!roomCode) {
			return fail(400, { roomCode, missing: true })
		}


		if (roomCode.length != 4) {
			return fail(400, { roomCode, invalidLength: true })
		}

		/// Check if game code is valid
		const gameDocument = await getDoc(
			doc(firestore, "games", roomCode.toUpperCase())
		);

		if (!gameDocument.exists()) {
			return fail(400, { roomCode, invalidCode: true })
		}

		throw redirect(303, `/buzzer/register/?roomCode=${roomCode.toUpperCase()}`)
	}
} satisfies Actions;