import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const Slide04CodeComparisonDjango = () => {
  const vulnerableCode = {
    language: "python",
    lines: [
      "# ❌ Template Django vulnérable",
      "",
      "# views.py",
      "def comment_view(request, id):",
      "    comment = Comment.objects.get(id=id)",
      "    return render(request, 'comment.html', {'comment': comment})",
      "",
      "# comment.html",
      "{% autoescape off %}",
      "  <div class=\"comment\">",
      "    {{ comment.content }}",
      "  </div>",
      "{% endautoescape %}",
      "",
      "# Ou avec le filtre |safe",
      "<div>{{ user_input|safe }}</div>",
    ],
  };

  const secureCode = {
    language: "python",
    lines: [
      { content: "# ✅ Template Django sécurisé", type: "normal" as const },
      { content: "", type: "normal" as const },
      { content: "# views.py", type: "normal" as const },
      { content: "from django.utils.html import escape", type: "added" as const },
      { content: "import bleach", type: "added" as const },
      { content: "", type: "normal" as const },
      { content: "def comment_view(request, id):", type: "normal" as const },
      { content: "    comment = Comment.objects.get(id=id)", type: "normal" as const },
      { content: "    # Sanitizer si HTML autorisé", type: "added" as const },
      { content: "    clean_content = bleach.clean(comment.content,", type: "added" as const },
      { content: "        tags=['b', 'i', 'a'], attributes={'a': ['href']})", type: "added" as const },
      { content: "    return render(request, 'comment.html', {'content': clean_content})", type: "normal" as const },
      { content: "", type: "normal" as const },
      { content: "# comment.html - L'auto-escape est actif par défaut", type: "added" as const },
      { content: "<div class=\"comment\">{{ comment.content }}</div>", type: "added" as const },
    ],
  };

  return (
    <CodeComparisonWithDiff
      title="Cross-Site Scripting (XSS)"
      vulnerableCode={vulnerableCode}
      secureCode={secureCode}
      vulnerableLabel="Template Django Vulnérable"
      secureLabel="Template Django Sécurisé"
    />
  );
};

export default Slide04CodeComparisonDjango;
