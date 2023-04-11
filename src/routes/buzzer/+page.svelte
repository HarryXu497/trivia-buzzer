<script lang="ts">
	import Buzzer from "$lib/components/Buzzer.svelte";
	import { onSnapshot } from "firebase/firestore";
	import type { PageServerData } from "./$types";
	type BuzzerState = "buzzed" | "unbuzzed" | "disabled";

	function onClick() {
		console.log("Clicked")
	}

	export let data: PageServerData;

	let state: BuzzerState = 'disabled';

	onSnapshot(data.document, (snapshot) => {
		
	})
	
</script>

<div>
	<Buzzer on:click={onClick}/>
</div>

<style lang="scss">
	div {
		position: relative;
		
		display: grid;
		place-items: center;

		margin-top: 3rem;
	}
</style>