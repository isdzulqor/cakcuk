<script>
    import marked from 'marked'
    import "../../../node_modules/purecss/build/grids-responsive-min.css";
    import { createEventDispatcher } from 'svelte'
    import Modal from './Modal.svelte'
    import { scrollInto, jsonPretty, getTeamID, uuidV4 } from "../../shared/helper/helper";

    export let examples = []

    export let editorCommandView, editorResultView;
    export let editorCommandArea = "";
    export let editorCommandCommand = "";
    export let editorCommandPreview = "No preview";
    export let editorCommandRequest = "No request";

    export let editorResultResult = "No result";
    export let editorResultResponse = "No response";

    export let editorType = ""
    export let tabChecked = ""
    export let background = ""

    let editorID = uuidV4()
    let modalType = ""
    let modalAlign = "center"
    let showModal = false
    let modalHeader, modalContent;

    let checkedEditorValue = false;

    let editorCommandAreaDisabled = false;
    let editorResultArea = "No result";
    let editorActive = ""
    let isHiddenCommandEditor = ""
    let isHiddenResultEditor = ""
    let textColor

    setEditorCommandActive()

    function switchEditor(event) {
        if (editorActive == "command") {
            checkedEditorValue = true
            setEditorResultActive()
            setEditor("command", "command")
            return
        }
        if (editorActive == "result") {
            checkedEditorValue = false
            setEditorCommandActive()
            setEditor("result", "result")
            return
        }
    }

    $: {
        if (editorCommandArea != editorCommandPreview && editorCommandArea != editorCommandRequest) {
            editorCommandCommand = editorCommandArea
        }
        if (background == "white") {
            textColor = "text-grey"
        }
    }

    export function setEditor(view, subview, value) {
        switch (view) {
            case "command":
                editorCommandView = subview
                switch (subview) {
                    case "command":
                        editorCommandAreaDisabled = false;
                        editorCommandCommand = value ? value : editorCommandCommand
                        editorCommandArea = editorCommandCommand
                        break;
                    case "preview":
                        editorCommandAreaDisabled = true
                        editorCommandPreview = value ? value : editorCommandPreview
                        editorCommandArea = editorCommandPreview
                        break;
                    case "request":
                        editorCommandAreaDisabled = true
                        editorCommandRequest = value ? value : editorCommandRequest
                        editorCommandArea = editorCommandRequest
                        break;
                }
                break;
            case "result":
                editorResultView = subview
                switch (subview) {
                    case "result":
                        editorResultResult = value ? value : editorResultResult
                        editorResultArea = editorResultResult
                        break;
                    case "response":
                        editorResultResponse = value ? value : editorResultResponse
                        editorResultArea = editorResultResponse
                        break;
                }
                break;
        }
    }

    function setEditorView(event) {
        event.preventDefault()
        setEditor("command", editorCommandView)
        setEditor("result", editorResultView)
    }

    function setEditorResultActive() {
        editorActive = "result"
        isHiddenCommandEditor = "hidden-phone"
        isHiddenResultEditor = ""
    }

    function setEditorCommandActive() {
        editorActive = "command"
        isHiddenResultEditor = "hidden-phone"
        isHiddenCommandEditor = ""
        editorCommandView = "command"
        editorResultView = "result"
    }

    export function applyInputCommand(inputCommand) {
        if (editorActive != "command") {
            switchEditor()
        }
        editorToDefault()
        setEditor("result", "result")
        setEditor("command", "command", inputCommand)
    }

    async function clickRun(event) {
        if (editorCommandCommand == "") {
            showAlertModal("Place your command first!")
            return
        }
        setLoading()
        setEditor("result", "result")
        if (editorActive != "result") {
            switchEditor()
        }
        let res;
        const inputMessage = editorCommandCommand
        try {
            res = await fetchPlay(getTeamID(), inputMessage)
        } catch (e) {
            editorToDefault()
            editorResultResult = e
            setEditor("result", "result")
            return
        }

        editorCommandPreview = res.data.executedCommand &&
            res.data.executedCommand != "" ? res.data.executedCommand : "No preview"
        editorCommandRequest = res.data.rawRequest &&
            res.data.rawRequest != "" ? res.data.rawRequest : "No request"
        editorResultResult = res.data.result && res.data.result != "" ? res.data.result : "No result"
        editorResultResponse = res.data.rawResponse && res.data.rawResponse != "" ? jsonPretty(res.data.rawResponse) : "No response"
        setEditor("command", "command", inputMessage)
        setEditor("result", "result")
    }

    function editorToDefault() {
        editorCommandPreview = "No preview"
        editorCommandRequest = "No request"
        editorResultResult = "No result"
        editorResultResponse = "No response"
    }

    function dummyRequest(id, input) {
        return {
            input: input,
            executedCommand: "executed dummy " + input,
            rawRequest: "rawRequest dummy " + input,
            result: "result dummy " + input,
            rawResponse: "rawResponse dummy " + input,
        }
    }

    function showAlertModal(content) {
        modalType = "alert"
        modalAlign = "center"
        showModal = true
        modalHeader = "Alert"
        modalContent = content
    }

    async function fetchPlay(id, message) {
        var url = new URL('/api/play', location)
        var params = { id: id, message: message }
        url.search = new URLSearchParams(params).toString();
        const res = await fetch(url, {
            headers: {
                'Accept-Encoding': 'gzip, deflate, br'
            }
        });
        const json = await res.json();
        if (json.error && json.error.message) {
            throw new Error(json.error.message)
        }
        return json
    }

    function setLoading() {
        editorCommandPreview = "loading..."
        editorCommandRequest = "loading..."
        editorResultResult = "loading..."
        editorResultResponse = "loading..."
    }

    function clickApply(event) {
        applyInputCommand(event.target.getAttribute('text'))
    }

    function clickInfo(event) {
        modalType = "info"
        modalAlign = "left"
        showModal = true
        modalHeader = event.target.getAttribute("title");
        modalContent = event.target.getAttribute("text");
    }

    function scroll(event) {
        scrollInto(event, 66)
    }
</script>

<div class="pure-g container">
    <div class="pure-u-1">
        {#if showModal}
            <Modal modalType={modalType} modalAlign={modalAlign} on:close="{() => showModal = false}">
                <div slot="header">
                    {modalHeader}
                </div>
                {@html marked(modalContent)}
            </Modal>
        {/if}
    </div>
    <div class="pure-u-1">
        <div id="{editorID}" class="play-panel padding-side {editorType}">
            <div class="pure-g">
                <div id="command-view" class="pure-u-1 pure-u-md-1-2 {isHiddenCommandEditor}">
                    <div>
                        <div class="header" style="float: left;">
                            <a class="toggleButton {editorType}" class:active="{editorCommandView === 'command'}"
                                on:click="{() => editorCommandView = 'command'}" on:click={setEditorView}>
                                Command
                            </a>
                            <a class="toggleButton {editorType}" class:active="{editorCommandView === 'preview'}"
                                on:click="{() => editorCommandView = 'preview'}" on:click={setEditorView}>
                                Preview
                            </a>
                            <a class="toggleButton {editorType}" class:active="{editorCommandView === 'request'}"
                                on:click="{() => editorCommandView = 'request'}" on:click={setEditorView}>
                                Request
                            </a>
                            <div class="toggleButton {editorType} run-button hidden-phone" on:click={clickRun}>
                                Run
                            </div>
                        </div>
                        <textarea class="panel {editorType}" placeholder="Place your command here.." disabled={editorCommandAreaDisabled}
                            bind:value={editorCommandArea}></textarea>
                    </div>
                </div>
                <div class="pure-u-1 pure-u-md-1-2 {isHiddenResultEditor}">
                    <div>
                        <div class="header" style="float: left;">
                            <div class="toggleButton {editorType}" class:active="{editorResultView === 'result'}"
                                on:click="{() => editorResultView = 'result'}" on:click={setEditorView}>
                                Result
                            </div>
                            <div class="toggleButton {editorType}" class:active="{editorResultView === 'response'}"
                                on:click="{() => editorResultView = 'response'}" on:click={setEditorView}>
                                Response
                            </div>
                        </div>
                        <textarea class="panel {editorType}" placeholder="Command result.." bind:value={editorResultArea} disabled 
                            ></textarea>
                    </div>
                </div>
                <div class="pure-u-1 pure-u-md-1-1 only-phone {background} text-center" style="margin-bottom: 6px;">
                    <span class="switch-text {background} {editorType}">Command</span>
                    <label class="switch">
                        <input type="checkbox" on:click={switchEditor} bind:checked={checkedEditorValue} />
                        <div></div>
                    </label>
                    <span class="switch-text {background} {editorType}">Result</span>
                    <div class="toggleButton {editorType} run-button bottom" on:click={clickRun}>
                        Run
                    </div>
                </div>
            </div>
        </div>
    </div>
    {#if examples.length > 0}
    <div class="pure-u-1 pure-u-md-1-1 padding-side padding-bottom">
        <h4 class="sub-header {textColor} {editorType}">- Snippet Examples -</h4>
        <br>
        <div class="tabs {editorType}">
            {#each examples as list}
                <div class="tab">
                    <input type="checkbox" id="{list.key}" class="tab-input">
                    <label class="tab-label {editorType} {tabChecked}" for="{list.key}">{list.key}</label>
                    {#each list.examples as example}
                        <div class="tab-content {tabChecked}">
                            <span class="sub-tab">
                                {example.title}
                            </span>
                            <span class="sub-button">
                                <button class="button-xsmall pure-button button-success" title={example.title} text={example.syntaxt}
                                    goTo="{editorID}" on:click="{scroll}" on:click="{clickApply}">Apply</button>
                                <button class="button-xsmall pure-button button-warning" title={example.title} text={example.info}
                                    on:click="{clickInfo}">Info</button>
                            </span>
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
    <br>
    <br>
    {/if}
</div>

<style>
    .sub-header {
        color: #ffffff;
        font-family: 'Lato', sans-serif;
        text-align: center;
    }


    @media only screen and (max-width: 767px) {
        .panel {
            height: 320px !important;
        }
        .panel.medium {
            height: 250px !important;
        }
    }

    @media only screen and (min-width: 320px) and (max-width: 479px) {
        .hidden-phone {
            display: none;
        }

        .only-phone {
            visibility: visible !important;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .hidden-phone {
            display: none;
        }

        .only-phone {
            visibility: visible !important;

        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {
        .hidden-tablet {
            display: none;
        }

    }

    .only-phone {
        visibility: hidden;
    }

    @media only screen and (min-width: 1300px) {}

    /* For large desktop */
    @media only screen and (min-width: 1540px) {
        .play-panel{
            width: 1300px;
        }
        .play-panel.medium{
            width: 94% !important;
        }
    }

    .play-panel{
        margin: 0 auto;
    }

    body {
        font-family: 'Lato', sans-serif;
        padding: 0;
        margin: 0;
    }

    .header {
        background-color: #EEEEEE;
        min-height: 35px;
        width: 100%;
        padding-top: 2px;
        padding-bottom: 2px;
    }

    .run-button {
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        box-shadow: 1px 1.5px 2px 0.5px rgba(0, 0, 0, .15);
        padding-right: 12px !important;
        padding-left: 12px !important;
        color: #ffffff !important;
        float: right !important;
        background-color: #1cb841 !important;
    }
    
    .run-button.bottom{
        margin-right: 0 !important;
    }

    .run-button:hover {
        background-color: #098c28 !important;
    }

    .toggleButton {
        font-family: 'Lato', sans-serif;
        float: left;
        padding: 6px;
        margin: 2px;
        margin-right: 5px;
        margin-left: 5px;
        font-size: 90%;
        cursor: pointer;
    }

    .line {
        width: 100%;
        margin-top: 3px;
        height: 2px;
        background: #f1c40f;
    }

    .active {
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        background-color: #676778;
        color: #ffffff;
    }

    .highlightedButton {
        background-color: grey;
    }

    textarea {
        resize: none;
    }

    .panel {
        float: left;
        width: 100%;
        height: 510px;
        font-size: 90%;
        font-family: 'Consolas', sans-serif;
        border: 0.75px solid #ccc;
        line-height: 1.3;
    }

    .panel.medium {
        height: 250px;
        font-size: 90%;
    }

    iframe {
        border: none;
    }

    .hidden {
        display: none;
    }

    .switch input {
        position: absolute;
        opacity: 0;
    }

    .switch {
        display: inline-block;
        font-size: 20px;
        height: 1em;
        width: 2em;
        background: #BDB9A6;
        border-radius: 1em;
        margin-top: 1px;
    }

    .only-phone {
        visibility: hidden;
    }

    .switch div {
        height: 1.1em;
        width: 1.1em;
        border-radius: 1em;
        background: #FFF;
        box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
        -webkit-transition: all 1ms;
        -moz-transition: all 1ms;
        transition: all 1ms;
    }

    .switch input:checked+div {
        -webkit-transform: translate3d(100%, 0, 0);
        -moz-transform: translate3d(100%, 0, 0);
        transform: translate3d(100%, 0, 0);
    }

    .switch-text {
        color: #ffffff;
        padding: 0.5em;
    }


    @media only screen and (min-width: 320px) and (max-width: 479px) {
        .container {
            padding-top: 1em;
            padding-bottom: 1em;
            padding-right: 0.5em;
            padding-left: 0.5em;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (max-width: 767px) {
        .padding-side.medium {
            padding-right: 0.4em !important;
            padding-left: 0.4em !important;
        }
        .padding-side {
            padding-right: 1em !important;
            padding-left: 1em !important;
        }
    }
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .container {
            padding-top: 1em;
            padding-bottom: 1em;
            padding-right: 1em;
            padding-left: 1em;
        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {
        .container {
            padding-top: 1.5em;
            padding-bottom: 1.5em;
        }
    }

    /* For small desktop */
    @media only screen and (min-width: 980px) and (max-width: 1023px) {
        .container {
            padding-top: 1.5em;
            padding-bottom: 1.5em;
        }
    }

    @media only screen and (min-width: 1024px) and (max-width: 1299px) {
        .container {
            padding-top: 1.5em;
            padding-bottom: 1.5em;
        }
    }

    /* laptop asusku */
    @media only screen and (min-width: 1300px) {
        .container {
            padding-top: 2em;
        }
    }

    /* For large desktop */
    @media only screen and (min-width: 1540px) {
        .container {
            padding-top: 2em;
        }
    }

    .container {
        margin: 0 auto;
    }

    .center {
        justify-content: center;
    }

    .line-special {}

    .padding-side {
        padding-right: 1.2em;
        padding-left: 1.2em;
    }

    .toggleButton.medium{
        font-size: 80% !important;
        padding: 3px 8px !important;
    }

    .toggleButton.active,
    .toggleButton:hover {
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
        background-color: #676778;
        color: #ffffff;
    }
    .white{
        color: #676778;
    }
    .medium{
        font-size: 90%;
    }
    .text-center{
        text-align: center;
    }
    
    .panel[disabled]{
        color: #272323;
        background-color: #fff;
    }


    /* TAB */
    input.tab-input {
        position: absolute;
        opacity: 0;
        z-index: -1;
    }

    .row {
        display: -webkit-box;
        display: flex;
    }

    .row .col {
        -webkit-box-flex: 1;
        flex: 1;
    }

    .row .col:last-child {
        margin-left: 1em;
    }

    /* Accordion styles */
    .tabs {
        border-radius: 4px;
        overflow: hidden;
        max-width: 600px;
        margin: 0 auto;
        box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.2);
    }

    .tab {
        width: 100%;
        overflow: hidden;
    }

    .tab-label.checked {
        pointer-events: none;
    }

    .tab-label.medium {
        line-height: 1.3em;
    }
    .tab-label {
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 1em;
        background: #ecf0f1;
        font-family: 'Lato', sans-serif;
        cursor: pointer;
    }

    .tab-label:hover {
        background: #bdc3c7;
    }

    .tab-label::after {
        content: "\276F";
        width: 1em;
        height: 1em;
        text-align: center;
        -webkit-transition: all .35s;
        transition: all .35s;
    }

    .tab-content.checked {
        max-height: 100vh;
        padding: 0.7em 0.7em 0.7em 1em;
    }

    .tab-content {
        max-height: 0;
        padding: 0 1em;
        color: #2c3e50;
        text-align: left;
        position: relative;
        background: white;
        -webkit-transition: all .35s;
        transition: all .35s;
    }

    .tab-close {
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: end;
        justify-content: flex-end;
        padding: 1em;
        font-size: 0.75em;
        background: #2c3e50;
        cursor: pointer;
    }

    .tab-close:hover {
        background: #1a252f;
    }

    input:checked+.tab-label {
        background: #bdc3c7;
    }

    input:checked+.tab-label::after {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    input:checked~.tab-content {
        max-height: 100vh;
        padding: 0.7em 0.7em 0.7em 1em;
    }

    .button-xsmall {
        font-size: 70%;
    }
    .button-xsmall.medium {
        font-size: 80%;
    }

    .button-success {
        background: rgb(28, 184, 65);
    }

    .button-error {
        background: rgb(202, 60, 60);
    }

    .button-warning {
        background: rgb(223, 117, 20);
    }

    .button-secondary {
        background: rgb(66, 184, 221);
    }

    .button-success,
    .button-error,
    .button-warning,
    .button-secondary {
        color: white;
        border-radius: 4px;
        text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    }

    .sub-button {
        position: absolute;
        right: 0;
        margin-right: 10px;
    }

    .text-grey {
        color: #2c3e50;
    }
    .sub-tab {
        font-size: 90%;
    }
    .sub-tab.medium {
        font-size: 100%;
    }
</style>