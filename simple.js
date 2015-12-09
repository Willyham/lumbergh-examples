'use strict';

var evaluateRule = require('./rule-evaluator');
var rule = "x > y && x < 100";
var fact = {
  x: 80,
  y: 70
};

console.log(evaluateRule(rule, fact));
