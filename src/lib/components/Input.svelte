<script lang="ts">
	export let label: string = "";
	export let value: string = "";
	export let errorMessage: string | null = null;
</script>

<div class="input-container">
	<label for="input">{ label }</label>
	<input id="input" { ...$$restProps } bind:value={value}>
	{#if errorMessage }
		<label for="input">{ errorMessage }</label>
	{/if}
</div>

<style lang="scss">
	@use "../../styles/exports.scss" as exports;

	.input-container {
		margin: 0.75rem;
		display: flex;
		flex-direction: column;
		max-width: 16rem;
		gap: 0.25rem;

		label {
			color: var(--text-color);
			width: fit-content;
			padding: 0 0.5rem;
			background-color: exports.$color-primary;
			z-index: 2;
			font-family: exports.$font-sans-serif;
		}

		input {
			outline: 1px solid exports.$color-primary-100;
			outline-offset: 0.75rem;
			font-size: 1.5rem;
			text-transform: uppercase;
		}
	}
</style>