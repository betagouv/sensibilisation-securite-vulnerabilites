import { KeyRound, Lock, Users, Sliders, Network, ShieldCheck } from "lucide-react";

const Slide06AccessControlModels = () => {
  const models = [
    {
      icon: KeyRound,
      color: "text-blue-500",
      bg: "from-blue-500/20 to-blue-500/10",
      border: "border-blue-500/30",
      name: "DAC",
      full: "Discretionary Access Control",
      principle: "Le propriétaire de la ressource décide qui y accède",
      example: "Permissions Unix (chmod), partage Google Drive",
      pros: "Simple, flexible",
      cons: "Difficile à auditer, risque de fuites",
    },
    {
      icon: Lock,
      color: "text-red-500",
      bg: "from-red-500/20 to-red-500/10",
      border: "border-red-500/30",
      name: "MAC",
      full: "Mandatory Access Control",
      principle: "Le système impose les règles via des labels de sécurité",
      example: "SELinux, classifications militaires (Secret, Top Secret)",
      pros: "Très strict, centralisé",
      cons: "Rigide, complexe à mettre en place",
    },
    {
      icon: Users,
      color: "text-green-500",
      bg: "from-green-500/20 to-green-500/10",
      border: "border-green-500/30",
      name: "RBAC",
      full: "Role-Based Access Control",
      principle: "Les droits sont attribués via des rôles (admin, éditeur, lecteur)",
      example: "La majorité des SaaS, back-offices, CMS",
      pros: "Lisible, facile à gérer à grande échelle",
      cons: "Explosion du nombre de rôles, peu contextuel",
    },
    {
      icon: Sliders,
      color: "text-purple-500",
      bg: "from-purple-500/20 to-purple-500/10",
      border: "border-purple-500/30",
      name: "ABAC",
      full: "Attribute-Based Access Control",
      principle: "Décisions basées sur des attributs (utilisateur, ressource, contexte)",
      example: "AWS IAM policies, Open Policy Agent (OPA)",
      pros: "Très fin, contextuel (heure, IP, département...)",
      cons: "Policies complexes à écrire et à déboguer",
    },
    {
      icon: Network,
      color: "text-cyan-500",
      bg: "from-cyan-500/20 to-cyan-500/10",
      border: "border-cyan-500/30",
      name: "ReBAC",
      full: "Relationship-Based Access Control",
      principle: "Accès déterminé par les relations entre entités (graphe)",
      example: "Google Drive, GitHub, Google Zanzibar, SpiceDB",
      pros: "Naturel pour le partage et la collaboration",
      cons: "Nécessite un moteur de graphe d'autorisations",
    },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-4 animate-fade-in flex-1 flex flex-col">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/20 rounded-full mb-2">
            <ShieldCheck className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Modèles de Contrôle d'Accès
          </h2>
          <p className="text-sm text-muted-foreground">
            5 grandes familles pour répondre à la question : <em>« qui peut faire quoi sur quoi ? »</em>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1 overflow-auto">
          {models.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.name}
                className={`bg-gradient-to-br ${m.bg} rounded-xl p-4 border ${m.border} flex flex-col`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`h-5 w-5 ${m.color}`} />
                  <div>
                    <div className="text-lg font-bold text-foreground leading-tight">{m.name}</div>
                    <div className="text-[11px] text-muted-foreground leading-tight">{m.full}</div>
                  </div>
                </div>
                <div className="text-sm text-foreground/90 mb-2 font-medium">{m.principle}</div>
                <div className="bg-background/50 rounded-md p-2 mb-2">
                  <div className="text-[11px] text-muted-foreground mb-0.5">Exemples</div>
                  <div className="text-xs text-foreground">{m.example}</div>
                </div>
                <div className="mt-auto space-y-1">
                  <div className="text-xs">
                    <span className="text-green-500 font-semibold">+ </span>
                    <span className="text-foreground/80">{m.pros}</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-red-500 font-semibold">− </span>
                    <span className="text-foreground/80">{m.cons}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-4 border border-accent/30 flex flex-col justify-center">
            <div className="text-sm font-bold text-foreground mb-2">💡 À retenir</div>
            <ul className="text-xs text-foreground/90 space-y-1.5 list-disc list-inside">
              <li>RBAC = standard de fait des apps web</li>
              <li>ABAC / ReBAC = nécessaires pour le partage fin et le multi-tenant</li>
              <li>Les modèles se <strong>combinent</strong> souvent (RBAC + ABAC)</li>
              <li>Sans modèle clair → bugs d'autorisation = IDOR</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide06AccessControlModels;
