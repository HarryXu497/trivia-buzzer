<script lang="ts">
	import { page } from "$app/stores";
	import Switch from "$lib/components/Switch.svelte";
	import firestore from "$lib/firebase/firebase";
	import { collection, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
	import { onMount } from "svelte";

	interface FirebaseTimeStamp {
		seconds: number,
		nanoseconds: number
	} 

	interface Buzzer {
		name: string;
		team: string;
		disabled: boolean;
		timeBuzzed: FirebaseTimeStamp
	}

	type BuzzerGroups = {[key: string]: Buzzer[]} 

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

	function onTeamToggle(teamName: string) {
		return async (event: Event) => {
			if (!$page.url.searchParams.has("roomCode")) {
				return;
			}
			
			const target = event.target as HTMLInputElement;
			const isChecked = !target.checked; 

			const playersRef = collection(firestore, "games", $page.url.searchParams.get("roomCode")!, "players");
			
			const filteredPlayers = query(playersRef, where("team", "==", teamName))

			const documents = await getDocs(filteredPlayers);

			documents.forEach(async document => {

				const data = document.data();

				await updateDoc(document.ref, {
					disabled: isChecked,
					timeBuzzed: isChecked ? null : data.timeBuzzed,
				})
			})
		}
	}

	let teamBuzzerOn: boolean = true;

	let buzzers: Buzzer[] = [];
	let teams: BuzzerGroups = {};
	$: firstBuzzerTime = buzzers.length ? buzzers[0].timeBuzzed : null;

	onMount(() => {
		if ($page.url.searchParams.has("roomCode")) {
			const roomCode = $page.url.searchParams.get("roomCode")!;

			const playerCollection = collection(firestore, "games", roomCode, "players");
		
			const q = query(playerCollection, orderBy("timeBuzzed", "asc"));

			onSnapshot(q, (snapshot) => {
				const data = snapshot.docs
					.map(v => v.data())
				
				buzzers = data.filter(data => data.timeBuzzed) as Buzzer[];
				
				teams = (data as Array<Buzzer>).reduce<BuzzerGroups>((groups, item) => {
					const group = (groups[item.team] || []);
					group.push(item);
					groups[item.team] = group;
					return groups;
				}, {})
			})
		}
	})
</script>

<main>
	<p class="switch">Buzzers are currently <Switch on:input={onInput} switchName="all" bind:checked={teamBuzzerOn}/></p>


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


	<section class="team-display">
		<h1>Teams</h1>
		{#each Object.entries(teams) as team}
			<div class="team-display__team">
				<h2>{team[0].toUpperCase()} <Switch on:input={onTeamToggle(team[0])} switchName={team[0]} checked={teamBuzzerOn}/></h2>
				<div class="team-display__team__players">
					{#each team[1] as teamMember}
						<div class="team-display__team__player">
							Player Name: {teamMember.name}
							Is Buzzed: {!!teamMember.timeBuzzed}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>

</main>

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

	main {
		color: white;
		font-family: exports.$font-sans-serif;
		
		width: fit-content;
		min-width: 40rem;
		margin: 0 auto;
	}

	.team-display {
		margin-top: 3rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;

		h1 {
			font-size: 1.75rem;
			font-weight: bold;
		}
	}

	.team-display__team {
		background-color: exports.$color-primary-400;
		padding: 1rem 0.75rem;
		border-radius: 5px;

		display: flex;
		flex-direction: column;
		gap: 0.5rem;

		h2 {
			font-weight: bold;
			font-size: 1.25rem;

			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
	}

	.team-display__team__players {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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