# stylelint-selector-pattern

A [stylelint](https://github.com/stylelint/stylelint) plugin that allows to
check selectors with regular expressions.

## Installation

    npm install stylelint-selector-pattern

## Simple Usage

Add it to the `plugin` section in your stylelint config and specify a regular
expression in the rules section:

    // .stylelintrc
    {
      "plugins": [
        "stylelint-selector-pattern"
      ],
      "rules": {
        // ...
        "xi/selector-pattern": "^\.[a-z-]+$",
        // ...
      }
    }

Instead of a pattern, you can also use the name of one of the presets: `bem`,
`suit`, and `itcss`.

## Options

In order to not keep the pattern readable, you can use the `subpatterns` option:

    "xi/selector-pattern": ["^{component}({modifier}|{element})?$", {
      "subpatterns": {
        "component": "\.[a-z-]+",
        "modifier": "--[a-z-]+",
        "element": "__[a-z-]+"
      }
    }]

You can also filter the selectors that the rule should apply to:

    "xi/selector-pattern": ["^\.[a-z-]+$", {
      "filter": "^\\."
    }]
