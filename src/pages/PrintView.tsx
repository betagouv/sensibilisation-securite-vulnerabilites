import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { slides, chapters } from "@/data/slides";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft } from "lucide-react";
import { PrintScaler } from "@/components/PrintScaler";

const PrintView = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const moduleIdNum = parseInt(moduleId || "1");

  // Get module info
  const module = chapters.find(c => c.id === moduleIdNum);
  
  // Get all slides for this module and its sub-chapters
  const getModuleSlides = () => {
    const subChapters = chapters.filter(c => c.parentId === moduleIdNum);
    const chapterIds = [moduleIdNum, ...subChapters.map(c => c.id)];
    return slides.filter(s => chapterIds.includes(s.chapterId) && !s.hideInNav);
  };

  const moduleSlides = getModuleSlides();

  useEffect(() => {
    // Import print styles
    import("@/styles/print.css");
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module introuvable</h1>
          <Button onClick={() => navigate("/")}>Retour</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="print-view">
      {/* Print controls - hidden when printing */}
      <div className="no-print sticky top-0 z-50 bg-background border-b border-border p-4 flex items-center justify-between gap-4">
        <Button variant="outline" onClick={() => navigate("/")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold">{module.title}</h1>
          <p className="text-sm text-muted-foreground">{moduleSlides.length} slides</p>
        </div>
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="w-4 h-4" />
          Imprimer / PDF
        </Button>
      </div>

      {/* Print content */}
      <div className="print-content">
        {/* Cover page */}
        <div className="print-page cover-page">
          <div className="cover-content">
            <h1 className="cover-title">{module.title}</h1>
            {module.description && (
              <p className="cover-description">{module.description}</p>
            )}
            <div className="cover-meta">
              <p>Formation Cybersécurité</p>
              <p>Date d'export : {new Date().toLocaleDateString('fr-FR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</p>
              <p>{moduleSlides.length} slides</p>
            </div>
          </div>
        </div>

        {/* Table of contents */}
        <div className="print-page toc-page">
          <h2 className="toc-title">Table des matières</h2>
          <div className="toc-content">
            {chapters
              .filter(c => c.id === moduleIdNum || c.parentId === moduleIdNum)
              .map((chapter) => {
                const chapterSlides = moduleSlides.filter(s => s.chapterId === chapter.id);
                if (chapterSlides.length === 0) return null;
                
                return (
                  <div key={chapter.id} className={chapter.parentId ? "toc-subsection" : "toc-section"}>
                    <h3 className="toc-chapter-title">{chapter.title}</h3>
                    <ul className="toc-slide-list">
                      {chapterSlides.map((slide) => (
                        <li key={slide.id} className="toc-slide-item">
                          <span>{slide.title}</span>
                          <span className="toc-dots"></span>
                          <span>{slide.id}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Slides */}
        {moduleSlides.map((slide, index) => {
          const SlideComponent = slide.component;
          const chapter = chapters.find(c => c.id === slide.chapterId);
          
          return (
            <div key={slide.id} className="print-page slide-page">
              <div className="slide-header">
                <span className="slide-number">Slide {slide.id}</span>
                <span className="slide-chapter">{chapter?.title}</span>
              </div>
              <div className="slide-content">
                <PrintScaler>
                  <SlideComponent />
                </PrintScaler>
              </div>
              <div className="slide-footer">
                <span>{module.title}</span>
                <span>Page {index + 3}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrintView;
