<script>	
	import Navbar from './navbar/Navbar.svelte'
	import Play from './content/Play.svelte'
	import Footer from './content/Footer.svelte'
	
	window.scrollTo(0, 0);
</script>

<div class="content-wrapper">
	<Navbar state="play-menu"></Navbar>
	<Play></Play>
    <Footer></Footer>
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