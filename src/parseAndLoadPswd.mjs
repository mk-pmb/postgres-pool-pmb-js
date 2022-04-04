// -*- coding: utf-8, tab-width: 2 -*-

import getOwn from 'getown';
import mustBe from 'typechecks-pmb/must-be.js';
import nodeFsPr from 'fs/promises';


const optDescr = 'password option value';

const EX = async function parseAndLoadPswd(pswd) {
  mustBe('str', optDescr)(pswd);
  const sourceType = (/^(\w+):/.exec(pswd) || false)[1];
  const reader = getOwn(EX.readers, sourceType);
  if (!reader) { throw EX.errBadSourceType(sourceType, pswd.length); }
  const details = pswd.slice(sourceType.length + 1);
  return reader(details);
};


const rd = {
  verbatim: String,
  async utf8file(path) { return nodeFsPr.readFile(path, 'UTF-8'); },
  async json(spec) { return JSON.parse(await EX(spec)); },
};



Object.assign(EX, {

  readers: rd,

  errBadSourceType(srcType, pwLen) {
    const msg = ((srcType ? 'Invalid' : 'No') + ' password source type given.'
      + ' The ' + optDescr + ' received is ' + pwLen + ' characters long.'
      + " If you tried to give a plain password and that's its length,"
      + ' you forgot to write "verbatim:" in front.'
      + ' Supported password source types are: '
      + Object.keys(rd).sort().join(', '));
    const err = new Error(msg);
    return err;
  },

});


export default EX;
