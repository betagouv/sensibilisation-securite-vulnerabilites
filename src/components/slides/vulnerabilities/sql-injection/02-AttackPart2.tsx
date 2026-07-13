import { Skull, AlertTriangle } from "lucide-react";

const Slide02AttackPart2 = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-8 animate-fade-in flex-1 flex flex-col justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/20 rounded-full mb-4">
            <Skull className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Attaque Critique : Destruction de Données
          </h2>
        </div>

        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="bg-gradient-to-br from-destructive/30 to-destructive/15 rounded-xl p-8 border-2 border-destructive/50">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <h3 className="text-2xl font-bold text-foreground">Attaque 3 : DROP TABLE</h3>
            </div>
            <div className="space-y-5">
              <div className="bg-background/70 rounded-lg p-5">
                <div className="text-sm text-muted-foreground mb-3">Injection malveillante</div>
                <div className="font-mono text-base bg-[#282c34] text-gray-200 p-4 rounded border-2 border-destructive">
                  /search?term=<span className="text-destructive font-bold">'; DROP TABLE users; --</span>
                </div>
              </div>
              <div className="bg-destructive/20 rounded-lg p-5 border-2 border-destructive/50">
                <div className="text-lg font-bold text-destructive mb-2 flex items-center gap-2">
                  <Skull className="h-6 w-6" />
                  Impact Catastrophique
                </div>
                <p className="text-foreground/90 text-base">
                  💀 Destruction complète et irréversible de la table users<br />
                  🔥 Perte de toutes les données utilisateurs<br />
                  ⚠️ Interruption totale du service
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-5 text-center">
            <p className="text-foreground/90 text-xl">
              🎯 <strong>Les 3 types d'attaques</strong> : Bypass • Extraction • Destruction
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide02AttackPart2;
