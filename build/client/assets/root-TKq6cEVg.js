import{j as l,f as j,h as b,r as w,w as N,k as E,O as $,l as M,i as L,M as _,n as H,S as T,o as R}from"./chunk-EF7DTUVF-DdtV_Bze.js";import{c as p,u as C}from"./compiler-runtime-_-phYlo9.js";import{L as O,c as U}from"./link-C74tZToc.js";import{J as I,z as V}from"./index-fuGLY9JQ.js";import{s as A}from"./resource-IEXyur_h.js";function P(t){const e=p.c(6);let n,c;e[0]!==t?({children:n,...c}=t,e[0]=t,e[1]=n,e[2]=c):(n=e[1],c=e[2]);let o;return e[3]!==n||e[4]!==c?(o=l.jsx(I,{...c,children:n}),e[3]=n,e[4]=c,e[5]=o):o=e[5],o}const D=()=>{const t=p.c(5),{i18n:e}=C(),n=j();let c;t[0]!==e||t[1]!==n?(c=A.map(i=>l.jsx(O,{className:"text-blue-500 transition-all hover:underline dark:text-white",to:`${n.pathname}`,language:i,keepSearchParams:!0,onClick:()=>e.changeLanguage(i),children:i},i)),t[0]=e,t[1]=n,t[2]=c):c=t[2];let o;return t[3]!==c?(o=l.jsx("div",{className:"fixed top-0 right-0 z-10 flex w-min gap-2 p-2",children:c}),t[3]=c,t[4]=o):o=t[4],o};function z(t){function e(o,i){const s=t[i];if(!s)throw new Error(`Unknown client hint: ${typeof i=="string"?i:"Unknown"}`);const a=o.split(";").map(r=>r.trim()).find(r=>r.startsWith(s.cookieName+"="))?.split("=")[1];return a?decodeURIComponent(a):null}function n(o){const i=typeof document<"u"?document.cookie:typeof o<"u"?o.headers.get("Cookie")??"":"";return Object.entries(t).reduce((s,[a,r])=>{const d=a;return"transform"in r?s[d]=r.transform(e(i,d)??r.fallback):s[d]=e(i,d)??r.fallback,s},{})}function c(){return`
// This block of code allows us to check if the client hints have changed and
// force a reload of the page with updated hints if they have so you don't get
// a flash of incorrect content.
function checkClientHints() {
	if (!navigator.cookieEnabled) return;

	// set a short-lived cookie to make sure we can set cookies
	document.cookie = "canSetCookies=1; Max-Age=60; SameSite=Lax; path=/";
	const canSetCookies = document.cookie.includes("canSetCookies=1");
	document.cookie = "canSetCookies=; Max-Age=-1; path=/";
	if (!canSetCookies) return;

	const cookies = document.cookie.split(';').map(c => c.trim()).reduce((acc, cur) => {
		const [key, value] = cur.split('=');
		acc[key] = value;
		return acc;
	}, {});

	let cookieChanged = false;
	const hints = [
	${Object.values(t).map(o=>{const i=JSON.stringify(o.cookieName);return`{ name: ${i}, actual: String(${o.getValueCode}), value: cookies[${i}] != null ? cookies[${i}] : encodeURIComponent("${o.fallback}") }`}).join(`,
`)}
	];
	for (const hint of hints) {
		document.cookie = encodeURIComponent(hint.name) + '=' + encodeURIComponent(hint.actual) + '; Max-Age=31536000; SameSite=Lax; path=/';
		if (decodeURIComponent(hint.value) !== hint.actual) {
			cookieChanged = true;
		}
	}
	if (cookieChanged) {
		// Hide the page content immediately to prevent visual flicker
		const style = document.createElement('style');
		style.textContent = 'html { visibility: hidden !important; }';
		document.head.appendChild(style);

		// Trigger the reload
		window.location.reload();
	}
}

checkClientHints();
`}return{getHints:n,getClientHintCheckScript:c}}const S={cookieName:"CH-prefers-color-scheme",getValueCode:"window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'",fallback:"light",transform(t){return t==="dark"?"dark":"light"}};function B(t,e=S.cookieName){const n=window.matchMedia("(prefers-color-scheme: dark)");function c(){const o=n.matches?"dark":"light";document.cookie=`${e}=${o}; Max-Age=31536000; SameSite=Lax; Path=/`,t(o)}return n.addEventListener("change",c),function(){n.removeEventListener("change",c)}}const y={cookieName:"CH-reduced-motion",getValueCode:"window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduce' : 'no-preference'",fallback:"no-preference",transform(t){return t==="reduce"?"reduce":"no-preference"}};function J(t,e=y.cookieName){const n=window.matchMedia("(prefers-reduced-motion: reduce)");function c(){const o=n.matches?"reduce":"no-preference";document.cookie=`${e}=${o}; Max-Age=31536000; SameSite=Lax; Path=/`,t(o)}return n.addEventListener("change",c),function(){n.removeEventListener("change",c)}}const Z={cookieName:"CH-time-zone",getValueCode:"Intl.DateTimeFormat().resolvedOptions().timeZone",fallback:"UTC"},{getClientHintCheckScript:F}=z({theme:S,timeZone:Z,reducedMotion:y});function W(t){const e=p.c(9),{nonce:n}=t,{revalidate:c}=b();let o,i;e[0]!==c?(o=()=>B(()=>c()),i=[c],e[0]=c,e[1]=o,e[2]=i):(o=e[1],i=e[2]),w.useEffect(o,i);let s,a;e[3]!==c?(s=()=>J(()=>c()),a=[c],e[3]=c,e[4]=s,e[5]=a):(s=e[4],a=e[5]),w.useEffect(s,a);let r;e[6]===Symbol.for("react.memo_cache_sentinel")?(r={__html:F()},e[6]=r):r=e[6];let d;return e[7]!==n?(d=l.jsx("script",{nonce:n,dangerouslySetInnerHTML:r}),e[7]=n,e[8]=d):d=e[8],d}const G="/assets/tailwind-BetNborj.css",te=()=>[{rel:"stylesheet",href:G},{rel:"icon",href:"/favicon.ico?v=2"}],ne={i18n:"common"},oe=N(function(e){const n=p.c(6),{loaderData:c}=e,{clientEnv:o}=c,i=c.hints.theme??"system";let s;n[0]===Symbol.for("react.memo_cache_sentinel")?(s=l.jsx($,{}),n[0]=s):s=n[0];let a;n[1]!==o?(a=l.jsx(K,{clientEnv:o,children:s}),n[1]=o,n[2]=a):a=n[2];let r;return n[3]!==i||n[4]!==a?(r=l.jsx(P,{attribute:"class",defaultTheme:i,children:a}),n[3]=i,n[4]=a,n[5]=r):r=n[5],r});function K(t){const e=p.c(23),{children:n,clientEnv:c}=t,{i18n:o}=C(),{resolvedTheme:i}=V();let s;e[0]!==i?(s=U("overflow-y-auto overflow-x-hidden",i),e[0]=i,e[1]=s):s=e[1];const a=o.language;let r;e[2]!==o?(r=o.dir(),e[2]=o,e[3]=r):r=e[3];let d;e[4]!==i?(d={colorScheme:i},e[4]=i,e[5]=d):d=e[5];let m;e[6]===Symbol.for("react.memo_cache_sentinel")?(m=l.jsxs("head",{children:[l.jsx(W,{}),l.jsx("meta",{charSet:"utf-8"}),l.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),l.jsx(_,{}),l.jsx(H,{})]}),e[6]=m):m=e[6];let u;e[7]!==c?.NODE_ENV?(u=c?.NODE_ENV==="development"&&l.jsx(D,{}),e[7]=c?.NODE_ENV,e[8]=u):u=e[8];let k;e[9]===Symbol.for("react.memo_cache_sentinel")?(k=l.jsx(T,{}),e[9]=k):k=e[9];const v=`window.env = ${JSON.stringify(c??{})}`;let h;e[10]!==v?(h=l.jsx("script",{dangerouslySetInnerHTML:{__html:v}}),e[10]=v,e[11]=h):h=e[11];let g;e[12]===Symbol.for("react.memo_cache_sentinel")?(g=l.jsx(R,{}),e[12]=g):g=e[12];let f;e[13]!==n||e[14]!==u||e[15]!==h?(f=l.jsxs("body",{className:"h-full w-full",children:[u,n,k,h,g]}),e[13]=n,e[14]=u,e[15]=h,e[16]=f):f=e[16];let x;return e[17]!==o.language||e[18]!==s||e[19]!==f||e[20]!==r||e[21]!==d?(x=l.jsxs("html",{className:s,lang:a,dir:r,style:d,children:[m,f]}),e[17]=o.language,e[18]=s,e[19]=f,e[20]=r,e[21]=d,e[22]=x):x=e[22],x}const ce=E(()=>{const t=p.c(13),e=M(),{t:n}=C(),o=(()=>{if(!L(e))return"500";switch(e.status){case 200:return"200";case 403:return"403";case 404:return"404";default:return"500"}})(),i=`error.${o}.title`;let s;t[0]!==n||t[1]!==i?(s=n(i),t[0]=n,t[1]=i,t[2]=s):s=t[2];let a;t[3]!==s?(a=l.jsx("h1",{className:"w-full pb-2 text-center text-2xl text-red-600",children:s}),t[3]=s,t[4]=a):a=t[4];const r=`error.${o}.description`;let d;t[5]!==n||t[6]!==r?(d=n(r),t[5]=n,t[6]=r,t[7]=d):d=t[7];let m;t[8]!==d?(m=l.jsx("p",{className:"w-full text-center text-lg dark:text-white",children:d}),t[8]=d,t[9]=m):m=t[9];let u;return t[10]!==a||t[11]!==m?(u=l.jsx("div",{className:"relative flex h-full min-h-screen w-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 placeholder-index sm:pt-8 sm:pb-16 dark:bg-white dark:from-blue-950 dark:to-blue-900",children:l.jsx("div",{className:"relative mx-auto max-w-[90rem] sm:px-6 lg:px-8",children:l.jsxs("div",{className:"relative flex min-h-72 flex-col justify-center p-1 sm:overflow-hidden sm:rounded-2xl md:p-4 lg:p-6",children:[a,m]})})}),t[10]=a,t[11]=m,t[12]=u):u=t[12],u});export{ce as ErrorBoundary,oe as default,ne as handle,te as links};
