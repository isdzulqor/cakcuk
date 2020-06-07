<script>
    export let state;
</script>

<div>
    <div class="home-menu pure-menu-horizontal pure-menu-fixed {state}">
        <div class="pure-menu-heading">
            <span>
                <a href="https://github.com/isdzulqor/cakcuk" class="icon-link">
                    <img class="icon" src="images/github.svg" />
                </a>
                &nbsp;
                <a href="https://twitter.com/cakcuk.io" class="icon-link">
                    <img class="icon" src="images/twitter.svg" />
                </a>
            </span>
        </div>
        <ul class="pure-menu-list">
            <li class="pure-menu-item">
                <a href="https://cakcuk.io" class="pure-menu-link">
                    <img id="logo" alt="Cakcuk Logo" src="images/cakcuk_logo.png">
                </a>
            </li>
            <li class="pure-menu-item">
                <a href="https://cakcuk.io/#/faq" class="pure-menu-link">FAQ</a>
            </li>
            <li class="pure-menu-item pure-menu-selected link-special">
                <a href="https://cakcuk.io/#/docs" class="pure-menu-link">
                    Docs
                </a>
            </li>
        </ul>
    </div>
</div>

<style>
    #logo {
        width: 96px;
        height: auto;
    }

    /* yellow #f1c40f */
    /* yellow-light #f6cc1f */
    /* yellow-dark #e4b809 */
    .home-menu {
        text-align: left;
        /* background: #f1c40f; */
        background: #e4b809;
    }

    .play-menu {
        text-align: left;
        /* background: #f1c40f; */
        background: #2c3e50;
    }

    .faq-menu {
        text-align: left;
        /* background: #f1c40f; */
        background: #2c3e50;
    }

    /* iphone 5 */
    @media only screen and (max-width: 340px) {
        #try-out {
            display: none;
        }

        .pure-menu-heading {
            padding: 0;
            padding-left: 10px;
            padding-top: 7px;
        }

        #logo {
            width: 75px !important;
            height: auto;
        }

        .home-menu .pure-menu-heading .icon {
            height: 16px !important;
            width: 16px !important;
        }

        .pure-menu-link {
            font-size: 84% !important;
            padding: 8px !important;
        }

        .nav {
            display: none;
        }
    }

    /* Galaxy S9 */
    @media only screen and (max-width: 365px) {
        #try-out {
            display: none;
        }

        #logo {
            width: 82px;
            height: auto;
        }

        .home-menu .pure-menu-heading .icon {
            height: 14px;
            width: 14px;
        }

        .pure-menu-link {
            font-size: 84%;
            padding: 8px;
        }

        .nav {
            display: none;
        }
    }

    /* -- Responsive Styles (Media Queries) ------------------------------------- */
    /* @media only screen and (min-width: 320px) and (max-width: 400px) { */
    /* For typical mobile devices */
    @media only screen and (max-width: 400px) {
        #try-out {
            display: none;
        }

        .home-menu .pure-menu-heading .icon {
            padding: 6px;
            height: 16px;
            width: 16px;
        }

        .pure-menu-link {
            font-size: 92%;
            padding: 8px;
        }

        .nav {
            display: none;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 401px) and (max-width: 480px) {
        .home-menu .pure-menu-heading .icon {
            height: 16px;
            width: 16px;
            padding: 10px;
        }

        .pure-menu-link {
            font-size: 98%;
            padding: 12px;
        }

        #try-out {
            display: none;
        }
    }

    @media only screen and (min-width: 480px) and (max-width: 767px) {
        #try-out {
            display: none;
        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {}


    .pure-menu-fixed {
        border-bottom: none;
        z-index: 4;
    }

    .home-menu .pure-menu-heading {
        color: white;
        text-transform: capitalize;
    }

    .home-menu .pure-menu-heading .icon {
        padding-right: 8px;
        padding-left: 8px;
        height: 20px;
        width: 20px;
    }

    .home-menu .pure-menu-heading span {
        align-items: center;
        display: flex;
        min-height: 30px;
    }

    .home-menu ul {
        float: right;
    }

    a {
        font-family: 'Overpass', sans-serif;
        color: #fff;
        text-decoration: none;
    }

    a:hover {
        background: #f1c40f;
    }

    a:focus,
    .play-menu a:focus,
    .faq-menu a:focus {
        background: rgba(0, 0, 0, 0);
    }

    .play-menu a:hover {
        background: #34495e;
    }

    .faq-menu a:hover {
        background: #34495e;
    }


    .link-menu {
        text-decoration: none;
    }

    .pure-menu-item a {
        align-items: center;
        min-height: 30px;
        display: flex;
    }

    .link-special {
        background: #2ecc71;
        text-decoration: none;
    }

    .link-special a {
        color: #fff;
    }

    .icon-link {
        line-height: 11px;
        display: block;
    }
</style>