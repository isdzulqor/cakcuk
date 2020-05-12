<script>
	import "../../node_modules/purecss/build/pure-min.css";
	export let name;
	import Play from './content/Play.svelte'
</script>

<div class="content-wrapper">
	<Play></Play>
</div>

<style>
	div {
		text-align: center;
		margin: 0 auto;
	}

	.content-wrapper {
		position: relative;
		background: #34495e;
	}
</style>