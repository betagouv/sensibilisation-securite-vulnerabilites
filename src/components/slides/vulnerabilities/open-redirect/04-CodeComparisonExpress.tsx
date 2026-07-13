import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const OpenRedirect04CodeComparisonExpress = () => {
  return (
    <CodeComparisonWithDiff
      title="Comparaison de Code"
      subtitle="JavaScript / Express - Correction de l'Open Redirect"
      vulnerableLabel="❌ Code Vulnérable - JavaScript / Express"
      secureLabel="✅ Code Sécurisé - JavaScript / Express"
      vulnerableCode={{
        language: "javascript",
        lines: [
          "// ⚠️ VULNÉRABLE : Redirection non validée",
          "",
          "const express = require('express');",
          "const app = express();",
          "",
          "app.get('/redirect', (req, res) => {",
          "  const url = req.query.url;",
          "  ",
          "  // Redirection directe sans validation",
          "  res.redirect(url);",
          "});",
        ],
      }}
      secureCode={{
        language: "javascript",
        lines: [
          {
            content: "// ✅ SÉCURISÉ : Validation stricte des URLs",
            type: "normal",
          },
          { content: "", type: "normal" },
          {
            content: "const express = require('express');",
            type: "normal",
          },
          { content: "const app = express();", type: "normal" },
          {
            content: "const { URL } = require('url');",
            type: "added",
          },
          { content: "", type: "normal" },
          {
            content: "// Whitelist des domaines autorisés",
            type: "added",
          },
          {
            content: "const ALLOWED_DOMAINS = ['example.com', 'beta.gouv.fr'];",
            type: "added",
          },
          { content: "", type: "added" },
          { content: "app.get('/redirect', (req, res) => {", type: "normal" },
          { content: "  const url = req.query.url;", type: "normal" },
          { content: "  ", type: "normal" },
          {
            content: "  // Redirection directe sans validation",
            type: "removed",
          },
          {
            content: "  res.redirect(url);",
            type: "removed",
          },
          {
            content: "  // Validation du domaine",
            type: "added",
          },
          {
            content: "  try {",
            type: "added",
          },
          {
            content: "    const parsed = new URL(url);",
            type: "added",
          },
          {
            content: "    ",
            type: "added",
          },
          {
            content: "    if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {",
            type: "added",
          },
          {
            content: "      return res.status(400).send('URL non autorisée');",
            type: "added",
          },
          {
            content: "    }",
            type: "added",
          },
          {
            content: "    ",
            type: "added",
          },
          {
            content: "    res.redirect(url);",
            type: "added",
          },
          {
            content: "  } catch (err) {",
            type: "added",
          },
          {
            content: "    res.status(400).send('URL invalide');",
            type: "added",
          },
          {
            content: "  }",
            type: "added",
          },
          { content: "});", type: "normal" },
        ],
      }}
    />
  );
};

export default OpenRedirect04CodeComparisonExpress;
