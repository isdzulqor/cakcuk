<script>	
	import Banner from './banner/Banner.svelte'
	import Content from './content/Content.svelte'
	import Navbar from './navbar/Navbar.svelte'
	import Docs from './docs/Docs.svelte'

	window.scrollTo(0, 0);
</script>

<div>
	<Navbar state="home"></Navbar>
	<Banner></Banner>
	<Content></Content>
</div>

<style>
	div {
		text-align: center;
		margin: 0 auto;
    }
</style>