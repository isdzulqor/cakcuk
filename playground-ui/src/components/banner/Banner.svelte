<script>
	import "../../../node_modules/purecss/build/pure-min.css";
    import "../../../node_modules/purecss/build/grids-responsive-min.css";
    import Lazy from 'svelte-lazy';
</script>

<div class="splash-container">
    <div class="splash">
        <br>
        <h1>
            <Lazy fadeOption={null}>
                <img id="logo" alt="Cakcuk Logo" src="images/cakcuk_logo.png">
            </Lazy>
        </h1>

        <h2 class="splash-subhead" style="margin-top: -30px;">
            <br>
            "A Command Bot Interface builder, CLI-based to easily create your CLI commands for your Workspace"
            <br>
            • • • •
            <br>
        </h2>
        <div style="padding: 8px 40px 8px 40px; margin-top: 14px;">
            <span style="font-size: 130%;">
                Commands Simplified,
            </span>
        </div>
        <i>Clearer Response</i> <span style="font-size: 150%;">&</span> <span><b>Increase Productivity</b></span>
        <br>
        <span class="sub-title">
            <div class="pure-g" style="margin-top: 20px;">
                <div class="pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-2">
                    <p></p>
                    <a href="https://cakcuk.io/slack/add">
                        <Lazy fadeOption={null}>
                            <img class='btn-slack right' alt="Add to Slack" height="40" width="150"
                                src="images/btn-add-to-slack.svg" />
                        </Lazy>
                    </a>
                </div>
                <div class="pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-2">
                    <div class="btn-deploy left" style="margin-top: 27px;">
                        <b>
                            or
                        </b>
                        &nbsp;
                        <a href="#/docs/deploy" class="green-font">
                            Deploy Your Own
                        </a>
                    </div>
                </div>
            </div>


        </span>
    </div>
</div>

<style>
    .sub-title {
        font-family: 'Latto', sans-serif;
        font-weight: 400;
        font-size: 94%;
    }

    .green-font {
        color: #fff;
        background: #1cb841;
        padding: 11.3px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }

    .pure-button {
        background: rgb(28, 184, 65);
        /* this is a green */
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
    }

    .wave-img {
        position: absolute;
        width: 100%;
        height: auto;
        left: 0;
        bottom: 0px;
    }



    /* -- Responsive Styles (Media Queries) ------------------------------------- */
    /* For typical mobile devices */
    @media only screen and (min-width: 320px) and (max-width: 479px) {}

    @media only screen and (min-width: 414px) and (max-width: 737px) {}

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {}

    @media only screen and (min-width: 680px) {
        .splash-subhead {
            padding: 0 40px 0 40px !important;
        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {
        #logo {
            width: 65%;
        }

    }

    /* For small desktop */
    @media only screen and (min-width: 980px) and (max-width: 1023px) {
        #logo {
            width: 55%;
        }

    }

    /* For typical desktop */
    @media only screen and (min-width: 1040px) and (max-width: 1199px) {
        #logo {
            width: 45%;
        }
    }

    /* For large desktop */
    @media only screen and (min-width: 1200px) {
        #logo {
            width: 45%;
        }
    }

    /* laptop asusku */
    @media only screen and (min-width: 1300px) {
        .wave-img {
            height: 90px;
        }
    }

    .btn-slack.right {
        float: right;
        margin-right: 12px;
    }

    .btn-deploy.left {
        float: left;
        margin-left: -7px;
    }

    @media only screen and (min-width: 420px) {}

    @media only screen and (min-width: 1540px) {
        #logo {
            width: 30%;
        }
    }

    @media (min-width: 70em) {}

    @media (max-width: 48em) {
        #logo {
            width: 75%;
        }
    }


    /*
 * -- SPLASH STYLES --
 * This is the blue top section that appears on the page.
 */

    /* yellow #f1c40f */
    /* yellow-light #f6cc1f */
    /* yellow-dark #e4b809 */
    .splash-container {
        background: #f1c40f;
        overflow: hidden;
        position: relative !important;
        padding-top: 4em;
        padding-bottom: 3em;
    }

    .splash {
        /* absolute center .splash within .splash-container */
        width: 100%;
        height: auto;
        margin: 0 auto;
        position: relative;
        font-family: 'Overpass', sans-serif;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        background: #efc51d;
    }


    /* This is the main heading that appears on the blue section */
    .splash-head {
        font-size: 20px;
        font-weight: bold;
        color: white;
        border: 3px solid white;
        padding: 1em 1.6em;
        font-weight: 100;
        border-radius: 5px;
        line-height: 1em;
    }

    /* This is the subheading that appears on the blue section */
    .splash-subhead {
        color: #302807;
        letter-spacing: 0.05em;
        padding: 0 20px 0 20px;
        opacity: 0.8;
        max-width: 900px;
        margin: 0 auto;
        font-family: 'Cabin', sans-serif;
    }

    a {
        font-weight: normal;
        text-decoration: none;
    }
</style>