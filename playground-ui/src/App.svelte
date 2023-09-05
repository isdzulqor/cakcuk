<script>
	import Router from 'svelte-spa-router'
	import { routes } from './routes'
    import { scrollInto } from "./shared/helper/helper";
</script>

<Router {routes} />