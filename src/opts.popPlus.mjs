// -*- coding: utf-8, tab-width: 2 -*-

import getOwn from 'getown';
import mustBe from 'typechecks-pmb/must-be.js';
import objPop from 'objpop';
import parseHumanDuration from 'timestring-notsep';
import vTry from 'vtry';

import kisi from './kitchenSink.mjs';

const doNothing = Boolean;


const extraRules = {

  duration(descr) {
    return function mustBeDuration(val) {
      mustBe.nest(val, descr);
      const sec = vTry(parseHumanDuration, descr)(val);
      const msec = (sec && (sec * 1e3));
      return msec;
    };
  },

};


function extendedMustBe(rule, descr) {
  const er = getOwn(extraRules, rule, 0);
  if (er) { return er(descr); }
  return mustBe(rule, descr);
}


function optPopPlus(how, origOpt) {
  const [singleKey, singleValue] = kisi.singleEntry(origOpt);
  const useClone = (singleKey !== 'popDirectly');
  const remain = (useClone ? { ...origOpt }
    : mustBe('obj', singleKey)(singleValue));
  const pop = objPop.d(remain, {
    mustBe: extendedMustBe,
    mustBeDescrPrefix: how.itemDescr + ' ',
  }).mustBe;
  pop.expectEmptyIfUsingClone = (useClone ? pop.expectEmpty : doNothing);
  return pop;
}


export default optPopPlus;
