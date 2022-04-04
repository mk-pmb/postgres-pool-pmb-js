// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import ppp from '../ppp.mjs';
import stubPg from './stubPg.mjs';


const fakeLocalHost = stubPg.Pool.fakeHost('localhost:5432');



test('API stub: Health check success', async (t) => {
  t.plan(2);
  const healthCheckQuery = 'SELECT NOW();';
  fakeLocalHost.preparedQueryResults.set(healthCheckQuery,
    { rows: [{ now: new Date('2022-01-01T00:00:00Z') }] });

  const pool = await ppp.initPool({ pgLib: stubPg });
  t.same(pool && typeof pool, 'object');
  t.same(fakeLocalHost.queryLog, [healthCheckQuery]);
});
















/* scroll */
