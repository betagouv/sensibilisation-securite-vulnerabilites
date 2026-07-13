import { Target, Zap } from "lucide-react";
const Slide02AttackPart1 = () => {
  return <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-4 animate-fade-in flex-1 flex flex-col">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-destructive/20 rounded-full mb-3">
            <Target className="h-7 w-7 text-destructive" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Exemples d'Attaque Open Redirect
          </h2>
          <p className="text-base text-muted-foreground">
            Comment les attaquants exploitent cette vulnérabilité
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 flex-1">
          <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-xl p-5 border border-destructive/30">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-bold text-foreground">Exemples Techniques</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-2">1. Redirection simple</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                  https://example.com/redirect?url=<span className="text-destructive">https://evil.com</span>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-2">2. Bypass avec @ dans l'URL</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                  https://example.com/redirect?url=<span className="text-destructive">https://example.com@evil.com</span>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-2">3. Encodage URL</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                  https://example.com/redirect?url=<span className="text-destructive">%68%74%74%70%73%3a%2f%2fevil.com</span>
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
                <div className="text-xs text-foreground font-semibold mb-1">📚 Autres vecteurs d'attaque</div>
                <a 
                  href="https://portswigger.net/web-security/ssrf/url-validation-bypass-cheat-sheet" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  PortSwigger - URL Validation Bypass Cheat Sheet →
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-xl p-5 border border-destructive/30">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-bold text-foreground">Exemple de Mail de Phishing</h3>
            </div>
            <div className="bg-background/50 rounded-lg p-4 space-y-3">
              <div className="border-b border-border pb-2">
                <div className="text-xs text-muted-foreground">De : support@example.com</div>
                <div className="text-xs text-muted-foreground">Objet : <span className="text-foreground font-semibold">Action requise : Confirmez votre compte</span></div>
              </div>
              <div className="text-sm text-foreground space-y-2">
                <p>Bonjour,</p>
                <p>Nous avons détecté une activité suspecte sur votre compte. Pour des raisons de sécurité, veuillez confirmer votre identité en cliquant sur le lien ci-dessous :</p>
                <div className="text-center my-3">
                  <a href="https://example.com/redirect?url=evil.com" className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 font-semibold">
                    Confirmer mon identité 
                  </a>
                  <div className="text-[10px] text-muted-foreground mt-1 font-mono">
                    (lien caché : example.com/redirect?url=evil.com)
                  </div>
                </div>
                <p className="text-xs">Ce lien expire dans 24 heures.</p>
                <p className="text-xs">Cordialement,<br />L'équipe support</p>
              </div>
              <div className="bg-destructive/20 border border-destructive rounded p-2 mt-3">
                <div className="text-xs text-destructive font-semibold">
                  💀 L'utilisateur voit example.com dans l'URL et fait confiance, mais sera redirigé vers evil.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Slide02AttackPart1;