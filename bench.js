var Benchmark = require('benchmark');
var evaluateRule = require('./rule-evaluator');

var suite = new Benchmark.Suite;

var rule = "(minuteOfDay >= 1260 && minuteOfDay <= 1439 && contains([3,4,5], dayOfWeek)) \
 || (minuteOfDay >= 0 && minuteOfDay <= 240 && contains([4,5,6], dayOfWeek)) \
 && (distance(originLatitude, originLongitude, 52.924345, -1.216398) <= 400)";
var fact = {
  minuteOfDay: 1270,
  dayOfWeek: 4,
  originLatitude: 52.9243400,
  originLongitude: -1.216400
};

suite.add('Complex rule', function() {
  evaluateRule(rule, fact);
})
.on('complete', function() {
  var stats = this[0].stats;
  console.log(stats);
})
.run();
