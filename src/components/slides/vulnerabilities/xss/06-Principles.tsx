import { Shield, BookOpen } from "lucide-react";

const Slide06Principles = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-8 animate-fade-in flex-1 flex flex-col justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
            <Shield className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Principes de Protection XSS
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
                <div className="text-lg font-bold text-foreground mb-2">Échappement Systématique</div>
                <div className="text-sm text-muted-foreground">
                  Encoder les caractères spéciaux HTML (&lt; &gt; &amp; " ') selon le contexte
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">2️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Frameworks Modernes</div>
                <div className="text-sm text-muted-foreground">
                  React, Vue, Angular échappent automatiquement - ne pas contourner
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">3️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Content Security Policy</div>
                <div className="text-sm text-muted-foreground">
                  Restreindre les sources de scripts avec les headers HTTP
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-5 text-center border-2 border-accent/20 hover:border-accent/50 transition-colors">
                <div className="text-4xl mb-3">4️⃣</div>
                <div className="text-lg font-bold text-foreground mb-2">Sanitization HTML</div>
                <div className="text-sm text-muted-foreground">
                  Utiliser DOMPurify pour le HTML riche autorisé
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
                📚 XSS est un type d'Injection
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://owasp.org/Top10/A03_2021-Injection/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  📖 OWASP Injection
                </a>
                <a 
                  href="https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  🛡️ OWASP XSS Prevention Cheat Sheet
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide06Principles;
