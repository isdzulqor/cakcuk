<script>
	import Navbar from '../components/Navbar.svelte';

	export let segment;
</script>

<style>
</style>

<Navbar {segment}/>

<main>
	<slot></slot>
</main>