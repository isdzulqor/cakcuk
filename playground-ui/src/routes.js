import Landing from './components/Landing.svelte'
import NotFound from './components/NotFound.svelte'
import PlayWrapper from './components/PlayWrapper.svelte'
import ConsoleWrapper from './components/ConsoleWrapper.svelte'
import FaqWrapper from './components/FaqWrapper.svelte'
import PrivacyWrapper from './components/PrivacyWrapper.svelte'
import DocsWrapper from './components/DocsWrapper.svelte'

const routes = {
    '/': Landing,
    '/docs/*': DocsWrapper,
    '/docs': DocsWrapper,
    '/play': PlayWrapper,
    '/console': ConsoleWrapper,
    '/faq': FaqWrapper,
    '/privacy': PrivacyWrapper,
    '*': NotFound,
}

export { routes }