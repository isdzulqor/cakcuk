<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');
    export let modalType = "notification";
    export let modalAlign = "center";
    let modal;
    const handle_keydown = e => {
        if (e.key === 'Escape') {
            close();
            return;
        }
        if (e.key === 'Tab') {
            const nodes = modal.querySelectorAll('*');
            const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);
            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;
            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;
            tabbable[index].focus();
            e.preventDefault();
        }
    };
    const previously_focused = typeof document !== 'undefined' && document.activeElement;
    if (previously_focused) {
        onDestroy(() => {
            previously_focused.focus();
        });
    }
</script>

<svelte:window on:keydown={handle_keydown} />

<div class="modal-background" on:click={close}></div>

<div class="modal card {modalType}" role="dialog" aria-modal="true" bind:this={modal}>
    <div class="close">
        <button on:click={close}>X</button>
    </div>
    <div class="header {modalType} {modalAlign}">
        <slot name="header"></slot>
    </div>
    <div class="content {modalAlign}">
        <slot></slot>
    </div>
</div>

<style>
    .center {
        text-align: center;
    }

    .left {
        text-align: left;
    }

    .justify {
        text-align: justify;
    }

    .header {
        background: #2d3e50;
        color: #fff;
        padding: 10px 16px 10px 16px;
    }

    .alert {
        background: #e74c3c
    }

    .content {
        padding: 0 16px 6px 16px;
    }

    .close {
        width: 2em;
        float: right;
        margin: 0.25em;
        padding: 2px;
        font-size: 86%;
        font-weight: bold;
        border: none;
        color: #7b7b7b;
    }

    .close button {
        cursor: pointer;
    }

    .card {
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

    .modal-background {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }

    .modal {
        z-index: 1000;
        position: fixed;
        left: 50%;
        top: 50%;
        width: calc(100vw - 4em);
        max-width: 32em;
        /* max-height: calc(100vh - 14em); */
        overflow: auto;
        transform: translate(-50%, -50%);
        border-radius: 0.2em;
        background: white;
    }

    .modal.large {
        max-width: 46em;
    }

    .modal.small {
        max-width: 18em !important;
    }
</style>