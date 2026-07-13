import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const Slide05CodeComparisonExpress = () => {
  const vulnerableCode = {
    language: "javascript",
    lines: [
      "// ❌ Code Express vulnérable",
      "",
      "app.get('/search', (req, res) => {",
      "  const query = req.query.q;",
      "",
      "  // Injection directe dans le HTML",
      "  res.send(`",
      "    <h1>Résultats pour : ${query}</h1>",
      "    <div id=\"results\">...</div>",
      "  `);",
      "});",
      "",
      "// API renvoyant du HTML non échappé",
      "app.get('/user/:name', (req, res) => {",
      "  res.send(`<div>Bienvenue ${req.params.name}</div>`);",
      "});",
    ],
  };

  const secureCode = {
    language: "javascript",
    lines: [
      { content: "// ✅ Code Express sécurisé", type: "normal" as const },
      { content: "", type: "normal" as const },
      { content: "import { escape } from 'html-escaper';", type: "added" as const },
      { content: "import helmet from 'helmet';", type: "added" as const },
      { content: "", type: "normal" as const },
      { content: "app.use(helmet()); // Headers de sécurité (CSP, etc.)", type: "added" as const },
      { content: "", type: "normal" as const },
      { content: "app.get('/search', (req, res) => {", type: "normal" as const },
      { content: "  const query = escape(req.query.q);  // Échappement HTML", type: "added" as const },
      { content: "", type: "normal" as const },
      { content: "  res.send(`", type: "normal" as const },
      { content: "    <h1>Résultats pour : ${query}</h1>", type: "normal" as const },
      { content: "    <div id=\"results\">...</div>", type: "normal" as const },
      { content: "  `);", type: "normal" as const },
      { content: "});", type: "normal" as const },
    ],
  };

  return (
    <CodeComparisonWithDiff
      title="Cross-Site Scripting (XSS)"
      vulnerableCode={vulnerableCode}
      secureCode={secureCode}
      vulnerableLabel="Code Express Vulnérable"
      secureLabel="Code Express Sécurisé"
    />
  );
};

export default Slide05CodeComparisonExpress;
