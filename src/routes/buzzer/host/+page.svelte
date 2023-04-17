<script lang="ts">
	import { page } from "$app/stores";
	import Switch from "$lib/components/Switch.svelte";
	import firestore from "$lib/firebase/firebase";
	import { collection, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
	import { onMount } from "svelte";

	interface FirebaseTimeStamp {
		seconds : number,
		nanoseconds : number
	} 

	interface Buzzer {
		name: string;
		team: string;
		disabled: boolean;
		timeBuzzed: FirebaseTimeStamp
	}

	function calculateTimeDifference(first: FirebaseTimeStamp, second: FirebaseTimeStamp) {
		const secondDifference = first.seconds - second.seconds;
		const nanosecondsDifference = first.nanoseconds - second.nanoseconds;


		return (secondDifference * 1e3) + (nanosecondsDifference / 1e6)
	}

	async function onInput(event: Event) {
		if (!$page.url.searchParams.has("roomCode")) {
			return;
		}
		
		const target = event.target as HTMLInputElement;
		const isChecked = !target.checked; 

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
	$: firstBuzzerTime = buzzers.length ? buzzers[0].timeBuzzed : null;

	onMount(() => {
		if ($page.url.searchParams.has("roomCode")) {
			const roomCode = $page.url.searchParams.get("roomCode")!;

			const playerCollection = collection(firestore, "games", roomCode, "players");
		
			const q = query(playerCollection, orderBy("timeBuzzed", "asc"));

			onSnapshot(q, (snapshot) => {
				buzzers = snapshot.docs
					.map(v => v.data())
					.filter(data => data.timeBuzzed) as Buzzer[];
				
				console.log(buzzers)
			})
		}
	})
</script>

<section>
	<p class="switch">Buzzers are currently <Switch on:input={onInput}/></p>


	<section class="buzzer-table">
		<div class="buzzer-header">
			<p class="team">Team</p>
			<p class="name">Name</p>
			<p class="time">Time</p>
		</div>
		{#if !buzzers.length}
		<div class="buzzer-row placeholder">
			<p class="team"></p>
			<p class="name"></p>
			<p class="time"></p>
		</div>
		{/if}
		{#each buzzers as buzzer}
			<div class="buzzer-row">
				<p class="team">{ buzzer.team }</p>
				<p class="name">{ buzzer.name }</p>
				<p class="time">{ firstBuzzerTime && calculateTimeDifference(buzzer.timeBuzzed, firstBuzzerTime) }ms</p>
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
			box-sizing: border-box;
		}

		.team {
			width: 30%;
			border-right: 1px solid black;
		}

		.name {
			width: 50%;
			border-right: 1px solid black;
		}

		.time {
			width: 20%;
		}
	}

	.switch {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		align-items: center;
		font-size: 1.5rem;
		margin: 1rem 0;
	}

	section {
		color: white;
		font-family: exports.$font-sans-serif;
		

		width: fit-content;
		min-width: 42rem;
		margin: 0 auto;
	}


	.placeholder {
		height: 2.125rem;
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