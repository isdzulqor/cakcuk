<script>
	import "../../node_modules/purecss/build/pure-min.css";
	export let name;
	import Play from './content/Play.svelte'
	import Navbar from './shared/Navbar.svelte'
</script>


<Navbar state="play-menu"></Navbar>
<div class="content-wrapper">
	<Play></Play>
</div>

<style>
	div {
		text-align: center;
		margin: 0 auto;
	}

	.content-wrapper {
		top: 2em;
		position: relative;
		background: #34495e;
	}
</style>