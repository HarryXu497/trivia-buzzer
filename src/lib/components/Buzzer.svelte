<script lang="ts">
	import { createEventDispatcher } from "svelte";
	type BuzzerState = "buzzed" | "unbuzzed" | "disabled";

	export let buzzerState: BuzzerState = "disabled";
	// buzz the buzzer even if db is not update to enchance user experience
	export let showBuzzed: boolean = false;

	$: {
		if (buzzerState !== 'buzzed') {
			showBuzzed = false;
		}
	}

	const dispatch = createEventDispatcher();

	function forwardClick(event: Event) {
		showBuzzed = !showBuzzed;
		dispatch("click", event)

	}
</script>

<button
	on:click={forwardClick}
	{...$$restProps}
	class:unbuzzed={buzzerState === "unbuzzed"}
	class:buzzed={buzzerState === "buzzed" || showBuzzed}
	class:disabled={buzzerState === "disabled"}
	disabled={buzzerState === "disabled"}
>
	{#if buzzerState === "unbuzzed" && !showBuzzed}
		BUZZ
	{/if}
	{#if buzzerState === "buzzed" || showBuzzed}
		BUZZED
	{/if}

	{#if buzzerState === "disabled"}
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

		&:hover {
			cursor: pointer;
		}

	}

</style>