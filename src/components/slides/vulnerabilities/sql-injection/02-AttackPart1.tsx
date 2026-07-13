import { Target, Zap } from "lucide-react";

const Slide02AttackPart1 = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-6 animate-fade-in flex-1 flex flex-col">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/20 rounded-full mb-4">
            <Target className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Exemples d'Attaque SQL Injection
          </h2>
          <p className="text-lg text-muted-foreground">
            Comment les attaquants exploitent cette vulnérabilité
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 flex-1">
          <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-xl p-6 border border-destructive/30">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-6 w-6 text-destructive" />
              <h3 className="text-xl font-bold text-foreground">Attaque 1 : Bypass Authentification</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-2">Formulaire de connexion</div>
                <div className="font-mono text-sm bg-[#282c34] text-gray-200 p-3 rounded border border-border">
                  Username: <span className="text-destructive">admin' --</span><br />
                  Password: <span className="text-muted-foreground">(n'importe quoi)</span>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
<div className="text-sm text-muted-foreground mb-2">Requête SQL générée</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-3 rounded border border-border overflow-x-auto">
                  <span className="text-purple-400">SELECT</span> <span className="text-cyan-400">*</span> <span className="text-purple-400">FROM</span> <span className="text-yellow-400">users</span><br />
                  <span className="text-purple-400">WHERE</span> <span className="text-yellow-400">username</span> <span className="text-cyan-400">=</span> <span className="text-green-400">'admin'</span> <span className="text-destructive font-bold">--</span><span className="text-muted-foreground">'</span><br />
                  <span className="text-purple-400">AND</span> <span className="text-yellow-400">password</span> <span className="text-cyan-400">=</span> <span className="text-green-400">'...'</span>
                </div>
                <div className="text-sm text-destructive mt-3 font-semibold">
                  💀 Le <span className="font-mono">--</span> commente le reste → bypass du mot de passe
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-xl p-6 border border-destructive/30">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-6 w-6 text-destructive" />
              <h3 className="text-xl font-bold text-foreground">Attaque 2 : Extraction de Données</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-2">URL avec paramètre</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-3 rounded border border-border overflow-x-auto">
                  /products?id=<span className="text-destructive">1 UNION SELECT username, password FROM users</span>
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-2">Requête SQL générée</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-3 rounded border border-border overflow-x-auto">
                  <span className="text-purple-400">SELECT</span> <span className="text-yellow-400">name</span><span className="text-cyan-400">,</span> <span className="text-yellow-400">price</span> <span className="text-purple-400">FROM</span> <span className="text-yellow-400">products</span><br />
                  <span className="text-purple-400">WHERE</span> <span className="text-yellow-400">id</span> <span className="text-cyan-400">=</span> <span className="text-green-400">1</span><br />
                  <span className="text-destructive font-bold">UNION SELECT username, password FROM users</span>
                </div>
                <div className="text-sm text-destructive mt-3 font-semibold">
                  💀 UNION permet d'extraire des données d'autres tables
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide02AttackPart1;
