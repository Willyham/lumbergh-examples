var prompt = require('prompt');
var esprima = require('esprima');
var R = require('ramda');

var AST = require('./lib/AST');
var evaluateRule = require('./rule-evaluator');

function convertToNumber(input) {
  var num = Number(input);
  if (num === NaN) {
    return input;
  }
  return num;
}

prompt.start();
prompt.get('rule', function(err, result){
  var rule = result.rule;
  var ruleAST = esprima.parse(rule);

  var identifiers = AST.getIdentifiers(ruleAST);
  console.log(identifiers);

  prompt.get(identifiers, function(error, values){
    var parsedValues = R.map(convertToNumber, values);
    var evaluated = evaluateRule(rule, parsedValues);
    if(evaluated === undefined){
      console.log('Unable to evaluate rule :(');
      return;
    }
    console.log('Evaluated: ', evaluated);
  });
});
