var R = require('ramda');
var haversine = require('haversine');

/**
 * Compute the haversine distance between two points
 * @param  {Number} originLat
 * @param  {Number} originLong
 * @param  {Number} locationLat
 * @param  {Number} locationLong
 * @return {Number} The haversine distance
 */
var distance = function(originLat, originLong, locationLat, locationLong){
  'use strict';

  var origin = {
    latitude: originLat,
    longitude: originLong
  };
  var location = {
    latitude: locationLat,
    longitude: locationLong
  };
  return haversine(origin, location) * 1000;
};

/**
 * Simple contains
 * @param  {Array} haystack The array to search
 * @param  {*} needle The value to search for
 * @return {Boolean} True if needle is present, false otherwise
 */
var contains = function(haystack, needle){
  return R.contains(needle, haystack);
};

module.exports = {
  distance: distance,
  contains: contains
};
