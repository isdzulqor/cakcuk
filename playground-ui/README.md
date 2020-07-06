<div align="center">
<h1 align="center">Cakcuk Playground UI</h1>
<p>Visit at http://your-cakcuk-url:port | built with <a rel="noopener" href="https://sapper.svelte.dev/">Sapper & Svelte</a></p>
</div>

## Getting Started
### Using yarn
```
yarn install
# develepment mode
yarn run dev

# export static site
yarn run export
rm -rf public && cp -R __sapper__/export public
```
### Using npm
```
npm install
# develepment mode
npm run dev

# export static site
npm run export
rm -rf public && cp -R __sapper__/export public
```