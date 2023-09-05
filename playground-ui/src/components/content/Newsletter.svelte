<script>
	import "../../../node_modules/purecss/build/pure-min.css";
    import "../../../node_modules/purecss/build/grids-responsive-min.css";
    import 'whatwg-fetch'
    import marked from 'marked'
    import Modal from '../shared/Modal.svelte'
    import { validateEmail, uuidV4 } from "../../shared/helper/helper";

    let userEmail = "";

    let modalHeader = "info large"
    let modalContent = "info large"
    let modalType = "info large"
    let modalAlign = "center"
    let showModal = false

    function clickSubscribe() {
        modalType = "info large"
        modalAlign = "center"
        showModal = true

        if (!validateEmail(userEmail)) {
            showAlert("Please input a valid email!")
            return
        }

        let successMsg = "<i>" + userEmail + "</i>," + "<p>Thank you for your subscribtion!<p>"
        try {
            postSubscribe(userEmail)
        } catch (error) {
            // TODO:
        }
        showSuccess(successMsg)
        userEmail = ""
    }

    async function postSubscribe(email) {
        var url = new URL('/api/subscribe', location)
        var params = { email: email }
        url.search = new URLSearchParams(params).toString();
        const res = await window.fetch(url, {
            headers: {
                'Accept-Encoding': 'gzip, deflate, br',
                'x-request-id': uuidV4()
            }
        });
        const json = await res.json();
        if (json.error && json.error.message) {
            throw new Error(json.error.message)
        }
        return json
    }

    function showSuccess(content) {
        modalHeader = "Subscribtion Success"
        modalType = "info small"
        modalAlign = "center"
        showModal = true
        modalContent = content
    }

    function showAlert(content) {
        modalHeader = "Alert"
        modalType = "alert small"
        modalAlign = "center"
        showModal = true
        modalContent = content
    }
</script>

<footer class="bg">
    <div class="pure-g container">
        <div class="pure-u-1">
            {#if showModal}
                <Modal modalType={modalType} modalAlign={modalAlign} on:close="{() => showModal = false}">
                    <div slot="header">
                        {modalHeader}
                    </div>
                    {@html marked(modalContent)}
                </Modal>
            {/if}
        </div>
        <div class="pure-u-1 pure-u-md-1-2">
            <div class="sub-header">
                <h4>Join our mailing list</h4>
                <p>Keep up with the latest things Cakcuk!</p>
            </div>
        </div>
        <div class="pure-u-1 pure-u-md-1-2">
            <div class="sub-header form-rss">
                <input type="email" bind:value={userEmail}  placeholder="your.email@example.com">
                <button type="submit" class="pure-button pure-button-primary success" on:click={clickSubscribe}>Subscribe</button>
            </div>
        </div>
    </div>
    <br>
</footer>

<style>
    .bg {
        background-color: #34495e;
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
            padding-top: 1em;
            padding-right: 0.5em;
            padding-left: 0.5em;
        }
    }

    /* For mobile (landscape) */
    @media only screen and (min-width: 480px) and (max-width: 767px) {
        .container {
            padding-top: 1em;
            padding-right: 1em;
            padding-left: 1em;
        }
    }

    /* For tablet */
    @media only screen and (min-width: 768px) and (max-width: 979px) {
        .container {
            padding-top: 1.5em;
            padding-right: 3em;
            padding-left: 3em;
        }
    }

    /* For small desktop */
    @media only screen and (min-width: 980px) and (max-width: 1023px) {
        .container {
            padding-top: 1.5em;
            padding-right: 6em;
            padding-left: 6em;
        }
    }

    @media only screen and (min-width: 1024px) and (max-width: 1299px) {
        .container {
            padding-top: 1.5em;
            padding-right: 6em;
            padding-left: 6em;
        }
    }

    /* laptop asusku */
    @media only screen and (min-width: 1300px) {
        .container {
            padding-top: 2em;
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

    .pure-button.success{
        background-color: #2ecc71;
    }
</style>