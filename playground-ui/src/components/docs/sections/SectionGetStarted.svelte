<script>
    import CodeWrap from "../../shared/CodeWrap.svelte";
    import Lazy from "svelte-lazy";

    export let getRunWay;
    export let scroll;
    export let clickMain;
</script>

<div class="main" id="getStarted" on:click={clickMain}>
    <div class="header">
        <h1>Get Started</h1>
        <h3>Easy Ways to Get Started with Cakcuk</h3>
    </div>
    <div class="line"></div>
    <div class="content">
        <p>
            You can start using <a href="#">Cakcuk</a> by adding
            <a href="#">Cakcuk</a>
            to your workspace directly.
            <br />
            <br />
            <a href="https://cakcuk.io/slack/add">
                <Lazy fadeOption={null}>
                    <img
                        alt="Add to Slack"
                        height="40"
                        width="150"
                        src="images/btn-add-to-slack.svg"
                    />
                </Lazy>
            </a>
        </p>

        <h2 id="deploy" class="content-subhead">Provision your own Cakcuk</h2>
        <p>
            To get started deploying <a href="#">Cakcuk</a> by yourself, make
            sure you have created the slack app first to get the Slack app
            token. You can go to
            <a target="_blank" href="https://api.slack.com/apps">Slack Apps</a>
            and create one if you haven't created your slack app. You also need
            to keep the verification token as well. It works for validation of
            each request from Slack. Put those both tokens on your Cakcuk env
            just like in
            <a class="common-link" goTo="waysToRun" on:click={scroll}
                >this section</a
            >.
        </p>
        <p>
            When you use <a
                href="https://api.slack.com/events-api"
                target="_blank">Slack Event API</a
            >, you also need to set events for those you subscribe to. There are
            three events that you need to submit.
        </p>
        <ul>
            <li>
                <a
                    href="https://api.slack.com/events/app_home_opened"
                    target="_blank">app_home_opened</a
                >
            </li>
            <li>
                <a
                    href="https://api.slack.com/events/app_mention"
                    target="_blank">app_mention</a
                >
            </li>
            <li>
                <a
                    href="https://api.slack.com/events/message.im"
                    target="_blank">message.im</a
                >
            </li>
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
        <p>
            More explanations about <a
                target="_blank"
                href="https://api.slack.com/scopes">Slack Scopes</a
            >
            you can check here
            <a target="_blank" href="https://api.slack.com/scopes"
                >https://api.slack.com/scopes</a
            >.
        </p>
        <h3 id="waysToRun" class="content-subhead">
            Some ways to run Cakcuk by yourself
        </h3>
        <ul>
            <li>
                <h4 class="content-subhead-bold">
                    Cakcuk with <a
                        href="https://api.slack.com/events-api"
                        target="_blank">Slack Event API</a
                    > TLS disabled
                </h4>
                <CodeWrap>{getRunWay("event-tls-disabled")}</CodeWrap>
            </li>
            <p>
                TLS disabled doesn't mean you cannot use HTTPS for your Cakcuk.
                It gives you an option if you want to deploy it with TLS handled
                by load balancer or the others, for example, Nginx. So it
                doesn't need to be handled on the application level.
            </p>
            <li>
                <h4 class="content-subhead-bold">
                    Cakcuk with <a
                        href="https://api.slack.com/events-api"
                        target="_blank">Slack Event API</a
                    > TLS Enabled
                </h4>
                <CodeWrap>{getRunWay("event-tls-enabled")}</CodeWrap>
            </li>
            <p>
                If you use TLS enabled. You need to provide public domains that
                you need to set for PUBLIC_DOMAINS env. It accepts multiple
                domains separated by comma. Cakcuk uses <a
                    href="https://letsencrypt.org"
                    target="_blank">Let's Encrypt</a
                > to handle TLS.
            </p>
            <li>
                <h4 class="content-subhead-bold">
                    Cakcuk with <a
                        href="https://api.slack.com/rtm"
                        target="_blank">Slack RTM API</a
                    > TLS disabled
                </h4>
                <CodeWrap>{getRunWay("rtm-tls-disabled")}</CodeWrap>
            </li>
            <li>
                <h4 class="content-subhead-bold">
                    Cakcuk with <a
                        href="https://api.slack.com/rtm"
                        target="_blank">Slack RTM API</a
                    > TLS Enabled
                </h4>
                <CodeWrap>{getRunWay("rtm-tls-enabled")}</CodeWrap>
            </li>
            <h3 class="content-subhead">
                A Bit Differences between Slack Event API & Slack RTM API
            </h3>
            <ul>
                <li>
                    <a href="https://api.slack.com/rtm" target="_blank"
                        >Slack RTM API</a
                    > doesn't need to expose a public endpoint. Thus it's easier
                    to integrate with your private cluster if you have.
                </li>
                <li>
                    <a href="https://api.slack.com/events-api" target="_blank"
                        >Slack Event API</a
                    > needs to has a public endpoint and register it to Slack to
                    be challenged.
                </li>
                <br />
                <li>
                    <a href="https://api.slack.com/rtm" target="_blank"
                        >Slack RTM API</a
                    > uses WebSocket, so it's realtime and lower latency.
                </li>
                <li>
                    <a href="https://api.slack.com/events-api" target="_blank"
                        >Slack Event API</a
                    > uses HTTPS webhook, it must have higher latency mostly.
                </li>
                <br />
                <li>
                    <a href="https://api.slack.com/rtm" target="_blank"
                        >Slack RTM API</a
                    > uses higher resource, CPU, memory & bandwidth. WebSocket costs
                    this.
                </li>
                <li>
                    <a href="https://api.slack.com/events-api" target="_blank"
                        >Slack Event API</a
                    > uses HTTPS webhook, it eats lower resources.
                </li>
                <br />
                <li>
                    <a href="https://api.slack.com/rtm" target="_blank"
                        >Slack RTM API</a
                    >
                    needs to expose many scopes/permissions, <code>bot</code>
                    Slack scope. It has multiple scopes/permissions aggregated
                    in <code>bot</code> Slack scope. That's why RTM API will consume
                    events that you don't need them as well.
                </li>
                <li>
                    <a href="https://api.slack.com/events-api" target="_blank"
                        >Slack Event API</a
                    > can just use Slack scopes/permission as needed.
                </li>
            </ul>
            <p>
                More about it <a
                    href="https://api.slack.com/events-api"
                    target="_blank">https://api.slack.com/events-api</a
                >
                and
                <a href="https://api.slack.com/rtm" target="_blank"
                    >https://api.slack.com/rtm</a
                >
            </p>
            <li>
                <h4 class="content-subhead-bold">
                    Simply use <a
                        href="https://github.com/isdzulqor/cakcuk/blob/master/docker-compose.yaml"
                        target="_blank">docker-compose.yaml</a
                    >
                </h4>
                <CodeWrap>{getRunWay("docker-compose")}</CodeWrap>
            </li>
            <p>
                Make sure you overwrite the environment variables values as you
                need. Please see the configurations explanations above, either
                you use <a
                    href="https://api.slack.com/events-api"
                    target="_blank">Event API</a
                >
                or
                <a href="https://api.slack.com/rtm" target="_blank">RTM API</a>,
                with TLS disabled or enabled.
            </p>
            <li>
                <h4 class="content-subhead-bold">
                    Clone the <a
                        href="https://github.com/isdzulqor/cakcuk"
                        target="_blank">Source on Github</a
                    >
                </h4>
            </li>
        </ul>
        <br />
        <h3 class="content-subhead">Some Environment Variables Explanation</h3>
        <ul>
            <li>PORT</li>
            <p>
                By default, Cakcuk with TLS disabled is using port 80. You can
                change it as you want by overwriting the PORT env. Keep in mind,
                it's only for TLS disabled. If you provision your Cakcuk with
                TLS enabled. It will use port 80 and 443 for sure.
            </p>
            <li>LOG_LEVEL</li>
            <p>
                By default LOG_LEVEL value is <code>info</code>. It means that
                logs only print Info, Warn, Error, Fatal, and Panic those are
                printed on logs. There are 5 types of LOG_LEVEL debug, info,
                warn, error, fatal, and panic. If you want to print all the logs
                although is for debugging only. You can overwrite LOG_LEVEL env
                with <code>debug</code> value.
            </p>
            <li>ENCRYPTION_PASSWORD</li>
            <p>
                If you have checked special prefix functionality for <code
                    >encrypt=</code
                >
                and encrypted option in your
                <a class="common-link" goTo="customCommand" on:click={scroll}
                    >Custom Commands</a
                >. This ENCRYPTION_PASSWORD value is the encryption key for the
                encryption value. For authentication feature, it also uses this
                encryption key. Just make sure you customize this
                ENCRYPTION_PASSWORD env value to keep your sensitive value
                secured.
            </p>
            <li>SUPER_USER_MODE_ENABLED</li>
            <p>
                SUPER_USER_MODE_ENABLED is true, means enabled by default. It
                can be disabled by setting the value to be false. If you play
                the commands on the Playground. You will automatically have
                access to <a
                    class="common-link"
                    goTo="suCommand"
                    on:click={scroll}>Superuser</a
                >. Just play with
                <a class="common-link" goTo="suCommand" on:click={scroll}>SU</a>
                command, examples are provided with an explanation on the info section.
            </p>
        </ul>
        <br />
    </div>
</div>
