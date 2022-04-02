// -*- coding: utf-8, tab-width: 2 -*-
export default [

  // Option             Type              Default
  ['host',              'nonEmpty str',   'localhost'],
  ['port',              'pos int',        5432],
  ['user',              'nonEmpty str',   'postgres'],
  ['pswd',              'str',            ''],

  // name = database name; if empty, use same as user name.
  ['name',              'str | undef',    ''],

  ['max_pool_clients',  'pos int',        20],

  // Timeouts use the format from `timestring-notsep`
  // (no t sep = no thousands separator allowed).
  ['connect_timeout',   'duration',       '3 sec'],
  ['idle_timeout',      'duration',       '30 sec'],

];
