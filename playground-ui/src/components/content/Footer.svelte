<script>
    import "../../../node_modules/purecss/build/grids-responsive-min.css";
    export let shouldBG = ""
</script>

<footer class="bg {shouldBG}">
    <div class="pure-g container">
        <div class="pure-u-1">
            <br>
            <ul class="pure-menu-list">
                <li class="pure-menu-item">
                    <span>
                        © Cakcuk.io
                    </span>
                </li>
                <li class="pure-menu-item">
                    <a class="pure-menu-link" href="#/privacy">Privacy Policy</a>
                </li>
                <li class="pure-menu-item">
                    <a href="https://github.com/isdzulqor/cakcuk" target="_blank" class="pure-menu-link">Github</a>
                </li>
                <li class="pure-menu-item">
                    <a href="https://twitter.com/cakcukio" target="_blank" class="pure-menu-link">Twitter</a>
                </li>
            </ul>
        </div>
    </div>
    <br>
</footer>

<style>
    .bg {
        background-color: #34495e;
    }

    .bg-yellow {
        background-color: #e4b809;
    }

    .sub-header {
        text-align: center;
        color: #fff;
        margin: 0 auto;
        font-family: 'Overpass', sans-serif;
    }

    .sub-header .pure-form {}

    .sub-header input {
        color: #2c3e50;
    }

    .sub-header input,
    .sub-header button {
        margin: 4px;
    }

    /* @media only screen and (min-width: 980px) {
        .form-rss input {
            width: 400px;
        }
    } */
    @media only screen and (min-width: 767px) {
        .form-rss {
            margin-top: 24px;
        }

        .form-rss input {
            width: 60%;
        }
    }

    @media only screen and (min-width: 320px) and (max-width: 479px) {
        .container {
            padding-right: 0.5em;
            padding-left: 0.5em;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .container {
            padding-right: 1em;
            padding-left: 1em;
        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {
        .container {
            padding-right: 3em;
            padding-left: 3em;
        }
    }

    /* For small desktop */
    @media only screen and (min-width: 980px) and (max-width: 1023px) {
        .container {
            padding-right: 6em;
            padding-left: 6em;
        }
    }

    @media only screen and (min-width: 1024px) and (max-width: 1299px) {
        .container {
            padding-right: 6em;
            padding-left: 6em;
        }
    }

    /* laptop asusku */
    @media only screen and (min-width: 1300px) {
        .container {
            padding-right: 10em;
            padding-left: 10em;
        }
    }

    /* For more large desktop 
    kayake scale laptop macku paling nggak
    */
    @media only screen and (min-width: 1540px) {
        .container {
            padding-right: 12em;
            padding-left: 12em;
        }
    }

    .home-menu ul {
        float: right;
    }

    a {
        font-family: 'Overpass', sans-serif;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
    }

    a:hover,
    a:focus {
        background-color: rgba(0, 0, 0, 0.1);
    }

    .link-menu {
        text-decoration: none;
    }

    .pure-menu-item {
        align-items: center;
        min-height: 30px;
        display: flex;
        font-size: 74%;
        float: left;
        color: #fff;
    }

    .pure-menu-item span {
        padding: 0 1em;
    }

    .pure-menu-list {
        margin: 0 auto;
        display: table;
    }
</style>