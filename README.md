
<!--#echo json="package.json" key="name" underline="=" -->
postgres-pool-pmb
=================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Nicer API for the parts of the `pg` postgres module that I actually use.
Mostly renamed config keys for pool config
<!--/#echo -->



API
---

This module exports an object that holds these functions:

### initPool(opt)

Returns a promise that will be resolved when we get
positive confirmation that the pool accepted our login
and has passed a trivial health check.

`opt` is an optional options object that supports these mostly optional keys:

* `pgLib` (required):
  Your database driver object. It should have an API compatible
  to the Promise-ing parts of the interface of package `pg` from
  [brianc's `node-postgres`](https://github.com/brianc/node-postgres).
* `poolCfg`: An options object with config details for the actual pool.
  Supported options (all optional) can be found in
  [`src/initPool.opts.mjs`](src/initPool.opts.mjs).



Usage
-----

see [test/usage.mjs](test/usage.mjs).


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
