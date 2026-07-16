import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { slides } from "@/data/slides";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TrainingSidebar } from "./TrainingSidebar";
const SlideShow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Trouver l'index du slide à partir de l'URL
  const getSlideIndexFromUrl = (): number => {
    const hash = location.hash.slice(1); // Enlever le #
    if (!hash) return 0;
    const index = slides.findIndex(slide => slide.id === hash);
    return index >= 0 ? index : 0;
  };
  const [currentSlide, setCurrentSlide] = useState(getSlideIndexFromUrl());
  const totalSlides = slides.length;

  // Mettre à jour l'URL quand le slide change
  useEffect(() => {
    const slideId = slides[currentSlide].id;
    navigate(`#${slideId}`, {
      replace: true
    });
  }, [currentSlide, navigate]);

  // Synchroniser avec l'URL quand elle change (navigation browser)
  useEffect(() => {
    const newIndex = getSlideIndexFromUrl();
    if (newIndex !== currentSlide) {
      setCurrentSlide(newIndex);
    }
  }, [location.hash]);
  const goToSlide = (index: number, dir: "left" | "right") => {
    if (index >= 0 && index < totalSlides) {
      setDirection(dir);
      setCurrentSlide(index);
    }
  };
  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1, "right");
    }
  };
  const prevSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, "left");
    }
  };
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "f" || e.key === "F") toggleFullscreen();
      if (e.key === "Escape" && isFullscreen) toggleFullscreen();
    };
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    const handleWheel = (e: WheelEvent) => {
      if (isFullscreen) {
        e.preventDefault();
        if (e.deltaY > 0) {
          nextSlide();
        } else if (e.deltaY < 0) {
          prevSlide();
        }
      }
    };
    const handleClick = (e: MouseEvent) => {
      if (isFullscreen) {
        const target = e.target as HTMLElement;
        if (target.closest('.slide-content')) {
          nextSlide();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    if (isFullscreen) {
      window.addEventListener("wheel", handleWheel, {
        passive: false
      });
      window.addEventListener("click", handleClick);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("click", handleClick);
    };
  }, [currentSlide, isFullscreen]);
  const CurrentSlideComponent = slides[currentSlide].component;
  const logoSrc = `${import.meta.env.BASE_URL}beta-gouv-logo.png`;
  return <SidebarProvider defaultOpen={true}>
      <div className="h-screen flex w-full bg-background overflow-hidden">
        {!isFullscreen && <TrainingSidebar currentSlide={currentSlide} onSlideSelect={index => goToSlide(index, index > currentSlide ? "right" : "left")} />}

        <div className="flex-1 flex flex-col">
          {/* Header */}
          {!isFullscreen && <header className="border-b border-border bg-card/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SidebarTrigger>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SidebarTrigger>
                <div className="h-12 flex items-center gap-3">
                  <img src={logoSrc} alt="beta.gouv.fr" className="h-full object-contain" />
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-foreground">BETA.</span>
                    <span className="text-2xl font-bold text-accent">GOUV.FR</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Slide {currentSlide + 1} / {totalSlides}
                </span>
                <Button variant="ghost" size="icon" onClick={toggleFullscreen} title={isFullscreen ? "Quitter le plein écran (F)" : "Plein écran (F)"}>
                  {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </header>}

          {/* Main Slide Area */}
          <main className={`flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 ${isFullscreen ? 'p-2' : 'py-2 px-4'}`}>
            <div className={`w-full mx-auto ${isFullscreen ? 'h-full' : 'max-w-7xl h-full'}`}>
              <ScrollArea className={`w-full animate-fade-in slide-content ${isFullscreen ? 'cursor-pointer h-full rounded-lg' : 'h-full max-h-[calc(100vh-6rem)] rounded-2xl'}`}>
                <div key={currentSlide} className="h-full">
                  <CurrentSlideComponent />
                </div>
              </ScrollArea>
            </div>
          </main>

          {/* Footer Navigation */}
          {!isFullscreen && <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm translate-y-full hover:translate-y-0 transition-transform duration-300 ease-in-out">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Button variant="outline" size="lg" onClick={prevSlide} disabled={currentSlide === 0} className="gap-2">
                  <ChevronLeft className="h-5 w-5" />
                  Précédent
                </Button>

                {/* Progress dots */}
                <div className="flex gap-2 overflow-x-auto max-w-md px-4">
                  {slides.map((_, index) => <button key={index} onClick={() => goToSlide(index, index > currentSlide ? "right" : "left")} className={`h-2 rounded-full transition-all ${index === currentSlide ? "w-8 bg-accent" : "w-2 bg-muted hover:bg-muted-foreground"}`} aria-label={`Aller au slide ${index + 1}`} />)}
                </div>

                <Button variant="default" size="lg" onClick={nextSlide} disabled={currentSlide === totalSlides - 1} className="gap-2">
                  Suivant
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all duration-300" style={{
                width: `${(currentSlide + 1) / totalSlides * 100}%`
              }} />
              </div>
            </div>
          </footer>}
        </div>
      </div>
    </SidebarProvider>;
};
export default SlideShow;