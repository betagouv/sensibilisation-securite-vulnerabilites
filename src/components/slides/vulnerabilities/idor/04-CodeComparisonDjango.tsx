import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const vulnerableCode = {
  language: "python",
  lines: [
    "# Django - Vue vulnérable IDOR",
    "class DocumentView(APIView):",
    "    def get(self, request, document_id):",
    "        # ❌ Récupère le document sans vérifier le propriétaire",
    "        document = Document.objects.get(id=document_id)",
    "        return Response(DocumentSerializer(document).data)",
    "",
    "    def delete(self, request, document_id):",
    "        # ❌ Supprime sans vérification",
    "        document = Document.objects.get(id=document_id)",
    "        document.delete()",
    "        return Response(status=204)",
  ],
};

const secureCode = {
  language: "python",
  lines: [
    { content: "# Django - Vue sécurisée avec vérification du propriétaire", type: "normal" as const },
    { content: "class DocumentView(APIView):", type: "normal" as const },
    { content: "    permission_classes = [IsAuthenticated]", type: "added" as const },
    { content: "", type: "normal" as const },
    { content: "    def get(self, request, document_id):", type: "normal" as const },
    { content: "        # ✅ Filtre par propriétaire OU lève 404", type: "added" as const },
    { content: "        document = get_object_or_404(", type: "added" as const },
    { content: "            Document, id=document_id, owner=request.user", type: "added" as const },
    { content: "        )", type: "added" as const },
    { content: "        return Response(DocumentSerializer(document).data)", type: "normal" as const },
    { content: "", type: "normal" as const },
    { content: "    def delete(self, request, document_id):", type: "normal" as const },
    { content: "        # ✅ Même vérification pour la suppression", type: "added" as const },
    { content: "        document = get_object_or_404(", type: "added" as const },
    { content: "            Document, id=document_id, owner=request.user", type: "added" as const },
    { content: "        )", type: "added" as const },
    { content: "        document.delete()", type: "normal" as const },
    { content: "        return Response(status=204)", type: "normal" as const },
  ],
};

const Idor04CodeComparisonDjango = () => {
  return (
    <CodeComparisonWithDiff
      title="IDOR - Comparaison de Code"
      subtitle="Python Django REST Framework"
      vulnerableCode={vulnerableCode}
      secureCode={secureCode}
      vulnerableLabel="Code Vulnérable"
      secureLabel="Code Sécurisé"
    />
  );
};

export default Idor04CodeComparisonDjango;
