import type * as React from 'react';

/**
 * <anthemion-khysis> — the watercolour field copied in from the anthemion
 * library (src/lib/anthemion/, four files: base, reveal, raymarch, khysis).
 * Registered client-side only, via dynamic import inside a useEffect — never
 * at module scope, or the element rewrites its light DOM before React
 * hydrates and React discards the subtree.
 */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'anthemion-khysis': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        spill?: string;
        spread?: string;
        dry?: string;
        tooth?: string;
        load?: string;
        grain?: string;
        gate?: 'none' | 'pointer';
        drift?: string;
        render?: string;
        place?: 'fixed' | 'inline';
      };
    }
  }
}
export {};
