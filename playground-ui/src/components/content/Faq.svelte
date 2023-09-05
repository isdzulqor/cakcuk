<script>
    import DATA from "../../shared/data/data";
</script>

<div class="pure-g container ">
    <div class="pure-u-1 pure-u-md-1-1">
        <div class="sub-header">
            <br>
            <h4>- Frequently Asked Questions -</h4>
            <br>
        </div>
    </div>
    <div class="pure-u-1">
        <div class="tabs">
            {#each DATA.FAQ as faq, i}
                <div class="tab">
                    <input type="checkbox" class="tab-input" id="{faq.question}">
                    <label class="tab-label" for="chck1">{++i}.&nbsp;&nbsp;&nbsp;{faq.question}&nbsp;?</label>
                    <div class="tab-content">
                        <p><b>Answer:</b> {@html faq.answer}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .sub-header {
        text-align: center;
    }

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
        max-width: 850px;
        margin: 0 auto;
        box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.2);
    }

    .tab {
        width: 100%;
        color: white;
        overflow: hidden;
    }

    .tab-label {
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 1em;
        background: #405367;
        font-family: 'Lato', sans-serif;
    }

    .tab-content {
        color: #2c3e50;
        background: white;
        -webkit-transition: all .35s;
        transition: all .35s;
        max-height: 100vh;
        padding: 1em;
    }

    @media only screen and (max-width: 479px) {
        .container {
            padding-top: 1em !important;
            padding-bottom: 1em !important;
            padding-right: 2em !important;
            padding-left: 2em !important;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .container {
            padding-top: 1em !important;
            padding-bottom: 1em !important;
            padding-right: 2em !important;
            padding-left: 2em !important;
        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {
        .container {
            padding-top: 2em !important;
            padding-bottom: 2em !important;
            padding-right: 3em !important;
            padding-left: 3em !important;
        }
    }

    /* For small desktop */
    @media only screen and (min-width: 980px) and (max-width: 1023px) {
        .container {
            padding-top: 2.5em !important;
            padding-bottom: 2.5em !important;
            padding-right: 4em !important;
            padding-left: 4em !important;
        }
    }

    @media only screen and (min-width: 1024px) and (max-width: 1299px) {
        .container {
            padding-top: 2.5em !important;
            padding-bottom: 2.5em !important;
            padding-right: 4em !important;
            padding-left: 4em !important;
        }
    }

    /* laptop asusku */
    @media only screen and (min-width: 1300px) {}

    /* For more large desktop 
    kayake scale laptop macku paling nggak
    */
    @media only screen and (min-width: 1540px) {}

    .container {
        padding-top: 2em;
        padding-bottom: 2em;
        padding-right: 12em;
        padding-left: 12em;
        background-color: #f7f7f7;
    }
</style>