<script>
    import CodeWrap from "../../shared/CodeWrap.svelte";
    import PlayEditor from "../../shared/PlayEditor.svelte";
    import Lazy from "svelte-lazy";

    export let getExample;
    export let getHelpExample;
    export let getRunWay;
    export let scroll;
    export let clickMain;

</script>

<div class="main" id="defaultCommands" on:click={clickMain}>
    <div class="header">
        <h1>Default Commands</h1>
        <h3>Cakcuk's Base Commands</h3>
    </div>
    <div class="line"></div>
    <div class="content">
        <h2 id="helpCommand" class="content-subhead">Help</h2>
        <p>
            Like most <a
                class="common-link"
                goTo="helpCommand"
                on:click={scroll}>Help</a
            >
            functions in other CLIs.
            <a class="common-link" goTo="helpCommand" on:click={scroll}>Help</a>
            works to display command lists or specific commands for their details,
            such as for example usage, description, options, etc.
        </p>
        <p>
            It's pretty straightforward to work with <code>Help</code>. It also
            works with your
            <a class="common-link" goTo="customCommand" on:click={scroll}
                >Custom Commands</a
            >. Just try the examples below!
        </p>
        <PlayEditor
            background="white"
            editorType="medium"
            tabChecked="checked"
            editorCommandArea={getHelpExample("help")}
            examples={getExample("Help")}
        ></PlayEditor>
        <h2 id="cukCommand" class="content-subhead">Cuk</h2>
        <p>
            <a class="common-link" goTo="cukCommand" on:click={scroll}>Cuk</a> is
            a command for hitting HTTP/S endpoints. It covers endpoint properties
            like URL, Query Parameters, Headers, etc. It works pretty simply to support
            common endpoint usage.
        </p>
        <p>
            One of the special options that you can explore is <code
                >--parseResponse, -pr</code
            >.
            <code>--parseResponse, -pr</code> is supporting
            <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak</a>
            command and your
            <a class="common-link" goTo="customCommand" on:click={scroll}
                >Custom Commands</a
            > as well.
        </p>
        <PlayEditor
            background="white"
            editorType="medium"
            tabChecked="checked"
            editorCommandArea={getHelpExample("cuk")}
            examples={getExample("Cuk - Hit Endpoint")}
        ></PlayEditor>
        <h2 id="cakCommand" class="content-subhead">Cak</h2>
        <p>
            <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak</a>
            is a special command to create your
            <a class="common-link" goTo="customCommand" on:click={scroll}
                >Custom Commands</a
            >. Your commands creation on Playground only hold for 5 minutes.
            They will be deleted after that.
        </p>
        <p>
            Just explore <a
                class="common-link"
                goTo="cakCommand"
                on:click={scroll}>Cak</a
            >
            command using provided examples. They quite represent
            <a class="common-link" goTo="cakCommand" on:click={scroll}>Cak</a>
            functionalities.
        </p>
        <PlayEditor
            background="white"
            editorType="medium"
            tabChecked="checked"
            editorCommandArea={getHelpExample("cak")}
            examples={getExample("Cak - Create Command")}
        ></PlayEditor>
        <h2 id="delCommand" class="content-subhead">Del</h2>
        <p>
            <a class="common-link" goTo="delCommand" on:click={scroll}>Del</a>
            is a simple command to delete your custom commands. You're not allowed
            to delete
            <a class="common-link" goTo="defaultCommands" on:click={scroll}
                >Default Commands</a
            >.
            <a class="common-link" goTo="delCommand" on:click={scroll}>Del</a>
            supports multiple commands deletion separated by double-and
            <code>&&</code> like the examples below.
        </p>
        <p>
            Please keep in mind, multiple option values always separated by
            double-and <code>&&</code>. You're only able to delete commands in
            your
            <a class="common-link" goTo="scopeCommand" on:click={scroll}
                >Scopes</a
            >, except you have
            <a class="common-link" goTo="suCommand" on:click={scroll}
                >Superuser</a
            > access.
        </p>
        <PlayEditor
            background="white"
            editorType="medium"
            tabChecked="checked"
            editorCommandArea={getHelpExample("del")}
            examples={getExample("Del - Delete Command")}
        ></PlayEditor>
        <h2 id="scopeCommand" class="content-subhead">Scope</h2>
        <p>
            Create, edit, and delete <a
                class="common-link"
                goTo="scopeCommand"
                on:click={scroll}>Scopes</a
            >
            aka access control list (ACL) for users and commands. It's useful for
            managing certain custom commands that belong to certain groups. For example,
            you create two
            <a class="common-link" goTo="scopeCommand" on:click={scroll}
                >Scopes</a
            >
            for <code>developer</code> and <code>infra</code>. You want to make
            the users and commands that belong to the
            <code>developer</code>
            can't be accessed by <code>infra</code> users, and vice versa.
        </p>
        <p>
            The default <a
                class="common-link"
                goTo="scopeCommand"
                on:click={scroll}>scope</a
            >
            for the command is
            <code>public</code>. Commands in public
            <a class="common-link" goTo="scopeCommand" on:click={scroll}
                >scope</a
            >
            can be accessed by anyone in your workspace. Please keep in mind, that
            <a class="common-link" goTo="scopeCommand" on:click={scroll}
                >Scope</a
            > creation on Playground also has 5 minutes expiration time.
        </p>
        <PlayEditor
            background="white"
            editorType="medium"
            tabChecked="checked"
            editorCommandArea={getHelpExample("scope")}
            examples={getExample("Scope - ACL")}
        ></PlayEditor>
        <h2 id="suCommand" class="content-subhead">SU - Superuser</h2>
        <p>
            Access and control to manage <a
                class="common-link"
                goTo="suCommand"
                on:click={scroll}>Superuser</a
            >.
            <a class="common-link" goTo="suCommand" on:click={scroll}
                >Superuser</a
            >
            is enabled by default. But, it's configurable via environment variable
            of <code>SUPER_USER_MODE_ENABLED</code>.
        </p>

        <p>
            <a class="common-link" goTo="suCommand" on:click={scroll}
                >Superuser</a
            >
            that you set on the Playground has an expiration time. It will hold for
            5 minutes like
            <a class="common-link" goTo="cakCommand" on:click={scroll}
                >Cak commands</a
            >
            &
            <a class="common-link" goTo="scopeCommand" on:click={scroll}
                >Scopes</a
            >
            creation. The only user that's in the
            <a class="common-link" goTo="suCommand" on:click={scroll}
                >Superuser</a
            >
            list that's able to set and delete the other users to be
            <a class="common-link" goTo="suCommand" on:click={scroll}
                >Superuser</a
            >. But for the first-time installation,
            <a class="common-link" goTo="suCommand" on:click={scroll}
                >Superuser</a
            >
            can be set by anyone.
        </p>

        <h3 class="content-subhead">
            The differences between Superuser and Common User
        </h3>
        <ul>
            <li>
                <a class="common-link" goTo="suCommand" on:click={scroll}
                    >Superuser</a
                > can Read, Create, Update, and Delete all Scopes.
            </li>
            <li>
                Common User is only able to Read, Create, Update, and Delete his
                Scopes.
            </li>
            <br />
            <li>
                <a class="common-link" goTo="suCommand" on:click={scroll}
                    >Superuser</a
                > can Read, Create, Update, Delete, and Execute all commands.
            </li>
            <li>
                Common User is only able to Read, Create, Update, Delete, and
                Execute his commands in his scopes.
            </li>
            <br />
            <li>
                <a class="common-link" goTo="suCommand" on:click={scroll}
                    >Superuser</a
                > can Read of all the user's access, the scopes and the commands
                included.
            </li>
            <li>Common User is not allowed.</li>
            <br />
            <li>
                <a class="common-link" goTo="suCommand" on:click={scroll}
                    >Superuser</a
                >
                can Show, Set, and Delete
                <a class="common-link" goTo="suCommand" on:click={scroll}
                    >Superuser</a
                > list group.
            </li>
            <li>
                Common User is only able to Show <a
                    class="common-link"
                    goTo="suCommand"
                    on:click={scroll}>Superuser</a
                > list.
            </li>
        </ul>
        <PlayEditor
            background="white"
            editorType="medium"
            tabChecked="checked"
            editorCommandArea={getHelpExample("su")}
            examples={getExample("su - Superuser")}
        ></PlayEditor>
    </div>
</div>
