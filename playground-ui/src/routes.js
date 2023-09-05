import Landing from './components/Landing.svelte'
import NotFound from './components/NotFound.svelte'
import PlayWrapper from './components/PlayWrapper.svelte'
import FaqWrapper from './components/FaqWrapper.svelte'
import PrivacyWrapper from './components/PrivacyWrapper.svelte'
import DocsWrapper from './components/DocsWrapper.svelte'

const routes = {
    '/': Landing,
    '/docs/*': DocsWrapper,
    '/docs': DocsWrapper,
    '/play': PlayWrapper,
    '/faq': FaqWrapper,
    '/privacy': PrivacyWrapper,
    '*': NotFound,
}

export { routes }