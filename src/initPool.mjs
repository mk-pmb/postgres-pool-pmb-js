// -*- coding: utf-8, tab-width: 2 -*-

import mustBe from 'typechecks-pmb/must-be.js';
import objPop from 'objpop';
import parseHumanDuration from 'timestring-notsep';
import vTry from 'vtry';

// import kisi from './kitchenSink.mjs';
import optDefault from './initPool.opts.mjs';


const poolOptRenames = {
  name: 'database',
  pswd: 'password',
  max_pool_clients: 'max',
  connect_timeout: 'connectionTimeoutMillis',
  idle_timeout: 'idleTimeoutMillis',
};

const mustBeDescrPrefix = 'Postgres pool config option ';


function extendedMustbePopper(pop, rule, key, dflt) {
  if (rule === 'duration') {
    const val = pop('nonEmpty str', key, dflt);
    const sec = vTry(parseHumanDuration, mustBeDescrPrefix + key
      + ': Parse as duration: ' + JSON.stringify(val))(val);
    const msec = (sec && (sec * 1e3));
    return msec;
  }
  return pop(rule, key, dflt);
}


async function initPool(pg, opt) {
  const poolOpt = initPool.parseOpt(opt);
  return poolOpt;
}


Object.assign(initPool, {


  parseOpt(origOpt) {
    const pop = objPop(origOpt, { mustBe, mustBeDescrPrefix }).mustBe;
    const poolOpt = {};
    optDefault.forEach(function parseOpt(optSpec) {
      const [key, rule, dflt] = optSpec;
      const val = extendedMustbePopper(pop, rule, key, dflt);
      const destKey = (poolOptRenames[key] || key);
      poolOpt[destKey] = val;
    });
    pop.done();
    if (poolOpt.database === '') { poolOpt.database = poolOpt.user; }
    return poolOpt;
  },


});


export default initPool;
