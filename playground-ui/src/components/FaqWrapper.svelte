<script>
	import Navbar from './navbar/Navbar.svelte'
	import Faq from './content/Faq.svelte'
	import Footer from './content/Footer.svelte'
	
	window.scrollTo(0, 0);
</script>

<div class="content-wrapper">
	<Navbar state="faq-menu"></Navbar>
	<Faq></Faq>
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