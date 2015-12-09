var R = require('ramda');
var traverse = require('traverse');

/**
 * Get all nodes of a given type
 * @param {Node} tree The top of the AST
 * @param {String} type The node type
 * @returns {Node[]} An array of matching nodes
 */
var getNodesByType = R.curry(function getNodesByType(type, tree){
  return traverse(tree).reduce(function(memo, node){
    if(!node || !node.type){
      return memo;
    }
    if(node.type === type){
      memo.push(node);
    }
    return memo;
  }, []);
});

module.exports = {

  /**
   * Get all the identifiers from a given tree.
   * @param {Node} tree The AST
   * @returns {String[]} All identifiers from the tree
   */
  getIdentifiers: R.compose(R.uniq, R.pluck('name'), getNodesByType('Identifier')),

  /**
   * Get all the function names from a given tree
   * @param {Node} tree The AST
   * @returns {String[]} All function names from the tree
   */
  getFunctionNames: R.compose(R.uniq, R.pluck('name'), R.pluck('callee'), getNodesByType('CallExpression'))

};
