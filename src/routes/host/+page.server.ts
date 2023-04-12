import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { randomId } from '$lib/util';
import firestore from '$lib/firebase/firebase';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import codeToWord, { type Code } from '$lib/words';

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const gameTitle = formData.get("game-title")?.toString();

		let gameId = "";

		for (const value of randomId()) {
			const gameDocument = await getDoc(
				doc(firestore, "games", value)
			);

			console.log(value);

			if (!gameDocument.exists()) {
				gameId = value;
				break;
			}
		}

		await setDoc(
			doc(firestore, "games", gameId),
			{
				name: gameTitle,
			}
		)


		throw redirect(303, `/buzzer/host?roomCode=${gameId}`)
	}
} satisfies Actions;