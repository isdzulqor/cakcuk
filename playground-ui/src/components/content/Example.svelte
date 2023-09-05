<script>
	import "../../../node_modules/purecss/build/pure-min.css";
    import "../../../node_modules/purecss/build/grids-responsive-min.css";
    import Lazy from 'svelte-lazy';
</script>

<div class="pure-g center container bg">
    <div class="pure-u-1 pure-u-md-1-1">
        <div class="sub-header">
            <br>
            <h2>~ Examples ~</h2>
            <br>
        </div>
    </div>
    <div class="pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1">
        <div class="card center-vertical">
            <Lazy fadeOption={null}>
                <img alt="Help Command Example | Show existing commands with oneline option" class="pure-img how-works"
                    src="images/example_help.png">
            </Lazy>
            <div class="text">
                <h5>Help Command Example | Show existing commands with oneline option</h5>
            </div>
            <div class="line"></div>
        </div>
    </div>
    <div class="pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1">
        <div class="card center-vertical">
            <Lazy fadeOption={null}>
                <img alt="Help Command Example | Show command detail with oneline option" class="pure-img how-works"
                    src="images/example_help_detail.png">
            </Lazy>
            <div class="text">
                <h5>Help Command Example | Show command detail with oneline option</h5>
            </div>
            <div class="line"></div>
        </div>
    </div>
    <div class="pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1">
        <div class="card center-vertical">
            <Lazy fadeOption={null}>
                <img alt="Cuk Command Example | Hit endpoint" class="pure-img how-works" src="images/example_cuk.png">
            </Lazy>
            <div class="text">
                <h5>Cuk Command Example | Hit endpoint</h5>
            </div>
            <div class="line"></div>
        </div>
    </div>
    <div class="pure-u-1-2 pure-u-md-1-2 pure-u-sm-1-1 pure-u-1">
        <div class="card center-vertical">
            <Lazy fadeOption={null}>
                <img alt="Cuk Command Example | Hit endpoint with parsing response" class="pure-img how-works"
                    src="images/example_cuk_parse.png">
            </Lazy>
            <div class="text">
                <h5>Cuk Command Example | Hit endpoint with parsing response</h5>
            </div>
            <div class="line"></div>
        </div>
    </div>
    <div class="pure-u-1 pure-u-md-1-1">
        <div class="card center-vertical">
            <Lazy fadeOption={null}>
                <img alt="Cak Command Example | Create new command then execute the new command" class="pure-img how-works"
                    src="images/example_cak.png">
            </Lazy>
            <div class="text">
                <h5>Cak Command Example | Create new command then execute the new command</h5>
            </div>
            <div class="line"></div>
        </div>
    </div>
</div>


<style>
    @media only screen and (min-width: 320px) and (max-width: 479px) {
        .sub-card {
            width: 90% !important;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .sub-card {
            width: 90% !important;
        }
    }

    /* laptop asusku */
    @media only screen and (min-width: 1300px) {
        .container {
            padding-top: 2em;
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
            padding-top: 2em;
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

    .how-works {
        margin: 0 auto;
        width: 90%;
        padding: 10px;
    }

    .card {
        background-color: #fff;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        display: inline-block;
        box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, .15);
        margin: 0 20px;
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
        text-align: center;
        padding: .5em 1em;
        color: #727272;
    }

    .sub-card {
        width: 75%;
    }

    .line {
        width: 40%;
        height: 4px;
        background: #34495e;
    }

    .special {
        background-color: #34495e;
        color: #fff;
    }

    .bg {}

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

    .center-vertical {
        position: relative;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
    }

    .container{
        margin-bottom: 30px;
    }
</style>