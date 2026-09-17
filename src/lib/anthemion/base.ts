/**
 * `HTMLElement`, or a stand-in where there is no DOM.
 *
 * A class declaration is evaluated when its module is *imported*, not when it is
 * instantiated, so `class X extends HTMLElement` throws `HTMLElement is not
 * defined` the moment any of these files is loaded in Node. That made the whole
 * library unimportable on a server — which went unnoticed only because the React
 * layer used to hide the import inside a `useEffect`, where it could never run
 * anywhere but the browser. Take that away and every element source becomes a
 * build-time crash in the framework the library most wants to be good in: Next
 * prerenders client components too, so `'use client'` does not spare you.
 *
 * The library already promises that "custom elements do not upgrade on the
 * server, so what the server emits is the light DOM." That promise is only true
 * if importing the library on the server is *harmless*. This is what makes it so.
 *
 * Nothing is ever constructed from the stand-in. Elements are instantiated by
 * the parser, which only exists in a browser, and `customElements.define` is
 * guarded at the bottom of every file for the same reason. On the server this
 * is an inert class object that is declared and never touched.
 */
export const Base: typeof HTMLElement =
  typeof HTMLElement === 'undefined'
    ? (class {} as unknown as typeof HTMLElement)
    : HTMLElement;
