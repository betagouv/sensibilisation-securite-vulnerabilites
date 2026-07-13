import CodeComparisonWithDiff from "../../templates/CodeComparisonWithDiff";

const vulnerableCode = {
  language: "typescript",
  lines: [
    "// Next.js API Route - Vulnérable IDOR",
    "// app/api/users/[id]/documents/route.ts",
    "export async function GET(req: Request, { params }: { params: { id: string } }) {",
    "  const userId = params.id;",
    "  ",
    "  // ❌ Pas de vérification d'autorisation !",
    "  const documents = await prisma.document.findMany({",
    "    where: { userId }",
    "  });",
    "  ",
    "  return Response.json(documents);",
    "}",
  ],
};

const secureCode = {
  language: "typescript",
  lines: [
    { content: "// Next.js API Route - Sécurisée avec vérification", type: "normal" as const },
    { content: "// app/api/users/[id]/documents/route.ts", type: "normal" as const },
    { content: "import { auth } from '@/lib/auth';", type: "added" as const },
    { content: "", type: "normal" as const },
    { content: "export async function GET(req: Request, { params }: { params: { id: string } }) {", type: "normal" as const },
    { content: "  const session = await auth();", type: "added" as const },
    { content: "  const requestedUserId = params.id;", type: "normal" as const },
    { content: "  const currentUserId = session.user.id;", type: "added" as const },
    { content: "", type: "normal" as const },
    { content: "  // ✅ Vérification que l'utilisateur accède à ses propres données", type: "added" as const },
    { content: "  if (requestedUserId !== currentUserId) {", type: "added" as const },
    { content: "    return Response.json({ error: 'Accès non autorisé' }, { status: 403 });", type: "added" as const },
    { content: "  }", type: "added" as const },
    { content: "", type: "normal" as const },
    { content: "  const documents = await prisma.document.findMany({", type: "normal" as const },
    { content: "    where: { userId: requestedUserId }", type: "normal" as const },
    { content: "  });", type: "normal" as const },
    { content: "", type: "normal" as const },
    { content: "  return Response.json(documents);", type: "normal" as const },
    { content: "}", type: "normal" as const },
  ],
};

const Idor03CodeComparisonNextJS = () => {
  return (
    <CodeComparisonWithDiff
      title="IDOR - Comparaison de Code"
      subtitle="Next.js App Router (TypeScript)"
      vulnerableCode={vulnerableCode}
      secureCode={secureCode}
      vulnerableLabel="Code Vulnérable"
      secureLabel="Code Sécurisé"
    />
  );
};

export default Idor03CodeComparisonNextJS;
