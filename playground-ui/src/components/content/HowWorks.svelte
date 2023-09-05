<script>
	import "../../../node_modules/purecss/build/pure-min.css";
    import "../../../node_modules/purecss/build/grids-responsive-min.css";
    import Lazy from 'svelte-lazy';
</script>

<div class="pure-g center container bg">
    <div class="pure-u-1 pure-u-md-1-1">
        <div class="sub-header">
            <br>
            <h2>~ How It Works ~</h2>
            <br>
        </div>
    </div>
    <div class="pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1">
        <div class="card">
            <Lazy fadeOption={null}>
                <img id="how-works" alt="Command parsing process by Cakcuk" class="pure-img" src="images/how_works.png">
            </Lazy>
            <div class="text" style="text-align: center; color:#727272;">
                <h5>Command Parsing Process by Cakcuk</h5>
            </div>
            <div class="line"></div>
        </div>
    </div>
    <div class="pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1">
        <div class="card sub-card">
            <div class="text">
                <div class="sub-header-small">
                    <h4>- CUK -</h4>
                </div>
                <p>Cuk is a command for hitting any HTTP/S endpoint. Incoming messages from the user will be extracted
                    and check whether it is a Cuk command or not. If it's a Cuk command. It will be converted to an HTTP
                    call. HTTP call will be executed and send back the response to your Workspace.
                    <br>
                    <br>
                    <a href="#/docs/cukCommand">Learn more!</a>
                </p>
            </div>
            <div class="line"></div>
        </div>
        <div class="card sub-card">
            <div class="text">
                <div class="sub-header-small">
                    <h4>- CAK -</h4>
                </div>
                <p>Cak is a command for creating new command by wrapping your HTTP call to make it more simple,
                    readable,
                    and straightforward.
                    <br>
                    <br>
                    <a href="#/docs/cakCommand">Learn more!</a>
            </div>
            <div class="line"></div>
        </div>
        <div class="card sub-card special">
            <div class="text">
                <div class="sub-header-small">
                    <h4>- Custom Command -</h4>
                </div>
                <p>Your commands that you create with Cak Command. It's pretty simple to get started. Just try to
                    explore the playground! You can play around with your own API as well.
                    <br>
                    <br>
                    <a href="#/play" class="link">Let's Play!</a>
                </p>
            </div>
            <div class="line-special"></div>
        </div>
    </div>
</div>


<style>
    @media only screen and (min-width: 320px) and (max-width: 479px) {
        .sub-card {
            width: 90% !important;
        }

        .container {
            padding-top: 1.5em;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .sub-card {
            width: 90% !important;
        }

        .container {
            padding-top: 1.5em;
        }
    }

    /* laptop asusku */
    @media only screen and (min-width: 1300px) {
        .container {
            padding-top: 2.5em;
            padding-bottom: 2em;
            padding-right: 10em;
            padding-left: 10em;
        }
    }

    /* For more large desktop 
    kayake scale laptop macku paling nggak
    */
    @media only screen and (min-width: 1540px) {
        .container {
            padding-top: 2.5em;
            padding-bottom: 2em;
            padding-right: 12em;
            padding-left: 12em;
        }

    }

    .center {
        justify-content: center;
    }

    h3 {
        font-family: 'Cabin', sans-serif;
    }

    #how-works {
        margin: 0 auto;
        width: 80%;
        padding: 20px;
    }

    .card {
        background-color: #fff;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        display: inline-block;
        box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, .15);
        margin: 20px;
        position: relative;
        margin-bottom: 30px;
        transition: all .2s ease-in-out;
        font-family: 'Lato', sans-serif;
    }

    .card:hover {
        /*box-shadow: 0 5px 22px 0 rgba(0,0,0,.25);*/
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        margin-bottom: 54px;
    }

    .sub-header {}

    .sub-header-small {
        text-align: center;
    }

    .card .text {
        text-align: left;
        padding-top: .5em;
        padding-bottom: .5em;
        padding-right: 1.5em;
        padding-left: 1.5em;
    }

    .sub-card {
        width: 75%;
    }

    .line {
        width: 40%;
        height: 4px;
        background: #f1c40f;
    }

    .special {
        background-color: #34495e;
        color: #fff;
    }

    #logo {
        width: 120px;
        padding: 6px;
        position: relative;
        top: 10px;
        height: auto;
    }

    .sub-card .text .link {
        color: #34495e;
        background: #fff;
        padding: 2px;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
    }
</style>