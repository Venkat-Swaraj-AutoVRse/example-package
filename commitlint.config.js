module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(\w+)\](?:\s+\[(.*?)\])?\s+(.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject'],
    },
  },
  rules: {
    'type-enum': [2, 'always', ['feature', 'bugfix', 'hotfix']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-empty': [0],
    'subject-empty': [2, 'never'],
  },
};
