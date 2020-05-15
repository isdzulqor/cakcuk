<script>
    import "../../../node_modules/purecss/build/grids-responsive-min.css";
    import PlayEditor from '../shared/PlayEditor.svelte'
    import DATA from "../../shared/data/data";
</script>

<div class="bg">
    <div class="pure-g">
        <div class="pure-u-1 pure-u-md-1-1">
            <div class="sub-header">
                <br>
                <br>
                <h4>- Play around with Cakcuk -</h4>
            </div>
        </div>
        <span id="editor"></span>
        <PlayEditor examples={DATA.SNIPPET_EXAMPLES}></PlayEditor>
    </div>
</div>

<style>
    .sub-header {
        color: #ffffff;
        font-family: 'Lato', sans-serif;
    }


    @media only screen and (max-width: 767px) {
        .panel {
            height: 320px !important;
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

    /* For more large desktop 
    */
    @media only screen and (min-width: 1540px) {}

    body {
        font-family: 'Lato', sans-serif;
        padding: 0;
        margin: 0;
    }

    .header {
        background-color: #EEEEEE;
        /* padding: 5px; */
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
        height: 400px;
        font-size: 80%;
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

    /**
 * 1. Adjust this to size
 */

    .switch {
        display: inline-block;
        font-size: 20px;
        /* 1 */
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

    @media only screen and (min-width: 1300px) {
        .container {
            padding-top: 2em;
        }
    }

    /* For more large desktop 
    */
    @media only screen and (min-width: 1540px) {
        .container {
            padding-top: 2em;
        }
    }

    .container {
        max-width: 1040px;
        margin: 0 auto;
    }

    .center {
        justify-content: center;
    }

    h3 {
        font-family: 'Cabin', sans-serif;
    }

    .sub-header {
        color: #fff;
    }

    .sub-header-small {
        text-align: center;
    }

    .bg {
        background-color: #34495e;
    }

    .line-special {}

    .padding-side {
        padding-right: 2em;
        padding-left: 2em;
    }

    .padding-bottom {
        padding-bottom: 3em;
    }

    .sub-tab {
        font-family: 'Lato', sans-serif;
        font-size: 94%;
    }
</style>