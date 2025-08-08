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

<div class="main" id="defaultOptions" on:click={clickMain}>
    <div class="header">
        <h1>Default Options</h1>
        <h3>
            General options that you can use it in almost all of Cakcuk commands
        </h3>
    </div>
    <div class="line"></div>
    <div class="content">
        <h2 id="outputFileOption" class="content-subhead">--outputFile, -of</h2>
        <p>
            Printing result to be file output. It's a single option. Just add <code
                >--outputFile, -of</code
            > in your command. Please note it's only working in your workspace.
        </p>
        <h2 id="filterOption" class="content-subhead">--filter, -f</h2>
        <p>
            Filtering result that's containing some keyword. Works like grep
            command in terminal.
            <code>--filter, -f</code> is case insensitive. Example usage:
            <code>--filter=this is keywords</code>. Just play the playground to
            see the result!
        </p>
        <h2 id="printOptions" class="content-subhead">--printOptions, -po</h2>
        <p>
            It will print options when you execute the command in your
            workspace. Just like the Preview tab in the command section of the
            play editor. It's useful for you to ensure you input the correct
            value for each option as you want. Something like avoiding typo.
        </p>
        <h2 id="noResponseOption" class="content-subhead">--noResponse, -nr</h2>
        <p>
            It will print no response from your executed command in your
            workspace. Just add
            <code>--noResponse, -nr</code> in your command. It's fit for your use-case
            which is for post/put something, like triggering CI or something like
            that you don't need the response.
        </p>
        <h2 id="noParseOption" class="content-subhead">--noParse, -np</h2>
        <p>
            It will ignore <code>--parseResponse, -pr</code> value. It's useful
            for debugging. Works with
            <code>Cuk</code>, and your <code>custom commands</code>.
        </p>
        <PlayEditor
            background="white"
            editorType="medium"
            tabChecked="checked"
            examples={getExample("Default Options")}
        ></PlayEditor>
    </div>
</div>
