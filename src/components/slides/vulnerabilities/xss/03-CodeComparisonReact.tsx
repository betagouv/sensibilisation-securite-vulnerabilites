import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const Slide03CodeComparisonReact = () => {
  const vulnerableCode = {
    language: "tsx",
    lines: [
      "// ❌ Code React vulnérable",
      "",
      "function Comment({ content }: { content: string }) {",
      "  return (",
      "    <div",
      "      className=\"comment\"",
      "      dangerouslySetInnerHTML={{ __html: content }}",
      "    />",
      "  );",
      "}",
      "",
      "// Autre exemple vulnérable avec eval",
      "function Calculator({ expression }: { expression: string }) {",
      "  const result = eval(expression);",
      "  return <div>Résultat: {result}</div>;",
      "}",
    ],
  };

  const secureCode = {
    language: "tsx",
    lines: [
      { content: "// ✅ Code React sécurisé", type: "normal" as const },
      { content: "", type: "normal" as const },
      { content: "function Comment({ content }: { content: string }) {", type: "normal" as const },
      { content: "  return (", type: "normal" as const },
      { content: "    <div className=\"comment\">", type: "normal" as const },
      { content: "      {content}  {/* React échappe automatiquement */}", type: "added" as const },
      { content: "    </div>", type: "normal" as const },
      { content: "  );", type: "normal" as const },
      { content: "}", type: "normal" as const },
      { content: "", type: "normal" as const },
      { content: "// Si HTML nécessaire, utiliser DOMPurify", type: "normal" as const },
      { content: "import DOMPurify from 'dompurify';", type: "added" as const },
      { content: "", type: "normal" as const },
      { content: "function RichContent({ html }: { html: string }) {", type: "normal" as const },
      { content: "  const clean = DOMPurify.sanitize(html);", type: "added" as const },
      { content: "  return <div dangerouslySetInnerHTML={{ __html: clean }} />;", type: "added" as const },
      { content: "}", type: "normal" as const },
    ],
  };

  return (
    <CodeComparisonWithDiff
      title="Cross-Site Scripting (XSS)"
      vulnerableCode={vulnerableCode}
      secureCode={secureCode}
      vulnerableLabel="Code React Vulnérable"
      secureLabel="Code React Sécurisé"
    />
  );
};

export default Slide03CodeComparisonReact;
