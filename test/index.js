var testRule = require('stylelint-test-rule-tape');
var selectorPattern = require('..');

testRule(selectorPattern.rule, {
  ruleName: selectorPattern.ruleName,
  config: 'bem',
  skipBasicChecks: true,

  accept: [
    { code: '.block {}' },
    { code: '.block-test {}' },
    { code: '.block-test__element-test {}' },
    { code: '.block-test--modifier-test {}' },
    { code: '.block__element--modifier {}' },
    { code: '.u-utility-class {}' },
  ],

  reject: [
    { code: '.blockTest {}', },
    { code: '.block_test {}' },
    { code: '.block__element__element {}' },
    { code: '.block.has-state {}' },
    { code: '.u-utilityClass {}' },
    { code: '.block.block {}' },
    { code: '.block .block {}' },
  ],
});

testRule(selectorPattern.rule, {
  ruleName: selectorPattern.ruleName,
  config: 'suit',
  skipBasicChecks: true,

  accept: [
    { code: '.Component {}' },
    { code: '.ComponentTest {}' },
    { code: '.ComponentTest-elementTest {}' },
    { code: '.ComponentTest--modifierTest {}' },
    { code: '.Component.has-state {}' },
    { code: '.Component { &.has-state {} }' },
    { code: '.Component-element--modifier.has-state {}' },
    { code: '.u-utilityClass {}' },
  ],

  reject: [
    { code: '.component {}' },
    { code: '.Component_test {}' },
    { code: '.Component-element-element {}' },
    { code: '.u-utility-class {}' },
    { code: '.Component.Component {}' },
    { code: '.Component .Component {}' },
  ],
});

testRule(selectorPattern.rule, {
  ruleName: selectorPattern.ruleName,
  config: 'itcss',
  skipBasicChecks: true,

  accept: [
    { code: '.o-object-test {}' },
    { code: '.c-component-test {}' },
    { code: '.u-utility-test {}' },
    { code: '.t-theme-test {}' },
    { code: '.s-scope-test {}' },
    { code: '.is-state-test {}' },
    { code: '.has-state-test {}' },
    { code: '._hack-test {}' },
    { code: '.js-hook-test {}' },
    { code: '.qa-hook-test {}' },
  ],

  reject: [
    { code: '.o-objectTest {}' },
    { code: '.o-object_test {}' },
    { code: '.component {}' },
    { code: '.o-object.has-state {}' },
    { code: '.o-object .o-object {}' },
  ],
});

testRule(selectorPattern.rule, {
  ruleName: selectorPattern.ruleName,
  config: '^[a-z]+$',
  skipBasicChecks: true,

  accept: [
    { code: 'foobar {}' },
    { code: 'abc {}' },
    { code: 'foobar { &nested {} }' },
    { code: 'foobar, abs {}' },
  ],

  reject: [
    { code: '.foobar {}' },
    { code: 'fooBar {}' },
    { code: 'foo bar {}' },
    { code: 'foo_bar {}' },
    { code: 'foo-bar {}' },
    { code: 'foobar, .abs {}' },
  ],
});

testRule(selectorPattern.rule, {
  ruleName: selectorPattern.ruleName,
  config: ['^{foo}({bar})?$', {
    filter: /^[a-z]/,
    subpatterns: {
      foo: 'foo-*',
      bar: 'bar',
    }
  }],
  skipBasicChecks: true,

  accept: [
    { code: 'foobar {}' },
    { code: 'foo {}' },
    { code: 'foo--- {}' },
    { code: 'foo---bar {}' },
    { code: '#foo_bar {}' },
  ],

  reject: [
    { code: 'fooo {}' },
    { code: 'bar {}' },
  ],
});
