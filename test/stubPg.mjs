// -*- coding: utf-8, tab-width: 2 -*-

import isFunc from 'is-fn';


const pg = {};

function Pool(cfg) {
  this.cfg = (cfg || {});
}


Object.assign(Pool, {

  fakeHosts: new Map(),

  fakeHost(poolOrId) {
    let id = poolOrId;
    if (id.cfg) {
      const { host, port } = id.cfg;
      id = host + ':' + port;
    }
    const has = Pool.fakeHosts.get(id);
    if (has) { return has; }
    const pqr = new Map();
    const add = {
      preparedQueryResults: pqr,
      queryLog: [],
    };
    Pool.fakeHosts.set(id, add);
    return add;
  },

});

Object.assign(Pool.prototype, {

  toString() {
    const { cfg } = (this || false);
    return ('[pg Pool stub://' + cfg.user + '@'
      + cfg.host + ':' + cfg.port + ']');
  },

  async query(q, a) {
    const self = this;
    const fakeHost = Pool.fakeHost(self);
    fakeHost.queryLog.push(q);
    const r = fakeHost.preparedQueryResults.get(q);
    if (!r) {
      const msg = (String(self) + ': No prepared result for query: '
        + JSON.stringify(q));
      throw new Error(msg);
    }
    if (isFunc(r)) { return r.call(self, { q, a }); }
    return r;
  },

});


Object.assign(pg, { Pool });

export default pg;
