<script lang="ts">
	import Input from "$lib/components/Input.svelte";
	import { enhance } from "$app/forms";

	let gameTitle: string = "";
</script>

<section>
	<form method="POST" use:enhance={({ data }) => {
		data.set("game-title", gameTitle);
	}}>
		<Input
			label="Game Title"
			bind:value={gameTitle}
		/>
		<button class="host-button">Host Game <span>&#x21B3;</span></button>
	</form>
</section>

<style lang="scss">
	@use "../../styles/exports.scss" as exports;

	section {
		display: grid;
		place-items: center;
		height: calc(100vh - 6rem);
	}

	form {
		font-family: exports.$font-sans-serif;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	button.host-button {
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