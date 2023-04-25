<script lang="ts">
	import { page } from "$app/stores";
	import Buzzer from "$lib/components/Buzzer.svelte";
	import firestore from "$lib/firebase/firebase";
	import { doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
	import { onMount } from "svelte";
	type BuzzerState = "buzzed" | "unbuzzed" | "disabled";

	async function onClick() {
		if (!document) {
			return;
		}

		
		if (state === 'disabled') {
			return;
		}
		
		if (state === 'buzzed') {
			return;
		}
		

		await updateDoc(document, {
			timeBuzzed: serverTimestamp(),
		})
	}

	$: console.log("STATE: " + state)
	

	let state: BuzzerState = 'disabled';
	let document: ReturnType<typeof doc>;
	let showBuzzed: boolean = false;

	onMount(async () => {
		state = 'disabled';

		const playerId = localStorage.getItem("playerId");

		
		if ($page.url.searchParams.has("roomCode") && playerId) {
			const roomCode = $page.url.searchParams.get("roomCode")!;

			document = doc(firestore, "games", roomCode, "players", playerId);
			
			onSnapshot(document, async (snapshot) => {
				const data = snapshot.data()!;
			
				if (data.disabled) {
					state = 'disabled';
					return;
				}
				
				if (data.timeBuzzed) {
					state = 'buzzed';
					return;
				}

				if (!data.timeBuzzed) {
					state = 'unbuzzed';
					return;
				}
				
			})
			
		}
	})

	
</script>

<div>
	<Buzzer on:click={onClick} bind:buzzerState={state} showBuzzed={showBuzzed}/>
</div>

<style lang="scss">
	div {
		position: relative;
		
		display: grid;
		place-items: center;

		height: calc(100% - 6rem);
	}
</style>