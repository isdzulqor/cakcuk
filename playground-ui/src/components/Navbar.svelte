<script>
    import Lazy from 'svelte-lazy';
    export let state = "play-menu";
    export let segment;

</script>

<div class="{segment === 'docs' ? 'hidden' : ''}">
    <div class="home-menu pure-menu-horizontal pure-menu-fixed {state}">
        <div class="pure-menu-heading">
            <span>
                <a href="https://github.com/isdzulqor/cakcuk" rel="noopener" target="_blank" class="icon-link">
                    <Lazy fadeOption={null}>
                        <img class="icon" src="images/github.svg" alt="Cakcuk Github Link" />
                    </Lazy>
                </a>
                &nbsp;
                <a href="https://twitter.com/cakcukio" rel="noopener" target="_blank" class="icon-link">
                    <Lazy fadeOption={null}>
                        <img class="icon" src="images/twitter.svg" alt="Cakcuk Twitter Link" />
                    </Lazy>
                </a>
            </span>
        </div>
        <ul class="pure-menu-list">
            <li class="pure-menu-item">
                <a class="pure-menu-link" rel="noopener" target="_blank" href="https://cakcuk.io">
                    <Lazy fadeOption={null}>
                        <img id="logo" alt="Cakcuk Logo" src="images/cakcuk_logo.svg">
                    </Lazy>
                </a>
            </li>
            <li class="pure-menu-item">
                <a class="pure-menu-link" rel="noopener" target="_blank" href="https://cakcuk.io/faq">FAQ</a>
            </li>
            <li class="pure-menu-item pure-menu-selected link-special">
                <a class="pure-menu-link" rel="noopener" target="_blank" href="https://cakcuk.io/docs">
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
        margin-top: 2px;
        margin-bottom: -4px;
    }

    .home-menu {
        text-align: left;
        background: #e4b809;
    }

    .play-menu {
        text-align: left;
        background: #2c3e50;
    }

    .faq-menu {
        text-align: left;
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

    @media only screen and (max-width: 420px) {
        .home-menu .pure-menu-heading .icon {
            padding-right: 8px !important;
            padding-left: 8px !important;
        }
    }

    @media only screen and (min-width: 420px) {
        .home-menu .pure-menu-heading .icon {
            padding-right: 12px !important;
            padding-left: 12px !important;
        }
    }


    .pure-menu-fixed {
        border-bottom: none;
        z-index: 4;
    }

    .home-menu .pure-menu-heading {
        color: white;
        text-transform: capitalize;
    }

    .home-menu .pure-menu-heading .icon {
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

    .hidden {
        visibility: hidden;
    }
</style>