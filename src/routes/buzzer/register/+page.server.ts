import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import firestore from '$lib/firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
 
export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const playerName = formData.get("player-name")?.toString();
		const teamName = formData.get("team-name")?.toString();
		const roomCode = event.url.searchParams.get("roomCode")

		if (!roomCode) {
			return fail(400, { playerName, teamName, missingRoomCode: true });
		}

		if (!playerName || !teamName) {
			return fail(400, { playerName, teamName, missingPlayerName: !playerName, missingTeamName: !teamName })
		}

		const collectionReference = collection(firestore, "games", roomCode, "players");

		const ref = await addDoc(collectionReference, {
			name: playerName || null,
			team: teamName || null,
			timeBuzzed: null,
			disabled: false,
		})

		return {
			type: 'success',
			status: 200,
			data: {
				url: `/buzzer/?roomCode=${roomCode.toUpperCase()}`,
				playerId: ref.id,
			}
		}
	}
} satisfies Actions;