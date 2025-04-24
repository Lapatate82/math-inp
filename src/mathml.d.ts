// mathml.d.ts
import 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      math: any;
      mi: any;
      mo: any;
      mn: any;
      msup: any;
      mrow: any;
      mfrac: any;
      msub: any;
      msubsup: any;
      mroot: any;
      msqrt: any;
      mstyle: any;
    }
  }
}
