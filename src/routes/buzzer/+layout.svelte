<script lang="ts">
	import codeToWord, { type Code } from "$lib/words";
	import type { LayoutData } from "./$types";

	export let data: LayoutData;
	$: sentence = codeToWord(data.game.id.split("") as Code)
</script>

<nav>
	<div class="name">
		{ data.game.name }
	</div>

	<div class="code">
		<div class="game-id">{ data.game.id }</div>
		<div class="game-sentence">{ sentence }</div>
	</div>
</nav>

<slot/>

<style lang="scss">
	@use "../../styles/exports.scss" as exports;

	nav {
		height: 6rem;
		background-color: exports.$color-dark-800;

		font-family: exports.$font-sans-serif;
		color: white;

		.code {
			/* position: absolute; */
			top: 0;
			bottom: 0;
			margin: 0 auto;

			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.name {
			position: absolute;
		}
	}
	

	.code {
		height: 100%;

		.game-id {
			font-size: 3rem;
		}

		.game-sentence {
			font-size: 1.5rem;
		}
	}
</style>