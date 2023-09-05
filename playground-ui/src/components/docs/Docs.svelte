<script>
	import "../../../node_modules/purecss/build/pure-min.css";
    import "../../../node_modules/purecss/build/menus-min.css";
    import "../../../node_modules/purecss/build/menus-core.css";
    import "../../../node_modules/purecss/build/menus.css";
    import PlayEditor from "../shared/PlayEditor.svelte"
    import CodeWrap from "../shared/CodeWrap.svelte"
    import Searchbar from "../navbar/Searchbar.svelte"
    import DATA from "../../shared/data/data";
    import { scrollInto } from "../../shared/helper/helper";
    import { onMount } from 'svelte';
    import Lazy from 'svelte-lazy';

    import { location, querystring } from 'svelte-spa-router'

    let activeToogle = "";

    function clickToogle(event) {
        if (activeToogle == "") {
            activeToogle = "active"
            return
        }
        activeToogle = ""
    }
    function clickMain(event) {
        if (activeToogle == "active") {
            clickToogle(event)
        }
    }

    function scroll(event) {
        scrollInto(event, 22)
        clickMain(event)
    }

    function getExample(...keys) {
        let filteredExamples = DATA.SNIPPET_EXAMPLES.filter(function (item) {
            for (let i = 0; i < keys.length; i++) {
                if (item.key == keys[i])
                    return true;
            }
            return false;
        });
        return filteredExamples
    }

    function getRunWay(key) {
        let filteredExamples = DATA.RUN_WAYS.filter(function (item) {
            if (item.key == key)
                return true;
            return false;
        });
        if (filteredExamples.length > 0) {
            return filteredExamples[0].code
        }
        return ""
    }

    function getHelpExample(key) {
        let filteredExamples = DATA.HELP_EXAMPLES.filter(function (item) {
            if (item.key == key)
                return true;
            return false;
        });
        if (filteredExamples.length <= 0) {
            return
        }
        return filteredExamples[0].command
    }

    function autoGrow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight) + "px";
    }

    const watch = location.subscribe(value => {
        value = value.split("/docs/").join("")
        if (value == "/" || value == "/docs") {
            window.scrollTo(0, 0);
            return
        }
        try {
            onMount(() => {
                scrollInto(null, 22, value, "auto")
            });
        } catch (e) {
        }
    });
</script>

<div id="layout" class={activeToogle}>
    <!-- <Searchbar></Searchbar> -->
    <!-- Floating button -->
    <a class="float" on:click={clickToogle}>
        <div class="hamburger {activeToogle} my-float" id="hamburger-10">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </div>
    </a>

    <div id="menu" class={activeToogle}>
        <div class="pure-menu">
            <a href="#" class="pure-menu-heading">
                <Lazy fadeOption={null}>
                    <img id="logo" alt="Cakcuk Logo" src="images/cakcuk_logo.png">
                </Lazy>
            </a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item"><a goTo="getStarted" on:click={scroll}
                        class="pure-menu-link">•&nbsp;&nbsp;&nbsp;Get Started</a>
                </li>
                <li class="pure-menu-item"><a goTo="defaultCommands" on:click={scroll}
                        class="pure-menu-link">•&nbsp;&nbsp;&nbsp;Default Commands</a>
                </li>
                <li class="pure-menu-item"><a goTo="helpCommand" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;Help</a>
                <li class="pure-menu-item"><a goTo="cukCommand" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;Cuk</a></li>
                <li class="pure-menu-item"><a goTo="cakCommand" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;Cak</a></li>
                <li class="pure-menu-item"><a goTo="delCommand" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;Del</a></li>
                <li class="pure-menu-item"><a goTo="scopeCommand" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;Scope - ACL</a>
                <li class="pure-menu-item"><a goTo="suCommand" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;SU - Superuser</a>
                </li>
                <li class="pure-menu-item menu-item-divided">
                    <a goTo="customCommand" on:click={scroll} class="pure-menu-link">•&nbsp;&nbsp;&nbsp;Custom
                        Command</a>
                </li>
                <li class="pure-menu-item"><a goTo="defaultOptions" on:click={scroll}
                        class="pure-menu-link">•&nbsp;&nbsp;&nbsp;Default Options</a>
                </li>
                <li class="pure-menu-item"><a goTo="outputFileOption" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;--outputFile</a>
                </li>
                <li class="pure-menu-item"><a goTo="filterOption" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;--filter</a>
                </li>
                <li class="pure-menu-item"><a goTo="printOptions" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;--printOptions</a>
                </li>
                <li class="pure-menu-item"><a goTo="noResponseOption" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;--noResponse</a>
                </li>
                <li class="pure-menu-item"><a goTo="noParseOption" on:click={scroll}
                        class="pure-menu-link menu-child">•&nbsp;&nbsp;&nbsp;--noParse</a>
                </li>

                <li class="pure-menu-item"><a goTo="tipsTrick" on:click={scroll}
                        class="pure-menu-link">•&nbsp;&nbsp;&nbsp;Tips & Trick</a></li>
            </ul>
        </div>
    </div>

    <div class="main" id="getStarted" on:click={clickMain}>
        <div class="header">
            <h1>Get Started</h1>
            <h3>Easy Ways to Get Started with Cakcuk</h3>
        </div>
        <div class="line"></div>
        <div class="content">
            <p>
                You can start using <a href="#">Cakcuk</a> by adding <a href="#">Cakcuk</a> to your workspace directly.
                <br>
                <br>
                <a href="https://cakcuk.io/slack/add">
                    <Lazy fadeOption={null}>
                    <img alt="Add to Slack" height="40" width="150" src="images/btn-add-to-slack.svg" />
                    </Lazy>
                </a>
            </p>

            <h2 id="deploy" class="content-subhead">Provision your own Cakcuk</h2>
            <p>
                To get started deploying <a href="#">Cakcuk</a> by yourself, make sure you have created the slack app
                first to get the Slack app token.
                You can go to <a target="_blank" href="https://api.slack.com/apps">Slack Apps</a> and create one if you
                haven't created your slack app. You also need to keep the verification token as well. It works for
                validation of each request from Slack. Put those both tokens on your Cakcuk env just like in <a
                    class="common-link" goTo="waysToRun" on:click={scroll}>this section</a>.
            </p>
            <p>
                When you use <a href="https://api.slack.com/events-api" target="_blank">Slack Event API</a>, you also
                need to set events for those you subscribe to. There are three events that you need to submit.
            </p>
            <ul>
                <li><a href="https://api.slack.com/events/app_home_opened" target="_blank">app_home_opened</a></li>
                <li><a href="https://api.slack.com/events/app_mention" target="_blank">app_mention</a></li>
                <li><a href="https://api.slack.com/events/message.im" target="_blank">message.im</a></li>
            </ul>
            <h3 class="content-subhead">Needed Slack scopes for your Cakcuk</h3>
            <ul>
                <li>app_mentions:read</li>
                <li>chat:write</li>
                <li>files:write</li>
                <li>im:history</li>
                <li>team:read</li>
                <li>users:read</li>
            </ul>
            <p>More explanations about <a target="_blank" href="https://api.slack.com/scopes">Slack Scopes</a> you can
                check here <a target="_blank" href="https://api.slack.com/scopes">https://api.slack.com/scopes</a>.</p>
            <h3 id="waysToRun" class="content-subhead">Some ways to run Cakcuk by yourself</h3>
            <ul>
                <li>
                    <h4 class="content-subhead-bold">Cakcuk with <a href="https://api.slack.com/events-api"
                            target="_blank">Slack Event API</a> TLS disabled</h4>
                    <CodeWrap>{getRunWay('event-tls-disabled')}</CodeWrap>
                </li>
                <p>
                    TLS disabled doesn't mean you cannot use HTTPS for your Cakcuk. It gives you an option if you want
                    to
                    deploy it with TLS handled by load balancer or the others, for example, Nginx. So it doesn't need to
                    be handled on the application level.
                </p>
                <li>
                    <h4 class="content-subhead-bold">Cakcuk with <a href="https://api.slack.com/events-api"
                            target="_blank">Slack Event API</a> TLS Enabled</h4>
                    <CodeWrap>{getRunWay('event-tls-enabled')}</CodeWrap>
                </li>
                <p>
                    If you use TLS enabled. You need to provide public domains that you need to set for PUBLIC_DOMAINS
                    env. It accepts multiple domains separated by comma. Cakcuk uses <a href="https://letsencrypt.org"
                        target="_blank">Let's Encrypt</a> to handle TLS.
                </p>
                <li>
                    <h4 class="content-subhead-bold">Cakcuk with <a href="https://api.slack.com/rtm"
                            target="_blank">Slack RTM API</a> TLS disabled</h4>
                    <CodeWrap>{getRunWay('rtm-tls-disabled')}</CodeWrap>
                </li>
                <li>
                    <h4 class="content-subhead-bold">Cakcuk with <a href="https://api.slack.com/rtm"
                            target="_blank">Slack RTM API</a> TLS Enabled</h4>
                    <CodeWrap>{getRunWay('rtm-tls-enabled')}</CodeWrap>
                </li>
                <h3 class="content-subhead">A Bit Differences between Slack Event API & Slack RTM API</h3>
                <ul>
                    <li><a href="https://api.slack.com/rtm" target="_blank">Slack RTM API</a> doesn't need to expose
                        a public endpoint. Thus it's easier to integrate with your
                        private cluster if you have.</li>
                    <li><a href="https://api.slack.com/events-api" target="_blank">Slack Event API</a> needs to has a
                        public endpoint and register it to Slack to be challenged.</li>
                    <br>
                    <li><a href="https://api.slack.com/rtm" target="_blank">Slack RTM API</a> uses WebSocket, so it's
                        realtime and lower latency.</li>
                    <li><a href="https://api.slack.com/events-api" target="_blank">Slack Event API</a> uses HTTPS
                        webhook, it must have higher latency mostly.</li>
                    <br>
                    <li><a href="https://api.slack.com/rtm" target="_blank">Slack RTM API</a> uses higher resource, CPU,
                        memory & bandwidth. WebSocket costs this.</li>
                    <li><a href="https://api.slack.com/events-api" target="_blank">Slack Event API</a> uses HTTPS
                        webhook, it eats lower resources.</li>
                    <br>
                    <li><a href="https://api.slack.com/rtm" target="_blank">Slack RTM API</a> needs to expose many
                        scopes/permissions, <code>bot</code> Slack scope. It has multiple scopes/permissions aggregated
                        in <code>bot</code> Slack scope. That's why RTM API will consume events that you don't need them
                        as well.</li>
                    <li><a href="https://api.slack.com/events-api" target="_blank">Slack Event API</a> can just use
                        Slack scopes/permission as needed.</li>
                </ul>
                <p>More about it <a href="https://api.slack.com/events-api"
                        target="_blank">https://api.slack.com/events-api</a> and <a href="https://api.slack.com/rtm"
                        target="_blank">https://api.slack.com/rtm</a></p>
                <li>
                    <h4 class="content-subhead-bold">Simply use <a
                            href="https://github.com/isdzulqor/cakcuk/blob/master/docker-compose.yaml"
                            target="_blank">docker-compose.yaml</a> </h4>
                    <CodeWrap>{getRunWay('docker-compose')}</CodeWrap>
                </li>
                <p>
                    Make sure you overwrite the environment variables values as you need. Please see the configurations
                    explanations above, either you use <a href="https://api.slack.com/events-api" target="_blank">Event
                        API</a> or <a href="https://api.slack.com/rtm" target="_blank">RTM API</a>, with TLS disabled or
                    enabled.
                </p>
                <li>
                    <h4 class="content-subhead-bold">Clone the <a href="https://github.com/isdzulqor/cakcuk"
                            target="_blank">Source on Github</a></h4>
                </li>
            </ul>
            <br>
            <h3 class="content-subhead">Some Environment Variables Explanation</h3>
            <ul>
                <li>PORT</li>
                <p>
                    By default, Cakcuk with TLS disabled is using port 80. You can change it as you want by overwriting
                    the PORT env. Keep in mind, it's only for TLS disabled. If you provision your Cakcuk with TLS
                    enabled. It will use port 80 and 443 for sure.
                </p>
                <li>LOG_LEVEL</li>
                <p>
                    By default LOG_LEVEL value is <code>info</code>. It means that logs only print Info, Warn, Error,
                    Fatal, and Panic those are printed on logs. There are 5 types of LOG_LEVEL debug, info, warn, error,
                    fatal, and panic. If you want to print all the logs although is for debugging only. You can
                    overwrite LOG_LEVEL env with <code>debug</code> value.
                </p>
                <li>ENCRYPTION_PASSWORD</li>
                <p>
                    If you have checked special prefix functionality for <code>encrypt=</code> and encrypted option in
                    your <a class="common-link" goTo="customCommand" on:click={scroll}>Custom Commands</a>. This
                    ENCRYPTION_PASSWORD value is the encryption key for the encryption value. For authentication
                    feature, it also uses this encryption key. Just make sure you customize this ENCRYPTION_PASSWORD env
                    value to keep your sensitive value secured.
                </p>
                <li>SUPER_USER_MODE_ENABLED</li>
                <p>
                    SUPER_USER_MODE_ENABLED is true, means enabled by default. It can be disabled by setting the value
                    to be false. If you play the commands on the Playground. You will automatically have access to <a
                        class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a>. Just play with <a
                        class="common-link" goTo="suCommand" on:click={scroll}>SU</a> command, examples are provided
                    with an explanation on the info section.
                </p>
            </ul>
            <br>
        </div>
    </div>
    <div class="main" id="defaultCommands" on:click={clickMain}>
        <div class="header">
            <h1>Default Commands</h1>
            <h3>Cakcuk's Base Commands</h3>
        </div>
        <div class="line"></div>
        <div class="content">
            <h2 id="helpCommand" class="content-subhead">Help</h2>
            <p>
                Like most <a class="common-link" goTo="helpCommand" on:click={scroll}>Help</a> functions in other CLIs.
                <a class="common-link" goTo="helpCommand" on:click={scroll}>Help</a> works to display command lists or
                specific commands for their details, such as for example usage, description, options, etc.
            </p>
            <p>
                It's pretty straightforward to work with <code>Help</code>. It also works with your <a
                    class="common-link" goTo="customCommand" on:click={scroll}>Custom Commands</a>. Just try the
                examples below!
            </p>
            <PlayEditor background="white" editorType="medium" tabChecked="checked"
                editorCommandArea="{getHelpExample('help')}" examples="{getExample('Help')}">
            </PlayEditor>
            <h2 id="cukCommand" class="content-subhead">Cuk</h2>
            <p>
                <a class="common-link" goTo="cukCommand" on:click={scroll}>Cuk</a> is a command for hitting HTTP/S
                endpoints. It covers endpoint properties like URL, Query Parameters, Headers, etc. It works pretty
                simply to support common endpoint usage.
            </p>
            <p>
                One of the special options that you can explore is <code>--parseResponse, -pr</code>.
                <code>--parseResponse, -pr</code> is supporting <a class="common-link" goTo="cakCommand"
                    on:click={scroll}>Cak</a> command and your <a class="common-link" goTo="customCommand"
                    on:click={scroll}>Custom Commands</a> as well.
            </p>
            <PlayEditor background="white" editorType="medium" tabChecked="checked"
                editorCommandArea="{getHelpExample('cuk')}" examples="{getExample('Cuk - Hit Endpoint')}">
            </PlayEditor>
            <h2 id="cakCommand" class="content-subhead">Cak</h2>
            <p>
                <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak</a> is a special command to create your
                <a class="common-link" goTo="customCommand" on:click={scroll}>Custom Commands</a>. Your commands
                creation on Playground only hold for 5 minutes. They will be deleted after that.
            </p>
            <p>
                Just explore <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak</a> command using provided
                examples. They quite represent <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak</a>
                functionalities.
            </p>
            <PlayEditor background="white" editorType="medium" tabChecked="checked"
                editorCommandArea="{getHelpExample('cak')}" examples="{getExample('Cak - Create Command')}">
            </PlayEditor>
            <h2 id="delCommand" class="content-subhead">Del</h2>
            <p>
                <a class="common-link" goTo="delCommand" on:click={scroll}>Del</a> is a simple command to delete your
                custom commands. You're not allowed to delete <a class="common-link" goTo="defaultCommands"
                    on:click={scroll}>Default Commands</a>. <a class="common-link" goTo="delCommand"
                    on:click={scroll}>Del</a> supports multiple commands deletion separated by double-and
                <code>&&</code> like the examples below.
            </p>
            <p>
                Please keep in mind, multiple option values always separated by double-and <code>&&</code>. You're only
                able to delete commands in your <a class="common-link" goTo="scopeCommand" on:click={scroll}>Scopes</a>,
                except you have <a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> access.
            </p>
            <PlayEditor background="white" editorType="medium" tabChecked="checked"
                editorCommandArea="{getHelpExample('del')}" examples="{getExample('Del - Delete Command')}">
            </PlayEditor>
            <h2 id="scopeCommand" class="content-subhead">Scope</h2>
            <p>
                Create, edit, and delete <a class="common-link" goTo="scopeCommand" on:click={scroll}>Scopes</a> aka
                access control list (ACL) for users and commands. It's useful for managing certain custom commands that
                belong to certain groups. For example, you create two <a class="common-link" goTo="scopeCommand"
                    on:click={scroll}>Scopes</a> for <code>developer</code> and <code>infra</code>. You want to make the
                users and commands that belong to the <code>developer</code> can't be accessed by <code>infra</code> users,
                and vice versa.
            </p>
            <p>
                The default <a class="common-link" goTo="scopeCommand" on:click={scroll}>scope</a> for the command is
                <code>public</code>. Commands in
                public <a class="common-link" goTo="scopeCommand" on:click={scroll}>scope</a> can be accessed by anyone
                in your workspace. Please keep in mind, that <a class="common-link" goTo="scopeCommand"
                    on:click={scroll}>Scope</a> creation on Playground also has 5 minutes expiration time.
            </p>
            <PlayEditor background="white" editorType="medium" tabChecked="checked"
                editorCommandArea="{getHelpExample('scope')}" examples="{getExample('Scope - ACL')}">
            </PlayEditor>
            <h2 id="suCommand" class="content-subhead">SU - Superuser</h2>
            <p>
                Access and control to manage <a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a>. <a
                    class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> is enabled by default. But,
                it's configurable via environment variable of <code>SUPER_USER_MODE_ENABLED</code>.
            </p>

            <p>
                <a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> that you set on the Playground
                has an expiration time. It
                will hold for 5 minutes like <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak commands</a>
                & <a class="common-link" goTo="scopeCommand" on:click={scroll}>Scopes</a> creation. The only user that's
                in the
                <a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> list that's able to set and
                delete the other users to be <a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a>.
                But for the first-time installation, <a class="common-link" goTo="suCommand"
                    on:click={scroll}>Superuser</a>
                can be set by anyone.
            </p>

            <h3 class="content-subhead">The differences between Superuser and Common User</h3>
            <ul>
                <li><a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> can Read, Create, Update,
                    and
                    Delete all Scopes.</li>
                <li>Common User is only able to Read, Create, Update, and Delete his Scopes.</li>
                <br>
                <li><a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> can Read, Create, Update,
                    Delete, and Execute all commands.</li>
                <li>Common User is only able to Read, Create, Update, Delete, and Execute his commands in his scopes.
                </li>
                <br>
                <li><a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> can Read of all the user's
                    access, the scopes and the commands included.</li>
                <li>Common User is not allowed.</li>
                <br>
                <li><a class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> can Show, Set, and Delete <a
                        class="common-link" goTo="suCommand" on:click={scroll}>Superuser</a> list group.</li>
                <li>Common User is only able to Show <a class="common-link" goTo="suCommand"
                        on:click={scroll}>Superuser</a> list.</li>
            </ul>
            <PlayEditor background="white" editorType="medium" tabChecked="checked"
                editorCommandArea="{getHelpExample('su')}" examples="{getExample('su - Superuser')}">
            </PlayEditor>
        </div>
    </div>
    <div class="main" id="customCommand" on:click={clickMain}>
        <div class="header">
            <h1>Custom Command</h1>
            <h3>Create your own custom command based on your needs</h3>
        </div>
        <div class="line"></div>
        <div class="content">
            <p>
                Create your own custom command with <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak
                    command</a> then execute it. Please keep in mind, the commands you create on the Playground have the
                expiration
                time. It takes 5 minutes to be deleted after the creation time.
            </p>
            <p>
                Your created <a class="common-link" goTo="customCommand" on:click={scroll}>Custom Commands</a> also have
                the implicit options that <a class="common-link" goTo="cukCommand" on:click={scroll}>Cuk</a> command
                has. Like Query parameters, Headers, etc. You can overwrite or add params as you need. Just try the
                examples below! You need to try it in sequence for each example within the
                section.
            </p>
            <p>
                Don't forget to explore <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak</a> command as
                well for more functionalities as you need.
            </p>
            <PlayEditor background="white" editorType="medium" tabChecked="checked"
                examples="{getExample('Custom Command - Simple Example', 'Custom Command - Overwrite Option')}">
            </PlayEditor>
        </div>
    </div>
    <div class="main" id="defaultOptions" on:click={clickMain}>
        <div class="header">
            <h1>Default Options</h1>
            <h3>General options that you can use it in almost all of Cakcuk commands</h3>
        </div>
        <div class="line"></div>
        <div class="content">
            <h2 id="outputFileOption" class="content-subhead">--outputFile, -of</h2>
            <p>
                Printing result to be file output. It's a single option. Just add <code>--outputFile, -of</code> in your
                command. Please note it's only working in your workspace.
            </p>
            <h2 id="filterOption" class="content-subhead">--filter, -f</h2>
            <p>
                Filtering result that's containing some keyword. Works like grep command in terminal.
                <code>--filter, -f</code> is case insensitive. Example usage: <code>--filter=this is keywords</code>.
                Just play the playground to see the result!
            </p>
            <h2 id="printOptions" class="content-subhead">--printOptions, -po</h2>
            <p>
                It will print options when you execute the command in your workspace. Just like the Preview tab in the
                command
                section of the play editor. It's useful for you to ensure you input the correct value for each option
                as you want. Something like avoiding typo.
            </p>
            <h2 id="noResponseOption" class="content-subhead">--noResponse, -nr</h2>
            <p>
                It will print no response from your executed command in your workspace. Just add
                <code>--noResponse, -nr</code> in your command. It's fit for your use-case which is for post/put
                something, like triggering CI or something like that you don't need the response.
            </p>
            <h2 id="noParseOption" class="content-subhead">--noParse, -np</h2>
            <p>
                It will ignore <code>--parseResponse, -pr</code> value. It's useful for debugging. Works with
                <code>Cuk</code>, and your <code>custom commands</code>.
            </p>
            <PlayEditor background="white" editorType="medium" tabChecked="checked"
                examples="{getExample('Default Options')}">
            </PlayEditor>
        </div>
    </div>
    <div class="main" id="tipsTrick" on:click={clickMain}>
        <div class="header">
            <h1>Tips & Trick</h1>
            <h3>You need to know for optimizing your Cakcuk</h3>
        </div>
        <div class="line"></div>
        <br>
        <div class="content">
            <h2 class="content-subhead">Work with Slackbot</h2>
            <p>
                You can work with Slackbot to make your Cakcuk powerful.
            </p>
            <ol>
                <li>Creating Slackbot alias to trigger Cakcuk's commands.</li>
                <li>Set a reminder to execute a certain command at a certain time.</li>
            </ol>
            <br>
            <h2 class="content-subhead">Authentication Support</h2>
            <p>
                Currently, only basic authentication that's supported on a specific option which is
                <code>--basicAuth, -ba</code>. But you also can implement the other authentication that's able
                to generate to be header values.
            </p>
            <p>
                You can explore it easily on API tools like <a target="_blank"
                    href="https://www.postman.com/">Postman</a>. You can choose what type
                of auth you use. Then simply get the generated headers. Then you can put those headers values to Cakcuk
                command request with <code>--header, -h</code> option.
            </p>
        </div>
    </div>
    <br>
    <br>
    <br>
    <br>
</div>

<style>
    @media only screen and (max-width: 767px) {
        .line {
            max-width: 80% !important;
        }
    }

    a:hover {
        text-decoration: none;
    }

    .menu-child {
        padding: .7em 3em !important;
        font-size: 90%;
    }

    #logo {
        width: 110px;
        padding-top: 4px;
    }

    body {
        color: #777;
    }

    .pure-img-responsive {
        max-width: 100%;
        height: auto;
    }

    .pure-menu-link {
        text-align: left;
        padding: .7em 1.5em;
    }

    /*
Add transition to containers so they can push in and out.
*/
    #layout,
    #menu,
    .menu-link {
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        -ms-transition: all 0.2s ease-out;
        -o-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
    }

    /*
This is the parent `<div>` that contains the menu and the content area.
*/
    #layout {
        top: 20px;
        position: relative;
        left: 0;
        padding-left: 0;
    }

    #layout.active #menu {
        left: 150px;
        /* width: 150px; */
    }

    #layout.active .menu-link {
        /* left: 150px; */
        left: 80%;
    }

    /*
The content `<div>` is where all your content goes.
*/
    .content {
        font-family: 'Overpass', sans-serif;
        margin: 0 auto;
        padding: 0 2em;
        max-width: 800px;
        margin-bottom: 50px;
        line-height: 1.6em;
        text-align: left;
    }

    .header {
        margin: 0;
        color: #333;
        text-align: center;
        padding: .5em 2em 0;
    }

    .line {
        max-width: 54%;
        height: 1px;
        background-color: #eee;
        margin: 0 auto;
    }

    .header h1 {
        margin: 0.2em 0;
        font-size: 3em;
        font-weight: 300;
    }

    .header h3 {
        font-weight: 300;
        color: #ccc;
        padding: 0;
        margin-top: 0;
    }

    .content-subhead {
        margin: 20px 0 20px 0;
        font-weight: 300;
        color: #888;
    }

    .content-subhead-bold {
        margin: 20px 0 20px 0;
        font-weight: 400;
        color: #888;
    }



    /*
The `#menu` `<div>` is the parent `<div>` that contains the `.pure-menu` that
appears on the left side of the page.
*/

    #menu {
        font-family: 'Cabin', sans-serif;
        margin-left: -150px;
        min-width: 180px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 50;
        background: #f1c40f;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }

    /*
    All anchors inside the menu should be styled like this.
    */
    #menu a {
        color: #ffffff;
        border: none;
        /* padding: 0.6em 0 0.6em 0.6em; */
    }

    /*
    Remove all background/borders, since we are applying them to #menu.
    */
    #menu .pure-menu,
    #menu .pure-menu ul {
        border: none;
        background: transparent;
    }

    /*
    Add that light border to separate items into groups.
    */
    #menu .pure-menu ul,
    #menu .pure-menu .menu-item-divided {
        /* border-top: 1px solid #333; */
    }

    /*
        Change color of the anchor links on hover/focus.
        */
    #menu .pure-menu li a:hover,
    #menu .pure-menu li a:focus {
        background: #e4b809;
    }

    /*
    This styles the selected menu item `<li>`.
    */
    #menu .pure-menu-selected,
    #menu .pure-menu-heading {
        background: #f6cc20;
    }

    /*
        This styles a link within a selected menu item `<li>`.
        */
    #menu .pure-menu-selected a {
        color: #fff;
    }

    /*
    This styles the menu heading.
    */
    #menu .pure-menu-heading {
        font-size: 110%;
        color: #fff;
        margin: 0;
        text-align: center;
    }

    /* -- Dynamic Button For Responsive Menu -------------------------------------*/

    /*
The button to open/close the Menu is custom-made and not part of Pure. Here's
how it works:
*/

    /*
`.menu-link` represents the responsive menu toggle that shows/hides on
small screens.
*/
    .menu-link {
        position: fixed;
        display: block;
        /* show this only on small screens */
        top: 0;
        left: 0;
        /* "#menu width" */
        background: #000;
        background: rgba(0, 0, 0, 0.7);
        font-size: 10px;
        /* change this value to increase/decrease button size */
        z-index: 10;
        width: 2em;
        height: auto;
        padding: 2.1em 1.6em;
    }

    .menu-link:hover,
    .menu-link:focus {
        background: #000;
    }

    .menu-link span {
        position: relative;
        display: block;
    }

    .menu-link span,
    .menu-link span:before,
    .menu-link span:after {
        background-color: #fff;
        width: 100%;
        height: 0.2em;
    }

    .menu-link span:before,
    .menu-link span:after {
        position: absolute;
        margin-top: -0.6em;
        content: " ";
    }

    .menu-link span:after {
        margin-top: 0.6em;
    }


    /* -- Responsive Styles (Media Queries) ------------------------------------- */
    /* For typical mobile devices */
    @media only screen and (min-width: 320px) and (max-width: 400px) {
        .content {
            padding: 0;
        }

        #menu {
            margin-left: -225px;
        }

        #layout.active #menu {
            left: 225px;
            width: 72%;
        }

        #layout.active .menu-link {
            /* left: 67%; */
        }

        .content {
            padding: 0 2em;
        }

        /* Float button */
        .float {
            position: fixed;
            width: 54px;
            height: 54px;
            bottom: 40px;
            right: 40px;
            background-color: #2ecc71;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
        }

        .hamburger .line {
            width: 50% !important;
            height: 2.7px !important;
            background-color: #ecf0f1;
            display: block;
            margin: 3.2px auto !important;
            -webkit-transition: all 0.3s ease-in-out;
            -o-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
        }


        .my-float {
            margin-top: 10px;
        }
    }

    /* HPKU */
    @media only screen and (min-width: 401px) and (max-width: 479px) {
        .content {
            padding: 0;
        }

        #menu {
            margin-left: -222px;
        }

        #layout.active #menu {
            left: 222px;
            width: 74%;
        }

        #layout.active .menu-link {
            /* left: 67%; */
        }

        .content {
            padding: 0 3em;
        }

        /* Float button */
        .float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #1cb841;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
        }

        .my-float {
            margin-top: 22px;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        #layout.active #menu {
            left: 222px;
            width: 60%;
        }

        #layout.active .menu-link {
            left: 60%;
        }

        #menu {
            margin-left: -222px;
        }

        /* Float button */
        .float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #1cb841;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
        }

        .my-float {
            margin-top: 22px;
        }

        .content {
            padding: 0 4em;
        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {
        #layout.active #menu {
            left: 222px;
            width: 40%;
        }

        #layout.active .menu-link {
            left: 40%;
        }

        #menu {
            margin-left: -222px;
        }

        .content {
            padding: 0 4em;
        }

        /* Float button */
        .float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #1cb841;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
        }

        .my-float {
            margin-top: 22px;
        }
    }

    /* For small desktop */
    @media only screen and (max-width: 1023px) {
        a.pure-menu-heading {
            cursor: none;
        }
    }

    @media only screen and (min-width: 980px) {
        .pure-menu-link {
            cursor: pointer;
        }
    }

    @media only screen and (min-width: 980px) and (max-width: 1023px) {
        #layout.active #menu {
            left: 222px;
            width: 30%;
        }

        #layout.active .menu-link {
            left: 30%;
        }

        #menu {
            margin-left: -222px;
        }

        /* Float button */
        .float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #1cb841;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
        }

        .my-float {
            margin-top: 22px;
        }
    }

    /* For typical desktop */
    @media only screen and (min-width: 1024px) and (max-width: 1199px) {
        #layout.active #menu {
            left: 222px;
            width: 30%;
        }

        #layout.active .menu-link {
            left: 30%;
        }

        #menu {
            margin-left: -222px;
        }

        /* Float button */
        .float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #1cb841;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            box-shadow: 2px 2px 3px #999;
        }

        .my-float {
            margin-top: 22px;
        }
    }

    /* For large desktop */
    @media only screen and (min-width: 1200px) {

        .header,
        .content {
            zoom: 0.97;
            padding-left: 2em;
            padding-right: 2em;
        }

        #layout {
            padding-left: 150px;
            left: 0;
        }

        #menu {
            zoom: 0.95;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            top: 100px;
            max-height: 44em;
            left: 170px;
        }

        .menu-link {
            position: fixed;
            left: 150px;
            display: none;
        }

        #layout.active .menu-link {
            left: 150px;
        }

        /* Float button */
        .float {
            display: none;
        }
    }

    /* laptop asusku */
    @media only screen and (min-width: 1300px) {
        #menu {
            left: 220px;
        }

        /* Float button */
        .float {
            display: none;
        }
    }

    /* For more large desktop 
    kayake scale laptop macku paling nggak
    */
    @media only screen and (min-width: 1540px) {
        .content {
            zoom: 1;
        }

        #menu {
            zoom: 1;
            left: 300px;
        }

        /* Float button */
        .float {
            display: none;
        }
    }

    /*
Hides the menu at `48em`, but modify this based on your app's needs.
ini kayake ipad
*/
    /* @media (min-width: 48em) { */
    @media (min-width: 70em) {}

    @media (max-width: 48em) {

        /* Only apply this when the window is small. Otherwise, the following
    case results in extra padding on the left:
        * Make the window small.
        * Tap the menu to trigger the active state.
        * Make the window large again.
    */
        #layout.active {
            position: relative;
            /* left: 150px; */
        }
    }

    .hamburger .line {
        width: 50%;
        height: 3px;
        background-color: #ecf0f1;
        display: block;
        margin: 6px auto;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    .hamburger:hover {
        cursor: pointer;
    }

    .ten {
        width: 83.06%;
    }

    #hamburger-10 {
        margin-top: 19px;
        -webkit-transition: all 0.3s ease-in-out;
        -o-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
    }

    #hamburger-10.active {
        -webkit-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    #hamburger-10.active .line:nth-child(1) {
        width: 30px
    }

    #hamburger-10.active .line:nth-child(2) {
        width: 40px
    }

    .float {
        z-index: 1000;
    }

    .common-link {
        text-decoration: underline;
        cursor: pointer;
    }

    textarea {
        resize: none;
        overflow: hidden;
        min-height: 50px;
        max-height: 100px;
    }
</style>