// Vulnerability of the Week - Slideshow structure

// SQL Injection
import SqlInjection01IdentityCard from "@/components/slides/vulnerabilities/sql-injection/01-IdentityCard";
import SqlInjection02AttackPart1 from "@/components/slides/vulnerabilities/sql-injection/02-AttackPart1";
import SqlInjection02AttackPart2 from "@/components/slides/vulnerabilities/sql-injection/02-AttackPart2";
import SqlInjection02Interactive from "@/components/slides/vulnerabilities/sql-injection/02-Interactive";
import SqlInjection03CodeComparisonDjango from "@/components/slides/vulnerabilities/sql-injection/03-CodeComparisonDjango";
import SqlInjection04CodeComparisonJS from "@/components/slides/vulnerabilities/sql-injection/04-CodeComparisonJS";
import SqlInjection05Principles from "@/components/slides/vulnerabilities/sql-injection/05-Principles";
import SqlInjection06CodeComparisonRails from "@/components/slides/vulnerabilities/sql-injection/06-CodeComparisonRails";

// Open Redirect
import OpenRedirect01IdentityCard from "@/components/slides/vulnerabilities/open-redirect/01-IdentityCard";
import OpenRedirect02AttackPart1 from "@/components/slides/vulnerabilities/open-redirect/02-AttackPart1";
import OpenRedirect02Interactive from "@/components/slides/vulnerabilities/open-redirect/02-Interactive";
import OpenRedirect03CodeComparisonFlask from "@/components/slides/vulnerabilities/open-redirect/03-CodeComparisonFlask";
import OpenRedirect04CodeComparisonExpress from "@/components/slides/vulnerabilities/open-redirect/04-CodeComparisonExpress";
import OpenRedirect05Principles from "@/components/slides/vulnerabilities/open-redirect/05-Principles";

// IDOR / BOLA
import Idor01IdentityCard from "@/components/slides/vulnerabilities/idor/01-IdentityCard";
import Idor02AttackPart1 from "@/components/slides/vulnerabilities/idor/02-AttackPart1";
import Idor03CodeComparisonNextJS from "@/components/slides/vulnerabilities/idor/03-CodeComparisonExpress";
import Idor04CodeComparisonDjango from "@/components/slides/vulnerabilities/idor/04-CodeComparisonDjango";
import Idor05CodeComparisonRails from "@/components/slides/vulnerabilities/idor/05-CodeComparisonRails";
import Idor06Principles from "@/components/slides/vulnerabilities/idor/05-Principles";
import IdorAccessControlModels from "@/components/slides/vulnerabilities/idor/06-AccessControlModels";
import IdorChooseAccessModel from "@/components/slides/vulnerabilities/idor/07-ChooseAccessModel";

// XSS
import Xss01IdentityCard from "@/components/slides/vulnerabilities/xss/01-IdentityCard";
import Xss02AttackPart1 from "@/components/slides/vulnerabilities/xss/02-AttackPart1";
import Xss02bStoredXSSDemo from "@/components/slides/vulnerabilities/xss/02b-StoredXSSDemo";
import Xss03CodeComparisonReact from "@/components/slides/vulnerabilities/xss/03-CodeComparisonReact";
import Xss04CodeComparisonDjango from "@/components/slides/vulnerabilities/xss/04-CodeComparisonDjango";
import Xss05CodeComparisonExpress from "@/components/slides/vulnerabilities/xss/05-CodeComparisonExpress";
import Xss06Principles from "@/components/slides/vulnerabilities/xss/06-Principles";

export interface SlideData {
  id: string;
  component: React.ComponentType;
  title: string;
  chapterId: number;
  hideInNav?: boolean;
}

export interface ChapterData {
  id: number;
  title: string;
  description?: string;
  parentId?: number;
}

// Define your chapters/modules here
export const chapters: ChapterData[] = [
  { 
    id: 1, 
    title: "SQL Injection", 
    description: "Injection de requêtes SQL malveillantes" 
  },
  { 
    id: 2, 
    title: "Open Redirect", 
    description: "Redirection non validée vers des sites malveillants" 
  },
  { 
    id: 3, 
    title: "IDOR / BOLA", 
    description: "Accès non autorisé aux ressources via manipulation d'ID" 
  },
  { 
    id: 4, 
    title: "XSS", 
    description: "Cross-Site Scripting - Injection de scripts malveillants" 
  },
  // Add more vulnerabilities here:
  // { id: 5, title: "CSRF", description: "Cross-Site Request Forgery" },
];

// Define your slides here
export const slides: SlideData[] = [
  // SQL Injection
  { 
    id: "sqli-identity", 
    component: SqlInjection01IdentityCard, 
    title: "Fiche d'Identité", 
    chapterId: 1 
  },
  { 
    id: "sqli-attack-1", 
    component: SqlInjection02AttackPart1, 
    title: "Attaques : Bypass & Extraction", 
    chapterId: 1 
  },
  { 
    id: "sqli-attack-2", 
    component: SqlInjection02AttackPart2, 
    title: "Attaque : Destruction", 
    chapterId: 1 
  },
  { 
    id: "sqli-interactive", 
    component: SqlInjection02Interactive, 
    title: "Démo Interactive", 
    chapterId: 1 
  },
  { 
    id: "sqli-code-django", 
    component: SqlInjection03CodeComparisonDjango, 
    title: "Comparaison : Python Django", 
    chapterId: 1 
  },
  { 
    id: "sqli-code-js", 
    component: SqlInjection04CodeComparisonJS, 
    title: "Comparaison : JavaScript", 
    chapterId: 1 
  },
  { 
    id: "sqli-code-rails", 
    component: SqlInjection06CodeComparisonRails, 
    title: "Comparaison : Ruby on Rails", 
    chapterId: 1 
  },
  { 
    id: "sqli-principles", 
    component: SqlInjection05Principles, 
    title: "Principes & OWASP", 
    chapterId: 1 
  },
  
  // Open Redirect
  { 
    id: "redirect-identity", 
    component: OpenRedirect01IdentityCard, 
    title: "Fiche d'Identité", 
    chapterId: 2 
  },
  { 
    id: "redirect-attack-1", 
    component: OpenRedirect02AttackPart1, 
    title: "Attaques : Phishing & Bypass", 
    chapterId: 2 
  },
  { 
    id: "redirect-interactive", 
    component: OpenRedirect02Interactive, 
    title: "Démo Interactive", 
    chapterId: 2 
  },
  { 
    id: "redirect-code-flask", 
    component: OpenRedirect03CodeComparisonFlask, 
    title: "Comparaison : Python Flask", 
    chapterId: 2 
  },
  { 
    id: "redirect-code-express", 
    component: OpenRedirect04CodeComparisonExpress, 
    title: "Comparaison : JavaScript Express", 
    chapterId: 2 
  },
  { 
    id: "redirect-principles", 
    component: OpenRedirect05Principles, 
    title: "Principes & OWASP", 
    chapterId: 2 
  },
  
  // IDOR / BOLA
  { 
    id: "idor-identity", 
    component: Idor01IdentityCard, 
    title: "Fiche d'Identité", 
    chapterId: 3 
  },
  { 
    id: "idor-attack-1", 
    component: Idor02AttackPart1, 
    title: "Attaques : Lecture & Modification", 
    chapterId: 3 
  },
  { 
    id: "idor-code-nextjs", 
    component: Idor03CodeComparisonNextJS, 
    title: "Comparaison : Next.js", 
    chapterId: 3 
  },
  { 
    id: "idor-code-django", 
    component: Idor04CodeComparisonDjango, 
    title: "Comparaison : Python Django", 
    chapterId: 3 
  },
  { 
    id: "idor-code-rails", 
    component: Idor05CodeComparisonRails, 
    title: "Comparaison : Ruby on Rails", 
    chapterId: 3 
  },
  { 
    id: "idor-access-models", 
    component: IdorAccessControlModels, 
    title: "Modèles de Contrôle d'Accès", 
    chapterId: 3 
  },
  { 
    id: "idor-choose-model", 
    component: IdorChooseAccessModel, 
    title: "Quel modèle choisir ?", 
    chapterId: 3 
  },
  { 
    id: "idor-principles", 
    component: Idor06Principles, 
    title: "Principes & OWASP", 
    chapterId: 3 
  },
  
  // XSS
  { 
    id: "xss-identity", 
    component: Xss01IdentityCard, 
    title: "Fiche d'Identité", 
    chapterId: 4 
  },
  { 
    id: "xss-attack-1", 
    component: Xss02AttackPart1, 
    title: "Attaques : Vol de session & Phishing", 
    chapterId: 4 
  },
  { 
    id: "xss-stored-demo", 
    component: Xss02bStoredXSSDemo, 
    title: "Démo : Stored XSS", 
    chapterId: 4 
  },
  { 
    id: "xss-code-react", 
    component: Xss03CodeComparisonReact, 
    title: "Comparaison : React", 
    chapterId: 4 
  },
  { 
    id: "xss-code-django", 
    component: Xss04CodeComparisonDjango, 
    title: "Comparaison : Python Django", 
    chapterId: 4 
  },
  { 
    id: "xss-code-express", 
    component: Xss05CodeComparisonExpress, 
    title: "Comparaison : JavaScript Express", 
    chapterId: 4 
  },
  { 
    id: "xss-principles", 
    component: Xss06Principles, 
    title: "Principes & OWASP", 
    chapterId: 4 
  },
  
  // Add more vulnerabilities here following the same pattern:
  // CSRF slides...
];
