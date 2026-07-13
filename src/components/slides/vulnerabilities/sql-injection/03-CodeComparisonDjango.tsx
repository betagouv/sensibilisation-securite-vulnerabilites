import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const SqlInjection03CodeComparisonDjango = () => {
  return (
    <CodeComparisonWithDiff
      title="Comparaison de Code"
      subtitle="Python / Django - Correction de l'injection SQL"
      vulnerableLabel="❌ Code Vulnérable - Python Django"
      secureLabel="✅ Code Sécurisé - Python Django"
      vulnerableCode={{
        language: "python",
        lines: [
          "# ⚠️ VULNÉRABLE : Concaténation directe",
          "",
          "def get_user(request):",
          "    user_id = request.GET['id']",
          "    ",
          "    # Construction vulnérable de la requête SQL",
          '    query = f"SELECT * FROM users WHERE id = \'{user_id}\'"',
          "    ",
          "    cursor.execute(query)",
          "    user = cursor.fetchone()",
          "    ",
          "    return user",
        ],
      }}
      secureCode={{
        language: "python",
        lines: [
          { content: "# ✅ SÉCURISÉ : Requêtes paramétrées", type: "normal" },
          { content: "", type: "normal" },
          { content: "def get_user(request):", type: "normal" },
          { content: "    user_id = request.GET['id']", type: "normal" },
          { content: "    ", type: "normal" },
          {
            content: "    # Construction vulnérable de la requête SQL",
            type: "removed",
          },
          {
            content: '    query = f"SELECT * FROM users WHERE id = \'{user_id}\'"',
            type: "removed",
          },
          {
            content: "    # Utilisation de l'ORM Django (recommandé)",
            type: "added",
          },
          {
            content: "    user = User.objects.get(id=user_id)",
            type: "added",
          },
          { content: "    ", type: "normal" },
          {
            content: "    cursor.execute(query)",
            type: "removed",
          },
          {
            content: "    user = cursor.fetchone()",
            type: "removed",
          },
          {
            content: "    # Ou requête raw paramétrée",
            type: "added",
          },
          {
            content: "    cursor.execute(",
            type: "added",
          },
          {
            content: '        "SELECT * FROM users WHERE id = %s",',
            type: "added",
          },
          {
            content: "        [user_id]  # Paramètres sécurisés",
            type: "added",
          },
          {
            content: "    )",
            type: "added",
          },
          { content: "    ", type: "normal" },
          { content: "    return user", type: "normal" },
        ],
      }}
    />
  );
};

export default SqlInjection03CodeComparisonDjango;
