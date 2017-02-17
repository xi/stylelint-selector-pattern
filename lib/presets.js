module.exports = {
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
};
