import CodeComparisonWithDiff from "@/components/slides/templates/CodeComparisonWithDiff";

const SqlInjection06CodeComparisonRails = () => {
  const vulnerableCode = {
    language: "ruby",
    lines: [
      "# Contrôleur Rails avec injection SQL",
      "class UsersController < ApplicationController",
      "  def authenticate",
      "    # ⚠️ Concaténation directe dans where()",
      "    name = params[:name]",
      "    password = params[:password]",
      "    ",
      "    user = User.where(",
      "      \"name = '#{name}' AND password = '#{password}'\"",
      "    ).first",
      "    ",
      "    if user",
      "      session[:user_id] = user.id",
      "      redirect_to dashboard_path",
      "    else",
      "      flash[:error] = \"Identifiants invalides\"",
      "      render :login",
      "    end",
      "  end",
      "end",
    ],
  };

  const secureCode = {
    language: "ruby",
    lines: [
      { content: "# Contrôleur Rails sécurisé", type: "normal" as const },
      { content: "class UsersController < ApplicationController", type: "normal" as const },
      { content: "  def authenticate", type: "normal" as const },
      { content: "    # ⚠️ Concaténation directe dans where()", type: "removed" as const },
      { content: "    # ✅ Utilisation de placeholders (? ou hash)", type: "added" as const },
      { content: "    name = params[:name]", type: "normal" as const },
      { content: "    password = params[:password]", type: "normal" as const },
      { content: "    ", type: "normal" as const },
      { content: "    user = User.where(", type: "removed" as const },
      { content: "      \"name = '#{name}' AND password = '#{password}'\"", type: "removed" as const },
      { content: "    ).first", type: "removed" as const },
      { content: "    # Option 1 : Utilisation de placeholders", type: "added" as const },
      { content: "    user = User.where(", type: "added" as const },
      { content: "      \"name = ? AND password = ?\", name, password", type: "added" as const },
      { content: "    ).first", type: "added" as const },
      { content: "    ", type: "normal" as const },
      { content: "    # Option 2 (recommandée) : Utilisation d'un hash", type: "added" as const },
      { content: "    # user = User.find_by(name: name, password: password)", type: "added" as const },
      { content: "    ", type: "normal" as const },
      { content: "    if user", type: "normal" as const },
      { content: "      session[:user_id] = user.id", type: "normal" as const },
      { content: "      redirect_to dashboard_path", type: "normal" as const },
      { content: "    else", type: "normal" as const },
      { content: "      flash[:error] = \"Identifiants invalides\"", type: "normal" as const },
      { content: "      render :login", type: "normal" as const },
      { content: "    end", type: "normal" as const },
      { content: "  end", type: "normal" as const },
      { content: "end", type: "normal" as const },
    ],
  };

  return (
    <CodeComparisonWithDiff
      title="Exemple de code vulnérable (Ruby on Rails)"
      subtitle="ActiveRecord et SQL Injection"
      vulnerableCode={vulnerableCode}
      secureCode={secureCode}
      vulnerableLabel="❌ Code vulnérable"
      secureLabel="✅ Code sécurisé"
    />
  );
};

export default SqlInjection06CodeComparisonRails;
