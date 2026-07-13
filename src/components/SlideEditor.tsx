import { useState } from "react";
import { Plus, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chapters } from "@/data/slides";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SlideEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SlideEditor({ open, onOpenChange }: SlideEditorProps) {
  const [activeTab, setActiveTab] = useState("slide");
  const { toast } = useToast();

  // Slide form
  const [slideTitle, setSlideTitle] = useState("");
  const [slideChapter, setSlideChapter] = useState("");
  const [slideContent, setSlideContent] = useState("");

  // Chapter form
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");

  const handleCreateSlide = () => {
    if (!slideTitle || !slideChapter || !slideContent) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Diapositive créée",
      description: `"${slideTitle}" a été ajoutée au ${
        chapters.find((c) => c.id.toString() === slideChapter)?.title
      }`,
    });

    // Reset form
    setSlideTitle("");
    setSlideChapter("");
    setSlideContent("");
    onOpenChange(false);
  };

  const handleCreateChapter = () => {
    if (!chapterTitle) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le titre du chapitre",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Chapitre créé",
      description: `"${chapterTitle}" a été ajouté`,
    });

    // Reset form
    setChapterTitle("");
    setChapterDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un élément</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle diapositive ou un nouveau chapitre à votre
            formation.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="slide">Diapositive</TabsTrigger>
            <TabsTrigger value="chapter">Chapitre</TabsTrigger>
          </TabsList>

          <TabsContent value="slide" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="slide-title">Titre de la diapositive</Label>
              <Input
                id="slide-title"
                placeholder="Ex: Introduction à la cryptographie"
                value={slideTitle}
                onChange={(e) => setSlideTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slide-chapter">Chapitre</Label>
              <Select value={slideChapter} onValueChange={setSlideChapter}>
                <SelectTrigger id="slide-chapter">
                  <SelectValue placeholder="Sélectionner un chapitre" />
                </SelectTrigger>
                <SelectContent>
                  {chapters.map((chapter) => (
                    <SelectItem key={chapter.id} value={chapter.id.toString()}>
                      {chapter.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slide-content">Contenu (JSX/React)</Label>
              <Textarea
                id="slide-content"
                placeholder="Collez le contenu JSX de votre diapositive..."
                className="min-h-[200px] font-mono text-sm"
                value={slideContent}
                onChange={(e) => setSlideContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Note: Le contenu sera ajouté dans un nouveau fichier .tsx dans
                src/components/slides/
              </p>
            </div>

            <Button onClick={handleCreateSlide} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Créer la diapositive
            </Button>
          </TabsContent>

          <TabsContent value="chapter" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chapter-title">Titre du chapitre</Label>
              <Input
                id="chapter-title"
                placeholder="Ex: Module 3 - Cryptographie avancée"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chapter-description">
                Description (optionnel)
              </Label>
              <Textarea
                id="chapter-description"
                placeholder="Brève description du chapitre..."
                value={chapterDescription}
                onChange={(e) => setChapterDescription(e.target.value)}
              />
            </div>

            <Button onClick={handleCreateChapter} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Créer le chapitre
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
