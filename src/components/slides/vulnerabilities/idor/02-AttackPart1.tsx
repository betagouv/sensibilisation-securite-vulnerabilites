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
            Exemples d'Attaque IDOR
          </h2>
          <p className="text-sm text-muted-foreground">
            Comment les attaquants exploitent les références directes non protégées
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 flex-1">
          {/* Attaque 1 : Lecture */}
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-bold text-foreground">Attaque 1 : Lecture non autorisée</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Requête légitime (mon profil)</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border">
                  GET /api/users/<span className="text-green-400">42</span>/profile
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Requête malveillante</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border">
                  GET /api/users/<span className="text-destructive font-bold">1</span>/profile
                </div>
                <div className="text-xs text-destructive mt-2 font-semibold">
                  💀 Accès au profil d'un autre utilisateur
                </div>
              </div>
            </div>
          </div>

          {/* Attaque 2 : Modification */}
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl p-4 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-bold text-foreground">Attaque 2 : Modification non autorisée</h3>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Modification de données tierces</div>
              <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                PUT /api/orders/<span className="text-destructive font-bold">9999</span><br />
                {"{"} "status": "cancelled" {"}"}
              </div>
              <div className="text-xs text-destructive mt-2 font-semibold">
                💀 Annulation de la commande d'un autre client
              </div>
            </div>
          </div>

          {/* Attaque 3 : Mass Assignment */}
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
              <UserCog className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-bold text-foreground">Attaque 3 : Mass Assignment (FK)</h3>
            </div>
            <div className="space-y-2">
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Requête légitime</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                  PUT /api/documents/<span className="text-green-400">123</span><br />
                  {"{"} "title": "Mon document" {"}"}
                </div>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <div className="text-xs text-muted-foreground mb-1">Requête malveillante</div>
                <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                  PUT /api/documents/<span className="text-green-400">123</span><br />
                  {"{"} "title": "...", <span className="text-destructive font-bold">"user_id": 1</span> {"}"}
                </div>
                <div className="text-xs text-destructive mt-2 font-semibold">
                  💀 S'attribue le document en changeant la clé étrangère
                </div>
              </div>
            </div>
          </div>

          {/* Attaque 4 : Suppression massive */}
          <div className="bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-xl p-4 border border-destructive/30">
            <div className="flex items-center gap-2 mb-3">
              <Trash2 className="h-5 w-5 text-destructive" />
              <h3 className="text-lg font-bold text-foreground">Attaque 4 : Suppression massive</h3>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-1">Énumération d'IDs séquentiels</div>
              <div className="font-mono text-xs bg-[#282c34] text-gray-200 p-2 rounded border border-border overflow-x-auto">
                <span className="text-purple-400">for</span> id <span className="text-purple-400">in</span> range(<span className="text-cyan-400">1</span>, <span className="text-cyan-400">10000</span>):<br />
                {"  "}requests.delete(f<span className="text-green-400">"/api/docs/{"{"}id{"}"}"</span>)
              </div>
              <div className="text-xs text-destructive mt-2 font-semibold">
                💀 Suppression de tous les documents via une boucle
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide02AttackPart1;
