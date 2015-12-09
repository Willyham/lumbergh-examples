var prompt = require('prompt');
var esprima = require('esprima');
var R = require('ramda');

var AST = require('./lib/AST');
var evaluateRule = require('./rule-evaluator');

prompt.start();
prompt.get('rule', function(err, result){
  var rule = result.rule;
  var ruleAST = esprima.parse(rule);

  var identifiers = AST.getIdentifiers(ruleAST);
  console.log(identifiers);

  prompt.get(identifiers, function(error, values){
    var evaluated = evaluateRule(rule, values);
    if(evaluated === undefined){
      console.log('Unable to evaluate rule :(');
      return;
    }
    console.log('Evaluated: ', evaluated);
  });
});
