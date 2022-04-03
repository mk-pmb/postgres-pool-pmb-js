// -*- coding: utf-8, tab-width: 2 -*-

const kisi = {

  singleEntry(x) {
    if (!x) { return []; }
    const ent = Object.entries(x);
    if (ent.length === 1) { return ent[0]; }
    return [];
  },

};

export default kisi;
