import { Compass, Code2, CheckCircle2 } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const rbacExample = `# RBAC - simple, lisible
if user.role in ["admin", "editor"]:
    allow_edit(document)`;

const abacExample = `# ABAC - décision par attributs (OPA / Rego)
allow if {
  input.user.department == input.resource.department
  input.user.clearance >= input.resource.level
  input.context.time.hour < 20
}`;

const rebacExample = `# ReBAC - logique métier par relations
# Une ordonnance est liée à un rendez-vous.
# Seul le médecin et le patient de CE rendez-vous y ont accès.

Ordonnance_123:
  linked_to: RendezVous_42

RendezVous_42:
  medecin: Dr_Martin
  patient: Alice_Dupont

# Résolution : pour lire Ordonnance_123,
# on traverse la relation "linked_to" → RendezVous_42,
# puis on vérifie que l'utilisateur est le médecin
# ou le patient de ce rendez-vous.`;

const Slide07ChooseAccessModel = () => {
  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-4 animate-fade-in flex-1 flex flex-col">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-2">
            <Compass className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            Quel modèle choisir ?
          </h2>
          <p className="text-sm text-muted-foreground">
            Adapter le modèle à la complexité métier — et toujours vérifier <strong>côté serveur</strong>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-3 flex-1 overflow-auto">
          {[
            {
              title: "RBAC",
              when: "Back-office, app SaaS classique, rôles métiers stables",
              code: rbacExample,
              lang: "python",
              color: "border-green-500/40",
              tag: "bg-green-500/20 text-green-600",
            },
            {
              title: "ABAC",
              when: "Multi-tenant, règles contextuelles : département, horaires, IP, sensibilité de la donnée",
              code: abacExample,
              lang: "rego",
              color: "border-purple-500/40",
              tag: "bg-purple-500/20 text-purple-600",
            },
            {
              title: "ReBAC",
              when: "Logique métier avec relations entre entités : patient → rendez-vous → ordonnance, projet → équipe → document",
              code: rebacExample,
              lang: "javascript",
              color: "border-cyan-500/40",
              tag: "bg-cyan-500/20 text-cyan-600",
            },
          ].map((c) => (
            <div key={c.title} className={`bg-background/40 rounded-xl border-2 ${c.color} p-4 flex flex-col`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${c.tag}`}>{c.title}</span>
                <Code2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="text-xs text-foreground/90 mb-2 min-h-[2.5rem]">{c.when}</div>
              <div className="rounded-md overflow-hidden flex-1">
                <SyntaxHighlighter
                  language={c.lang}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: "0.75rem",
                    background: "#1e1e1e",
                    fontSize: "0.7rem",
                    lineHeight: "1.4",
                    height: "100%",
                  }}
                >
                  {c.code}
                </SyntaxHighlighter>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-4 border border-accent/30">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <h3 className="text-base font-bold text-foreground">Règles d'or — peu importe le modèle</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-3 text-xs text-foreground/90">
            <div className="bg-background/50 rounded-lg p-2">
              <strong className="text-foreground">Centraliser</strong> la décision d'autorisation (un seul endroit, testable)
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <strong className="text-foreground">Deny by default</strong> — refuser tant qu'aucune règle n'autorise explicitement
            </div>
            <div className="bg-background/50 rounded-lg p-2">
              <strong className="text-foreground">Vérifier côté serveur</strong> à <em>chaque</em> requête, pas dans l'UI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide07ChooseAccessModel;
