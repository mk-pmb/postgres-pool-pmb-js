// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import ppp from '../ppp.mjs';

const patco = ppp.initPool.parseAndTanslateCtorOpt;


const expectedDefaultPoolConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  pswd: 'verbatim:',  // NB: This is NOT pg's `password` option.
  database: 'postgres',   // inherited from .user
  max: 20,
  connectionTimeoutMillis: 3e3,
  idleTimeoutMillis: 30e3,
  table_name_prefix: '',
};


test('Pool config: Defaults', async (t) => {
  t.plan(1);
  t.same(patco(), expectedDefaultPoolConfig);
});


test('Pool config: Database names', async (t) => {
  t.plan(3);
  t.same(patco({ user: 'alice' }), {
    ...expectedDefaultPoolConfig,
    user: 'alice',
    database: 'alice',
  });
  t.same(patco({ name: 'books' }), {
    ...expectedDefaultPoolConfig,
    database: 'books',
  });
  t.same(patco({ user: 'alice', name: 'books' }), {
    ...expectedDefaultPoolConfig,
    user: 'alice',
    database: 'books',
  });
});


test('Pool config: Other custom settings', async (t) => {
  t.plan(1);
  const verbatim = {
    host: 'example.net',
    port: 2305,
    table_name_prefix: 'blog_',
  };
  t.same(patco({
    ...verbatim,
    pswd: 'qwert',
    max_pool_clients: 1,
    connect_timeout: '0.5 min',
    idle_timeout: '0.25 hours',
  }), {
    ...verbatim,
    user: 'postgres',
    pswd: 'qwert',
    database: 'postgres',
    max: 1,
    connectionTimeoutMillis: 30e3,
    idleTimeoutMillis: 900e3,
  });
});


test('Pool config: Unsupported custom settings', async (t) => {
  t.plan(1);
  t.throws(() => patco({
    password: 'too many letters',
    max: 'too unspecific a name',
  }), /Unsupported leftover keys: password, max$/);
});


test('Pool config: Pop options destructively', async (t) => {
  t.plan(4);
  const opt = { host: 'example.net', port: 2305 };
  const expected = { ...expectedDefaultPoolConfig, ...opt };
  t.same(patco(opt), expected);
  t.same(Object.keys(opt), ['host', 'port']);
  t.same(patco({ popDirectly: opt }), expected);
  t.same(Object.keys(opt), []);
});















/* scroll */
