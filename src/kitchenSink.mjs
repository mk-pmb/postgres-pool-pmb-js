// -*- coding: utf-8, tab-width: 2 -*-

const kisi = {

  singleKey(x) {
    if (!x) { return null; }
    const k = Object.keys(x);
    if (k.length === 1) { return k[0]; }
    return null;
  },

  maybeFlatCopyOpts(opt) {
    if (!opt) { return {}; }
    const d = 'popDirectly';
    if (kisi.singleKey(opt) === d) { return opt[d]; }
    return { ...opt };
  },


};

export default kisi;
