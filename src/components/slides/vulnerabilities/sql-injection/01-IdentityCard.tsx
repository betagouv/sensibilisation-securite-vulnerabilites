import VulnerabilityIdentityCard from "../../templates/VulnerabilityIdentityCard";
import { AlertTriangle } from "lucide-react";

const Slide01IdentityCard = () => {
  return (
    <VulnerabilityIdentityCard
      title="Injection SQL"
      subtitle="Fiche d'Identité"
      icon={AlertTriangle}
      iconColor="text-destructive"
      definition="Détournement d'instructions SQL dans une application dû à un manque de ségrégation entre les paramètres de la requête SQL et sa grammaire."
      owasp={{
        categoryCode: "A05:2025",
        category: "Injection",
        categoryLink: "https://owasp.org/Top10/2025/A05_2025-Injection/",
        cweCode: "CWE-89",
        cweName: "SQL Injection",
        cweLink: "https://cwe.mitre.org/data/definitions/89.html",
      }}
      stats={{
        bugBountyCount: 1,
        bugBountyLabel: "Bug Bounty beta.gouv.fr",
        cveCount: 3653,
        cveYear: 2025,
        additionalInfo: "Vulnérabilités découvertes",
      }}
    />
  );
};

export default Slide01IdentityCard;
