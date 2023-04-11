<script lang="ts">
	import type { ActionData } from "./$types";
	import { enhance } from "$app/forms";
	import Input from "$lib/components/Input.svelte";

	export let form: ActionData;

	let formControls = {
		playerName: "",
		teamName: "",
	}

</script>

<form method="POST" use:enhance={({ data }) => {
	data.set("player-name", formControls.playerName);
	data.set("team-name", formControls.teamName);
}}>
	<Input label="Player Name" errorMessage={form?.missingPlayerName ? "Missing player name." : null} bind:value={formControls.playerName}/>
	<Input label="Team Name" errorMessage={form?.missingTeamName ? "Missing team name." : null} bind:value={formControls.teamName}/>

	<button class="enter-button">Enter Game <span>&#x21B3;</span></button>
</form>

<style lang="scss">
	@use "../../../styles/exports.scss" as exports;

	form {
		font-family: exports.$font-sans-serif;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 10rem;
	}

	button.enter-button {
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