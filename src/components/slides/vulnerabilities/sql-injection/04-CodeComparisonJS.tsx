import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const SqlInjection04CodeComparisonJS = () => {
  return (
    <CodeComparisonWithDiff
      title="Comparaison de Code"
      subtitle="JavaScript / Node.js - Correction de l'injection SQL"
      vulnerableLabel="❌ Code Vulnérable - JavaScript / Node.js"
      secureLabel="✅ Code Sécurisé - JavaScript / Node.js"
      vulnerableCode={{
        language: "javascript",
        lines: [
          "// ⚠️ VULNÉRABLE : Concaténation directe",
          "",
          "app.get('/user', (req, res) => {",
          "  const userId = req.query.id;",
          "  ",
          "  // Construction vulnérable de la requête SQL",
          "  const query = `SELECT * FROM users WHERE id = '${userId}'`;",
          "  ",
          "  db.query(query, (err, result) => {",
          "    if (err) throw err;",
          "    res.json(result);",
          "  });",
          "});",
        ],
      }}
      secureCode={{
        language: "javascript",
        lines: [
          { content: "// ✅ SÉCURISÉ : Requêtes paramétrées", type: "normal" },
          { content: "", type: "normal" },
          { content: "app.get('/user', (req, res) => {", type: "normal" },
          { content: "  const userId = req.query.id;", type: "normal" },
          { content: "  ", type: "normal" },
          {
            content: "  // Construction vulnérable de la requête SQL",
            type: "removed",
          },
          {
            content: "  const query = `SELECT * FROM users WHERE id = '${userId}'`;",
            type: "removed",
          },
          {
            content: "  // Utilisation de paramètres (?) pour MySQL",
            type: "added",
          },
          {
            content: "  const query = 'SELECT * FROM users WHERE id = ?';",
            type: "added",
          },
          { content: "  ", type: "normal" },
          {
            content: "  db.query(query, (err, result) => {",
            type: "removed",
          },
          {
            content: "  db.query(query, [userId], (err, result) => {",
            type: "added",
          },
          { content: "    if (err) throw err;", type: "normal" },
          { content: "    res.json(result);", type: "normal" },
          { content: "  });", type: "normal" },
          { content: "});", type: "normal" },
        ],
      }}
    />
  );
};

export default SqlInjection04CodeComparisonJS;
