<script>
    import "../../../node_modules/purecss/build/pure-min.css";
    import "../../../node_modules/purecss/build/menus-min.css";
    import "../../../node_modules/purecss/build/menus-core.css";
    import "../../../node_modules/purecss/build/menus.css";
    import "./docs.css";

    import PlayEditor from "../shared/PlayEditor.svelte";
    import CodeWrap from "../shared/CodeWrap.svelte";
    import Searchbar from "../navbar/Searchbar.svelte";
    import DATA from "../../shared/data/data";
    import { scrollInto } from "../../shared/helper/helper";
    import { onMount } from "svelte";
    import Lazy from "svelte-lazy";

    import { location, querystring } from "svelte-spa-router";

    import SectionGetStarted from "./sections/SectionGetStarted.svelte";
    import SectionDefaultCommands from "./sections/SectionDefaultCommands.svelte";
    import SectionCustomCommand from "./sections/SectionCustomCommand.svelte";
    import SectionDefaultOptions from "./sections/SectionDefaultOptions.svelte";
    import SectionTipsTrick from "./sections/SectionTipsTrick.svelte";

    let activeToogle = "";

    function clickToogle(event) {
        if (activeToogle == "") {
            activeToogle = "active";
            return;
        }
        activeToogle = "";
    }
    function clickMain(event) {
        if (activeToogle == "active") {
            clickToogle(event);
        }
    }

    function scroll(event) {
        scrollInto(event, 22);
        clickMain(event);
    }

    function getExample(...keys) {
        let filteredExamples = DATA.SNIPPET_EXAMPLES.filter(function (item) {
            for (let i = 0; i < keys.length; i++) {
                if (item.key == keys[i]) return true;
            }
            return false;
        });
        return filteredExamples;
    }

    function getRunWay(key) {
        let filteredExamples = DATA.RUN_WAYS.filter(function (item) {
            if (item.key == key) return true;
            return false;
        });
        if (filteredExamples.length > 0) {
            return filteredExamples[0].code;
        }
        return "";
    }

    function getHelpExample(key) {
        let filteredExamples = DATA.HELP_EXAMPLES.filter(function (item) {
            if (item.key == key) return true;
            return false;
        });
        if (filteredExamples.length <= 0) {
            return;
        }
        return filteredExamples[0].command;
    }

    function autoGrow(element) {
        element.style.height = "5px";
        element.style.height = element.scrollHeight + "px";
    }

    const watch = location.subscribe((value) => {
        value = value.split("/docs/").join("");
        if (value == "/" || value == "/docs") {
            window.scrollTo(0, 0);
            return;
        }
        try {
            onMount(() => {
                scrollInto(null, 22, value, "auto");
            });
        } catch (e) {}
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
                    <img
                        id="logo"
                        alt="Cakcuk Logo"
                        src="images/cakcuk_logo.png"
                    />
                </Lazy>
            </a>
            <ul class="pure-menu-list">
                <li class="pure-menu-item">
                    <a
                        goTo="getStarted"
                        on:click={scroll}
                        class="pure-menu-link">•&nbsp;&nbsp;&nbsp;Get Started</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="defaultCommands"
                        on:click={scroll}
                        class="pure-menu-link"
                        >•&nbsp;&nbsp;&nbsp;Default Commands</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="helpCommand"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;Help</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="cukCommand"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;Cuk</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="cakCommand"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;Cak</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="delCommand"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;Del</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="scopeCommand"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;Scope - ACL</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="suCommand"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;SU - Superuser</a
                    >
                </li>
                <li class="pure-menu-item menu-item-divided">
                    <a
                        goTo="customCommand"
                        on:click={scroll}
                        class="pure-menu-link"
                        >•&nbsp;&nbsp;&nbsp;Custom Command</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="defaultOptions"
                        on:click={scroll}
                        class="pure-menu-link"
                        >•&nbsp;&nbsp;&nbsp;Default Options</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="outputFileOption"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;--outputFile</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="filterOption"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;--filter</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="printOptions"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;--printOptions</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="noResponseOption"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;--noResponse</a
                    >
                </li>
                <li class="pure-menu-item">
                    <a
                        goTo="noParseOption"
                        on:click={scroll}
                        class="pure-menu-link menu-child"
                        >•&nbsp;&nbsp;&nbsp;--noParse</a
                    >
                </li>

                <li class="pure-menu-item">
                    <a goTo="tipsTrick" on:click={scroll} class="pure-menu-link"
                        >•&nbsp;&nbsp;&nbsp;Tips & Trick</a
                    >
                </li>
            </ul>
        </div>
    </div>

    <SectionGetStarted {getRunWay} {scroll} {clickMain} />
    <SectionDefaultCommands {getExample} {getHelpExample} {getRunWay} {scroll} {clickMain} />
    <SectionCustomCommand {getExample} {getHelpExample} {getRunWay} {scroll} {clickMain} /> 
    <SectionDefaultOptions {getExample} {getHelpExample} {getRunWay} {scroll} {clickMain} /> 
    <SectionTipsTrick {clickMain} /> 
    <br />
    <br />
    <br />
    <br />
</div>
