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
            Principes de Protection IDOR/BOLA
          </h2>
        </div>

        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-8 border border-accent/30">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Les 4 Piliers de la Protection</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">1️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Vérification Systématique</div>
                <div className="text-sm text-muted-foreground">
                  Toujours vérifier que l'utilisateur a le droit d'accéder à la ressource demandée
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">2️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">IDs Non Prédictibles</div>
                <div className="text-sm text-muted-foreground">
                  Utiliser des UUIDs plutôt que des IDs séquentiels (1, 2, 3...)
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">3️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Filtrage Côté Serveur</div>
                <div className="text-sm text-muted-foreground">
                  Filtrer les requêtes DB par l'ID de l'utilisateur authentifié
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">4️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Tests d'Autorisation</div>
                <div className="text-sm text-muted-foreground">
                  Tester systématiquement l'accès croisé entre utilisateurs
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-8 border-2 border-primary/30">
            <div className="flex items-center justify-center gap-4 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Ressources OWASP</h3>
            </div>
            <div className="text-center space-y-4">
              <p className="text-foreground/90 text-lg">
                📚 BOLA est la vulnérabilité #1 du OWASP API Security Top 10
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  📖 OWASP API Security - BOLA
                </a>
                <a 
                  href="https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  🛡️ OWASP IDOR Prevention Cheat Sheet
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
