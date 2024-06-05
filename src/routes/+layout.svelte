<script lang="ts">
	import "../styles/reset.scss";
	import "../styles/globals.scss";

	import type { Config } from '@sveltejs/adapter-vercel';

	export const config: Config = {
		runtime: 'nodejs18.x',
	};
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

		min-height: calc(100vh + 6rem);
	}
</style>