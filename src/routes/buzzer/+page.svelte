<script>
	import Buzzer from "$lib/components/Buzzer.svelte";

	function onClick() {
		console.log("Clicked")
	}
</script>

<Buzzer on:click={onClick}/>