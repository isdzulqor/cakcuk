function t(){}const e=t=>t;function n(t,e){for(const n in e)t[n]=e[n];return t}function r(t){return t()}function o(){return Object.create(null)}function s(t){t.forEach(r)}function a(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(t,e,n,r){if(t){const o=i(t,e,n,r);return t[0](o)}}function i(t,e,r,o){return t[1]&&o?n(r.ctx.slice(),t[1](o(e))):r.ctx}function u(t,e,n,r,o,s,a){const c=function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(e,r,o,s);if(c){const o=i(e,n,r,a);t.p(o,c)}}function f(t){return null==t?"":t}const d="undefined"!=typeof window;let p=d?()=>window.performance.now():()=>Date.now(),h=d?t=>requestAnimationFrame(t):t;const m=new Set;function g(t){m.forEach(e=>{e.c(t)||(m.delete(e),e.f())}),0!==m.size&&h(g)}function $(t,e){t.appendChild(e)}function v(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode.removeChild(t)}function b(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function E(t){return document.createTextNode(t)}function _(){return E(" ")}function x(){return E("")}function k(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function S(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function L(t){return Array.from(t.childNodes)}function z(t,e,n,r){for(let r=0;r<t.length;r+=1){const o=t[r];if(o.nodeName===e){let e=0;const s=[];for(;e<o.attributes.length;){const t=o.attributes[e++];n[t.name]||s.push(t.name)}for(let t=0;t<s.length;t++)o.removeAttribute(s[t]);return t.splice(r,1)[0]}}return r?function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}(e):w(e)}function A(t,e){for(let n=0;n<t.length;n+=1){const r=t[n];if(3===r.nodeType)return r.data=""+e,t.splice(n,1)[0]}return E(e)}function R(t){return A(t," ")}function C(t,e){e=""+e,t.data!==e&&(t.data=e)}function N(t,e){t.value=null==e?"":e}function D(t,e,n,r){t.style.setProperty(e,n,r?"important":"")}function O(t,e,n){t.classList[n?"add":"remove"](e)}function P(t,e){const n=document.createEvent("CustomEvent");return n.initCustomEvent(t,!1,!1,e),n}function q(t,e=document.body){return Array.from(e.querySelectorAll(t))}class I{constructor(t=null){this.a=t,this.e=this.n=null}m(t,e,n=null){this.e||(this.e=w(e.nodeName),this.t=e,this.h(t)),this.i(n)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let e=0;e<this.n.length;e+=1)v(this.t,this.n[e],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(y)}}const U=new Set;let j,T=0;function H(t,e,n,r,o,s,a,c=0){const l=16.666/r;let i="{\n";for(let t=0;t<=1;t+=l){const r=e+(n-e)*s(t);i+=100*t+`%{${a(r,1-r)}}\n`}const u=i+`100% {${a(n,1-n)}}\n}`,f=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${c}`,d=t.ownerDocument;U.add(d);const p=d.__svelte_stylesheet||(d.__svelte_stylesheet=d.head.appendChild(w("style")).sheet),h=d.__svelte_rules||(d.__svelte_rules={});h[f]||(h[f]=!0,p.insertRule(`@keyframes ${f} ${u}`,p.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?m+", ":""}${f} ${r}ms linear ${o}ms 1 both`,T+=1,f}function V(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),o=n.length-r.length;o&&(t.style.animation=r.join(", "),T-=o,T||h(()=>{T||(U.forEach(t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}}),U.clear())}))}function B(t){j=t}function M(){if(!j)throw new Error("Function called outside component initialization");return j}function G(t){M().$$.on_destroy.push(t)}function F(){const t=M();return(e,n)=>{const r=t.$$.callbacks[e];if(r){const o=P(e,n);r.slice().forEach(e=>{e.call(t,o)})}}}const J=[],K=[],Q=[],Y=[],W=Promise.resolve();let X=!1;function Z(t){Q.push(t)}let tt=!1;const et=new Set;function nt(){if(!tt){tt=!0;do{for(let t=0;t<J.length;t+=1){const e=J[t];B(e),rt(e.$$)}for(J.length=0;K.length;)K.pop()();for(let t=0;t<Q.length;t+=1){const e=Q[t];et.has(e)||(et.add(e),e())}Q.length=0}while(J.length);for(;Y.length;)Y.pop()();X=!1,tt=!1,et.clear()}}function rt(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(Z)}}let ot;function st(t,e,n){t.dispatchEvent(P(`${e?"intro":"outro"}${n}`))}const at=new Set;let ct;function lt(){ct={r:0,c:[],p:ct}}function it(){ct.r||s(ct.c),ct=ct.p}function ut(t,e){t&&t.i&&(at.delete(t),t.i(e))}function ft(t,e,n,r){if(t&&t.o){if(at.has(t))return;at.add(t),ct.c.push(()=>{at.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}}const dt={duration:0};function pt(n,r,o,c){let l=r(n,o),i=c?0:1,u=null,f=null,d=null;function $(){d&&V(n,d)}function v(t,e){const n=t.b-i;return e*=Math.abs(n),{a:i,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function y(r){const{delay:o=0,duration:a=300,easing:c=e,tick:y=t,css:b}=l||dt,w={start:p()+o,b:r};r||(w.group=ct,ct.r+=1),u?f=w:(b&&($(),d=H(n,i,r,a,o,c,b)),r&&y(0,1),u=v(w,a),Z(()=>st(n,r,"start")),function(t){let e;0===m.size&&h(g),new Promise(n=>{m.add(e={c:t,f:n})})}(t=>{if(f&&t>f.start&&(u=v(f,a),f=null,st(n,u.b,"start"),b&&($(),d=H(n,i,u.b,u.duration,0,c,l.css))),u)if(t>=u.end)y(i=u.b,1-i),st(n,u.b,"end"),f||(u.b?$():--u.group.r||s(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;i=u.a+u.d*c(e/u.duration),y(i,1-i)}return!(!u&&!f)}))}return{run(t){a(l)?(ot||(ot=Promise.resolve(),ot.then(()=>{ot=null})),ot).then(()=>{l=l(),y(t)}):y(t)},end(){$(),u=f=null}}}function ht(t,e){const n={},r={},o={$$scope:1};let s=t.length;for(;s--;){const a=t[s],c=e[s];if(c){for(const t in a)t in c||(r[t]=1);for(const t in c)o[t]||(n[t]=c[t],o[t]=1);t[s]=c}else for(const t in a)o[t]=1}for(const t in r)t in n||(n[t]=void 0);return n}function mt(t){return"object"==typeof t&&null!==t?t:{}}function gt(t){t&&t.c()}function $t(t,e){t&&t.l(e)}function vt(t,e,n){const{fragment:o,on_mount:c,on_destroy:l,after_update:i}=t.$$;o&&o.m(e,n),Z(()=>{const e=c.map(r).filter(a);l?l.push(...e):s(e),t.$$.on_mount=[]}),i.forEach(Z)}function yt(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function bt(t,e){-1===t.$$.dirty[0]&&(J.push(t),X||(X=!0,W.then(nt)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function wt(e,n,r,a,c,l,i=[-1]){const u=j;B(e);const f=n.props||{},d=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:c,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:o(),dirty:i};let p=!1;if(d.ctx=r?r(e,f,(t,n,...r)=>{const o=r.length?r[0]:n;return d.ctx&&c(d.ctx[t],d.ctx[t]=o)&&(d.bound[t]&&d.bound[t](o),p&&bt(e,t)),n}):[],d.update(),p=!0,s(d.before_update),d.fragment=!!a&&a(d.ctx),n.target){if(n.hydrate){const t=L(n.target);d.fragment&&d.fragment.l(t),t.forEach(y)}else d.fragment&&d.fragment.c();n.intro&&ut(e.$$.fragment),vt(e,n.target,n.anchor),nt()}B(u)}class Et{$destroy(){yt(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(){}}const _t=[];function xt(e,n=t){let r;const o=[];function s(t){if(c(e,t)&&(e=t,r)){const t=!_t.length;for(let t=0;t<o.length;t+=1){const n=o[t];n[1](),_t.push(n,e)}if(t){for(let t=0;t<_t.length;t+=2)_t[t][0](_t[t+1]);_t.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(a,c=t){const l=[a,c];return o.push(l),1===o.length&&(r=n(s)||t),a(e),()=>{const t=o.indexOf(l);-1!==t&&o.splice(t,1),0===o.length&&(r(),r=null)}}}}const kt={},St=()=>({});function Lt(t,{delay:n=0,duration:r=400,easing:o=e}){const s=+getComputedStyle(t).opacity;return{delay:n,duration:r,easing:o,css:t=>"opacity: "+t*s}}function zt(t){let e,n,r;var o=t[1];return o&&(e=new o({})),{c(){e&&gt(e.$$.fragment),n=x()},l(t){e&&$t(e.$$.fragment,t),n=x()},m(t,o){e&&vt(e,t,o),v(t,n,o),r=!0},p(t,r){if(o!==(o=t[1])){if(e){lt();const t=e;ft(t.$$.fragment,1,0,()=>{yt(t,1)}),it()}o?(e=new o({}),gt(e.$$.fragment),ut(e.$$.fragment,1),vt(e,n.parentNode,n)):e=null}},i(t){r||(e&&ut(e.$$.fragment,t),r=!0)},o(t){e&&ft(e.$$.fragment,t),r=!1},d(t){t&&y(n),e&&yt(e,t)}}}function At(e){let n,r;return{c(){n=w("div"),r=E(e[1])},l(t){n=z(t,"DIV",{});var o=L(n);r=A(o,e[1]),o.forEach(y)},m(t,e){v(t,n,e),$(n,r)},p(t,e){2&e&&C(r,t[1])},i:t,o:t,d(t){t&&y(n)}}}function Rt(t){let e,n,r,o;const s=[Nt,Ct],a=[];function c(t,e){return t[0]?0:1}return e=c(t),n=a[e]=s[e](t),{c(){n.c(),r=x()},l(t){n.l(t),r=x()},m(t,n){a[e].m(t,n),v(t,r,n),o=!0},p(t,o){let l=e;e=c(t),e===l?a[e].p(t,o):(lt(),ft(a[l],1,1,()=>{a[l]=null}),it(),n=a[e],n||(n=a[e]=s[e](t),n.c()),ut(n,1),n.m(r.parentNode,r))},i(t){o||(ut(n),o=!0)},o(t){ft(n),o=!1},d(t){a[e].d(t),t&&y(r)}}}function Ct(t){let e;const n=t[9].default,r=l(n,t,t[8],null),o=r||function(t){let e;return{c(){e=E("Lazy load content")},l(t){e=A(t,"Lazy load content")},m(t,n){v(t,e,n)},d(t){t&&y(e)}}}();return{c(){o&&o.c()},l(t){o&&o.l(t)},m(t,n){o&&o.m(t,n),e=!0},p(t,e){r&&r.p&&256&e&&u(r,n,t,t[8],e,null,null)},i(t){e||(ut(o,t),e=!0)},o(t){ft(o,t),e=!1},d(t){o&&o.d(t)}}}function Nt(t){let e,n,r;const o=t[9].default,s=l(o,t,t[8],null),a=s||function(t){let e;return{c(){e=E("Lazy load content")},l(t){e=A(t,"Lazy load content")},m(t,n){v(t,e,n)},d(t){t&&y(e)}}}();return{c(){e=w("div"),a&&a.c()},l(t){e=z(t,"DIV",{});var n=L(e);a&&a.l(n),n.forEach(y)},m(t,n){v(t,e,n),a&&a.m(e,null),r=!0},p(t,e){s&&s.p&&256&e&&u(s,o,t,t[8],e,null,null)},i(o){r||(ut(a,o),Z(()=>{n||(n=pt(e,Lt,t[0],!0)),n.run(1)}),r=!0)},o(o){ft(a,o),n||(n=pt(e,Lt,t[0],!1)),n.run(0),r=!1},d(t){t&&y(e),a&&a.d(t),t&&n&&n.end()}}}function Dt(e){let n,r,o,s,c,l,i;const u=[Rt,At,zt],f=[];function d(t,e){return t[2]?0:"string"==typeof t[1]?1:"function"==typeof t[1]?2:-1}return~(r=d(e))&&(o=f[r]=u[r](e)),{c(){n=w("div"),o&&o.c()},l(t){n=z(t,"DIV",{});var e=L(n);o&&o.l(e),e.forEach(y)},m(o,u){var d;v(o,n,u),~r&&f[r].m(n,null),c=!0,l||(d=s=e[3].call(null,n),i=d&&a(d.destroy)?d.destroy:t,l=!0)},p(t,[e]){let s=r;r=d(t),r===s?~r&&f[r].p(t,e):(o&&(lt(),ft(f[s],1,1,()=>{f[s]=null}),it()),~r?(o=f[r],o||(o=f[r]=u[r](t),o.c()),ut(o,1),o.m(n,null)):o=null)},i(t){c||(ut(o),c=!0)},o(t){ft(o),c=!1},d(t){t&&y(n),~r&&f[r].d(),l=!1,i()}}}function Ot(t,e){return function(t){return t&&t.target&&t.target.getBoundingClientRect?t.target.getBoundingClientRect().bottom:window.innerHeight}(t)+e}function Pt(t,e,n){let{height:r=0}=e,{offset:o=150}=e,{fadeOption:s={delay:0,duration:400}}=e,{resetHeightDelay:a=0}=e,{onload:c=null}=e,{placeholder:l=null}=e,i=!1;let{$$slots:u={},$$scope:f}=e;return t.$set=t=>{"height"in t&&n(4,r=t.height),"offset"in t&&n(5,o=t.offset),"fadeOption"in t&&n(0,s=t.fadeOption),"resetHeightDelay"in t&&n(6,a=t.resetHeightDelay),"onload"in t&&n(7,c=t.onload),"placeholder"in t&&n(1,l=t.placeholder),"$$scope"in t&&n(8,f=t.$$scope)},[s,l,i,function(t){!function(t){r&&(t.style.height="number"==typeof r?r+"px":r)}(t);const e=function(t,e,n){let r,o,s,a=null,c=0;n||(n={});const l=function(){c=!1===n.leading?0:new Date,a=null,s=t.apply(r,o),a||(r=o=null)};return function(i){const u=new Date;c||!1!==n.leading||(c=u);const f=e-(u-c);return r=this,o=arguments,f<=0||f>e?(a&&(clearTimeout(a),a=null),c=u,s=t.apply(r,o),a||(r=o=null)):a||!1===n.trailing||(a=setTimeout(l,f)),s}}(e=>{t.getBoundingClientRect().top<=Ot(e,o)&&(n(2,i=!0),function(t){setTimeout(()=>t.style.height="auto",a)}(t),c&&c(t),s())},200);function s(){document.removeEventListener("scroll",e,!0),window.removeEventListener("resize",e)}return e(),document.addEventListener("scroll",e,!0),window.addEventListener("resize",e),{destroy:()=>{s()}}},r,o,a,c,f,u]}class qt extends Et{constructor(t){super(),wt(this,t,Pt,Dt,c,{height:4,offset:5,fadeOption:0,resetHeightDelay:6,onload:7,placeholder:1})}}function It(t){let e,n;return{c(){e=w("img"),this.h()},l(t){e=z(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){S(e,"class","icon svelte-o9z31v"),e.src!==(n="images/github.svg")&&S(e,"src","images/github.svg"),S(e,"alt","Cakcuk Github Link")},m(t,n){v(t,e,n)},d(t){t&&y(e)}}}function Ut(t){let e,n;return{c(){e=w("img"),this.h()},l(t){e=z(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){S(e,"class","icon svelte-o9z31v"),e.src!==(n="images/twitter.svg")&&S(e,"src","images/twitter.svg"),S(e,"alt","Cakcuk Twitter Link")},m(t,n){v(t,e,n)},d(t){t&&y(e)}}}function jt(t){let e,n;return{c(){e=w("img"),this.h()},l(t){e=z(t,"IMG",{id:!0,alt:!0,src:!0,class:!0}),this.h()},h(){S(e,"id","logo"),S(e,"alt","Cakcuk Logo"),e.src!==(n="images/cakcuk_logo.png")&&S(e,"src","images/cakcuk_logo.png"),S(e,"class","svelte-o9z31v")},m(t,n){v(t,e,n)},d(t){t&&y(e)}}}function Tt(t){let e,n,r,o,s,a,c,l,i,u,d,p,h,m,g,b,x,k,C,N,D,O,P,q,I;return a=new qt({props:{fadeOption:null,$$slots:{default:[It]},$$scope:{ctx:t}}}),i=new qt({props:{fadeOption:null,$$slots:{default:[Ut]},$$scope:{ctx:t}}}),m=new qt({props:{fadeOption:null,$$slots:{default:[jt]},$$scope:{ctx:t}}}),{c(){e=w("div"),n=w("div"),r=w("div"),o=w("span"),s=w("a"),gt(a.$$.fragment),c=E("\n                 \n                "),l=w("a"),gt(i.$$.fragment),u=_(),d=w("ul"),p=w("li"),h=w("a"),gt(m.$$.fragment),g=_(),b=w("li"),x=w("a"),k=E("FAQ"),C=_(),N=w("li"),D=w("a"),O=E("Docs"),this.h()},l(t){e=z(t,"DIV",{class:!0});var f=L(e);n=z(f,"DIV",{class:!0});var $=L(n);r=z($,"DIV",{class:!0});var v=L(r);o=z(v,"SPAN",{class:!0});var w=L(o);s=z(w,"A",{href:!0,target:!0,class:!0});var E=L(s);$t(a.$$.fragment,E),E.forEach(y),c=A(w,"\n                 \n                "),l=z(w,"A",{href:!0,target:!0,class:!0});var _=L(l);$t(i.$$.fragment,_),_.forEach(y),w.forEach(y),v.forEach(y),u=R($),d=z($,"UL",{class:!0});var S=L(d);p=z(S,"LI",{class:!0});var P=L(p);h=z(P,"A",{class:!0,target:!0,href:!0});var q=L(h);$t(m.$$.fragment,q),q.forEach(y),P.forEach(y),g=R(S),b=z(S,"LI",{class:!0});var I=L(b);x=z(I,"A",{class:!0,target:!0,href:!0});var U=L(x);k=A(U,"FAQ"),U.forEach(y),I.forEach(y),C=R(S),N=z(S,"LI",{class:!0});var j=L(N);D=z(j,"A",{class:!0,target:!0,href:!0});var T=L(D);O=A(T,"Docs"),T.forEach(y),j.forEach(y),S.forEach(y),$.forEach(y),f.forEach(y),this.h()},h(){S(s,"href","https://github.com/isdzulqor/cakcuk"),S(s,"target","_blank"),S(s,"class","icon-link svelte-o9z31v"),S(l,"href","https://twitter.com/cakcukio"),S(l,"target","_blank"),S(l,"class","icon-link svelte-o9z31v"),S(o,"class","svelte-o9z31v"),S(r,"class","pure-menu-heading svelte-o9z31v"),S(h,"class","pure-menu-link svelte-o9z31v"),S(h,"target","_blank"),S(h,"href","https://cakcuk.io"),S(p,"class","pure-menu-item svelte-o9z31v"),S(x,"class","pure-menu-link svelte-o9z31v"),S(x,"target","_blank"),S(x,"href","https://cakcuk.io/faq"),S(b,"class","pure-menu-item svelte-o9z31v"),S(D,"class","pure-menu-link svelte-o9z31v"),S(D,"target","_blank"),S(D,"href","https://cakcuk.io/docs"),S(N,"class","pure-menu-item pure-menu-selected link-special svelte-o9z31v"),S(d,"class","pure-menu-list svelte-o9z31v"),S(n,"class",P="home-menu pure-menu-horizontal pure-menu-fixed "+t[0]+" svelte-o9z31v"),S(e,"class",q=f("docs"===t[1]?"hidden":"")+" svelte-o9z31v")},m(t,f){v(t,e,f),$(e,n),$(n,r),$(r,o),$(o,s),vt(a,s,null),$(o,c),$(o,l),vt(i,l,null),$(n,u),$(n,d),$(d,p),$(p,h),vt(m,h,null),$(d,g),$(d,b),$(b,x),$(x,k),$(d,C),$(d,N),$(N,D),$(D,O),I=!0},p(t,[r]){const o={};4&r&&(o.$$scope={dirty:r,ctx:t}),a.$set(o);const s={};4&r&&(s.$$scope={dirty:r,ctx:t}),i.$set(s);const c={};4&r&&(c.$$scope={dirty:r,ctx:t}),m.$set(c),(!I||1&r&&P!==(P="home-menu pure-menu-horizontal pure-menu-fixed "+t[0]+" svelte-o9z31v"))&&S(n,"class",P),(!I||2&r&&q!==(q=f("docs"===t[1]?"hidden":"")+" svelte-o9z31v"))&&S(e,"class",q)},i(t){I||(ut(a.$$.fragment,t),ut(i.$$.fragment,t),ut(m.$$.fragment,t),I=!0)},o(t){ft(a.$$.fragment,t),ft(i.$$.fragment,t),ft(m.$$.fragment,t),I=!1},d(t){t&&y(e),yt(a),yt(i),yt(m)}}}function Ht(t,e,n){let{state:r="play-menu"}=e,{segment:o}=e;return t.$set=t=>{"state"in t&&n(0,r=t.state),"segment"in t&&n(1,o=t.segment)},[r,o]}class Vt extends Et{constructor(t){super(),wt(this,t,Ht,Tt,c,{state:0,segment:1})}}function Bt(t){let e,n,r,o;e=new Vt({props:{segment:t[0]}});const s=t[2].default,a=l(s,t,t[1],null);return{c(){gt(e.$$.fragment),n=_(),r=w("main"),a&&a.c()},l(t){$t(e.$$.fragment,t),n=R(t),r=z(t,"MAIN",{});var o=L(r);a&&a.l(o),o.forEach(y)},m(t,s){vt(e,t,s),v(t,n,s),v(t,r,s),a&&a.m(r,null),o=!0},p(t,[n]){const r={};1&n&&(r.segment=t[0]),e.$set(r),a&&a.p&&2&n&&u(a,s,t,t[1],n,null,null)},i(t){o||(ut(e.$$.fragment,t),ut(a,t),o=!0)},o(t){ft(e.$$.fragment,t),ft(a,t),o=!1},d(t){yt(e,t),t&&y(n),t&&y(r),a&&a.d(t)}}}function Mt(t,e,n){let{segment:r}=e,{$$slots:o={},$$scope:s}=e;return t.$set=t=>{"segment"in t&&n(0,r=t.segment),"$$scope"in t&&n(1,s=t.$$scope)},[r,s,o]}class Gt extends Et{constructor(t){super(),wt(this,t,Mt,Bt,c,{segment:0})}}function Ft(t){let e,n,r=t[1].stack+"";return{c(){e=w("pre"),n=E(r)},l(t){e=z(t,"PRE",{});var o=L(e);n=A(o,r),o.forEach(y)},m(t,r){v(t,e,r),$(e,n)},p(t,e){2&e&&r!==(r=t[1].stack+"")&&C(n,r)},d(t){t&&y(e)}}}function Jt(e){let n,r,o,s,a,c,l,i,u,f=e[1].message+"";document.title=n=e[0];let d=e[2]&&e[1].stack&&Ft(e);return{c(){r=_(),o=w("h1"),s=E(e[0]),a=_(),c=w("p"),l=E(f),i=_(),d&&d.c(),u=x(),this.h()},l(t){q('[data-svelte="svelte-1o9r2ue"]',document.head).forEach(y),r=R(t),o=z(t,"H1",{class:!0});var n=L(o);s=A(n,e[0]),n.forEach(y),a=R(t),c=z(t,"P",{class:!0});var p=L(c);l=A(p,f),p.forEach(y),i=R(t),d&&d.l(t),u=x(),this.h()},h(){S(o,"class","svelte-8od9u6"),S(c,"class","svelte-8od9u6")},m(t,e){v(t,r,e),v(t,o,e),$(o,s),v(t,a,e),v(t,c,e),$(c,l),v(t,i,e),d&&d.m(t,e),v(t,u,e)},p(t,[e]){1&e&&n!==(n=t[0])&&(document.title=n),1&e&&C(s,t[0]),2&e&&f!==(f=t[1].message+"")&&C(l,f),t[2]&&t[1].stack?d?d.p(t,e):(d=Ft(t),d.c(),d.m(u.parentNode,u)):d&&(d.d(1),d=null)},i:t,o:t,d(t){t&&y(r),t&&y(o),t&&y(a),t&&y(c),t&&y(i),d&&d.d(t),t&&y(u)}}}function Kt(t,e,n){let{status:r}=e,{error:o}=e;return t.$set=t=>{"status"in t&&n(0,r=t.status),"error"in t&&n(1,o=t.error)},[r,o,!1]}class Qt extends Et{constructor(t){super(),wt(this,t,Kt,Jt,c,{status:0,error:1})}}function Yt(t){let e,r,o;const s=[t[4].props];var a=t[4].component;function c(t){let e={};for(let t=0;t<s.length;t+=1)e=n(e,s[t]);return{props:e}}return a&&(e=new a(c())),{c(){e&&gt(e.$$.fragment),r=x()},l(t){e&&$t(e.$$.fragment,t),r=x()},m(t,n){e&&vt(e,t,n),v(t,r,n),o=!0},p(t,n){const o=16&n?ht(s,[mt(t[4].props)]):{};if(a!==(a=t[4].component)){if(e){lt();const t=e;ft(t.$$.fragment,1,0,()=>{yt(t,1)}),it()}a?(e=new a(c()),gt(e.$$.fragment),ut(e.$$.fragment,1),vt(e,r.parentNode,r)):e=null}else a&&e.$set(o)},i(t){o||(e&&ut(e.$$.fragment,t),o=!0)},o(t){e&&ft(e.$$.fragment,t),o=!1},d(t){t&&y(r),e&&yt(e,t)}}}function Wt(t){let e,n;return e=new Qt({props:{error:t[0],status:t[1]}}),{c(){gt(e.$$.fragment)},l(t){$t(e.$$.fragment,t)},m(t,r){vt(e,t,r),n=!0},p(t,n){const r={};1&n&&(r.error=t[0]),2&n&&(r.status=t[1]),e.$set(r)},i(t){n||(ut(e.$$.fragment,t),n=!0)},o(t){ft(e.$$.fragment,t),n=!1},d(t){yt(e,t)}}}function Xt(t){let e,n,r,o;const s=[Wt,Yt],a=[];function c(t,e){return t[0]?0:1}return e=c(t),n=a[e]=s[e](t),{c(){n.c(),r=x()},l(t){n.l(t),r=x()},m(t,n){a[e].m(t,n),v(t,r,n),o=!0},p(t,o){let l=e;e=c(t),e===l?a[e].p(t,o):(lt(),ft(a[l],1,1,()=>{a[l]=null}),it(),n=a[e],n||(n=a[e]=s[e](t),n.c()),ut(n,1),n.m(r.parentNode,r))},i(t){o||(ut(n),o=!0)},o(t){ft(n),o=!1},d(t){a[e].d(t),t&&y(r)}}}function Zt(t){let e,r;const o=[{segment:t[2][0]},t[3].props];let s={$$slots:{default:[Xt]},$$scope:{ctx:t}};for(let t=0;t<o.length;t+=1)s=n(s,o[t]);return e=new Gt({props:s}),{c(){gt(e.$$.fragment)},l(t){$t(e.$$.fragment,t)},m(t,n){vt(e,t,n),r=!0},p(t,[n]){const r=12&n?ht(o,[4&n&&{segment:t[2][0]},8&n&&mt(t[3].props)]):{};147&n&&(r.$$scope={dirty:n,ctx:t}),e.$set(r)},i(t){r||(ut(e.$$.fragment,t),r=!0)},o(t){ft(e.$$.fragment,t),r=!1},d(t){yt(e,t)}}}function te(t,e,n){let{stores:r}=e,{error:o}=e,{status:s}=e,{segments:a}=e,{level0:c}=e,{level1:l=null}=e,{notify:i}=e;var u,f,d;return u=i,M().$$.after_update.push(u),f=kt,d=r,M().$$.context.set(f,d),t.$set=t=>{"stores"in t&&n(5,r=t.stores),"error"in t&&n(0,o=t.error),"status"in t&&n(1,s=t.status),"segments"in t&&n(2,a=t.segments),"level0"in t&&n(3,c=t.level0),"level1"in t&&n(4,l=t.level1),"notify"in t&&n(6,i=t.notify)},[o,s,a,c,l,r,i]}class ee extends Et{constructor(t){super(),wt(this,t,te,Zt,c,{stores:5,error:0,status:1,segments:2,level0:3,level1:4,notify:6})}}const ne=[],re=[{js:()=>import("./index.3bfc3855.js"),css:[]}],oe=[{pattern:/^\/$/,parts:[{i:0}]}];const se="undefined"!=typeof __SAPPER__&&__SAPPER__;let ae,ce,le,ie=!1,ue=[],fe="{}";const de={page:function(t){const e=xt(t);let n=!0;return{notify:function(){n=!0,e.update(t=>t)},set:function(t){n=!1,e.set(t)},subscribe:function(t){let r;return e.subscribe(e=>{(void 0===r||n&&e!==r)&&t(r=e)})}}}({}),preloading:xt(null),session:xt(se&&se.session)};let pe,he;de.session.subscribe(async t=>{if(pe=t,!ie)return;he=!0;const e=Ee(new URL(location.href)),n=ce={},{redirect:r,props:o,branch:s}=await Se(e);n===ce&&await ke(r,s,o,e.page)});let me,ge=null;let $e,ve=1;const ye="undefined"!=typeof history?history:{pushState:(t,e,n)=>{},replaceState:(t,e,n)=>{},scrollRestoration:""},be={};function we(t){const e=Object.create(null);return t.length>0&&t.slice(1).split("&").forEach(t=>{let[,n,r=""]=/([^=]*)(?:=(.*))?/.exec(decodeURIComponent(t.replace(/\+/g," ")));"string"==typeof e[n]&&(e[n]=[e[n]]),"object"==typeof e[n]?e[n].push(r):e[n]=r}),e}function Ee(t){if(t.origin!==location.origin)return null;if(!t.pathname.startsWith(se.baseUrl))return null;let e=t.pathname.slice(se.baseUrl.length);if(""===e&&(e="/"),!ne.some(t=>t.test(e)))for(let n=0;n<oe.length;n+=1){const r=oe[n],o=r.pattern.exec(e);if(o){const n=we(t.search),s=r.parts[r.parts.length-1],a=s.params?s.params(o):{},c={host:location.host,path:e,query:n,params:a};return{href:t.href,route:r,match:o,page:c}}}}function _e(){return{x:pageXOffset,y:pageYOffset}}async function xe(t,e,n,r){if(e)$e=e;else{const t=_e();be[$e]=t,e=$e=++ve,be[$e]=n?t:{x:0,y:0}}$e=e,ae&&de.preloading.set(!0);const o=ge&&ge.href===t.href?ge.promise:Se(t);ge=null;const s=ce={},{redirect:a,props:c,branch:l}=await o;if(s===ce&&(await ke(a,l,c,t.page),document.activeElement&&document.activeElement.blur(),!n)){let t=be[e];if(r){const e=document.getElementById(r.slice(1));e&&(t={x:0,y:e.getBoundingClientRect().top+scrollY})}be[$e]=t,t&&scrollTo(t.x,t.y)}}async function ke(t,e,n,r){if(t)return function(t,e={replaceState:!1}){const n=Ee(new URL(t,document.baseURI));return n?(ye[e.replaceState?"replaceState":"pushState"]({id:$e},"",t),xe(n,null).then(()=>{})):(location.href=t,new Promise(t=>{}))}(t.location,{replaceState:!0});if(de.page.set(r),de.preloading.set(!1),ae)ae.$set(n);else{n.stores={page:{subscribe:de.page.subscribe},preloading:{subscribe:de.preloading.subscribe},session:de.session},n.level0={props:await le},n.notify=de.page.notify;const t=document.querySelector("#sapper-head-start"),e=document.querySelector("#sapper-head-end");if(t&&e){for(;t.nextSibling!==e;)ze(t.nextSibling);ze(t),ze(e)}ae=new ee({target:me,props:n,hydrate:!0})}ue=e,fe=JSON.stringify(r.query),ie=!0,he=!1}async function Se(t){const{route:e,page:n}=t,r=n.path.split("/").filter(Boolean);let o=null;const s={error:null,status:200,segments:[r[0]]},a={fetch:(t,e)=>fetch(t,e),redirect:(t,e)=>{if(o&&(o.statusCode!==t||o.location!==e))throw new Error("Conflicting redirects");o={statusCode:t,location:e}},error:(t,e)=>{s.error="string"==typeof e?new Error(e):e,s.status=t}};let c;le||(le=se.preloaded[0]||St.call(a,{host:n.host,path:n.path,query:n.query,params:{}},pe));let l=1;try{const o=JSON.stringify(n.query),i=e.pattern.exec(n.path);let u=!1;c=await Promise.all(e.parts.map(async(e,c)=>{const f=r[c];if(function(t,e,n,r){if(r!==fe)return!0;const o=ue[t];return!!o&&(e!==o.segment||(!(!o.match||JSON.stringify(o.match.slice(1,t+2))===JSON.stringify(n.slice(1,t+2)))||void 0))}(c,f,i,o)&&(u=!0),s.segments[l]=r[c+1],!e)return{segment:f};const d=l++;if(!he&&!u&&ue[c]&&ue[c].part===e.i)return ue[c];u=!1;const{default:p,preload:h}=await function(t){const e="string"==typeof t.css?[]:t.css.map(Le);return e.unshift(t.js()),Promise.all(e).then(t=>t[0])}(re[e.i]);let m;return m=ie||!se.preloaded[c+1]?h?await h.call(a,{host:n.host,path:n.path,query:n.query,params:e.params?e.params(t.match):{}},pe):{}:se.preloaded[c+1],s["level"+d]={component:p,props:m,segment:f,match:i,part:e.i}}))}catch(t){s.error=t,s.status=500,c=[]}return{redirect:o,props:s,branch:c}}function Le(t){const e="client/"+t;if(!document.querySelector(`link[href="${e}"]`))return new Promise((t,n)=>{const r=document.createElement("link");r.rel="stylesheet",r.href=e,r.onload=()=>t(),r.onerror=n,document.head.appendChild(r)})}function ze(t){t.parentNode.removeChild(t)}function Ae(t){const e=Ee(new URL(t,document.baseURI));if(e)return ge&&t===ge.href||function(t,e){ge={href:t,promise:e}}(t,Se(e)),ge.promise}let Re;function Ce(t){clearTimeout(Re),Re=setTimeout(()=>{Ne(t)},20)}function Ne(t){const e=Oe(t.target);e&&"prefetch"===e.rel&&Ae(e.href)}function De(t){if(1!==function(t){return null===t.which?t.button:t.which}(t))return;if(t.metaKey||t.ctrlKey||t.shiftKey)return;if(t.defaultPrevented)return;const e=Oe(t.target);if(!e)return;if(!e.href)return;const n="object"==typeof e.href&&"SVGAnimatedString"===e.href.constructor.name,r=String(n?e.href.baseVal:e.href);if(r===location.href)return void(location.hash||t.preventDefault());if(e.hasAttribute("download")||"external"===e.getAttribute("rel"))return;if(n?e.target.baseVal:e.target)return;const o=new URL(r);if(o.pathname===location.pathname&&o.search===location.search)return;const s=Ee(o);if(s){xe(s,null,e.hasAttribute("sapper-noscroll"),o.hash),t.preventDefault(),ye.pushState({id:$e},"",o.href)}}function Oe(t){for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;return t}function Pe(t){if(be[$e]=_e(),t.state){const e=Ee(new URL(location.href));e?xe(e,t.state.id):location.href=location.href}else ve=ve+1,function(t){$e=t}(ve),ye.replaceState({id:$e},"",location.href)}var qe;qe={target:document.querySelector("#sapper")},"scrollRestoration"in ye&&(ye.scrollRestoration="manual"),addEventListener("beforeunload",()=>{ye.scrollRestoration="auto"}),addEventListener("load",()=>{ye.scrollRestoration="manual"}),function(t){me=t}(qe.target),addEventListener("click",De),addEventListener("popstate",Pe),addEventListener("touchstart",Ne),addEventListener("mousemove",Ce),Promise.resolve().then(()=>{const{hash:t,href:e}=location;ye.replaceState({id:ve},"",e);const n=new URL(location.href);if(se.error)return function(t){const{host:e,pathname:n,search:r}=location,{session:o,preloaded:s,status:a,error:c}=se;le||(le=s&&s[0]),ke(null,[],{error:c,status:a,session:o,level0:{props:le},level1:{props:{status:a,error:c},component:Qt},segments:s},{host:e,path:n,query:we(r),params:{}})}();const r=Ee(n);return r?xe(r,ve,!0,t):void 0});export{C as A,b as B,O as C,D,N as E,lt as F,it as G,I as H,t as I,q as J,Et as S,_ as a,z as b,l as c,L as d,w as e,y as f,R as g,A as h,wt as i,S as j,v as k,$ as l,k as m,ut as n,ft as o,F as p,G as q,s as r,c as s,E as t,u,K as v,gt as w,$t as x,vt as y,yt as z};