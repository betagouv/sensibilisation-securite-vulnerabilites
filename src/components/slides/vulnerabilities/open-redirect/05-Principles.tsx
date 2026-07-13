import { BookOpen, Shield, CheckCircle2 } from "lucide-react";

const Slide05Principles = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-4 animate-fade-in flex-1 flex flex-col">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/20 rounded-full mb-2">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Principes de Prévention
          </h2>
          <p className="text-base text-muted-foreground">
            Bonnes pratiques et recommandations OWASP
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 flex-1">
          <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-4 border border-primary/30">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-base font-bold text-foreground">Stratégies de Défense</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-background/50 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  1. Whitelist de Destinations
                </h4>
                <p className="text-xs text-muted-foreground">
                  Maintenir une liste stricte de domaines ou chemins autorisés pour les redirections.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  2. Validation d'URL
                </h4>
                <p className="text-xs text-muted-foreground">
                  Parser et valider l'URL complète (protocole, domaine, chemin) avant redirection.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  3. Chemins Relatifs
                </h4>
                <p className="text-xs text-muted-foreground">
                  Privilégier les chemins relatifs (ex: /dashboard) plutôt que les URLs complètes.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-primary" />
                  4. Tokens de Redirection
                </h4>
                <p className="text-xs text-muted-foreground">
                  Utiliser des tokens mappés côté serveur au lieu d'URLs directes en paramètres.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-4 border border-accent/30">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-accent" />
              <h3 className="text-base font-bold text-foreground">Recommandations OWASP</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-background/50 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1">Éviter les Redirections</h4>
                <p className="text-xs text-muted-foreground">
                  Si possible, éviter complètement les redirections basées sur des paramètres utilisateur.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1">Validation Stricte</h4>
                <p className="text-xs text-muted-foreground">
                  Vérifier que l'URL de destination appartient au même domaine ou à une liste approuvée.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1">Avertir l'Utilisateur</h4>
                <p className="text-xs text-muted-foreground">
                  Pour les redirections externes légitimes, afficher un avertissement avant la redirection.
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-2">
                <h4 className="text-xs font-semibold text-foreground mb-1">Journalisation</h4>
                <p className="text-xs text-muted-foreground">
                  Logger les tentatives de redirection suspectes pour détecter les attaques.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
            <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Exemple de Système de Tokens
            </h3>
            <div className="bg-[#282c34] text-gray-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
              <span className="text-blue-400">{"// Côté serveur - Mapping sécurisé"}</span><br />
              <span className="text-purple-400">const</span> <span className="text-yellow-400">REDIRECT_TOKENS</span> <span className="text-cyan-400">=</span> {"{"}<br />
              {"  "}<span className="text-green-400">"dashboard"</span>: <span className="text-green-400">"/app/dashboard"</span>,<br />
              {"  "}<span className="text-green-400">"profile"</span>: <span className="text-green-400">"/app/profile"</span>,<br />
              {"  "}<span className="text-green-400">"logout"</span>: <span className="text-green-400">"/auth/logout"</span><br />
              {"}"};<br />
              <br />
              <span className="text-blue-400">{"// URL sécurisée utilisée"}</span><br />
              <span className="text-green-400">"/redirect?token=dashboard"</span> <span className="text-blue-400">{"// Au lieu de /redirect?url=/app/dashboard"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide05Principles;
