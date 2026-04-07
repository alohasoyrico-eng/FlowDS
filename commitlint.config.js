export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore", "revert"]],
    "scope-enum": [1, "always", ["tokens", "primitives", "components", "patterns", "hooks", "styles", "storybook", "ci", "deps"]],
  },
};
