import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Lock, 
  LockOpen, 
  AlertTriangle, 
  Skull,
  ArrowRight,
  ExternalLink,
  Shield
} from "lucide-react";

// Composant barre d'URL façon navigateur
const BrowserBar = ({ url, isMalicious, isLoading }: { 
  url: string; 
  isMalicious: boolean;
  isLoading?: boolean;
}) => {
  const maliciousPart = isMalicious ? "evil-beta-gouv.com" : "";
  
  return (
    <div className="bg-muted/50 rounded-t-lg border border-b-0 p-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="flex items-center bg-background rounded px-3 py-2 border">
        {isLoading ? (
          <>
            <div className="animate-spin mr-2">⟳</div>
            <span className="font-mono text-sm text-muted-foreground">Chargement...</span>
          </>
        ) : (
          <>
            {isMalicious ? (
              <LockOpen className="w-4 h-4 text-destructive mr-2" />
            ) : (
              <Lock className="w-4 h-4 text-green-600 mr-2" />
            )}
            <span className="font-mono text-sm">
              {maliciousPart && isMalicious ? (
                url.split(maliciousPart).map((part, i) => (
                  <span key={i}>
                    {part}
                    {i < url.split(maliciousPart).length - 1 && (
                      <span className="bg-destructive/20 text-destructive font-bold px-1 rounded">
                        {maliciousPart}
                      </span>
                    )}
                  </span>
                ))
              ) : (
                url
              )}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

// Composant Email de phishing
const PhishingEmail = ({ onClickLink }: { onClickLink: () => void }) => {
  const [showUrl, setShowUrl] = useState(false);
  
  return (
    <div className="space-y-4">
      <BrowserBar url="https://mail.google.com/mail/u/0/#inbox" isMalicious={false} />
      
      <Card className="p-6 border-l-4 border-l-primary">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Support Beta.gouv.fr</span>
              <span className="text-sm text-muted-foreground">Aujourd'hui, 14:23</span>
            </div>
            <p className="text-sm text-muted-foreground">support@beta.gouv.fr</p>
          </div>
        </div>
        
        <h3 className="font-bold text-lg mb-3">Action requise : Confirmez votre compte</h3>
        
        <div className="space-y-3 text-sm">
          <p>Bonjour,</p>
          <p>
            Nous avons détecté une activité inhabituelle sur votre compte Beta.gouv.fr. 
            Pour des raisons de sécurité, nous vous demandons de confirmer vos informations.
          </p>
          <p className="font-semibold text-destructive">
            ⚠️ Votre compte sera suspendu dans 24h si vous ne confirmez pas.
          </p>
          
          <div className="relative">
            <Button 
              className="w-full mt-4"
              size="lg"
              onMouseEnter={() => setShowUrl(true)}
              onMouseLeave={() => setShowUrl(false)}
              onClick={onClickLink}
            >
              Confirmer mon compte
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            {showUrl && (
              <div className="absolute -bottom-8 left-0 right-0 bg-muted border rounded px-2 py-1 text-xs font-mono animate-fade-in">
                beta.gouv.fr/redirect?url=https://evil-beta-gouv.com/login
              </div>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-6">
            Cordialement,<br />
            L'équipe Beta.gouv.fr
          </p>
        </div>
      </Card>
      
      <div className="flex items-start gap-2 text-sm bg-muted/50 p-3 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p>
          <strong>Observez :</strong> Le lien semble provenir de beta.gouv.fr mais redirige vers 
          un site malveillant. Survolez le bouton pour voir l'URL réelle !
        </p>
      </div>
    </div>
  );
};

// Composant Redirection animée
const RedirectionStep = () => {
  const [phase, setPhase] = useState<"initial" | "loading" | "redirected">("initial");
  
  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("loading"), 1000);
    const timer2 = setTimeout(() => setPhase("redirected"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);
  
  return (
    <div className="space-y-4">
      {phase === "initial" && (
        <div className="animate-fade-in">
          <BrowserBar 
            url="https://beta.gouv.fr/redirect?url=https://evil-beta-gouv.com/login" 
            isMalicious={false}
          />
          <Card className="p-8 text-center rounded-t-none">
            <div className="animate-pulse">
              <ArrowRight className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-lg">Redirection en cours...</p>
            </div>
          </Card>
        </div>
      )}
      
      {phase === "loading" && (
        <div className="animate-fade-in">
          <BrowserBar 
            url="https://evil-beta-gouv.com/login" 
            isMalicious={true}
            isLoading={true}
          />
          <Card className="p-8 text-center rounded-t-none">
            <div className="animate-spin text-4xl mb-4">⟳</div>
            <p>Chargement...</p>
          </Card>
        </div>
      )}
      
      {phase === "redirected" && (
        <div className="animate-scale-in">
          <BrowserBar 
            url="https://evil-beta-gouv.com/login" 
            isMalicious={true}
          />
          <Card className="p-8 rounded-t-none border-destructive/50 border-2">
            <div className="flex items-center justify-center gap-3 text-destructive">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h3 className="font-bold text-xl">La redirection s'est produite !</h3>
                <p className="text-sm">Vous êtes maintenant sur le site malveillant</p>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <div className="flex items-start gap-2 text-sm bg-destructive/10 border border-destructive/30 p-3 rounded-lg">
        <Skull className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        <p>
          <strong>Le piège :</strong> L'URL a changé de <code className="bg-background px-1 rounded">beta.gouv.fr</code> à{" "}
          <code className="bg-destructive/20 text-destructive px-1 rounded font-bold">evil-beta-gouv.com</code>.
          La plupart des utilisateurs ne remarquent pas ce changement.
        </p>
      </div>
    </div>
  );
};

// Composant Fausse page de login
const FakeLoginPage = ({ 
  onSubmit 
}: { 
  onSubmit: (email: string, password: string) => void 
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onSubmit(email, password);
    }
  };
  
  return (
    <div className="space-y-4">
      <BrowserBar 
        url="https://evil-beta-gouv.com/login" 
        isMalicious={true}
      />
      
      <Card className="p-8 rounded-t-none">
        {/* Faux header beta.gouv.fr */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-xl">Beta.gouv.fr</h2>
            <p className="text-xs text-muted-foreground">Espace membre</p>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-2">Connexion à votre espace</h3>
        <p className="text-muted-foreground mb-6">
          Veuillez vous connecter pour confirmer votre identité
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@beta.gouv.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" size="lg">
            Se connecter
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground text-center mt-6">
          © 2024 Beta.gouv.fr - Tous droits réservés
        </p>
      </Card>
      
      <div className="flex items-start gap-2 text-sm bg-muted/50 p-3 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p>
          <strong>Site malveillant :</strong> Cette page imite parfaitement beta.gouv.fr. 
          Seule l'URL dans la barre d'adresse permet de détecter le piège !
        </p>
      </div>
    </div>
  );
};

// Composant Identifiants volés
const StolenCredentials = ({ 
  email, 
  password,
  onReset 
}: { 
  email: string; 
  password: string;
  onReset: () => void;
}) => {
  return (
    <div className="space-y-4 animate-scale-in">
      <Card className="p-8 bg-destructive/10 border-destructive border-2">
        <div className="text-center mb-6">
          <Skull className="w-16 h-16 mx-auto mb-4 text-destructive animate-pulse" />
          <h3 className="text-2xl font-bold text-destructive mb-2">
            💀 Vos identifiants ont été volés !
          </h3>
          <p className="text-muted-foreground">
            L'attaquant a maintenant accès à vos informations
          </p>
        </div>
        
        <div className="bg-background p-4 rounded-lg space-y-3 mb-6">
          <h4 className="font-semibold flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Données capturées :
          </h4>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between p-2 bg-muted rounded">
              <span className="text-muted-foreground">Email :</span>
              <span className="font-bold text-destructive">{email}</span>
            </div>
            <div className="flex justify-between p-2 bg-muted rounded">
              <span className="text-muted-foreground">Mot de passe :</span>
              <span className="font-bold text-destructive">{password}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-background p-4 rounded-lg space-y-2 text-sm">
          <h4 className="font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Comment éviter ce piège ?
          </h4>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-primary shrink-0">✓</span>
              <span>Toujours vérifier l'URL complète dans la barre d'adresse</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary shrink-0">✓</span>
              <span>Méfiez-vous des emails urgents demandant des actions immédiates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary shrink-0">✓</span>
              <span>Ne cliquez jamais sur des liens dans des emails suspects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary shrink-0">✓</span>
              <span>Tapez directement l'URL du site dans votre navigateur</span>
            </li>
          </ul>
        </div>
        
        <Button onClick={onReset} variant="outline" className="w-full mt-4">
          Recommencer la démo
        </Button>
      </Card>
    </div>
  );
};

// Composant principal
const Slide02Interactive = () => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [stolenEmail, setStolenEmail] = useState("");
  const [stolenPassword, setStolenPassword] = useState("");
  
  const handleEmailClick = () => {
    setStep(2);
    setTimeout(() => setStep(3), 3500);
  };
  
  const handleLogin = (email: string, password: string) => {
    setStolenEmail(email);
    setStolenPassword(password);
    setStep(4);
  };
  
  const handleReset = () => {
    setStep(1);
    setStolenEmail("");
    setStolenPassword("");
  };
  
  return (
    <div className="h-full flex flex-col p-8 bg-gradient-to-br from-background to-muted/20">
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
          Démo Interactive : Open Redirect
        </h1>
        <p className="text-lg text-muted-foreground">
          Simulation complète d'une attaque par redirection non validée
        </p>
      </div>
      
      {/* Indicateur d'étapes */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[
          { num: 1, label: "Email" },
          { num: 2, label: "Redirection" },
          { num: 3, label: "Phishing" },
          { num: 4, label: "Vol" }
        ].map(({ num, label }) => (
          <div key={num} className="flex items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                step >= num 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-muted text-muted-foreground border-muted"
              }`}
            >
              {num}
            </div>
            <span className="text-sm ml-2 font-medium">{label}</span>
            {num < 4 && <ArrowRight className="w-4 h-4 mx-2 text-muted-foreground" />}
          </div>
        ))}
      </div>
      
      {/* Contenu de l'étape */}
      <div className="flex-1 max-w-4xl mx-auto w-full">
        {step === 1 && <PhishingEmail onClickLink={handleEmailClick} />}
        {step === 2 && <RedirectionStep />}
        {step === 3 && <FakeLoginPage onSubmit={handleLogin} />}
        {step === 4 && (
          <StolenCredentials 
            email={stolenEmail} 
            password={stolenPassword}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default Slide02Interactive;
