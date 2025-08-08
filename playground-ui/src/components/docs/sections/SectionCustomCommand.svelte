<script>
    import CodeWrap from "../../shared/CodeWrap.svelte";
    import PlayEditor from "../../shared/PlayEditor.svelte";
    import Lazy from "svelte-lazy";

    export let getExample;
    export let getHelpExample;
    export let getRunWay;
    export let scroll;
    export let clickMain;
</script>

<div class="main" id="customCommand" on:click={clickMain}>
    <div class="header">
        <h1>Custom Command</h1>
        <h3>Create your own custom command based on your needs</h3>
    </div>
    <div class="line"></div>
    <div class="content">
        <p>
            Create your own custom command with <a
                class="common-link"
                goTo="cakCommand"
                on:click={scroll}>Cak command</a
            > then execute it. Please keep in mind, the commands you create on the
            Playground have the expiration time. It takes 5 minutes to be deleted
            after the creation time.
        </p>
        <p>
            Your created <a
                class="common-link"
                goTo="customCommand"
                on:click={scroll}>Custom Commands</a
            >
            also have the implicit options that
            <a class="common-link" goTo="cukCommand" on:click={scroll}>Cuk</a> command
            has. Like Query parameters, Headers, etc. You can overwrite or add params
            as you need. Just try the examples below! You need to try it in sequence
            for each example within the section.
        </p>
        <p>
            Don't forget to explore <a
                class="common-link"
                goTo="cakCommand"
                on:click={scroll}>Cak</a
            > command as well for more functionalities as you need.
        </p>
        <PlayEditor
            background="white"
            editorType="medium"
            tabChecked="checked"
            examples={getExample(
                "Custom Command - Simple Example",
                "Custom Command - Overwrite Option",
            )}
        ></PlayEditor>
    </div>
</div>
