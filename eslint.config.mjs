import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // This app fetches data with the standard "call an async
      // function from useEffect" pattern throughout (no data-fetching
      // library). The rule is correct that setState-in-effect can
      // cause extra renders, but flagging every fetch-on-mount call
      // site here would mean rewriting the app's data layer, not
      // fixing a bug — downgrade to a warning instead.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
