import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const SqlInjection06CodeComparison = () => {
  return (
    <CodeComparisonWithDiff
      title="Comparaison de Code"
      subtitle="Avant et après la correction"
      vulnerableCode={{
        language: "python",
        lines: [
          "# Code vulnérable",
          "def get_user(username):",
          '    query = f"SELECT * FROM users WHERE username = \'{username}\'"',
          "    cursor.execute(query)",
          "    return cursor.fetchone()",
        ],
      }}
      secureCode={{
        language: "python",
        lines: [
          { content: "# Code sécurisé", type: "normal" },
          { content: "def get_user(username):", type: "normal" },
          {
            content: '    query = f"SELECT * FROM users WHERE username = \'{username}\'"',
            type: "removed",
          },
          {
            content: '    query = "SELECT * FROM users WHERE username = ?"',
            type: "added",
          },
          { content: "    cursor.execute(query)", type: "removed" },
          { content: "    cursor.execute(query, (username,))", type: "added" },
          { content: "    return cursor.fetchone()", type: "normal" },
        ],
      }}
    />
  );
};

export default SqlInjection06CodeComparison;
