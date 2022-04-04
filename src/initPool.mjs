// -*- coding: utf-8, tab-width: 2 -*-

import mustBe from 'typechecks-pmb/must-be.js';

import healthCheck from './healthCheck.mjs';
import optPopPlus from './opts.popPlus.mjs';
import optSpecTable from './opts.specTable.mjs';
import parseAndLoadPswd from './parseAndLoadPswd.mjs';
import poolOptDefaults from './initPool.opts.mjs';


const dfCfg = optSpecTable.upgrade(poolOptDefaults);

const nativeCtorOptNames = {
  // no `pswd` here: Value must be transformed into pg's `password` option.
  connect_timeout: 'connectionTimeoutMillis',
  idle_timeout: 'idleTimeoutMillis',
  max_pool_clients: 'max',
  name: 'database',
};


const EX = async function initPool(opt) {
  const noPwCtorOpt = EX.parseAndTanslateCtorOpt(opt.poolCfg);
  const password = await parseAndLoadPswd(noPwCtorOpt.pswd);
  delete noPwCtorOpt.pswd;
  const ctorOpt = { ...noPwCtorOpt, password };
  const pgLib = mustBe.tProp('initPool option ', opt, 'obj | fun', 'pgLib');
  const PoolCtor = mustBe.tProp('pgLib.Pool', pgLib, 'fun', 'Pool');
  const pgPool = new PoolCtor(ctorOpt);
  const extras = {
    getCtorOptExceptPswd() { return noPwCtorOpt; },
    getPool() { return pgPool; },
  };

  Object.assign(pgPool, extras);
  // ^- Assign before healtCheck, so that hC tests whether
  //    our additions make pg fail.
  await healthCheck(pgPool);

  return pgPool;
};


Object.assign(EX, {

  defaultConfig: dfCfg,

  parseAndTanslateCtorOpt(origOpt) {
    const itemDescr = 'Postgres pool config option(s)';
    const pop = optPopPlus({ itemDescr }, origOpt);
    const poolOpt = {};
    Object.values(dfCfg.specsDict).forEach(function parseOpt(opt) {
      const { key, type, df } = opt;
      const val = pop(type, key, df);
      const destKey = (nativeCtorOptNames[key] || key);
      poolOpt[destKey] = val;
    });
    pop.expectEmptyIfUsingClone();
    if (poolOpt.database === '') { poolOpt.database = poolOpt.user; }
    return poolOpt;
  },


});


export default EX;
