<script>	
	import Navbar from './navbar/Navbar.svelte'
	import Privacy from './content/Privacy.svelte'
	import Footer from './content/Footer.svelte'

	window.scrollTo(0, 0);
</script>

<div class="content-wrapper">
	<Navbar state="faq-menu"></Navbar>
	<Privacy></Privacy>
	<Footer></Footer>
</div>

<style>
	div {
		margin: 0 auto;
	}

	.content-wrapper {
		position: relative;
		top: 2em;
	}
</style>