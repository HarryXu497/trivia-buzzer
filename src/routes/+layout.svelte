<script lang="ts">
	import "../styles/reset.scss";
	import "../styles/globals.scss";
</script>

<main>
	<slot/>
</main>

<style lang="scss">
	@use "../styles/exports.scss" as exports;

	main {
		position: absolute;
		inset: 0;

		background-color: exports.$color-primary;

		display: grid;
		place-items: center;
	}
</style>