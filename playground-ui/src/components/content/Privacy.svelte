<script>
    import "../../../node_modules/purecss/build/pure-min.css";
    import "../../../node_modules/purecss/build/grids-responsive-min.css";

    import marked from 'marked'
    import DATA from "../../shared/data/data";    
</script>

<div class="pure-g container ">
    <div class="pure-u-1 pure-u-md-1-1">
        <div class="sub-header">
            <br>
            <h4>- Privacy Policy -</h4>
        </div>
    </div>
    <div class="pure-u-1 pure-u-md-1-1">
        <div class="card center">
            <div class="privacy-content">
                {@html marked(DATA.PRIVACY_POLICY)}
            </div>
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
            padding-right: 1em !important;
            padding-left: 1em !important;
        }
        .card{
            padding: 15px !important; 
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .container {
            padding-top: 1em !important;
            padding-bottom: 1em !important;
            padding-right: 1em !important;
            padding-left: 1em !important;
        }

        .card{
            padding: 15px !important; 
        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {
        .container {
            padding-top: 2em !important;
            padding-bottom: 2em !important;
            padding-right: 1.5em !important;
            padding-left: 1.5em !important;
        }
        .card{
            padding: 20px !important; 
        }
    }

    /* For small desktop */
    @media only screen and (min-width: 980px) and (max-width: 1023px) {
        .container {
            padding-top: 2.5em !important;
            padding-bottom: 2.5em !important;
            padding-right: 2.5em !important;
            padding-left: 2.5em !important;
        }
    }

    @media only screen and (min-width: 1024px) and (max-width: 1299px) {
        .container {
            padding-top: 2.5em !important;
            padding-bottom: 2.5em !important;
            padding-right: 2.5em !important;
            padding-left: 2.5em !important;
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

    .privacy-content {
        max-width: 720px;
        margin: 0 auto;
    }

    .card {
        padding: 30px;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        display: inline-block;
        box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, .15);
        position: relative;
        margin-bottom: 30px;
        transition: all .2s ease-in-out;
        font-family: 'Lato', sans-serif;
    }

    .card.center {
        top: 50%;
        left: 50%;
        -moz-transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);
    }
</style>