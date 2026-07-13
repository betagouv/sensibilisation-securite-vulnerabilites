import VulnerabilityIdentityCard from "../../templates/VulnerabilityIdentityCard";
import { UserX } from "lucide-react";

const Slide01IdentityCard = () => {
  return (
    <VulnerabilityIdentityCard
      title="IDOR / BOLA"
      subtitle="Insecure Direct Object Reference / Broken Object Level Authorization"
      icon={UserX}
      iconColor="text-orange-500"
      definition="Vulnérabilité où un attaquant peut accéder ou modifier des ressources appartenant à d'autres utilisateurs en manipulant simplement les identifiants d'objets (ID) dans les requêtes."
      owasp={{
        categoryCode: "API1:2023 A01:2025",
        category: "Broken Access Control",
        categoryLink: "https://owasp.org/API-Security/editions/2023/en/0xa1-broken-object-level-authorization/",
        cweCode: "CWE-639",
        cweName: "Authorization Bypass Through User-Controlled Key",
        cweLink: "https://cwe.mitre.org/data/definitions/639.html",
      }}
      stats={{
        bugBountyCount: "TOP 1",
        bugBountyLabel: "Bug Bounty beta.gouv.fr",
        cveCount: 847,
        cveYear: 2025,
        additionalInfo: "Vulnérabilité #1",
      }}
    />
  );
};

export default Slide01IdentityCard;
