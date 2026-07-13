import VulnerabilityIdentityCard from "../../templates/VulnerabilityIdentityCard";
import { Code } from "lucide-react";

const Slide01IdentityCard = () => {
  return (
    <VulnerabilityIdentityCard
      title="Cross-Site Scripting (XSS)"
      subtitle="Fiche d'Identité"
      icon={Code}
      iconColor="text-orange-500"
      definition="Injection de code JavaScript malveillant dans une page web, exécuté dans le navigateur des victimes. Permet le vol de sessions, la modification de contenu, ou l'exécution d'actions non autorisées."
      owasp={{
        categoryCode: "A03:2021",
        category: "Injection",
        categoryLink: "https://owasp.org/Top10/A03_2021-Injection/",
        cweCode: "CWE-79",
        cweName: "Cross-site Scripting (XSS)",
        cweLink: "https://cwe.mitre.org/data/definitions/79.html",
      }}
      stats={{
        bugBountyCount: "Top 2",
        bugBountyLabel: "Bug Bounty beta.gouv.fr",
        cveCount: 4521,
        cveYear: 2024,
        additionalInfo: "Vulnérabilités découvertes",
      }}
    />
  );
};

export default Slide01IdentityCard;
