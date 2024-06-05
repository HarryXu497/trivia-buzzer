<script lang="ts">
	export let switchName: string;
	export let checked: boolean = true;
</script>

<div class="toggle"> 
	<input type="checkbox" class="toggle-checkbox" id={`toggle_${switchName}`} on:input bind:checked={checked}>
	<label class="toggle-label" for={`toggle_${switchName}`}>
		<span class="toggle-inner"></span>
		<span class="toggle-switch"></span>
	</label>
</div>

<style lang="scss">
	.toggle {
		position: relative;
		display: inline-block;
		width: 70px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.toggle-checkbox {
		display: none;
	}

	.toggle-label {
		display: block;
		overflow: hidden;
		cursor: pointer;
		border-radius: 50px;
	}

	.toggle-checkbox:checked + .toggle-label .toggle-inner {
		margin-left: 0;
	}

	.toggle-inner {
		display: block;
		width: 200%;
		margin-left: -100%;
		transition: margin 0.2s ease-in 0s;
	}

	.toggle-inner:before {
		content: "ON";
		padding-right: 20px;
		background-color: #34C234;
		color: #FAFAFA;
	}

	.toggle-inner:before, .toggle-inner:after {
		display: block;
		float: left;
		width: 50%;
		height: 28px;
		padding: 0;
		padding-left: 30px;
		line-height: 28px;
		font-size: 15px;
		color: white;
		font-family: Trebuchet, Arial, sans-serif;
		font-weight: bold;
		box-sizing: border-box;
	}

	.toggle-inner:before, .toggle-inner:after {
		display: block;
		float: left;
		width: 50%;
		height: 28px;
		padding-left: 10px;
		line-height: 28px;
		font-size: 15px;
		color: white;
		font-family: Trebuchet, Arial, sans-serif;
		font-weight: bold;
		box-sizing: border-box;
	}

	.toggle-inner:after {
		content: "OFF";
		padding-right: 8px;
		background-color: #EEEEEE;
		color: #999999;
		text-align: right;
	}

	.toggle-checkbox:checked + .toggle-label .toggle-switch {
		right: 0px;
	}

	.toggle-switch {
		display: block;
		width: 20px;
		margin: 4px;
		background: #cccccc;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 40px;
		border-radius: 50px;
		transition: all 0.2s ease-in 0s;
	}

</style>