<script lang="ts">
	import { createEventDispatcher } from "svelte";
	type BuzzerState = "buzzed" | "unbuzzed" | "disabled";

	// TODO: make this default to disabled
	let buzzerState: BuzzerState = "disabled";

	const dispatch = createEventDispatcher();

	function forwardClick(event: Event) {
		if (buzzerState === "unbuzzed") {
			buzzerState = "buzzed";
		}
		dispatch("click", event)
	}
</script>

<button
	on:click={forwardClick}
	{...$$restProps}
	class:unbuzzed={buzzerState === "unbuzzed"}
	class:buzzed={buzzerState === "buzzed"}
	class:disabled={buzzerState === "disabled"}
	disabled={buzzerState === "disabled"}
>
	{#if buzzerState === "unbuzzed"}
		BUZZ
	{:else if buzzerState === "buzzed"}
		BUZZED
	{:else if buzzerState === "disabled"}
		DISABLED
	{/if}
</button>

<style lang="scss">
	@use "../../styles/exports.scss" as exports;
	$color-green: hsl(120, 100%, 40%);
	$color-red: hsl(0, 100%, 50%);
	$color-gray: hsl(0, 0%, 60%);

	button {
		width: 36rem;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		position: relative;
		
		font-size: 6rem;
		font-weight: bold;
		border-radius: 50%;
		border: 2px solid black;
		
		box-shadow: 0 0 10px white;

		font-family: exports.$font-sans-serif;
		color: black;

		&.unbuzzed {
			background-color: $color-red;
		}

		&.buzzed {
			background-color: $color-green;
		}

		&.disabled:disabled {
			background-color: $color-gray;
		}

	}

</style>