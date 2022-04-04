// -*- coding: utf-8, tab-width: 2 -*-

const EX = {

  upgrade(tbl) {
    const specsDict = {};
    const defaultsDict = {};
    tbl.forEach(function addToDicts(spec) {
      const [key, type, df] = spec;
      specsDict[key] = { key, type, df };
      defaultsDict[key] = df;
    });
    return Object.assign([...tbl], {
      defaultsDict,
      specsDict,
    });
  },



};

export default EX;
