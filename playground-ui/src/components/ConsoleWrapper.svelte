<script>
	import Navbar from "./navbar/Navbar.svelte";
	import Console from "./content/Console.svelte";
	window.scrollTo(0, 0);
</script>

<div class="content-wrapper">
	<Navbar state="play-menu" />
	<Console />
</div>

<style>
	div {
		text-align: center;
		margin: 0 auto;
	}

	.content-wrapper {
		position: relative;
		top: 2em;
		background: #34495e;
	}
</style>
