import { useState } from "react";
import { Globe, KeyRound, User, Server, Play, RotateCcw, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Slide02bStoredXSSDemo = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { label: "Démarrer", description: "L'attaquant prépare son serveur de collecte de credentials" },
    { label: "Victime arrive", description: "Alice visite le blog avec le commentaire malveillant" },
    { label: "Modal injecté", description: "Un faux popup 'Session expirée' apparaît" },
    { label: "Credentials saisis", description: "Alice entre ses identifiants dans le faux formulaire" },
    { label: "Identifiants volés", description: "Les credentials sont envoyés à l'attaquant" },
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const reset = () => setStep(0);

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            Stored XSS - Phishing par Injection de Formulaire
          </h1>
          <p className="text-sm text-foreground/70">
            Cliquez sur "Étape suivante" pour simuler l'attaque
          </p>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            className="gap-1"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </Button>
          <Button
            onClick={nextStep}
            disabled={step >= steps.length - 1}
            size="sm"
            className="gap-1 bg-red-600 hover:bg-red-700"
          >
            {step === 0 ? <Play className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            {step === 0 ? "Démarrer" : "Étape suivante"}
          </Button>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-4">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i <= step
                  ? "bg-red-500 text-white"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`h-0.5 w-8 transition-all ${
                  i < step ? "bg-red-500" : "bg-zinc-800"
                }`}
              />
            )}
          </div>
        ))}
        <span className="ml-2 text-sm text-zinc-400">{steps[step].description}</span>
      </div>

      {/* Main content - Split view */}
      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Left - Attacker's screen */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-red-500 p-1.5 rounded">
              <User className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-red-400">Écran de l'Attaquant</h2>
          </div>
          
          {/* Attacker's terminal/dashboard */}
          <div className="flex-1 bg-zinc-950 border border-red-800/50 rounded-lg overflow-hidden flex flex-col">
            {/* Terminal header */}
            <div className="bg-zinc-900 px-3 py-1.5 border-b border-zinc-800 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-zinc-400 ml-2">evil-server.com - Credential Harvester</span>
            </div>
            
            {/* Terminal content */}
            <div className="flex-1 p-3 font-mono text-xs space-y-2 overflow-auto">
              {step >= 0 && (
                <>
                  <div className="text-green-400">$ node credential-harvester.js</div>
                  <div className="text-zinc-500">Server listening on port 443...</div>
                  <div className="text-zinc-500">Waiting for incoming credentials...</div>
                  <div className="text-zinc-600 my-2">───────────────────────────────</div>
                </>
              )}
              
              {step >= 1 && (
                <div className={`transition-all ${step === 1 ? "animate-pulse" : ""}`}>
                  <div className="text-yellow-400">[2024-01-15 14:32:01] New victim connected!</div>
                  <div className="text-zinc-400 pl-2">IP: 192.168.1.42</div>
                  <div className="text-zinc-400 pl-2">User-Agent: Chrome/120.0.0.0</div>
                </div>
              )}
              
              {step >= 2 && (
                <div className={`transition-all ${step === 2 ? "animate-pulse" : ""}`}>
                  <div className="text-purple-400 mt-2">[PAYLOAD] Fake login modal injected</div>
                  <div className="text-zinc-400 pl-2">Waiting for credentials...</div>
                </div>
              )}
              
              {step >= 4 && (
                <div className="transition-all">
                  <div className="text-red-400 mt-2">[CREDENTIALS RECEIVED]</div>
                  <div className="bg-red-950/50 border border-red-800/30 rounded p-2 mt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500">Email:</span>
                      <span className="text-red-300">alice@example.com</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-zinc-500">Password:</span>
                      <span className="text-red-300">MyS3cur3P@ssw0rd!</span>
                    </div>
                  </div>
                  <div className="text-green-400 mt-2">✓ Credentials harvested successfully!</div>
                  <div className="text-zinc-600 my-2">───────────────────────────────</div>
                  <div className="text-purple-400">[ACTION] Accessing victim's account...</div>
                </div>
              )}
              
              {step === 0 && (
                <div className="text-zinc-600 animate-pulse">En attente de victimes...</div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Victim's browser */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-500 p-1.5 rounded">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-blue-400">Navigateur de la Victime (Alice)</h2>
          </div>
          
          {/* Browser window */}
          <div className="flex-1 bg-zinc-950 border border-blue-800/50 rounded-lg overflow-hidden flex flex-col relative">
            {/* Browser header */}
            <div className="bg-zinc-900 px-3 py-1.5 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 bg-zinc-800 rounded px-2 py-0.5 mx-2">
                  <span className="text-xs text-zinc-400">
                    {step >= 1 ? "🔒 https://blog-legitime.com/article/123" : "Nouvel onglet"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Browser content */}
            <div className="flex-1 bg-zinc-900 p-4 overflow-auto relative">
              {step === 0 ? (
                <div className="h-full flex items-center justify-center text-zinc-600">
                  <p>En attente... Alice n'a pas encore visité le blog</p>
                </div>
              ) : (
                <>
                  {/* Fake blog header */}
                  <div className="border-b border-zinc-700 pb-3 mb-4">
                    <h3 className="text-lg font-bold text-zinc-100">Blog Légitime</h3>
                    <p className="text-xs text-zinc-500">Article: "Les meilleures pratiques dev"</p>
                  </div>
                  
                  {/* Article content */}
                  <div className="text-sm text-zinc-300 mb-4">
                    <p>Voici quelques conseils pour améliorer votre code...</p>
                  </div>
                  
                  {/* Comments section */}
                  <div className="border-t border-zinc-700 pt-3">
                    <h4 className="text-sm font-semibold text-zinc-200 mb-3 flex items-center gap-2">
                      <KeyRound className="h-4 w-4" />
                      Commentaires (3)
                    </h4>
                    
                    {/* Normal comment */}
                    <div className="bg-zinc-800 rounded p-2 mb-2">
                      <div className="text-xs text-zinc-400 mb-1">user42 - il y a 2h</div>
                      <div className="text-sm text-zinc-300">Super article, merci !</div>
                    </div>
                    
                    {/* Malicious comment - highlighted */}
                    <div className={`rounded p-2 mb-2 relative transition-all ${
                      step >= 2 
                        ? "bg-red-950/30 border border-red-700/50" 
                        : "bg-zinc-800"
                    }`}>
                      {step >= 2 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded">
                          PAYLOAD XSS
                        </div>
                      )}
                      <div className="text-xs text-zinc-400 mb-1">hacker_anon - il y a 1h</div>
                      <div className="text-sm text-zinc-300">
                        Très utile ! 
                        {step >= 2 && (
                          <span className="text-red-400 text-[10px] font-mono block mt-1 leading-tight">
                            &lt;script&gt;injectFakeLoginModal()&lt;/script&gt;
                          </span>
                        )}
                      </div>
                      
                      {/* Script execution indicator */}
                      {step >= 2 && (
                        <div className={`mt-2 flex items-center gap-1 text-[10px] text-red-300 bg-red-950/50 rounded px-1.5 py-0.5 ${
                          step === 2 ? "animate-pulse" : ""
                        }`}>
                          <span className={step >= 3 ? "" : "animate-pulse"}>●</span>
                          {step >= 3 ? "Modal injecté ✓" : "Injection du modal..."}
                        </div>
                      )}
                    </div>
                    
                    {/* Normal comment */}
                    <div className="bg-zinc-800 rounded p-2">
                      <div className="text-xs text-zinc-400 mb-1">dev_pro - il y a 30min</div>
                      <div className="text-sm text-zinc-300">Je suis d'accord avec les points 2 et 3.</div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Fake login modal overlay */}
              {step >= 2 && step < 5 && (
                <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${
                  step >= 2 ? "opacity-100" : "opacity-0"
                }`}>
                  <div className={`bg-white rounded-lg shadow-2xl w-72 overflow-hidden transform transition-all ${
                    step >= 2 ? "scale-100" : "scale-95"
                  }`}>
                    {/* Modal header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-300" />
                      <span className="text-white font-semibold text-sm">Session expirée</span>
                    </div>
                    
                    {/* Modal content */}
                    <div className="p-4">
                      <p className="text-zinc-600 text-xs mb-4">
                        Votre session a expiré. Veuillez vous reconnecter pour continuer.
                      </p>
                      
                      {/* Email field */}
                      <div className="mb-3">
                        <label className="text-xs text-zinc-500 block mb-1">Email</label>
                        <div className="bg-zinc-100 border border-zinc-300 rounded px-2 py-1.5 text-xs text-zinc-800">
                          alice@example.com
                        </div>
                      </div>
                      
                      {/* Password field */}
                      <div className="mb-4">
                        <label className="text-xs text-zinc-500 block mb-1">Mot de passe</label>
                        <div className={`bg-zinc-100 border rounded px-2 py-1.5 text-xs transition-all ${
                          step >= 3 
                            ? "border-blue-400 bg-blue-50" 
                            : "border-zinc-300"
                        }`}>
                          {step >= 3 ? (
                            <span className={`text-zinc-800 ${step === 3 ? "animate-pulse" : ""}`}>
                              ••••••••••••••••
                            </span>
                          ) : (
                            <span className="text-zinc-400">Entrez votre mot de passe</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Submit button */}
                      <button className={`w-full py-2 rounded text-xs font-semibold transition-all ${
                        step >= 3 
                          ? "bg-blue-600 text-white hover:bg-blue-700" 
                          : "bg-zinc-300 text-zinc-500"
                      }`}>
                        {step >= 4 ? "Connexion..." : "Se reconnecter"}
                      </button>
                      
                      {/* Hidden evil action indicator */}
                      {step >= 3 && (
                        <div className="mt-3 text-[9px] text-red-500 bg-red-50 border border-red-200 rounded p-1.5 flex items-center gap-1">
                          <span className="animate-pulse">⚠️</span>
                          <span>Action: POST vers evil-server.com/steal</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Status bar */}
            {step >= 4 && (
              <div className="bg-red-950/50 border-t border-red-800/50 px-3 py-1.5 flex items-center gap-2 animate-pulse">
                <Server className="h-3 w-3 text-red-400" />
                <span className="text-xs text-red-300">
                  Envoi des credentials vers evil-server.com...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Current step explanation */}
      <div className="mt-4 bg-zinc-900 border border-zinc-700 rounded-lg p-3">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded transition-all ${
            step >= 4 ? "bg-red-500/40" : "bg-red-500/20"
          }`}>
            <KeyRound className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-zinc-200 mb-1">
              Étape {step + 1}: {steps[step].label}
            </h4>
            <p className="text-xs text-zinc-400">
              {step === 0 && "L'attaquant a posté un commentaire contenant du JavaScript malveillant. Son serveur attend de recevoir des identifiants de victimes."}
              {step === 1 && "Alice, une utilisatrice du blog, visite la page. Le commentaire malveillant se charge avec le contenu légitime."}
              {step === 2 && "Le script injecte un faux modal 'Session expirée' par-dessus la page. Le design imite parfaitement le site légitime."}
              {step === 3 && "Alice, croyant à une vraie déconnexion, entre son mot de passe. Elle ne se doute pas que le formulaire est malveillant."}
              {step === 4 && "Les identifiants sont envoyés au serveur de l'attaquant. Il possède maintenant le email et mot de passe en clair d'Alice."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide02bStoredXSSDemo;
