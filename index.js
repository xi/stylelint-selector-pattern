var stylelint = require("stylelint");
var resolvedNestedSelector = require('postcss-resolve-nested-selector');
var _ = require('lodash');

var presets = {
  bem: ["^({block}({element})?({modifier})?({pseudo})?|{utility})$", {
    subpatterns: {
      block: "\.[a-z][a-z0-9-]+",
      modifier: "--[a-z][a-z0-9-]+",
      element: "__[a-z][a-z0-9-]+",
      utility: "\.u-[a-z][a-z0-9-]+",
      pseudo: "::?[a-z-]+"
    }
  }],
  suit: ["^({component}({descendent})?({modifier})?({state})?({pseudo})?|{utility})$", {
    subpatterns: {
      component: "\.[A-Z][a-zA-Z0-9]+",
      modifier: "--[a-z][a-zA-Z0-9]+",
      descendent: "-[a-z][a-zA-Z0-9]+",
      state: "\.(is|has)-[a-zA-Z0-9]+",
      utility: "\.u-[a-z][a-zA-Z0-9]+",
      pseudo: "::?[a-z-]+"
    }
  }],
  itcss: ["^\.(o-|c-|u-|t-|s-|is-|has-|_|js-|qa-)[a-z0-9-]+"]
}

var ruleName = "xi/selector-pattern";
var messages =  stylelint.utils.ruleMessages(ruleName, {
  expected: function(selector) {
    return "Expected " + selector + " to match selector pattern.";
  }
});

var createPattern = function(raw, subpatters) {
  _.forOwn(subpatters, function(pattern, name) {
    var regexp = new RegExp('{' + name + '}', 'g');
    raw = raw.replace(regexp, pattern);
  });
  return new RegExp(raw);
};

var walkSelectors = function(root, fn) {
  root.walkRules(function(rule) {
    rule.selectors.forEach(function(_selector) {
      var selectors = resolvedNestedSelector(_selector, rule);
      selectors.forEach(function(selector) {
        fn(selector, rule);
      });
    });
  });
};

var isPattern = function(input) {
  return input && (_.isString(input) || _.isRegExp(input));
};

var isObject = function(wrapped) {
  return function(input) {
    return _.isObject(input) && _.every(input, wrapped);
  };
};

module.exports = stylelint.createPlugin(ruleName, function(options_pattern, options) {
  if (presets.hasOwnProperty(options_pattern)) {
    var args = presets[options_pattern];
    options_pattern = args[0];
    options = _.defaultsDeep(options, args[1]);
  }

  return function(root, result) {
    var validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: options_pattern,
      possible: isPattern
    }, {
      actual: options,
      possible: {
        filter: isPattern,
        subpatterns: isObject(isPattern),
      },
      optional: true
    });
    if (!validOptions) return;

    var filter = new RegExp(options.filter);
    var pattern = createPattern(options_pattern, options.subpatterns || {});

    walkSelectors(root, function(selector, rule) {
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
