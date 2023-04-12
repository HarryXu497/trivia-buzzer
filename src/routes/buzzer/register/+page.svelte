<script lang="ts">
	import type { ActionData } from "./$types";
	import { applyAction, enhance } from "$app/forms";
	import Input from "$lib/components/Input.svelte";
	import { goto } from "$app/navigation";

	export let form: ActionData;

	$: console.log(form?.data?.playerId)

	let formControls = {
		playerName: "",
		teamName: "",
	}

</script>

<section>
	<form method="POST" use:enhance={({ data }) => {
		data.set("player-name", formControls.playerName);
		data.set("team-name", formControls.teamName);
	
		return async ({ result }) => {
			if (result.type === 'success') {
				if (form?.data?.playerId) {
					localStorage.setItem("playerId", form?.data?.playerId);
				}

				localStorage.setItem("playerName", formControls.playerName);
				localStorage.setItem("teamName", formControls.teamName);

				if (form?.data?.url) {
					goto(form?.data?.url);
				}
			}
	
			await applyAction(result)
		}
	}}>
		<Input label="Player Name" errorMessage={form?.missingPlayerName ? "Missing player name." : null} bind:value={formControls.playerName}/>
		<Input label="Team Name" errorMessage={form?.missingTeamName ? "Missing team name." : null} bind:value={formControls.teamName}/>
	
		<button class="enter-button">Enter Game <span>&#x21B3;</span></button>
	</form>
</section>

<style lang="scss">
	@use "../../../styles/exports.scss" as exports;

	section {
		display: grid;
		place-items: center;
		height: 100vh;
	}

	form {
		font-family: exports.$font-sans-serif;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 12rem;
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