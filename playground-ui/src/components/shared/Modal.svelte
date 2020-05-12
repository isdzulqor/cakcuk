<script>
    import { createEventDispatcher, onDestroy } from 'svelte';
    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');
    export let modalType = "notification";
    let modal;
    const handle_keydown = e => {
        if (e.key === 'Escape') {
            close();
            return;
        }
        if (e.key === 'Tab') {
            // trap focus
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

<div class="modal card" role="dialog" aria-modal="true" bind:this={modal}>
    <button class="close" autofocus on:click={close}>X</button>
    <div class="header {modalType}">
        <slot name="header"></slot>
    </div>
    <div class="content" style="text-align: center; font-size: 120%;">
        <slot></slot>
    </div>
</div>

<style>
    .header {
        text-align: center;
        background: #2d3e50;
        color: #fff;
        padding: 10px;
    }

    .alert {
        background: #e74c3c
    }

    .content {
        padding: 20px 12px 20px 12px;
    }

    .close {
        float: right;
        margin: 0.25em;
        font-size: 86%;
        font-weight: bold;
        border: none;
        color: #7b7b7b;
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
        max-height: calc(100vh - 4em);
        overflow: auto;
        transform: translate(-50%, -50%);
        /* padding: 1em; */
        border-radius: 0.2em;
        background: white;
    }

    button {
        /* display: block; */
    }
</style>