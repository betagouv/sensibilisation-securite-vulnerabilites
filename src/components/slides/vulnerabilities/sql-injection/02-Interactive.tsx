import { useState, useEffect } from "react";
import { Shield, Database, AlertTriangle, Skull, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import initSqlJs, { Database as SqlDatabase } from "sql.js";

interface Transaction {
  id: number;
  user_id: number;
  user_name: string;
  date: string;
  montant: number;
  libelle: string;
}

const Slide02Interactive = () => {
  const [db, setDb] = useState<SqlDatabase | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Transaction[]>([]);
  const [isInjected, setIsInjected] = useState(false);
  const [executedQuery, setExecutedQuery] = useState("");
  const [sqlError, setSqlError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showHints, setShowHints] = useState(false);

  // Initialize SQLite database in memory
  useEffect(() => {
    const initDatabase = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`
        });

        const database = new SQL.Database();

        // Create transactions table
        database.run(`
          CREATE TABLE transactions (
            id INTEGER PRIMARY KEY,
            user_id INTEGER,
            user_name TEXT,
            date TEXT,
            montant REAL,
            libelle TEXT
          )
        `);

        // Create users table with plain text passwords (VULNERABLE!)
        database.run(`
          CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT,
            password TEXT,
            role TEXT
          )
        `);

        // Insert transactions data
        database.run(`
          INSERT INTO transactions VALUES 
            (1, 1, 'Vous', '2024-01-15', -45.00, 'Restaurant Le Gourmet'),
            (2, 1, 'Vous', '2024-01-10', 1500.00, 'Salaire'),
            (3, 1, 'Vous', '2024-01-05', -89.99, 'Abonnement Sport'),
            (4, 2, 'Alice Martin', '2024-01-14', 25000.00, 'Virement confidentiel'),
            (5, 2, 'Alice Martin', '2024-01-08', -5000.00, 'Achat actions XYZ'),
            (6, 3, 'Bob Dupont', '2024-01-12', 150000.00, 'Prime exceptionnelle'),
            (7, 3, 'Bob Dupont', '2024-01-03', -12000.00, 'Paiement offshore')
        `);

        // Insert users with plain text passwords (NEVER DO THIS!)
        database.run(`
          INSERT INTO users VALUES 
            (1, 'admin', 'Admin123!', 'admin'),
            (2, 'alice.martin', 'MotDePasse2024', 'user'),
            (3, 'bob.dupont', 'Azerty123', 'user'),
            (4, 'root', 'SuperSecret999', 'superadmin')
        `);

        setDb(database);
        setIsLoading(false);

        // Execute initial query to show user's transactions
        executeInitialQuery(database);
      } catch (error) {
        console.error("Failed to initialize SQLite:", error);
        setSqlError("Erreur lors de l'initialisation de la base de données");
        setIsLoading(false);
      }
    };

    initDatabase();
  }, []);

  const executeInitialQuery = (database: SqlDatabase) => {
    try {
      const query = `SELECT * FROM transactions WHERE user_id = 1`;
      setExecutedQuery(query);
      const result = database.exec(query);
      
      if (result.length > 0) {
        const transactions = result[0].values.map((row: any) => ({
          id: row[0],
          user_id: row[1],
          user_name: row[2],
          date: row[3],
          montant: row[4],
          libelle: row[5]
        }));
        setResults(transactions);
      }
    } catch (error: any) {
      setSqlError(error.message);
    }
  };

  const executeQuery = (input: string) => {
    if (!db) return;

    setSqlError("");
    
    // Build vulnerable query - direct string concatenation!
    // ⚠️ NEVER DO THIS IN PRODUCTION - THIS IS VULNERABLE CODE FOR DEMO PURPOSES
    const query = `SELECT * FROM transactions WHERE user_id = 1 AND date LIKE '%${input}%'`;
    setExecutedQuery(query);

    // Detect injection patterns
    const injectionDetected = 
      input.includes("'") ||
      input.toLowerCase().includes(" or ") ||
      input.includes("1=1") ||
      input.includes("--") ||
      input.toLowerCase().includes("union");

    setIsInjected(injectionDetected);

    try {
      const result = db.exec(query);
      
      if (result.length > 0) {
        const transactions = result[0].values.map((row: any) => ({
          id: row[0],
          user_id: row[1],
          user_name: row[2],
          date: row[3],
          montant: row[4],
          libelle: row[5]
        }));
        setResults(transactions);
      } else {
        setResults([]);
      }
    } catch (error: any) {
      setSqlError(error.message);
      setResults([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeQuery(searchInput);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center space-y-3">
          <Database className="h-16 w-16 text-primary mx-auto animate-pulse" />
          <p className="text-lg text-muted-foreground">Initialisation de SQLite WebAssembly...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-background via-background to-muted/20 p-8 overflow-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <Database className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Démo Interactive : SQL Injection
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Base de données SQLite réelle en mémoire - Tentez une injection SQL !
          </p>
          <Badge variant="outline" className="gap-2">
            <Terminal className="w-3 h-3" />
            WebAssembly + sql.js
          </Badge>
        </div>

        {/* Search Form */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Mes Transactions Bancaires</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Rechercher une transaction par date :</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="2024-01"
                  className="flex-1 font-mono"
                />
                <Button type="submit">Rechercher</Button>
              </div>
              <div className="space-y-2">
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowHints(!showHints)}
                  className="gap-2"
                >
                  {showHints ? "Masquer" : "Voir"} les indices
                </Button>
                
                {showHints && (
                  <div className="space-y-1 text-xs animate-fade-in">
                    <p className="text-sm text-muted-foreground mb-2">💡 Injections à tester :</p>
                    <div><code className="bg-muted px-2 py-0.5 rounded">' OR '1'='1</code> - Bypass simple</div>
                    <div><code className="bg-muted px-2 py-0.5 rounded">' UNION SELECT id, 0, username, '2024', 0, password FROM users --</code> - Voler les mots de passe</div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </Card>

        {/* SQL Query Display */}
        <Card className="p-4 bg-slate-950 text-slate-50">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-mono text-slate-400">Requête SQL exécutée :</span>
              </div>
              {isInjected && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Injection détectée !
                </Badge>
              )}
            </div>
            <code className="text-sm font-mono block whitespace-pre-wrap break-all">
              {executedQuery}
            </code>
          </div>
        </Card>

        {/* SQL Error Display */}
        {sqlError && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Erreur SQL :</strong> {sqlError}
            </AlertDescription>
          </Alert>
        )}

        {/* Results Display */}
        {results.length === 0 && !sqlError ? (
          <Alert>
            <Database className="h-4 w-4" />
            <AlertDescription>
              Aucune transaction trouvée pour cette recherche.
            </AlertDescription>
          </Alert>
        ) : isInjected && results.some(r => r.libelle?.includes('Admin') || r.libelle?.includes('Azerty') || r.libelle?.includes('MotDePasse')) ? (
          <Alert variant="destructive">
            <Skull className="h-4 w-4" />
            <AlertDescription>
              <strong>🔥 FAILLE CRITIQUE DÉTECTÉE !</strong> L'injection UNION a exposé la table <code className="bg-destructive/20 px-1 rounded">users</code> contenant 
              les mots de passe en clair ! Ceci représente une violation de sécurité de niveau maximal.
            </AlertDescription>
          </Alert>
        ) : isInjected && results.some(r => r.user_id !== 1) ? (
          <Alert variant="destructive">
            <Skull className="h-4 w-4" />
            <AlertDescription>
              <strong>⚠️ Violation de sécurité détectée !</strong> L'injection SQL a permis d'accéder 
              aux transactions d'autres utilisateurs. Les données en rouge appartiennent à d'autres comptes.
            </AlertDescription>
          </Alert>
        ) : results.length > 0 ? (
          <Alert>
            <Database className="h-4 w-4" />
            <AlertDescription>
              Affichage normal : {results.length} transaction(s) trouvée(s)
            </AlertDescription>
          </Alert>
        ) : null}

        {/* Results Table */}
        {results.length > 0 && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Libellé</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((transaction) => {
                  const isStolen = transaction.user_id !== 1;
                  const isPasswordLeak = transaction.libelle?.includes('Admin') || 
                                       transaction.libelle?.includes('Azerty') || 
                                       transaction.libelle?.includes('MotDePasse') ||
                                       transaction.libelle?.includes('SuperSecret');
                  
                  return (
                    <TableRow
                      key={transaction.id}
                      className={isPasswordLeak ? "bg-destructive/20 border-l-4 border-l-destructive animate-pulse" : isStolen ? "bg-destructive/10 border-l-4 border-l-destructive" : ""}
                    >
                      <TableCell className="font-mono text-sm">
                        {transaction.date}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {isPasswordLeak && <Skull className="w-5 h-5 text-destructive animate-bounce" />}
                          {isStolen && !isPasswordLeak && <Skull className="w-4 h-4 text-destructive" />}
                          <span className={isPasswordLeak || isStolen ? "font-semibold text-destructive" : ""}>
                            {transaction.user_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={isPasswordLeak ? "font-mono font-bold text-destructive" : ""}>
                          {transaction.libelle}
                        </span>
                        {isPasswordLeak && <Badge variant="destructive" className="ml-2 text-xs">MOT DE PASSE</Badge>}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        <span className={transaction.montant > 0 ? "text-green-600" : "text-foreground"}>
                          {transaction.montant.toFixed(2)} €
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Info Message */}
        {!isInjected && results.length > 0 && results.every(r => r.user_id === 1) && (
          <div className="bg-primary/10 border border-primary rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-primary">
                  Requête légitime
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous voyez uniquement vos propres transactions. 
                  Essayez une injection SQL pour voir les données des autres utilisateurs !
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slide02Interactive;
