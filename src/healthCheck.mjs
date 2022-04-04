// -*- coding: utf-8, tab-width: 2 -*-

import mustBe from 'typechecks-pmb/must-be.js';


const EX = async function healthCheck(pool) {
  const reply = await pool.query('SELECT NOW();');
  const allRows = mustBe.tProp('postgres reply field ', reply, 'ary', 'rows');
  mustBe('eeq:1', 'postgres reply row count')(allRows.length);
  const [row1] = allRows;
  mustBe('obj', 'postgres reply first row')(row1);
  const colNames = Object.keys(row1).join(',');
  mustBe('eeq:"now"', 'postgres reply column names')(colNames);
  const pgNow = mustBe.tProp('postgres reply row 1 field ',
    row1, 'ncls:"Date"', 'now');
  mustBe('pos fin', 'postgres NOW() date timestamp')(pgNow.getTime());
};


export default EX;
