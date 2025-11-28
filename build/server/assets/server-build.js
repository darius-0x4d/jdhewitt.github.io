import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { createInstance } from 'i18next';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { initReactI18next, I18nextProvider, useTranslation } from 'react-i18next';
import { ServerRouter, useSearchParams, Link as Link$1, useLocation, useRevalidator, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, Outlet, useRouteError, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, href, useNavigate } from 'react-router';
import { i as i18next, r as resources, a as i18n, s as supportedLanguages } from './index-Cc0_0yrO.js';
import { c } from 'react/compiler-runtime';
import clsx$1, { clsx } from 'clsx';
import { ThemeProvider as ThemeProvider$1, useTheme } from 'next-themes';
import { getHintUtils } from '@epic-web/client-hints';
import { clientHint as clientHint$2, subscribeToSchemeChange } from '@epic-web/client-hints/color-scheme';
import { clientHint, subscribeToMotionChange } from '@epic-web/client-hints/reduced-motion';
import { clientHint as clientHint$1 } from '@epic-web/client-hints/time-zone';
import { useEffect, useState } from 'react';
import { IconSun, IconMoon, IconCheck, IconMail, IconBrandInstagram, IconPhone } from '@tabler/icons-react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cacheHeader } from 'pretty-cache-header';
import { z } from 'zod/v4';
import { generateSitemapIndex } from '@forge42/seo-tools/sitemap';
import { generateRemixSitemap } from '@forge42/seo-tools/remix/sitemap';
import { generateRobotsTxt } from '@forge42/seo-tools/robots';
import 'hono/factory';
import 'http';
import 'http2';
import 'stream';
import 'crypto';
import 'hono/utils/mime';
import 'fs';
import 'path';
import 'hono';
import 'hono/logger';
import 'remix-hono/i18next';
import 'remix-i18next/server';

const streamTimeout = 1e4;
async function handleRequest(request, responseStatusCode, responseHeaders, context, appContext) {
  const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";
  const instance = createInstance();
  const lng = appContext.lang;
  const ns = i18next.getRouteNamespaces(context);
  await instance.use(initReactI18next).init({
    ...i18n,
    // spread the configuration
    lng,
    // The locale we detected above
    ns,
    // The namespaces the routes about to render wants to use
    resources
  });
  return new Promise((resolve, reject) => {
    let didError = false;
    const {
      pipe,
      abort
    } = renderToPipeableStream(/* @__PURE__ */ jsx(I18nextProvider, { i18n: instance, children: /* @__PURE__ */ jsx(ServerRouter, { context, url: request.url }) }), {
      [callbackName]: () => {
        const body = new PassThrough();
        const stream = createReadableStreamFromReadable(body);
        responseHeaders.set("Content-Type", "text/html");
        resolve(new Response(stream, {
          headers: responseHeaders,
          status: didError ? 500 : responseStatusCode
        }));
        pipe(body);
      },
      onShellError(error) {
        reject(error);
      },
      onError(error) {
        didError = true;
        console.error(error);
      }
    });
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const handleDataRequest = async (response, {
  request
}) => {
  const isGet = request.method.toLowerCase() === "get";
  const purpose = request.headers.get("Purpose") || request.headers.get("X-Purpose") || request.headers.get("Sec-Purpose") || request.headers.get("Sec-Fetch-Purpose") || request.headers.get("Moz-Purpose");
  const isPrefetch = purpose === "prefetch";
  if (isGet && isPrefetch && !response.headers.has("Cache-Control")) {
    response.headers.set("Cache-Control", "private, max-age=10");
  }
  return response;
};

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: handleRequest,
	handleDataRequest,
	streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

function ThemeProvider(t0) {
  const $ = c(6);
  let children;
  let props;
  if ($[0] !== t0) {
    ({
      children,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = props;
  } else {
    children = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== children || $[4] !== props) {
    t1 = /* @__PURE__ */ jsx(ThemeProvider$1, { ...props, children });
    $[3] = children;
    $[4] = props;
    $[5] = t1;
  } else {
    t1 = $[5];
  }
  return t1;
}

const useEnhancedTo = (t0) => {
  const {
    language,
    to,
    keepSearchParams
  } = t0;
  const [params] = useSearchParams();
  const {
    lng,
    ...searchParams
  } = Object.fromEntries(params.entries());
  const lang = language ?? lng;
  const newSearchParams = new URLSearchParams(searchParams);
  const searchString = newSearchParams.toString();
  const hasSearchParams = searchString.length > 0;
  const appendSearchParams = lang || hasSearchParams;
  let t1;
  t1 = to + (appendSearchParams ? `?${keepSearchParams && hasSearchParams ? `${searchString}${lang ? "&" : ""}` : ""}${lang ? `lng=${lang}` : ""}` : "");
  const newPath = t1;
  return newPath;
};

const Link = (t0) => {
  const $ = c(16);
  let language;
  let props;
  let t1;
  let t2;
  let t3;
  let to;
  if ($[0] !== t0) {
    ({
      prefetch: t1,
      viewTransition: t2,
      keepSearchParams: t3,
      to,
      language,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = language;
    $[2] = props;
    $[3] = t1;
    $[4] = t2;
    $[5] = t3;
    $[6] = to;
  } else {
    language = $[1];
    props = $[2];
    t1 = $[3];
    t2 = $[4];
    t3 = $[5];
    to = $[6];
  }
  const prefetch = t1 === void 0 ? "intent" : t1;
  const viewTransition = t2 === void 0 ? true : t2;
  const keepSearchParams = t3 === void 0 ? false : t3;
  let t4;
  if ($[7] !== keepSearchParams || $[8] !== language || $[9] !== to) {
    t4 = {
      language,
      to,
      keepSearchParams
    };
    $[7] = keepSearchParams;
    $[8] = language;
    $[9] = to;
    $[10] = t4;
  } else {
    t4 = $[10];
  }
  const enhancedTo = useEnhancedTo(t4);
  let t5;
  if ($[11] !== enhancedTo || $[12] !== prefetch || $[13] !== props || $[14] !== viewTransition) {
    t5 = /* @__PURE__ */ jsx(Link$1, { prefetch, viewTransition, to: enhancedTo, ...props });
    $[11] = enhancedTo;
    $[12] = prefetch;
    $[13] = props;
    $[14] = viewTransition;
    $[15] = t5;
  } else {
    t5 = $[15];
  }
  return t5;
};

const LanguageSwitcher = () => {
  const $ = c(5);
  const {
    i18n
  } = useTranslation();
  const location = useLocation();
  let t0;
  if ($[0] !== i18n || $[1] !== location) {
    t0 = supportedLanguages.map((language) => /* @__PURE__ */ jsx(Link, { className: "text-blue-500 transition-all hover:underline dark:text-white", to: `${location.pathname}`, language, keepSearchParams: true, onClick: () => i18n.changeLanguage(language), children: language }, language));
    $[0] = i18n;
    $[1] = location;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  let t1;
  if ($[3] !== t0) {
    t1 = /* @__PURE__ */ jsx("div", { className: "fixed top-0 right-0 z-10 flex w-min gap-2 p-2", children: t0 });
    $[3] = t0;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  return t1;
};

const {
  getHints,
  getClientHintCheckScript
} = getHintUtils({
  theme: clientHint$2,
  timeZone: clientHint$1,
  reducedMotion: clientHint
  // add other hints here
});
function ClientHintCheck(t0) {
  const $ = c(9);
  const {
    nonce
  } = t0;
  const {
    revalidate
  } = useRevalidator();
  let t1;
  let t2;
  if ($[0] !== revalidate) {
    t1 = () => subscribeToSchemeChange(() => revalidate());
    t2 = [revalidate];
    $[0] = revalidate;
    $[1] = t1;
    $[2] = t2;
  } else {
    t1 = $[1];
    t2 = $[2];
  }
  useEffect(t1, t2);
  let t3;
  let t4;
  if ($[3] !== revalidate) {
    t3 = () => subscribeToMotionChange(() => revalidate());
    t4 = [revalidate];
    $[3] = revalidate;
    $[4] = t3;
    $[5] = t4;
  } else {
    t3 = $[4];
    t4 = $[5];
  }
  useEffect(t3, t4);
  let t5;
  if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
    t5 = {
      __html: getClientHintCheckScript()
    };
    $[6] = t5;
  } else {
    t5 = $[6];
  }
  let t6;
  if ($[7] !== nonce) {
    t6 = /* @__PURE__ */ jsx("script", { nonce, dangerouslySetInnerHTML: t5 });
    $[7] = nonce;
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  return t6;
}

const tailwindcss = "/assets/tailwind-BetNborj.css";

async function loader$4({
  context,
  request
}) {
  const {
    lang,
    clientEnv
  } = context;
  const hints = getHints(request);
  return {
    lang,
    clientEnv,
    hints
  };
}
const links = () => [{
  rel: "stylesheet",
  href: tailwindcss
}, {
  rel: "icon",
  href: "/favicon.ico?v=2"
}];
const handle = {
  i18n: "common"
};
const root = UNSAFE_withComponentProps(function App(t0) {
  const $ = c(6);
  const {
    loaderData
  } = t0;
  const {
    clientEnv
  } = loaderData;
  const t1 = loaderData.hints.theme ?? "system";
  let t2;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = /* @__PURE__ */jsx(Outlet, {});
    $[0] = t2;
  } else {
    t2 = $[0];
  }
  let t3;
  if ($[1] !== clientEnv) {
    t3 = /* @__PURE__ */jsx(ThemedLayout, {
      clientEnv,
      children: t2
    });
    $[1] = clientEnv;
    $[2] = t3;
  } else {
    t3 = $[2];
  }
  let t4;
  if ($[3] !== t1 || $[4] !== t3) {
    t4 = /* @__PURE__ */jsx(ThemeProvider, {
      attribute: "class",
      defaultTheme: t1,
      children: t3
    });
    $[3] = t1;
    $[4] = t3;
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  return t4;
});
function ThemedLayout(t0) {
  const $ = c(23);
  const {
    children,
    clientEnv
  } = t0;
  const {
    i18n
  } = useTranslation();
  const {
    resolvedTheme
  } = useTheme();
  let t1;
  if ($[0] !== resolvedTheme) {
    t1 = clsx("overflow-y-auto overflow-x-hidden", resolvedTheme);
    $[0] = resolvedTheme;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const t2 = i18n.language;
  let t3;
  if ($[2] !== i18n) {
    t3 = i18n.dir();
    $[2] = i18n;
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  let t4;
  if ($[4] !== resolvedTheme) {
    t4 = {
      colorScheme: resolvedTheme
    };
    $[4] = resolvedTheme;
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  let t5;
  if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
    t5 = /* @__PURE__ */jsxs("head", {
      children: [/* @__PURE__ */jsx(ClientHintCheck, {}), /* @__PURE__ */jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */jsx(Meta, {}), /* @__PURE__ */jsx(Links, {})]
    });
    $[6] = t5;
  } else {
    t5 = $[6];
  }
  let t6;
  if ($[7] !== clientEnv?.NODE_ENV) {
    t6 = clientEnv?.NODE_ENV === "development" && /* @__PURE__ */jsx(LanguageSwitcher, {});
    $[7] = clientEnv?.NODE_ENV;
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  let t7;
  if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
    t7 = /* @__PURE__ */jsx(ScrollRestoration, {});
    $[9] = t7;
  } else {
    t7 = $[9];
  }
  const t8 = `window.env = ${JSON.stringify(clientEnv ?? {})}`;
  let t9;
  if ($[10] !== t8) {
    t9 = /* @__PURE__ */jsx("script", {
      dangerouslySetInnerHTML: {
        __html: t8
      }
    });
    $[10] = t8;
    $[11] = t9;
  } else {
    t9 = $[11];
  }
  let t10;
  if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
    t10 = /* @__PURE__ */jsx(Scripts, {});
    $[12] = t10;
  } else {
    t10 = $[12];
  }
  let t11;
  if ($[13] !== children || $[14] !== t6 || $[15] !== t9) {
    t11 = /* @__PURE__ */jsxs("body", {
      className: "h-full w-full",
      children: [t6, children, t7, t9, t10]
    });
    $[13] = children;
    $[14] = t6;
    $[15] = t9;
    $[16] = t11;
  } else {
    t11 = $[16];
  }
  let t12;
  if ($[17] !== i18n.language || $[18] !== t1 || $[19] !== t11 || $[20] !== t3 || $[21] !== t4) {
    t12 = /* @__PURE__ */jsxs("html", {
      className: t1,
      lang: t2,
      dir: t3,
      style: t4,
      children: [t5, t11]
    });
    $[17] = i18n.language;
    $[18] = t1;
    $[19] = t11;
    $[20] = t3;
    $[21] = t4;
    $[22] = t12;
  } else {
    t12 = $[22];
  }
  return t12;
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(() => {
  const $ = c(13);
  const error = useRouteError();
  const {
    t
  } = useTranslation();
  const statusCode = () => {
    if (!isRouteErrorResponse(error)) {
      return "500";
    }
    switch (error.status) {
      case 200:
        {
          return "200";
        }
      case 403:
        {
          return "403";
        }
      case 404:
        {
          return "404";
        }
      default:
        {
          return "500";
        }
    }
  };
  const errorStatusCode = statusCode();
  const t0 = `error.${errorStatusCode}.title`;
  let t1;
  if ($[0] !== t || $[1] !== t0) {
    t1 = t(t0);
    $[0] = t;
    $[1] = t0;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  let t2;
  if ($[3] !== t1) {
    t2 = /* @__PURE__ */jsx("h1", {
      className: "w-full pb-2 text-center text-2xl text-red-600",
      children: t1
    });
    $[3] = t1;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  const t3 = `error.${errorStatusCode}.description`;
  let t4;
  if ($[5] !== t || $[6] !== t3) {
    t4 = t(t3);
    $[5] = t;
    $[6] = t3;
    $[7] = t4;
  } else {
    t4 = $[7];
  }
  let t5;
  if ($[8] !== t4) {
    t5 = /* @__PURE__ */jsx("p", {
      className: "w-full text-center text-lg dark:text-white",
      children: t4
    });
    $[8] = t4;
    $[9] = t5;
  } else {
    t5 = $[9];
  }
  let t6;
  if ($[10] !== t2 || $[11] !== t5) {
    t6 = /* @__PURE__ */jsx("div", {
      className: "relative flex h-full min-h-screen w-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 placeholder-index sm:pt-8 sm:pb-16 dark:bg-white dark:from-blue-950 dark:to-blue-900",
      children: /* @__PURE__ */jsx("div", {
        className: "relative mx-auto max-w-[90rem] sm:px-6 lg:px-8",
        children: /* @__PURE__ */jsxs("div", {
          className: "relative flex min-h-72 flex-col justify-center p-1 sm:overflow-hidden sm:rounded-2xl md:p-4 lg:p-6",
          children: [t2, t5]
        })
      })
    });
    $[10] = t2;
    $[11] = t5;
    $[12] = t6;
  } else {
    t6 = $[12];
  }
  return t6;
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	ErrorBoundary,
	ThemedLayout,
	default: root,
	handle,
	links,
	loader: loader$4
}, Symbol.toStringTag, { value: 'Module' }));

function cn$1(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Button(t0) {
  const $ = c(14);
  let className;
  let props;
  let size;
  let t1;
  let variant;
  if ($[0] !== t0) {
    ({
      className,
      variant,
      size,
      asChild: t1,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
    $[3] = size;
    $[4] = t1;
    $[5] = variant;
  } else {
    className = $[1];
    props = $[2];
    size = $[3];
    t1 = $[4];
    variant = $[5];
  }
  const asChild = t1 === void 0 ? false : t1;
  const Comp = asChild ? Slot : "button";
  let t2;
  if ($[6] !== className || $[7] !== size || $[8] !== variant) {
    t2 = cn$1(buttonVariants({
      variant,
      size,
      className
    }));
    $[6] = className;
    $[7] = size;
    $[8] = variant;
    $[9] = t2;
  } else {
    t2 = $[9];
  }
  let t3;
  if ($[10] !== Comp || $[11] !== props || $[12] !== t2) {
    t3 = /* @__PURE__ */ jsx(Comp, { "data-slot": "button", className: t2, ...props });
    $[10] = Comp;
    $[11] = props;
    $[12] = t2;
    $[13] = t3;
  } else {
    t3 = $[13];
  }
  return t3;
}

function DropdownMenu(t0) {
  const $ = c(4);
  let props;
  if ($[0] !== t0) {
    ({
      ...props
    } = t0);
    $[0] = t0;
    $[1] = props;
  } else {
    props = $[1];
  }
  let t1;
  if ($[2] !== props) {
    t1 = /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
    $[2] = props;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  return t1;
}
function DropdownMenuTrigger(t0) {
  const $ = c(4);
  let props;
  if ($[0] !== t0) {
    ({
      ...props
    } = t0);
    $[0] = t0;
    $[1] = props;
  } else {
    props = $[1];
  }
  let t1;
  if ($[2] !== props) {
    t1 = /* @__PURE__ */ jsx(DropdownMenuPrimitive.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
    $[2] = props;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  return t1;
}
function DropdownMenuContent(t0) {
  const $ = c(10);
  let className;
  let props;
  let t1;
  if ($[0] !== t0) {
    ({
      className,
      sideOffset: t1,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
    $[3] = t1;
  } else {
    className = $[1];
    props = $[2];
    t1 = $[3];
  }
  const sideOffset = t1 === void 0 ? 4 : t1;
  let t2;
  if ($[4] !== className) {
    t2 = cn$1("data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in", className);
    $[4] = className;
    $[5] = t2;
  } else {
    t2 = $[5];
  }
  let t3;
  if ($[6] !== props || $[7] !== sideOffset || $[8] !== t2) {
    t3 = /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.Content, { "data-slot": "dropdown-menu-content", sideOffset, className: t2, ...props }) });
    $[6] = props;
    $[7] = sideOffset;
    $[8] = t2;
    $[9] = t3;
  } else {
    t3 = $[9];
  }
  return t3;
}
function DropdownMenuItem(t0) {
  const $ = c(12);
  let className;
  let inset;
  let props;
  let t1;
  if ($[0] !== t0) {
    ({
      className,
      inset,
      variant: t1,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = inset;
    $[3] = props;
    $[4] = t1;
  } else {
    className = $[1];
    inset = $[2];
    props = $[3];
    t1 = $[4];
  }
  const variant = t1 === void 0 ? "default" : t1;
  let t2;
  if ($[5] !== className) {
    t2 = cn$1("data-[variant=destructive]:*:[svg]:!text-destructive relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[disabled]:opacity-50 data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", className);
    $[5] = className;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  let t3;
  if ($[7] !== inset || $[8] !== props || $[9] !== t2 || $[10] !== variant) {
    t3 = /* @__PURE__ */ jsx(DropdownMenuPrimitive.Item, { "data-slot": "dropdown-menu-item", "data-inset": inset, "data-variant": variant, className: t2, ...props });
    $[7] = inset;
    $[8] = props;
    $[9] = t2;
    $[10] = variant;
    $[11] = t3;
  } else {
    t3 = $[11];
  }
  return t3;
}

function ThemeSwitcher() {
  const $ = c(44);
  const {
    theme,
    setTheme
  } = useTheme();
  const {
    t
  } = useTranslation();
  let t0;
  let t1;
  if ($[0] !== theme) {
    t0 = () => {
      const themeColor = theme === "dark" ? "#020817" : "#fff";
      const metaThemeColor = document.querySelector("meta[name='theme-color']");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", themeColor);
      }
    };
    t1 = [theme];
    $[0] = theme;
    $[1] = t0;
    $[2] = t1;
  } else {
    t0 = $[1];
    t1 = $[2];
  }
  useEffect(t0, t1);
  let t2;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon-lg", className: "scale-95 rounded-full", children: [
      /* @__PURE__ */ jsx(IconSun, { className: "dark:-rotate-90 size-[1.2rem] rotate-0 scale-100 transition-all dark:scale-0" }),
      /* @__PURE__ */ jsx(IconMoon, { className: "absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle theme" })
    ] }) });
    $[3] = t2;
  } else {
    t2 = $[3];
  }
  let t3;
  if ($[4] !== setTheme) {
    t3 = () => setTheme("light");
    $[4] = setTheme;
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  let t4;
  if ($[6] !== t) {
    t4 = t("theme.light");
    $[6] = t;
    $[7] = t4;
  } else {
    t4 = $[7];
  }
  const t5 = theme !== "light" && "hidden";
  let t6;
  if ($[8] !== t5) {
    t6 = cn$1("ml-auto", t5);
    $[8] = t5;
    $[9] = t6;
  } else {
    t6 = $[9];
  }
  let t7;
  if ($[10] !== t6) {
    t7 = /* @__PURE__ */ jsx(IconCheck, { size: 14, className: t6 });
    $[10] = t6;
    $[11] = t7;
  } else {
    t7 = $[11];
  }
  let t8;
  if ($[12] !== t3 || $[13] !== t4 || $[14] !== t7) {
    t8 = /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: t3, children: [
      t4,
      " ",
      t7
    ] });
    $[12] = t3;
    $[13] = t4;
    $[14] = t7;
    $[15] = t8;
  } else {
    t8 = $[15];
  }
  let t9;
  if ($[16] !== setTheme) {
    t9 = () => setTheme("dark");
    $[16] = setTheme;
    $[17] = t9;
  } else {
    t9 = $[17];
  }
  let t10;
  if ($[18] !== t) {
    t10 = t("theme.dark");
    $[18] = t;
    $[19] = t10;
  } else {
    t10 = $[19];
  }
  const t11 = theme !== "dark" && "hidden";
  let t12;
  if ($[20] !== t11) {
    t12 = cn$1("ml-auto", t11);
    $[20] = t11;
    $[21] = t12;
  } else {
    t12 = $[21];
  }
  let t13;
  if ($[22] !== t12) {
    t13 = /* @__PURE__ */ jsx(IconCheck, { size: 14, className: t12 });
    $[22] = t12;
    $[23] = t13;
  } else {
    t13 = $[23];
  }
  let t14;
  if ($[24] !== t10 || $[25] !== t13 || $[26] !== t9) {
    t14 = /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: t9, children: [
      t10,
      t13
    ] });
    $[24] = t10;
    $[25] = t13;
    $[26] = t9;
    $[27] = t14;
  } else {
    t14 = $[27];
  }
  let t15;
  if ($[28] !== setTheme) {
    t15 = () => setTheme("system");
    $[28] = setTheme;
    $[29] = t15;
  } else {
    t15 = $[29];
  }
  let t16;
  if ($[30] !== t) {
    t16 = t("theme.system");
    $[30] = t;
    $[31] = t16;
  } else {
    t16 = $[31];
  }
  const t17 = theme !== "system" && "hidden";
  let t18;
  if ($[32] !== t17) {
    t18 = cn$1("ml-auto", t17);
    $[32] = t17;
    $[33] = t18;
  } else {
    t18 = $[33];
  }
  let t19;
  if ($[34] !== t18) {
    t19 = /* @__PURE__ */ jsx(IconCheck, { size: 14, className: t18 });
    $[34] = t18;
    $[35] = t19;
  } else {
    t19 = $[35];
  }
  let t20;
  if ($[36] !== t15 || $[37] !== t16 || $[38] !== t19) {
    t20 = /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: t15, children: [
      t16,
      t19
    ] });
    $[36] = t15;
    $[37] = t16;
    $[38] = t19;
    $[39] = t20;
  } else {
    t20 = $[39];
  }
  let t21;
  if ($[40] !== t14 || $[41] !== t20 || $[42] !== t8) {
    t21 = /* @__PURE__ */ jsxs(DropdownMenu, { modal: false, children: [
      t2,
      /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
        t8,
        t14,
        t20
      ] })
    ] });
    $[40] = t14;
    $[41] = t20;
    $[42] = t8;
    $[43] = t21;
  } else {
    t21 = $[43];
  }
  return t21;
}

function NavigationMenu(t0) {
  const $ = c(15);
  let children;
  let className;
  let props;
  let t1;
  if ($[0] !== t0) {
    ({
      className,
      children,
      viewport: t1,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = props;
    $[4] = t1;
  } else {
    children = $[1];
    className = $[2];
    props = $[3];
    t1 = $[4];
  }
  const viewport = t1 === void 0 ? true : t1;
  let t2;
  if ($[5] !== className) {
    t2 = cn$1("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", className);
    $[5] = className;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  let t3;
  if ($[7] !== viewport) {
    t3 = viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {});
    $[7] = viewport;
    $[8] = t3;
  } else {
    t3 = $[8];
  }
  let t4;
  if ($[9] !== children || $[10] !== props || $[11] !== t2 || $[12] !== t3 || $[13] !== viewport) {
    t4 = /* @__PURE__ */ jsxs(NavigationMenuPrimitive.Root, { "data-slot": "navigation-menu", "data-viewport": viewport, className: t2, ...props, children: [
      children,
      t3
    ] });
    $[9] = children;
    $[10] = props;
    $[11] = t2;
    $[12] = t3;
    $[13] = viewport;
    $[14] = t4;
  } else {
    t4 = $[14];
  }
  return t4;
}
function NavigationMenuList(t0) {
  const $ = c(8);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = cn$1("group flex flex-1 list-none items-center justify-center gap-1", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== t1) {
    t2 = /* @__PURE__ */ jsx(NavigationMenuPrimitive.List, { "data-slot": "navigation-menu-list", className: t1, ...props });
    $[5] = props;
    $[6] = t1;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  return t2;
}
function NavigationMenuItem(t0) {
  const $ = c(8);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = cn$1("relative", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== t1) {
    t2 = /* @__PURE__ */ jsx(NavigationMenuPrimitive.Item, { "data-slot": "navigation-menu-item", className: t1, ...props });
    $[5] = props;
    $[6] = t1;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  return t2;
}
const navigationMenuTriggerStyle = cva("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 font-medium text-base outline-none transition-[color,box-shadow] hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:hover:bg-accent");
function NavigationMenuViewport(t0) {
  const $ = c(9);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = cn$1("absolute top-full left-0 isolate z-50 flex justify-center");
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] !== className) {
    t2 = cn$1("data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=closed]:animate-out data-[state=open]:animate-in md:w-[var(--radix-navigation-menu-viewport-width)]", className);
    $[4] = className;
    $[5] = t2;
  } else {
    t2 = $[5];
  }
  let t3;
  if ($[6] !== props || $[7] !== t2) {
    t3 = /* @__PURE__ */ jsx("div", { className: t1, children: /* @__PURE__ */ jsx(NavigationMenuPrimitive.Viewport, { "data-slot": "navigation-menu-viewport", className: t2, ...props }) });
    $[6] = props;
    $[7] = t2;
    $[8] = t3;
  } else {
    t3 = $[8];
  }
  return t3;
}
function NavigationMenuLink(t0) {
  const $ = c(8);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  let t1;
  if ($[3] !== className) {
    t1 = cn$1("flex flex-col gap-1 rounded-sm p-2 text-sm outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:outline-1 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground", className);
    $[3] = className;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  let t2;
  if ($[5] !== props || $[6] !== t1) {
    t2 = /* @__PURE__ */ jsx(NavigationMenuPrimitive.Link, { "data-slot": "navigation-menu-link", className: t1, ...props });
    $[5] = props;
    $[6] = t1;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  return t2;
}

const NavBar = () => {
  const $ = c(23);
  const {
    t
  } = useTranslation();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = href("/");
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const linkToHome = t0;
  let t1;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = href("/about");
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  const linkToAbout = t1;
  let t2;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = href("/contact");
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  const linkToContactUs = t2;
  let t3;
  if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = navigationMenuTriggerStyle();
    $[3] = t3;
  } else {
    t3 = $[3];
  }
  let t4;
  if ($[4] !== t) {
    t4 = t("navigation.home_tab");
    $[4] = t;
    $[5] = t4;
  } else {
    t4 = $[5];
  }
  let t5;
  if ($[6] !== t4) {
    t5 = /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(NavigationMenuLink, { asChild: true, className: t3, children: /* @__PURE__ */ jsx(Link, { to: linkToHome, children: t4 }) }) });
    $[6] = t4;
    $[7] = t5;
  } else {
    t5 = $[7];
  }
  let t6;
  if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
    t6 = navigationMenuTriggerStyle();
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  let t7;
  if ($[9] !== t) {
    t7 = t("navigation.about_tab");
    $[9] = t;
    $[10] = t7;
  } else {
    t7 = $[10];
  }
  let t8;
  if ($[11] !== t7) {
    t8 = /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(NavigationMenuLink, { asChild: true, className: t6, children: /* @__PURE__ */ jsx(Link, { to: linkToAbout, children: t7 }) }) });
    $[11] = t7;
    $[12] = t8;
  } else {
    t8 = $[12];
  }
  let t9;
  if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
    t9 = navigationMenuTriggerStyle();
    $[13] = t9;
  } else {
    t9 = $[13];
  }
  let t10;
  if ($[14] !== t) {
    t10 = t("navigation.contact_tab");
    $[14] = t;
    $[15] = t10;
  } else {
    t10 = $[15];
  }
  let t11;
  if ($[16] !== t10) {
    t11 = /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(NavigationMenuLink, { asChild: true, className: t9, children: /* @__PURE__ */ jsx(Link, { to: linkToContactUs, children: t10 }) }) });
    $[16] = t10;
    $[17] = t11;
  } else {
    t11 = $[17];
  }
  let t12;
  if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
    t12 = /* @__PURE__ */ jsx(ThemeSwitcher, {});
    $[18] = t12;
  } else {
    t12 = $[18];
  }
  let t13;
  if ($[19] !== t11 || $[20] !== t5 || $[21] !== t8) {
    t13 = /* @__PURE__ */ jsx(NavigationMenu, { className: "flex-none pb-4", children: /* @__PURE__ */ jsxs(NavigationMenuList, { children: [
      t5,
      t8,
      t11,
      t12
    ] }) });
    $[19] = t11;
    $[20] = t5;
    $[21] = t8;
    $[22] = t13;
  } else {
    t13 = $[22];
  }
  return t13;
};

const _layout = UNSAFE_withComponentProps(function PageLayout() {
  const $ = c(2);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = /* @__PURE__ */jsx(NavBar, {});
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  let t1;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = /* @__PURE__ */jsxs("div", {
      className: "flex min-h-screen flex-col p-6",
      children: [t0, /* @__PURE__ */jsx("main", {
        className: "flex flex-grow flex-col",
        children: /* @__PURE__ */jsx(Outlet, {})
      })]
    });
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: _layout
}, Symbol.toStringTag, { value: 'Module' }));

const HewittBuildersLogo = (t0) => {
  const $ = c(50);
  let height;
  let propFill;
  let propStroke;
  let props;
  let t1;
  let width;
  if ($[0] !== t0) {
    ({
      className: t1,
      width,
      height,
      fill: propFill,
      stroke: propStroke,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = height;
    $[2] = propFill;
    $[3] = propStroke;
    $[4] = props;
    $[5] = t1;
    $[6] = width;
  } else {
    height = $[1];
    propFill = $[2];
    propStroke = $[3];
    props = $[4];
    t1 = $[5];
    width = $[6];
  }
  const className = t1 === void 0 ? "" : t1;
  const {
    t
  } = useTranslation();
  const {
    resolvedTheme
  } = useTheme();
  const fillColor = resolvedTheme === "dark" ? "white" : propFill ?? "#231f20";
  const strokeColor = resolvedTheme === "dark" ? "white" : propStroke ?? "#231f20";
  let t2;
  if ($[7] !== t) {
    t2 = t("pageTitle");
    $[7] = t;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  let t3;
  if ($[9] !== t2) {
    t3 = /* @__PURE__ */ jsx("title", { children: t2 });
    $[9] = t2;
    $[10] = t3;
  } else {
    t3 = $[10];
  }
  let t4;
  let t5;
  let t6;
  let t7;
  let t8;
  let t9;
  if ($[11] !== fillColor) {
    t4 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M0,0h3.15v14.53h19.05V0h3.15v33.63h-3.15v-16.46H3.15v16.46H0V0Z" });
    t5 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M31.37,0h22.86v2.78h-19.71v12.09h18.06v2.73h-18.06v13.12h20.23v2.92h-23.38V0Z" });
    t6 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M57.06,0h3.25l5.83,22.67c.66,2.49,1.55,6.63,1.55,6.63h.09s.94-4.05,1.6-6.44L75.54,0h3.39l6.16,22.81c.61,2.4,1.55,6.49,1.55,6.49h.09s.94-4.14,1.55-6.63L94.17,0h3.15l-9.13,33.63h-3.2l-6.4-24.51c-.61-2.12-1.32-5.46-1.32-5.46h-.09s-.71,3.29-1.27,5.46l-6.58,24.51h-3.34L57.06,0Z" });
    t7 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M101.04,0h3.15v33.63h-3.15V0Z" });
    t8 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M119.67,2.82h-11.38V0h25.87v2.82h-11.34v30.81h-3.15V2.82Z" });
    t9 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M148.03,2.82h-11.38V0h25.87v2.82h-11.34v30.81h-3.15V2.82Z" });
    $[11] = fillColor;
    $[12] = t4;
    $[13] = t5;
    $[14] = t6;
    $[15] = t7;
    $[16] = t8;
    $[17] = t9;
  } else {
    t4 = $[12];
    t5 = $[13];
    t6 = $[14];
    t7 = $[15];
    t8 = $[16];
    t9 = $[17];
  }
  let t10;
  if ($[18] !== strokeColor) {
    t10 = /* @__PURE__ */ jsx("line", { y1: "41.1", x2: "162.95", y2: "41.1", fill: "none", stroke: strokeColor, strokeMiterlimit: "10", strokeWidth: "0.75" });
    $[18] = strokeColor;
    $[19] = t10;
  } else {
    t10 = $[19];
  }
  let t11;
  let t12;
  let t13;
  let t14;
  let t15;
  let t16;
  let t17;
  let t18;
  if ($[20] !== fillColor) {
    t11 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M9.93,57.97c2.49.62,4.03,2.33,4.03,4.87,0,1.65-.57,2.95-1.6,3.87-1.03.95-2.57,1.49-4.44,1.49H0v-19.34h7.52c1.62,0,3,.41,4,1.19,1,.81,1.6,2.03,1.6,3.65,0,2.11-1.14,3.6-3.19,4.27ZM.84,57.67h7.27c2.46-.05,4.11-1.65,4.11-3.92,0-2.76-1.95-4.11-4.71-4.11H.84v8.03ZM.84,58.43v8.98h7c1.65,0,2.97-.49,3.87-1.27.89-.78,1.35-1.89,1.35-3.33,0-2.65-1.92-4.33-4.84-4.38H.84Z" });
    t12 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M17.04,48.86v13.04c0,4.22,2.49,5.81,6.09,5.81s6.08-1.6,6.08-5.81v-13.04h.87v13.09c0,4.62-3.03,6.52-6.98,6.52s-6.92-1.95-6.92-6.52v-13.09h.87Z" });
    t13 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M34.25,68.19h-.84v-19.34h.84v19.34Z" });
    t14 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M38.68,67.41h11.12v.78h-11.95v-19.34h.84v18.55Z" });
    t15 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M52.18,48.86h6.92c5.6,0,7.98,4.38,7.98,9.76s-2.57,9.57-8.17,9.57h-6.73v-19.34ZM58.89,67.44c4.68,0,7.3-3.35,7.3-8.82s-2.43-8.98-7.11-8.98h-6.06v17.8h5.87Z" });
    t16 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M70.68,57.81h10.93v.76h-10.93v8.84h12.14v.78h-12.98v-19.34h12.71v.76h-11.87v8.19Z" });
    t17 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M86.42,68.19h-.84v-19.34h7.73c3.57,0,5.68,1.84,5.68,5.14,0,2.52-1.16,4.19-3.62,4.76v.03c2.22.51,3.08,2.11,3.19,4.92.11,3.62.49,4.16.78,4.41v.08h-.92c-.3-.22-.62-.84-.73-4.49-.11-3.16-1.3-4.52-4.38-4.52h-6.9v9.01ZM86.42,58.4h6.6c3.44,0,5.11-1.57,5.11-4.38s-1.7-4.41-4.9-4.41h-6.82v8.79Z" });
    t18 = /* @__PURE__ */ jsx("path", { fill: fillColor, d: "M101.68,62.05c.19,3.41,2.49,5.65,6.73,5.65,3.52,0,5.79-1.78,5.79-4.6,0-3-1.95-3.95-6.44-4.76-3.97-.73-6.19-1.92-6.19-4.98s2.49-4.81,6.25-4.81c3.95,0,6.19,2.19,6.6,5.44h-.87c-.38-2.95-2.49-4.65-5.71-4.65-3.38,0-5.41,1.6-5.41,4,0,2.57,1.81,3.52,5.73,4.25,4.16.76,6.9,1.81,6.9,5.46,0,3.22-2.51,5.44-6.63,5.44-4.98,0-7.41-2.76-7.65-6.44h.89Z" });
    $[20] = fillColor;
    $[21] = t11;
    $[22] = t12;
    $[23] = t13;
    $[24] = t14;
    $[25] = t15;
    $[26] = t16;
    $[27] = t17;
    $[28] = t18;
  } else {
    t11 = $[21];
    t12 = $[22];
    t13 = $[23];
    t14 = $[24];
    t15 = $[25];
    t16 = $[26];
    t17 = $[27];
    t18 = $[28];
  }
  let t19;
  if ($[29] !== className || $[30] !== height || $[31] !== props || $[32] !== t10 || $[33] !== t11 || $[34] !== t12 || $[35] !== t13 || $[36] !== t14 || $[37] !== t15 || $[38] !== t16 || $[39] !== t17 || $[40] !== t18 || $[41] !== t3 || $[42] !== t4 || $[43] !== t5 || $[44] !== t6 || $[45] !== t7 || $[46] !== t8 || $[47] !== t9 || $[48] !== width) {
    t19 = /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 162.95 68.49", width, height, className, xmlns: "http://www.w3.org/2000/svg", ...props, children: [
      t3,
      t4,
      t5,
      t6,
      t7,
      t8,
      t9,
      t10,
      t11,
      t12,
      t13,
      t14,
      t15,
      t16,
      t17,
      t18
    ] });
    $[29] = className;
    $[30] = height;
    $[31] = props;
    $[32] = t10;
    $[33] = t11;
    $[34] = t12;
    $[35] = t13;
    $[36] = t14;
    $[37] = t15;
    $[38] = t16;
    $[39] = t17;
    $[40] = t18;
    $[41] = t3;
    $[42] = t4;
    $[43] = t5;
    $[44] = t6;
    $[45] = t7;
    $[46] = t8;
    $[47] = t9;
    $[48] = width;
    $[49] = t19;
  } else {
    t19 = $[49];
  }
  return t19;
};

function TypographyH2(sectionTitle) {
  return /* @__PURE__ */ jsx("h2", { className: "scroll-m-20 border-b pt-8 pb-2 font-semibold text-3xl tracking-tight first:mt-0", children: sectionTitle });
}
function TypographyP(paragraphText) {
  return /* @__PURE__ */ jsx("p", { className: "leading-7 [&:not(:first-child)]:mt-6", children: paragraphText });
}
function TypographyListContent(listItems) {
  return /* @__PURE__ */ jsx("ul", { className: "my-6 ml-6 list-disc [&>li]:mt-2 [&>li]:pb-6", children: listItems.map((listItem) => {
    return /* @__PURE__ */ jsx("li", { children: listItem }, listItem?.key);
  }) });
}

const SubSection = (props) => {
  const $ = c(5);
  let t0;
  if ($[0] !== props.title) {
    t0 = TypographyH2(props.title);
    $[0] = props.title;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== props.content || $[3] !== t0) {
    t1 = /* @__PURE__ */ jsxs(Fragment, { children: [
      t0,
      props.content
    ] });
    $[2] = props.content;
    $[3] = t0;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  return t1;
};

function meta$1() {
  const {
    t
  } = useTranslation();
  return [{
    title: t("pageTitle")
  }, {
    name: "description",
    content: t("pageDescription")
  }];
}
const valuesListItem = (valueTitle, valueDescription) => {
  return /* @__PURE__ */jsx("div", {
    children: /* @__PURE__ */jsxs("p", {
      className: "leading-7 [&:not(:first-child)]:mt-6",
      children: [/* @__PURE__ */jsx("span", {
        className: "font-semibold text-lg italic",
        children: valueTitle
      }), valueDescription]
    })
  }, valueDescription);
};
const home = UNSAFE_withComponentProps(function Index() {
  const $ = c(37);
  const {
    t
  } = useTranslation();
  let t0;
  if ($[0] !== t) {
    t0 = t("purposeTitle");
    $[0] = t;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const purposeTitle = t0;
  let t1;
  if ($[2] !== t) {
    const purposeDescription = t("purposeDescription");
    t1 = TypographyP(purposeDescription);
    $[2] = t;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  const purposeContent = t1;
  let t2;
  if ($[4] !== t) {
    t2 = t("valuesTitle");
    $[4] = t;
    $[5] = t2;
  } else {
    t2 = $[5];
  }
  const valuesTitle = t2;
  let T0;
  let linkToContactUs;
  let t3;
  let t4;
  let t5;
  let t6;
  let t7;
  if ($[6] !== purposeContent || $[7] !== purposeTitle || $[8] !== t || $[9] !== valuesTitle) {
    const valuesKeys = [{
      title: t("valuesStewardship.title"),
      description: t("valuesStewardship.description")
    }, {
      title: t("valuesIntegrity.title"),
      description: t("valuesIntegrity.description")
    }, {
      title: t("valuesQuality.title"),
      description: t("valuesQuality.description")
    }];
    const valuesContent = valuesKeys.map(_temp);
    let t82;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
      t82 = href("/contact");
      $[17] = t82;
    } else {
      t82 = $[17];
    }
    linkToContactUs = t82;
    t5 = "flex flex-col";
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
      t6 = /* @__PURE__ */jsx(HewittBuildersLogo, {
        className: "w-full max-w-[400px] self-center pt-6"
      });
      $[18] = t6;
    } else {
      t6 = $[18];
    }
    if ($[19] !== purposeContent || $[20] !== purposeTitle) {
      t7 = /* @__PURE__ */jsx(SubSection, {
        title: purposeTitle,
        content: purposeContent
      });
      $[19] = purposeContent;
      $[20] = purposeTitle;
      $[21] = t7;
    } else {
      t7 = $[21];
    }
    T0 = SubSection;
    t3 = valuesTitle;
    t4 = TypographyListContent(valuesContent);
    $[6] = purposeContent;
    $[7] = purposeTitle;
    $[8] = t;
    $[9] = valuesTitle;
    $[10] = T0;
    $[11] = linkToContactUs;
    $[12] = t3;
    $[13] = t4;
    $[14] = t5;
    $[15] = t6;
    $[16] = t7;
  } else {
    T0 = $[10];
    linkToContactUs = $[11];
    t3 = $[12];
    t4 = $[13];
    t5 = $[14];
    t6 = $[15];
    t7 = $[16];
  }
  let t8;
  if ($[22] !== T0 || $[23] !== t3 || $[24] !== t4) {
    t8 = /* @__PURE__ */jsx(T0, {
      title: t3,
      content: t4
    });
    $[22] = T0;
    $[23] = t3;
    $[24] = t4;
    $[25] = t8;
  } else {
    t8 = $[25];
  }
  let t9;
  if ($[26] !== t) {
    t9 = t("navigation.contact_tab");
    $[26] = t;
    $[27] = t9;
  } else {
    t9 = $[27];
  }
  let t10;
  if ($[28] !== linkToContactUs || $[29] !== t9) {
    t10 = /* @__PURE__ */jsx("div", {
      className: "flex justify-center pt-8",
      children: /* @__PURE__ */jsx(Button, {
        asChild: true,
        size: "lg",
        children: /* @__PURE__ */jsx(Link, {
          to: linkToContactUs,
          children: t9
        })
      })
    });
    $[28] = linkToContactUs;
    $[29] = t9;
    $[30] = t10;
  } else {
    t10 = $[30];
  }
  let t11;
  if ($[31] !== t10 || $[32] !== t5 || $[33] !== t6 || $[34] !== t7 || $[35] !== t8) {
    t11 = /* @__PURE__ */jsxs("div", {
      className: t5,
      children: [t6, t7, t8, t10]
    });
    $[31] = t10;
    $[32] = t5;
    $[33] = t6;
    $[34] = t7;
    $[35] = t8;
    $[36] = t11;
  } else {
    t11 = $[36];
  }
  return t11;
});
function _temp(valueskey) {
  return valuesListItem(valueskey.title, valueskey.description);
}

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: home,
	meta: meta$1
}, Symbol.toStringTag, { value: 'Module' }));

function meta() {
  const {
    t
  } = useTranslation();
  return [{
    title: t("about.pageTitle")
  }, {
    name: "description",
    content: t("about.pageDescription")
  }];
}
const AboutPage = () => {
  const $ = c(12);
  const {
    t
  } = useTranslation();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = /* @__PURE__ */jsx("img", {
      src: "/DavidHewitt.jpg",
      alt: "David Hewitt",
      className: "mx-auto h-auto w-full max-w-sm rounded-lg"
    });
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  let t1;
  if ($[1] !== t) {
    t1 = t("about.daveBioBackground");
    $[1] = t;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  let t2;
  if ($[3] !== t1) {
    t2 = /* @__PURE__ */jsx("p", {
      className: "mt-8 text-lg",
      children: t1
    });
    $[3] = t1;
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  let t3;
  if ($[5] !== t) {
    t3 = t("about.daveBioFounderGoal");
    $[5] = t;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  let t4;
  if ($[7] !== t3) {
    t4 = /* @__PURE__ */jsx("p", {
      className: "mt-4 text-lg",
      children: t3
    });
    $[7] = t3;
    $[8] = t4;
  } else {
    t4 = $[8];
  }
  let t5;
  if ($[9] !== t2 || $[10] !== t4) {
    t5 = /* @__PURE__ */jsx("div", {
      children: /* @__PURE__ */jsxs("div", {
        className: "mx-auto max-w-4xl text-center",
        children: [t0, t2, t4]
      })
    });
    $[9] = t2;
    $[10] = t4;
    $[11] = t5;
  } else {
    t5 = $[11];
  }
  return t5;
};
const about = UNSAFE_withComponentProps(AboutPage);

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: about,
	meta
}, Symbol.toStringTag, { value: 'Module' }));

const PhoneLink = () => {
  const $ = c(7);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  let t0;
  let t1;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    };
    t1 = [];
    $[0] = t0;
    $[1] = t1;
  } else {
    t0 = $[0];
    t1 = $[1];
  }
  useEffect(t0, t1);
  let t2;
  if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = () => {
      navigator.clipboard.writeText("(336) 740-1003").then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2e3);
      });
    };
    $[2] = t2;
  } else {
    t2 = $[2];
  }
  const handleDesktopClick = t2;
  if (isMobile) {
    let t32;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
      t32 = /* @__PURE__ */jsxs("a", {
        href: "tel:3367401003",
        className: "flex items-center space-x-2 text-lg leading-7 hover:underline",
        children: [/* @__PURE__ */jsx(IconPhone, {
          size: 24
        }), /* @__PURE__ */jsx("span", {
          children: "(336) 740-1003"
        })]
      });
      $[3] = t32;
    } else {
      t32 = $[3];
    }
    return t32;
  }
  let t3;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = /* @__PURE__ */jsx(IconPhone, {
      size: 24
    });
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  const t4 = copied ? "Copied!" : "(336) 740-1003";
  let t5;
  if ($[5] !== t4) {
    t5 = /* @__PURE__ */jsxs("button", {
      type: "button",
      onClick: handleDesktopClick,
      className: "flex items-center space-x-2 text-lg leading-7 hover:underline",
      children: [t3, /* @__PURE__ */jsx("span", {
        children: t4
      })]
    });
    $[5] = t4;
    $[6] = t5;
  } else {
    t5 = $[6];
  }
  return t5;
};
const ContactUsPage = () => {
  const $ = c(9);
  const {
    t
  } = useTranslation();
  let t0;
  if ($[0] !== t) {
    t0 = t("contact.title");
    $[0] = t;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  let t1;
  if ($[2] !== t0) {
    t1 = /* @__PURE__ */jsx("h1", {
      className: "my-8 font-bold text-4xl",
      children: t0
    });
    $[2] = t0;
    $[3] = t1;
  } else {
    t1 = $[3];
  }
  let t2;
  if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
    t2 = /* @__PURE__ */jsx("div", {
      children: /* @__PURE__ */jsx(PhoneLink, {})
    });
    $[4] = t2;
  } else {
    t2 = $[4];
  }
  let t3;
  if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
    t3 = /* @__PURE__ */jsxs("a", {
      href: "mailto:david@hewittbuilders.com",
      className: "mt-6 flex items-center space-x-2 text-lg leading-7 hover:underline",
      children: [/* @__PURE__ */jsx(IconMail, {
        size: 24
      }), /* @__PURE__ */jsx("span", {
        children: "david@hewittbuilders.com"
      })]
    });
    $[5] = t3;
  } else {
    t3 = $[5];
  }
  let t4;
  if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
    t4 = /* @__PURE__ */jsxs("div", {
      className: "mx-auto flex max-w-md flex-col items-center",
      children: [t2, t3, /* @__PURE__ */jsxs("a", {
        href: "https://www.instagram.com/hewittbuilders",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "mt-6 flex items-center space-x-2 text-lg leading-7 hover:underline",
        children: [/* @__PURE__ */jsx(IconBrandInstagram, {
          size: 24
        }), /* @__PURE__ */jsx("span", {
          children: "hewittbuilders"
        })]
      })]
    });
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  let t5;
  if ($[7] !== t1) {
    t5 = /* @__PURE__ */jsxs("div", {
      className: "flex flex-grow flex-col items-center justify-center",
      children: [t1, t4]
    });
    $[7] = t1;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  return t5;
};
const contact = UNSAFE_withComponentProps(ContactUsPage);

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: contact
}, Symbol.toStringTag, { value: 'Module' }));

async function loader$3({
  request,
  context
}) {
  const {
    isProductionDeployment
  } = context;
  const url = new URL(request.url);
  const lng = z.enum(Object.keys(resources)).parse(url.searchParams.get("lng"));
  const namespaces = resources[lng];
  const ns = z.enum(Object.keys(resources[lng])).parse(url.searchParams.get("ns"));
  const headers = new Headers();
  if (isProductionDeployment) {
    headers.set("Cache-Control", cacheHeader({
      maxAge: "5m",
      sMaxage: "1d",
      staleWhileRevalidate: "7d",
      staleIfError: "7d"
    }));
  }
  return Response.json(namespaces[ns], {
    headers
  });
}

const route5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	loader: loader$3
}, Symbol.toStringTag, { value: 'Module' }));

const createDomain = (request) => {
  const headers = request.headers;
  const maybeProto = headers.get("x-forwarded-proto");
  const maybeHost = headers.get("host");
  const url = new URL(request.url);
  if (maybeProto) {
    return `${maybeProto}://${maybeHost ?? url.host}`;
  }
  if (url.hostname === "localhost") {
    return `http://${url.host}`;
  }
  return `https://${url.host}`;
};

const loader$2 = async ({
  request
}) => {
  const domain = createDomain(request);
  const sitemaps = generateSitemapIndex([{
    url: `${domain}/sitemap/en.xml`,
    lastmod: "2025-11-27"
  }, {
    url: `${domain}/sitemap/es.xml`,
    lastmod: "2025-11-27"
  }]);
  return new Response(sitemaps, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};

const route6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	loader: loader$2
}, Symbol.toStringTag, { value: 'Module' }));

const loader$1 = async ({
  request,
  params
}) => {
  const domain = createDomain(request);
  const {
    routes
  } = await Promise.resolve().then(() => serverBuild);
  const sitemap = await generateRemixSitemap({
    domain,
    routes,
    ignore: ["/resource/*"],
    // Transforms the url before adding it to the sitemap
    // @ts-expect-error -- params.lang exists
    urlTransformer: url => `${url}?lng=${params.lang}`,
    sitemapData: {
      // @ts-expect-error -- params.lang exists
      lang: params.lang
    }
  });
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};

const route7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	loader: loader$1
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  request,
  context
}) {
  const {
    isProductionDeployment
  } = context;
  const domain = createDomain(request);
  const robotsTxt = generateRobotsTxt([{
    userAgent: "*",
    [isProductionDeployment ? "allow" : "disallow"]: ["/"],
    sitemap: [`${domain}/sitemap-index.xml`]
  }]);
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain"
    }
  });
}

const route8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	loader
}, Symbol.toStringTag, { value: 'Module' }));

const cn = (...inputs) => twMerge(clsx$1(inputs));

const spriteHref = "/assets/icon-BtjiWALv.svg";

let IconSize = /* @__PURE__ */ (function(IconSize2) {
  IconSize2["xs"] = "12";
  IconSize2["sm"] = "16";
  IconSize2["md"] = "24";
  IconSize2["lg"] = "32";
  IconSize2["xl"] = "40";
  return IconSize2;
})({});
const Icon = (t0) => {
  const $ = c(20);
  let className;
  let name;
  let props;
  let t1;
  let testId;
  if ($[0] !== t0) {
    ({
      name,
      testId,
      className,
      size: t1,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = name;
    $[3] = props;
    $[4] = t1;
    $[5] = testId;
  } else {
    className = $[1];
    name = $[2];
    props = $[3];
    t1 = $[4];
    testId = $[5];
  }
  const size = t1 === void 0 ? "md" : t1;
  const iconSize = IconSize[size];
  let t2;
  if ($[6] !== className) {
    t2 = cn("inline-block flex-shrink-0", className);
    $[6] = className;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  const iconClasses = t2;
  let t3;
  if ($[8] !== name) {
    t3 = /* @__PURE__ */ jsx("title", { children: name });
    $[8] = name;
    $[9] = t3;
  } else {
    t3 = $[9];
  }
  const t4 = `${spriteHref}#${name}`;
  let t5;
  if ($[10] !== t4) {
    t5 = /* @__PURE__ */ jsx("use", { href: t4 });
    $[10] = t4;
    $[11] = t5;
  } else {
    t5 = $[11];
  }
  let t6;
  if ($[12] !== iconClasses || $[13] !== iconSize || $[14] !== name || $[15] !== props || $[16] !== t3 || $[17] !== t5 || $[18] !== testId) {
    t6 = /* @__PURE__ */ jsxs("svg", { className: iconClasses, fill: "currentColor", stroke: "currentColor", width: iconSize, height: iconSize, "data-testid": testId, "data-name": name, ...props, children: [
      t3,
      t5
    ] });
    $[12] = iconClasses;
    $[13] = iconSize;
    $[14] = name;
    $[15] = props;
    $[16] = t3;
    $[17] = t5;
    $[18] = testId;
    $[19] = t6;
  } else {
    t6 = $[19];
  }
  return t6;
};

const $ = UNSAFE_withComponentProps(function Route404() {
  const $ = c(29);
  const navigate = useNavigate();
  const {
    t
  } = useTranslation();
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = href("/");
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const to = t0;
  let t1;
  let t2;
  if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
    t1 = /* @__PURE__ */jsx("div", {
      className: "mb-8 flex justify-center",
      children: /* @__PURE__ */jsx(Icon, {
        name: "Ghost",
        className: "h-24 w-24 animate-float text-indigo-600"
      })
    });
    t2 = /* @__PURE__ */jsx("h1", {
      className: "mb-4 font-bold text-6xl text-gray-900 dark:text-white",
      children: "404"
    });
    $[1] = t1;
    $[2] = t2;
  } else {
    t1 = $[1];
    t2 = $[2];
  }
  let t3;
  if ($[3] !== t) {
    t3 = t("error.404.title");
    $[3] = t;
    $[4] = t3;
  } else {
    t3 = $[4];
  }
  let t4;
  if ($[5] !== t3) {
    t4 = /* @__PURE__ */jsx("h2", {
      className: "mb-4 font-semibold text-3xl text-gray-800 dark:text-white",
      children: t3
    });
    $[5] = t3;
    $[6] = t4;
  } else {
    t4 = $[6];
  }
  let t5;
  if ($[7] !== t) {
    t5 = t("error.404.description");
    $[7] = t;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  let t6;
  if ($[9] !== t5) {
    t6 = /* @__PURE__ */jsx("p", {
      className: "mb-8 text-gray-600 text-lg dark:text-white",
      children: t5
    });
    $[9] = t5;
    $[10] = t6;
  } else {
    t6 = $[10];
  }
  let t7;
  if ($[11] !== navigate) {
    t7 = () => navigate(-1);
    $[11] = navigate;
    $[12] = t7;
  } else {
    t7 = $[12];
  }
  let t8;
  if ($[13] !== t) {
    t8 = t("navigation.back");
    $[13] = t;
    $[14] = t8;
  } else {
    t8 = $[14];
  }
  let t9;
  if ($[15] !== t7 || $[16] !== t8) {
    t9 = /* @__PURE__ */jsx("button", {
      type: "button",
      onClick: t7,
      className: "inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 font-medium text-base text-indigo-700 transition-colors duration-300 hover:bg-indigo-200",
      children: t8
    });
    $[15] = t7;
    $[16] = t8;
    $[17] = t9;
  } else {
    t9 = $[17];
  }
  let t10;
  if ($[18] !== t) {
    t10 = t("navigation.home");
    $[18] = t;
    $[19] = t10;
  } else {
    t10 = $[19];
  }
  let t11;
  if ($[20] !== t10) {
    t11 = /* @__PURE__ */jsx(Link, {
      to,
      className: "inline-flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 font-medium text-base text-white transition-colors duration-300 hover:bg-indigo-700",
      children: t10
    });
    $[20] = t10;
    $[21] = t11;
  } else {
    t11 = $[21];
  }
  let t12;
  if ($[22] !== t11 || $[23] !== t9) {
    t12 = /* @__PURE__ */jsxs("div", {
      className: "flex flex-col justify-center gap-4 sm:flex-row",
      children: [t9, t11]
    });
    $[22] = t11;
    $[23] = t9;
    $[24] = t12;
  } else {
    t12 = $[24];
  }
  let t13;
  if ($[25] !== t12 || $[26] !== t4 || $[27] !== t6) {
    t13 = /* @__PURE__ */jsx("div", {
      className: "flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4 dark:from-blue-950 dark:to-blue-900 dark:text-white",
      children: /* @__PURE__ */jsxs("div", {
        className: "w-full max-w-2xl text-center",
        children: [t1, t2, t4, t6, t12]
      })
    });
    $[25] = t12;
    $[26] = t4;
    $[27] = t6;
    $[28] = t13;
  } else {
    t13 = $[28];
  }
  return t13;
});

const route9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-CzdFnCz4.js','imports':['/assets/chunk-EF7DTUVF-DdtV_Bze.js','/assets/chunk-T3VM44WY-Zj8XUQA5.js','/assets/resource-IEXyur_h.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':true,'module':'/assets/root-TKq6cEVg.js','imports':['/assets/chunk-EF7DTUVF-DdtV_Bze.js','/assets/chunk-T3VM44WY-Zj8XUQA5.js','/assets/resource-IEXyur_h.js','/assets/compiler-runtime-_-phYlo9.js','/assets/link-C74tZToc.js','/assets/index-fuGLY9JQ.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/_layout':{'id':'routes/_layout','parentId':'root','path':undefined,'index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/_layout-CimR1swB.js','imports':['/assets/chunk-EF7DTUVF-DdtV_Bze.js','/assets/compiler-runtime-_-phYlo9.js','/assets/chunk-T3VM44WY-Zj8XUQA5.js','/assets/link-C74tZToc.js','/assets/index-fuGLY9JQ.js','/assets/button-xA56iMk0.js','/assets/createReactComponent-CPMy6U9h.js','/assets/bundle-mjs-D6B6e0vX.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/home':{'id':'routes/home','parentId':'routes/_layout','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/home-CfFcFB0J.js','imports':['/assets/chunk-T3VM44WY-Zj8XUQA5.js','/assets/chunk-EF7DTUVF-DdtV_Bze.js','/assets/compiler-runtime-_-phYlo9.js','/assets/index-fuGLY9JQ.js','/assets/button-xA56iMk0.js','/assets/link-C74tZToc.js','/assets/bundle-mjs-D6B6e0vX.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/about':{'id':'routes/about','parentId':'routes/_layout','path':'about','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/about-CXoN-Tik.js','imports':['/assets/chunk-EF7DTUVF-DdtV_Bze.js','/assets/compiler-runtime-_-phYlo9.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/contact':{'id':'routes/contact','parentId':'routes/_layout','path':'contact','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/contact-DgcBK5gY.js','imports':['/assets/chunk-EF7DTUVF-DdtV_Bze.js','/assets/compiler-runtime-_-phYlo9.js','/assets/createReactComponent-CPMy6U9h.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/resource.locales':{'id':'routes/resource.locales','parentId':'root','path':'/resource/:splat','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/resource.locales-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/sitemap-index[.]xml':{'id':'routes/sitemap-index[.]xml','parentId':'root','path':'sitemap-index.xml','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/sitemap-index_._xml-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/sitemap.$lang[.]xml':{'id':'routes/sitemap.$lang[.]xml','parentId':'root','path':'sitemap.:lang.xml','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/sitemap._lang_._xml-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/robots[.]txt':{'id':'routes/robots[.]txt','parentId':'root','path':'robots.txt','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/robots_._txt-l0sNRNKZ.js','imports':[],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'routes/$':{'id':'routes/$','parentId':'root','path':'*','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/_-fOUy2COu.js','imports':['/assets/chunk-T3VM44WY-Zj8XUQA5.js','/assets/chunk-EF7DTUVF-DdtV_Bze.js','/assets/compiler-runtime-_-phYlo9.js','/assets/link-C74tZToc.js','/assets/bundle-mjs-D6B6e0vX.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-11d19859.js','version':'11d19859','sri':undefined};

const assetsBuildDirectory = "build/client";
      const basename = "/";
      const future = {"unstable_middleware":false,"unstable_optimizeDeps":true,"unstable_splitRouteModules":true,"unstable_subResourceIntegrity":false,"unstable_viteEnvironmentApi":true};
      const ssr = true;
      const isSpaMode = false;
      const prerender = ["/","/about","/contact","/sitemap-index.xml","/sitemap.en.xml","/sitemap.es.xml"];
      const routeDiscovery = {"mode":"initial"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "routes/_layout": {
          id: "routes/_layout",
          parentId: "root",
          path: undefined,
          index: undefined,
          caseSensitive: undefined,
          module: route1
        },
  "routes/home": {
          id: "routes/home",
          parentId: "routes/_layout",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route2
        },
  "routes/about": {
          id: "routes/about",
          parentId: "routes/_layout",
          path: "about",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "routes/contact": {
          id: "routes/contact",
          parentId: "routes/_layout",
          path: "contact",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        },
  "routes/resource.locales": {
          id: "routes/resource.locales",
          parentId: "root",
          path: "/resource/:splat",
          index: undefined,
          caseSensitive: undefined,
          module: route5
        },
  "routes/sitemap-index[.]xml": {
          id: "routes/sitemap-index[.]xml",
          parentId: "root",
          path: "sitemap-index.xml",
          index: undefined,
          caseSensitive: undefined,
          module: route6
        },
  "routes/sitemap.$lang[.]xml": {
          id: "routes/sitemap.$lang[.]xml",
          parentId: "root",
          path: "sitemap.:lang.xml",
          index: undefined,
          caseSensitive: undefined,
          module: route7
        },
  "routes/robots[.]txt": {
          id: "routes/robots[.]txt",
          parentId: "root",
          path: "robots.txt",
          index: undefined,
          caseSensitive: undefined,
          module: route8
        },
  "routes/$": {
          id: "routes/$",
          parentId: "root",
          path: "*",
          index: undefined,
          caseSensitive: undefined,
          module: route9
        }
      };

const serverBuild = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	assets: serverManifest,
	assetsBuildDirectory,
	basename,
	entry,
	future,
	isSpaMode,
	prerender,
	publicPath,
	routeDiscovery,
	routes,
	ssr
}, Symbol.toStringTag, { value: 'Module' }));

export { serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
