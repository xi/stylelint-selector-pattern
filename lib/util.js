var resolvedNestedSelector = require('postcss-resolve-nested-selector');
var _ = require('lodash');

module.exports.createPattern = function(raw, subpatters) {
  _.forOwn(subpatters, function(pattern, name) {
    var regexp = new RegExp('{' + name + '}', 'g');
    raw = raw.replace(regexp, pattern);
  });
  return new RegExp(raw);
};

module.exports.walkSelectors = function(root, fn) {
  root.walkRules(function(rule) {
    rule.selectors.forEach(function(_selector) {
      var selectors = resolvedNestedSelector(_selector, rule);
      selectors.forEach(function(selector) {
        fn(selector, rule);
      });
    });
  });
};
