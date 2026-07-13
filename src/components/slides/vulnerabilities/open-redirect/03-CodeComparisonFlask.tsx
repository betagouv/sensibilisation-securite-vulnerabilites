import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const OpenRedirect03CodeComparisonFlask = () => {
  return (
    <CodeComparisonWithDiff
      title="Comparaison de Code"
      subtitle="Python / Flask - Correction de l'Open Redirect"
      vulnerableLabel="❌ Code Vulnérable - Python Flask"
      secureLabel="✅ Code Sécurisé - Python Flask"
      vulnerableCode={{
        language: "python",
        lines: [
          "# ⚠️ VULNÉRABLE : Redirection non validée",
          "",
          "from flask import Flask, redirect, request",
          "",
          "@app.route('/redirect')",
          "def redirect_user():",
          "    url = request.args.get('url')",
          "    ",
          "    # Redirection directe sans validation",
          "    return redirect(url)",
        ],
      }}
      secureCode={{
        language: "python",
        lines: [
          {
            content: "# ✅ SÉCURISÉ : Validation stricte des URLs",
            type: "normal",
          },
          { content: "", type: "normal" },
          {
            content: "from flask import Flask, redirect, request",
            type: "removed",
          },
          {
            content: "from flask import Flask, redirect, request, abort",
            type: "added",
          },
          {
            content: "from urllib.parse import urlparse",
            type: "added",
          },
          { content: "", type: "normal" },
          {
            content: "# Whitelist des domaines autorisés",
            type: "added",
          },
          {
            content: "ALLOWED_DOMAINS = ['example.com', 'beta.gouv.fr']",
            type: "added",
          },
          { content: "", type: "added" },
          { content: "@app.route('/redirect')", type: "normal" },
          { content: "def redirect_user():", type: "normal" },
          { content: "    url = request.args.get('url')", type: "normal" },
          { content: "    ", type: "normal" },
          {
            content: "    # Redirection directe sans validation",
            type: "removed",
          },
          {
            content: "    return redirect(url)",
            type: "removed",
          },
          {
            content: "    # Validation du domaine",
            type: "added",
          },
          {
            content: "    parsed = urlparse(url)",
            type: "added",
          },
          {
            content: "    ",
            type: "added",
          },
          {
            content: "    if parsed.netloc not in ALLOWED_DOMAINS:",
            type: "added",
          },
          {
            content: "        abort(400, 'URL non autorisée')",
            type: "added",
          },
          {
            content: "    ",
            type: "added",
          },
          {
            content: "    return redirect(url)",
            type: "added",
          },
        ],
      }}
    />
  );
};

export default OpenRedirect03CodeComparisonFlask;
