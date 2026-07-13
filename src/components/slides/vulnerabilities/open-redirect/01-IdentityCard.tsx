import VulnerabilityIdentityCard from "../../templates/VulnerabilityIdentityCard";
import { Globe } from "lucide-react";

const Slide01IdentityCard = () => {
  return (
    <VulnerabilityIdentityCard
      title="Open Redirect"
      subtitle="Fiche d'Identité"
      icon={Globe}
      iconColor="text-destructive"
      definition="Une vulnérabilité Open Redirect permet à un attaquant de rediriger les utilisateurs vers des sites malveillants en manipulant les paramètres d'URL de redirection. L'utilisateur pense rester sur le site légitime mais est redirigé ailleurs."
      owasp={{
        categoryCode: "A01:2021",
        category: "Broken Access Control",
        categoryLink: "https://owasp.org/Top10/A01_2021-Broken_Access_Control/",
        cweCode: "CWE-601",
        cweName: "URL Redirection to Untrusted Site",
        cweLink: "https://cwe.mitre.org/data/definitions/601.html",
        severity: "Moyenne à Élevée",
      }}
      stats={{
        bugBountyCount: "Top 3",
        bugBountyLabel: "Bug Bounty beta.gouv.fr",
        cveCount: 144,
        cveYear: 2025,
        cveLink: "https://www.cvedetails.com/vulnerability-list/year-2025/opopenred-1/vulnerabilities.html",
        additionalInfo: "3ème vulnérabilité la plus fréquente",
      }}
    />
  );
};

export default Slide01IdentityCard;
