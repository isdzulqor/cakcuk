<script>
    export let state;
</script>

<div>
    <div class="home-menu pure-menu-horizontal pure-menu-fixed {state}">
        <span class="search-input">
            <input type="text" placeholder="Search">
        </span>
        <span>
            <img class="icon" src="images/twitter_grey.svg" />
            &nbsp;
            <img class="icon" src="images/github_grey.svg" />
        </span>
    </div>
</div>

<style>
    .icon {
        margin: 0 auto;
        padding: 8px;
        padding: 8px;
        float: right;
        margin: 8px;
        margin-right: 4px;
        margin-left: 4px;
        height: 20px;
        width: 20px;
    }

    .search-input {
        margin-top: 10px;
        float: right;
        width: 91%;
    }

    .search-input input {
        font-family: 'Lato', sans-serif;
        outline: none;
        border: none;
        width: 91%;
    }

    #logo {
        width: 100px;
        height: auto;
    }

    /* yellow #f1c40f */
    /* yellow-light #f6cc1f */
    /* yellow-dark #e4b809 */
    .home-menu {
        text-align: left;
        background: #f9f9f9;
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

    @media only screen and (min-width: 300px) {
        .search-input {
            width: 224px;
            float: right;
        }

        .search-input input {
            float: right;
            margin-right: 16px;
        }
    }

    @media only screen and (min-width: 330px) {
        .search-input {
            width: 264px;
            float: right;
        }

        .search-input input {
            float: right;
            margin-right: 20px;
        }

        .icon {
            margin-right: 2px;
            margin-left: 2px;
            height: 18px;
            width: 18px;
        }
    }

    @media only screen and (min-width: 380px) {
        .search-input {
            width: 320px;
            float: right;
        }

        .search-input input {
            float: right;
            margin-right: 20px;
        }
    }

    @media only screen and (min-width: 580px) {
        .search-input {
            width: 460px;
            float: right;
        }

        .search-input input {
            float: right;
            margin-right: 20px;
        }
    }

    .pure-menu-fixed {
        border-bottom: none;
        z-index: 4;
    }

    .home-menu .pure-menu-heading {
        color: white;
        float: right;
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

    a:hover,
    a:focus {
        background: #f1c40f;
    }

    .play-menu a:hover,
    .play-menu a:focus {
        background: #34495e;
    }

    .faq-menu a:hover,
    .faq-menu a:focus {
        background: #34495e;
    }


    /* 
    a:focus {
        background: #f1c40f;
    }

    a:hover {
        background: #f1c40f;
    }

    a:focus {
        background: #f1c40f;
    } */

    .link-bos {
        text-decoration: none;
    }

    /* a:visited, .link:hover {
        color: rgb(0, 80, 160);
    } */

    .pure-menu-item a {
        align-items: center;
        min-height: 30px;
        display: flex;
    }

    .link-special {
        background: #2ecc71;
        text-decoration: none;
    }
</style>