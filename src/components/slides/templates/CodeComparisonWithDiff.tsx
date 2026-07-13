import { useState } from "react";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeLine {
  content: string;
  type?: "added" | "removed" | "normal";
}

interface CodeComparisonWithDiffProps {
  title: string;
  subtitle?: string;
  vulnerableCode: {
    language: string;
    lines: string[];
  };
  secureCode: {
    language: string;
    lines: CodeLine[];
  };
  vulnerableLabel?: string;
  secureLabel?: string;
}

const CodeComparisonWithDiff = ({
  title,
  subtitle,
  vulnerableCode,
  secureCode,
  vulnerableLabel = "Code Vulnérable",
  secureLabel = "Code Sécurisé",
}: CodeComparisonWithDiffProps) => {
  const [showDiff, setShowDiff] = useState(false);

  return (
    <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 h-full overflow-hidden flex flex-col">
      <div className="space-y-6 animate-fade-in flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Exemple de code vulnérable vs Sécurisé
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Code Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Vulnerable Code */}
          <div className="flex flex-col min-h-0 bg-red-500/10 border-2 border-red-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="h-5 w-5 text-red-500" />
              <h3 className="text-xl font-bold text-foreground">
                {vulnerableLabel}
              </h3>
            </div>
            <div className="rounded-lg overflow-auto flex-1">
              <SyntaxHighlighter
                language={vulnerableCode.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "#1e1e1e",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
                showLineNumbers
              >
                {vulnerableCode.lines.join("\n")}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Secure Code with Diff */}
          <div className="flex flex-col min-h-0 bg-green-500/10 border-2 border-green-500/30 rounded-lg p-3 relative">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="text-xl font-bold text-foreground">
                {secureLabel}
              </h3>
            </div>
            <Button
              onClick={() => setShowDiff(!showDiff)}
              variant="outline"
              size="sm"
              className="absolute top-3 right-3 gap-1.5 h-8 text-xs"
            >
              {showDiff ? (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  Masquer diff
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  Afficher diff
                </>
              )}
            </Button>
            <div className="rounded-lg overflow-auto flex-1">
              <SyntaxHighlighter
                language={secureCode.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "1rem",
                  background: "#1e1e1e",
                  fontSize: "0.875rem",
                  lineHeight: "1.5",
                }}
                showLineNumbers
                wrapLines
                lineProps={(lineNumber) => {
                  const line = secureCode.lines[lineNumber - 1];
                  if (!line) return {};
                  
                  // Don't show removed lines when diff is hidden
                  if (!showDiff && line.type === "removed") {
                    return { style: { display: "none" } };
                  }

                  const isDiffVisible = showDiff && line.type;
                  if (!isDiffVisible) return {};

                  if (line.type === "added") {
                    return {
                      style: {
                        backgroundColor: "rgba(34, 197, 94, 0.2)",
                        borderLeft: "4px solid rgb(34, 197, 94)",
                        paddingLeft: "0.5rem",
                        display: "block",
                      },
                    };
                  } else if (line.type === "removed") {
                    return {
                      style: {
                        backgroundColor: "rgba(239, 68, 68, 0.2)",
                        borderLeft: "4px solid rgb(239, 68, 68)",
                        paddingLeft: "0.5rem",
                        textDecoration: "line-through",
                        opacity: 0.7,
                        display: "block",
                      },
                    };
                  }
                  return {};
                }}
              >
                {secureCode.lines.map((line) => line.content).join("\n")}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        {/* Legend */}
        {showDiff && (
          <div className="flex justify-center gap-6 text-sm text-muted-foreground animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/30 border-l-2 border-green-500 rounded-sm" />
              <span>Lignes ajoutées</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/30 border-l-2 border-red-500 rounded-sm" />
              <span>Lignes supprimées</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeComparisonWithDiff;
