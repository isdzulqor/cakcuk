<script>
    import CodeWrap from "../../shared/CodeWrap.svelte";
    import PlayEditor from "../../shared/PlayEditor.svelte";
    import Lazy from "svelte-lazy";

    export let clickMain;
</script>

<div class="main" id="tipsTrick" on:click={clickMain}>
        <div class="header">
            <h1>Tips & Trick</h1>
            <h3>You need to know for optimizing your Cakcuk</h3>
        </div>
        <div class="line"></div>
        <br />
        <div class="content">
            <h2 class="content-subhead">Work with Slackbot</h2>
            <p>You can work with Slackbot to make your Cakcuk powerful.</p>
            <ol>
                <li>Creating Slackbot alias to trigger Cakcuk's commands.</li>
                <li>
                    Set a reminder to execute a certain command at a certain
                    time.
                </li>
            </ol>
            <br />
            <h2 class="content-subhead">Authentication Support</h2>
            <p>
                Currently, only basic authentication that's supported on a
                specific option which is
                <code>--basicAuth, -ba</code>. But you also can implement the
                other authentication that's able to generate to be header
                values.
            </p>
            <p>
                You can explore it easily on API tools like <a
                    target="_blank"
                    href="https://www.postman.com/">Postman</a
                >. You can choose what type of auth you use. Then simply get the
                generated headers. Then you can put those headers values to
                Cakcuk command request with <code>--header, -h</code> option.
            </p>
        </div>
    </div>