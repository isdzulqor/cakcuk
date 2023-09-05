<script>
    import Example from './Example.svelte'
    import HowWorks from './HowWorks.svelte'
    import Footer from './Footer.svelte'
    import Newsletter from './Newsletter.svelte'
    import Play from './Play.svelte'

</script>

<div class="content-wrapper">
    <HowWorks></HowWorks>
    <Example></Example>
    <Newsletter></Newsletter>
    <Footer></Footer>
</div>
<style>
    .content-wrapper {
        left: 0;
        position: relative;
        width: 100%;
        margin-right: 10rem;
        min-height: 12%;
        z-index: 2;
        background: white;
    }
</style>