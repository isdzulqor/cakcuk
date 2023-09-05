<script>
    export let type
</script>
<div class="codeWrap {type}">
    <slot></slot>
</div>
<style>
    .codeWrap {
        display: inline-block;
        border: solid 1px #e0e0e0;
        min-height: 10px;
        width: auto;
        white-space: pre-wrap;
        background: #f1f1f1;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        padding: 16px 22px 16px 22px;
        line-height: 1.6em;
        font-style: normal;
        font-variant-ligatures: normal;
        font-variant-caps: normal;
        font-variant-numeric: normal;
        font-variant-east-asian: normal;
        font-weight: 400;
        font-stretch: normal;
        line-height: 1.35;
        font-size: 95%;
        font-family: monospace;
    }

    .codeWrap.full {
        width: 100%;
    }
    .codeWrap.medium {
        min-width: 75%;
        max-width: 100%;
        overflow-wrap: break-word;
    }
</style>