<script lang="ts">
	export const ssr = false;

	import { page } from "$app/stores";
	import Buzzer from "$lib/components/Buzzer.svelte";
	import firestore from "$lib/firebase/firebase";
	import { doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
	import { onMount } from "svelte";
	type BuzzerState = "buzzed" | "unbuzzed" | "disabled";

	async function onClick() {
		if (!document) {
			return;
		}

		await updateDoc(document, {
			timeBuzzed: serverTimestamp(),
		})
	}
	

	let state: BuzzerState = 'disabled';
	let document: ReturnType<typeof doc>;


	onMount(async () => {
		state = 'disabled';

		const playerId = localStorage.getItem("playerId");

		
		if ($page.url.searchParams.has("roomCode") && playerId) {
			const roomCode = $page.url.searchParams.get("roomCode")!;

			document = doc(firestore, "games", roomCode, "players", playerId);
		
			if (document) {
				onSnapshot(document, async (snapshot) => {
					const data = snapshot.data()!;

					if ("disabled" in data) {
						if (data.disabled) {
							state = 'disabled';
							await updateDoc(document, {
								timeBuzzed: null,
							})
						}
						if (!data.disabled) {
							if (data.timeBuzzed) {
								state = 'buzzed'
							} else {
								state = 'unbuzzed'
							}
						}
					} else {
						state = 'disabled';
					}
				})
			}
		}
	})

	
</script>

<div>
	<Buzzer on:click={onClick} bind:buzzerState={state}/>
</div>

<style lang="scss">
	div {
		position: relative;
		
		display: grid;
		place-items: center;

		height: calc(100% - 6rem);
	}
</style>