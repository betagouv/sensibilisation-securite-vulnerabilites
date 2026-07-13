import { ChevronRight, Plus, BookOpen, ChevronDown, FolderOpen, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { chapters, slides } from "@/data/slides";
import { Button } from "./ui/button";
import { SlideEditor } from "./SlideEditor";

interface TrainingSidebarProps {
  currentSlide: number;
  onSlideSelect: (index: number) => void;
}

export function TrainingSidebar({ currentSlide, onSlideSelect }: TrainingSidebarProps) {
  const { open } = useSidebar();
  const navigate = useNavigate();
  const [showEditor, setShowEditor] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const getSlidesByChapter = (chapterId: number) => {
    return slides
      .map((slide, index) => ({ ...slide, index }))
      .filter((slide) => slide.chapterId === chapterId && !slide.hideInNav);
  };

  const getSubChapters = (parentId: number) => {
    return chapters.filter((chapter) => chapter.parentId === parentId);
  };

  const mainChapters = chapters.filter((chapter) => !chapter.parentId);

  const renderSlides = (chapterId: number, isSubChapter: boolean = false) => {
    const chapterSlides = getSlidesByChapter(chapterId);
    const MenuItemComponent = isSubChapter ? SidebarMenuSubItem : SidebarMenuItem;
    const MenuButtonComponent = isSubChapter ? SidebarMenuSubButton : SidebarMenuButton;

    return chapterSlides.map((slide) => (
      <MenuItemComponent key={slide.id}>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <MenuButtonComponent
                onClick={() => onSlideSelect(slide.index)}
                isActive={currentSlide === slide.index}
                className="group"
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    currentSlide === slide.index ? "rotate-90" : ""
                  }`}
                />
                {open && (
                  <span className="flex-1 truncate">
                    {slide.title}
                  </span>
                )}
              </MenuButtonComponent>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{slide.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </MenuItemComponent>
    ));
  };

  return (
    <>
      <Sidebar className="border-r border-border">
        <SidebarContent>
          <div className="p-4 border-b border-border space-y-2">
            <Button
              onClick={() => setShowEditor(true)}
              className="w-full gap-2"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              {open && "Nouvelle diapositive"}
            </Button>
            
            <Collapsible open={showExportMenu} onOpenChange={setShowExportMenu}>
              <CollapsibleTrigger asChild>
                <Button
                  className="w-full gap-2"
                  variant="secondary"
                >
                  <Printer className="h-4 w-4" />
                  {open && "Exporter un module"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2 space-y-1">
                {mainChapters.map((chapter) => (
                  <Button
                    key={chapter.id}
                    onClick={() => navigate(`/print/${chapter.id}`)}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-xs"
                  >
                    {open ? chapter.title : `M${chapter.id}`}
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>

          {mainChapters.map((chapter) => {
            const chapterSlides = getSlidesByChapter(chapter.id);
            const subChapters = getSubChapters(chapter.id);
            const allRelatedSlides = [
              ...chapterSlides,
              ...subChapters.flatMap((sub) => getSlidesByChapter(sub.id)),
            ];
            const isChapterActive = allRelatedSlides.some(
              (slide) => slide.index === currentSlide
            );

            return (
              <Collapsible key={chapter.id} defaultOpen={isChapterActive}>
                <SidebarGroup>
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CollapsibleTrigger asChild>
                          <SidebarGroupLabel className="text-base cursor-pointer hover:bg-sidebar-accent rounded-md group/label">
                            {open && (
                              <ChevronDown className="h-4 w-4 mr-2 transition-transform group-data-[state=open]/label:rotate-180" />
                            )}
                            <BookOpen className="h-4 w-4 mr-2" />
                            {open && <span className="flex-1 truncate">{chapter.title}</span>}
                          </SidebarGroupLabel>
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{chapter.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {renderSlides(chapter.id)}

                        {subChapters.map((subChapter) => {
                          const subChapterSlides = getSlidesByChapter(subChapter.id);
                          const isSubChapterActive = subChapterSlides.some(
                            (slide) => slide.index === currentSlide
                          );

                          return (
                            <Collapsible
                              key={subChapter.id}
                              defaultOpen={isSubChapterActive}
                            >
                              <SidebarMenuItem>
                                <TooltipProvider delayDuration={300}>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="font-medium group/sub">
                                          {open && (
                                            <ChevronDown className="h-4 w-4 mr-2 transition-transform group-data-[state=open]/sub:rotate-180" />
                                          )}
                                          <FolderOpen className="h-4 w-4" />
                                          {open && (
                                            <span className="flex-1 truncate">{subChapter.title}</span>
                                          )}
                                        </SidebarMenuButton>
                                      </CollapsibleTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                      <p>{subChapter.title}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                <CollapsibleContent>
                                  <SidebarMenuSub>
                                    {renderSlides(subChapter.id, true)}
                                  </SidebarMenuSub>
                                </CollapsibleContent>
                              </SidebarMenuItem>
                            </Collapsible>
                          );
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            );
          })}
        </SidebarContent>
      </Sidebar>

      <SlideEditor open={showEditor} onOpenChange={setShowEditor} />
    </>
  );
}
