<script lang="ts">
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	import Input from "$lib/components/Input.svelte";

	export let form: ActionData;
	
	let errorMessage: string | null = null;

	$: {
		if (form?.missing) {
			errorMessage = "Missing Game Code.";
		} else if (form?.invalidLength) {
			errorMessage = "Game code must be 4 characters."
		} else if (form?.invalidCode) {
			errorMessage = "No game exists with that code.";
		}
	}

	let inputValue: string = "";

</script>

<div>
	<form method="POST" use:enhance={({ data }) => {
		data.set("game-code", inputValue);
	}}>
		<Input
			label="Game Code"
			maxlength="4"
			bind:value={inputValue}
			{errorMessage}
		/>
		<button class="join-button">Join Game <span>&#x21B3;</span></button>
		<a href="/host">Or host a game instead</a>
	</form>
</div>

<style lang="scss">
	@use "../styles/exports.scss" as exports;

	div {
		display: grid;
		place-items: center;
		height: 100%;
	}

	form {
		font-family: exports.$font-sans-serif;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 8rem;;
	}

	form a {
		margin: 0 auto;
		color: exports.$color-primary-100;
		font-size: 1.05rem;
	}

	button.join-button {
		all: unset;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: exports.$color-dark-800;
		background-color: exports.$color-primary-100;
		border-radius: 3px;
		padding: 0.75rem 1rem;
		margin: 0 1rem;
		text-decoration: none;
		
		&:hover {
			background-color: exports.$color-primary-300;
			cursor: pointer;
		}
	}
</style>