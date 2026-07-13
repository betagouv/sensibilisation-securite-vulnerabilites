import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const vulnerableCode = {
  language: "ruby",
  lines: [
    "# Rails Controller - Vulnérable IDOR",
    "class DocumentsController < ApplicationController",
    "  def show",
    "    # ❌ Récupère n'importe quel document par son ID",
    "    @document = Document.find(params[:id])",
    "    render json: @document",
    "  end",
    "",
    "  def destroy",
    "    # ❌ Supprime sans vérification du propriétaire",
    "    @document = Document.find(params[:id])",
    "    @document.destroy",
    "    head :no_content",
    "  end",
    "end",
  ],
};

const secureCode = {
  language: "ruby",
  lines: [
    { content: "# Rails Controller - Sécurisé avec scoping", type: "normal" as const },
    { content: "class DocumentsController < ApplicationController", type: "normal" as const },
    { content: "  before_action :authenticate_user!", type: "added" as const },
    { content: "", type: "normal" as const },
    { content: "  def show", type: "normal" as const },
    { content: "    # ✅ Scope par l'utilisateur connecté", type: "added" as const },
    { content: "    @document = current_user.documents.find(params[:id])", type: "added" as const },
    { content: "    render json: @document", type: "normal" as const },
    { content: "  end", type: "normal" as const },
    { content: "", type: "normal" as const },
    { content: "  def destroy", type: "normal" as const },
    { content: "    # ✅ Ne peut supprimer que ses propres documents", type: "added" as const },
    { content: "    @document = current_user.documents.find(params[:id])", type: "added" as const },
    { content: "    @document.destroy", type: "normal" as const },
    { content: "    head :no_content", type: "normal" as const },
    { content: "  end", type: "normal" as const },
    { content: "end", type: "normal" as const },
  ],
};

const Idor05CodeComparisonRails = () => {
  return (
    <CodeComparisonWithDiff
      title="IDOR - Comparaison de Code"
      subtitle="Ruby on Rails"
      vulnerableCode={vulnerableCode}
      secureCode={secureCode}
      vulnerableLabel="Code Vulnérable"
      secureLabel="Code Sécurisé"
    />
  );
};

export default Idor05CodeComparisonRails;
