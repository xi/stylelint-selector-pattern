var stylelint = require("stylelint");
var _ = require('lodash');

var util = require('./lib/util');
var presets = require('./lib/presets');
var validate = require('./lib/validate');

var ruleName = "xi/selector-pattern";
var messages =  stylelint.utils.ruleMessages(ruleName, {
  expected: function(selector) {
    return "Expected " + selector + " to match selector pattern.";
  }
});

module.exports = stylelint.createPlugin(ruleName, function(optionsPattern, options) {
  return function(root, result) {
    if (!validate(result, ruleName, optionsPattern, options)) return;

    options = options || {};
    if (presets.hasOwnProperty(optionsPattern)) {
      var args = presets[optionsPattern];
      optionsPattern = args[0];
      options = _.defaultsDeep(options, args[1]);
    }

    var filter = new RegExp(options.filter);
    var pattern = util.createPattern(optionsPattern, options.subpatterns || {});

    util.walkSelectors(root, function(selector, rule) {
      if (filter.test(selector) && !pattern.test(selector)) {
        stylelint.utils.report({
          ruleName: ruleName,
          result: result,
          node: rule,
          message: messages.expected(selector)
        });
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
