// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import ppp from '../ppp.mjs';


const expectedDefaultPoolConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '',
  database: 'postgres',   // inherited from .user
  max: 20,
  connectionTimeoutMillis: 3e3,
  idleTimeoutMillis: 30e3,
};


test('Pool config: Defaults', async (t) => {
  t.plan(1);
  t.same(ppp.initPool.parseOpt(), expectedDefaultPoolConfig);
});


test('Pool config: Database names', async (t) => {
  t.plan(3);
  t.same(ppp.initPool.parseOpt({ user: 'alice' }), {
    ...expectedDefaultPoolConfig,
    user: 'alice',
    database: 'alice',
  });
  t.same(ppp.initPool.parseOpt({ name: 'books' }), {
    ...expectedDefaultPoolConfig,
    database: 'books',
  });
  t.same(ppp.initPool.parseOpt({ user: 'alice', name: 'books' }), {
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
  };
  t.same(ppp.initPool.parseOpt({
    ...verbatim,
    pswd: 'qwert',
    max_pool_clients: 1,
    connect_timeout: '0.5 min',
    idle_timeout: '0.25 hours',
  }), {
    ...verbatim,
    user: 'postgres',
    password: 'qwert',
    database: 'postgres',
    max: 1,
    connectionTimeoutMillis: 30e3,
    idleTimeoutMillis: 900e3,
  });
});


test('Pool config: Unsupported custom settings', async (t) => {
  t.plan(1);
  t.throws(() => ppp.initPool.parseOpt({
    password: 'too many letters',
    max: 'too unspecific a name',
  }), /Unsupported leftover keys: password, max$/);
});















/* scroll */
