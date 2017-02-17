var stylelint = require("stylelint");
var _ = require('lodash');

var isPattern = function(input) {
  return input && (_.isString(input) || _.isRegExp(input));
};

var isObject = function(wrapped) {
  return function(input) {
    return _.isObject(input) && _.every(input, wrapped);
  };
};

module.exports = function(result, ruleName, optionsPattern, options) {
  return stylelint.utils.validateOptions(result, ruleName, {
    actual: optionsPattern,
    possible: isPattern
  }, {
    actual: options,
    possible: {
      filter: isPattern,
      subpatterns: isObject(isPattern),
    },
    optional: true
  });
};
