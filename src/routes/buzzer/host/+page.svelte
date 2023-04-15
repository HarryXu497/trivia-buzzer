<script lang="ts">
	import { page } from "$app/stores";
	import Switch from "$lib/components/Switch.svelte";
	import firestore from "$lib/firebase/firebase";
	import { collection, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
	import { onMount } from "svelte";

	interface Buzzer {
		name: string;
		team: string;
	}

	async function onInput(event: Event) {
		if (!$page.url.searchParams.has("roomCode")) {
			return;
		}
		
		const target = event.target as HTMLInputElement;
		const isChecked = target.checked; 

		const players = collection(firestore, "games", $page.url.searchParams.get("roomCode")!, "players");
		const documents = await getDocs(players);

		documents.forEach(async document => {

			const data = document.data();

			await updateDoc(document.ref, {
				disabled: isChecked,
				timeBuzzed: isChecked ? null : data.timeBuzzed,
			})
		})
	}

	let buzzers: Buzzer[] = [];

	onMount(() => {
		if ($page.url.searchParams.has("roomCode")) {
			const roomCode = $page.url.searchParams.get("roomCode")!;

			const playerCollection = collection(firestore, "games", roomCode, "players");
		
			const q = query(playerCollection, orderBy("timeBuzzed", "asc"));

			onSnapshot(q, (snapshot) => {
				buzzers = snapshot.docs
					.map(v => v.data())
					.filter(data => data.timeBuzzed) as Buzzer[];
			})
		}
	})
</script>

<section>
	Disable All Buzzers: <Switch on:input={onInput}/>

	<section class="buzzer-table">
		<div class="buzzer-header">
			<p class="team">Team</p>
			<p class="name">Name</p>
		</div>
		{#each buzzers as buzzer}
			<div class="buzzer-row">
				<p class="team">{ buzzer.team }</p>
				<p class="name">{ buzzer.name }</p>
			</div>
		{/each}
	</section>

</section>

<style lang="scss">
	@use "../../../styles/exports.scss" as exports;

	@mixin buzzer-row {
		display: flex;
		flex-direction: row;

		p {
			padding: 0.5rem;
			font-size: 1.25rem;
		}

		.team {
			width: 30%
		}

		.name {
			width: 70%
		}
	}

	section {
		color: white;
		font-family: exports.$font-sans-serif;
		

		width: fit-content;
		min-width: 32rem;
		margin: 0 auto;
	}

	.buzzer-table {
		display: flex;
		flex-direction: column;
	}

	.buzzer-row {
		@include buzzer-row;

		&:nth-of-type(2n) {
			background-color: exports.$color-primary-400;
		}

		&:nth-of-type(2n + 1) {
			background-color: exports.$color-primary-600;
		}
	}

	.buzzer-header {
		@include buzzer-row;

		font-weight: bold;

		background-color: exports.$color-dark-800;
	}
</style>