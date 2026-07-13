import { Shield, BookOpen } from "lucide-react";

const Slide05Principles = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-8 animate-fade-in flex-1 flex flex-col justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Principes de Sécurité Fondamentaux
          </h2>
        </div>

        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-8 border border-accent/30">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Les 3 Piliers de la Protection</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">1️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Requêtes Paramétrées</div>
                <div className="text-sm text-muted-foreground">
                  Toujours utiliser des placeholders (?,%s) ou des ORM
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">2️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Validation d'Entrée</div>
                <div className="text-sm text-muted-foreground">
                  Vérifier type, format et longueur des données
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">3️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Moindre Privilège</div>
                <div className="text-sm text-muted-foreground">
                  Limiter les permissions des comptes DB
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-8 border-2 border-primary/30">
            <div className="flex items-center justify-center gap-4 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Source Unique de Vérité</h3>
            </div>
            <div className="text-center space-y-4">
              <p className="text-foreground/90 text-lg">
                📚 Référez-vous toujours à la documentation officielle OWASP
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://owasp.org/Top10/2025/A05_2025-Injection/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  📖 OWASP Top 10 2025 - Injection
                </a>
                <a 
                  href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  🛡️ OWASP SQL Injection Cheat Sheet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide05Principles;
