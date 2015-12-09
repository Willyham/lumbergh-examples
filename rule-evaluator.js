var esprima = require('esprima');
var evaluate = require('static-eval');
var R = require('ramda');

var AST = require('./lib/AST');
var ruleFunctions = require('./lib/rule-functions');

module.exports = function evaluateRule(rule, data){
  'use strict';

  data = data || {};
  var ruleAST = esprima.parse(rule);

  // Check to ensure that we're only calling functions from rule-functions
  // static-eval wont call arbitrary functions, but it's nice to get a better exception and
  // we might swap out static-eval for something else in the future
  var functionNames = AST.getFunctionNames(ruleAST);
  var unknownFunctions = R.difference(functionNames, R.keys(ruleFunctions));
  if(!R.isEmpty(unknownFunctions)){
    throw new Error('Cannot call function ' + unknownFunctions.join(', '));
  }

  // Check to ensure that we have data for all variables
  var identifiers = AST.getIdentifiers(ruleAST);
  var nonFunctionIdentifiers = R.difference(identifiers, functionNames);
  var identifiersWithoutData = R.difference(nonFunctionIdentifiers, R.keys(data));
  if(!R.isEmpty(identifiersWithoutData)){
    throw new Error('Insufficient data supplied for identifiers ' + identifiersWithoutData.join(', '));
  }

  var dataAndFunctions = R.merge(data, ruleFunctions);
  var expression = ruleAST.body[0].expression;
  return evaluate(expression, dataAndFunctions);
};
