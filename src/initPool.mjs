// -*- coding: utf-8, tab-width: 2 -*-

import optDefault from './initPool.opts.mjs';
import optPopPlus from './optPopPlus.mjs';


const poolOptRenames = {
  name: 'database',
  pswd: 'password',
  max_pool_clients: 'max',
  connect_timeout: 'connectionTimeoutMillis',
  idle_timeout: 'idleTimeoutMillis',
};


async function initPool(pg, opt) {
  const poolOpt = initPool.parseOpt(opt);
  return poolOpt;
}


Object.assign(initPool, {


  parseOpt(origOpt) {
    const itemDescr = 'Postgres pool config option(s)';
    const pop = optPopPlus({ itemDescr }, origOpt);
    const poolOpt = {};
    optDefault.forEach(function parseOpt(optSpec) {
      const [key, rule, dflt] = optSpec;
      const val = pop(rule, key, dflt);
      const destKey = (poolOptRenames[key] || key);
      poolOpt[destKey] = val;
    });
    pop.done();
    if (poolOpt.database === '') { poolOpt.database = poolOpt.user; }
    return poolOpt;
  },


});


export default initPool;
