import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Pause, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { levels, type Exercise } from "@/data/levels";
import { isPlayableVideoUrl } from "@/lib/video";
import toque from "@/assets/preview-toque.jpg.asset.json";
import manchete from "@/assets/preview-manchete.jpg.asset.json";
import saque from "@/assets/preview-saque.jpg.asset.json";
import alvo from "@/assets/preview-alvo.jpg.asset.json";
import lateral from "@/assets/preview-lateral.jpg.asset.json";
import parede from "@/assets/preview-parede.jpg.asset.json";

const images: Record<string, string> = {
  "1-1": toque.url, "2-1": manchete.url, "3-3": saque.url,
  "1-6": alvo.url, "2-4": lateral.url, "3-5": parede.url,
};
const previews = Object.keys(images).flatMap((id) => {
  const level = levels.find((item) => item.exercises.some((exercise) => exercise.id === id));
  const exercise = level?.exercises.find((item) => item.id === id);
  return level && exercise && isPlayableVideoUrl(exercise.videoUrl)
    ? [{ exercise, module: level.title, image: images[id] }] : [];
});

export function CoursePreview({ onStart }: { onStart: () => void }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<Exercise | null>(null);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPlaying(!media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);

  useEffect(() => {
    if (!api || !playing || hovered || focused || selected || !visible) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 6000);
    return () => window.clearInterval(timer);
  }, [api, playing, hovered, focused, selected, visible]);

  return (
    <section ref={section} id="aulas" className="border-b border-border bg-card/50 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-primary">Dentro da quadra</p>
            <h2 className="text-3xl font-black text-foreground">Seu próximo treino começa aqui</h2>
            <p className="mt-2 text-muted-foreground">Do primeiro toque ao desafio de saque.</p>
          </div>
          <Button variant="link" onClick={onStart} className="px-0">Ver curso completo <ArrowRight /></Button>
        </div>
        <Carousel setApi={setApi} opts={{ align: "start", loop: true }} aria-label="Prévias das aulas de voleibol"
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
          <CarouselContent className="-ml-5">
            {previews.map(({ exercise, module, image }) => (
              <CarouselItem key={exercise.id} className="basis-[88%] pl-5 sm:basis-1/2 lg:basis-1/3">
                <article className="h-full overflow-hidden rounded-lg border border-border bg-card">
                  <Button variant="ghost" onClick={() => setSelected(exercise)} aria-label={`Assistir prévia: ${exercise.title}`}
                    className="lesson-preview group relative block aspect-video h-auto w-full overflow-hidden rounded-none p-0 hover:bg-muted">
                    <img src={image} alt={`${exercise.title} — imagem da videoaula`} loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary text-primary-foreground transition-transform motion-safe:group-hover:scale-110"><Play className="fill-current" /></span>
                    </span>
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-primary-foreground">{exercise.type === "challenge" ? "Desafio prático" : "Videoaula"}</span>
                  </Button>
                  <div className="p-5">
                    <p className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-primary">
                      {exercise.type === "challenge" && <Trophy className="h-3.5 w-3.5" />}{module}
                    </p>
                    <h3 className="min-h-14 text-lg font-extrabold leading-7 text-card-foreground">{exercise.title}</h3>
                    <p className="mt-2 min-h-16 text-sm leading-relaxed text-muted-foreground line-clamp-3">{exercise.description}</p>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex items-center justify-between gap-3">
            <div className="flex gap-1" aria-label="Selecionar prévia">
              {previews.map(({ exercise }, index) => (
                <Button key={exercise.id} variant="ghost" size="icon" onClick={() => api?.scrollTo(index)}
                  aria-label={`Prévia ${index + 1}`} aria-current={current === index ? "true" : undefined} className="h-8 w-6 hover:bg-muted">
                  <span className={`h-2 rounded-full transition-all ${current === index ? "w-5 bg-primary" : "w-2 bg-border"}`} />
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" aria-label={playing ? "Pausar carrossel" : "Reproduzir carrossel"}
                title={playing ? "Pausar carrossel" : "Reproduzir carrossel"} onClick={() => setPlaying((value) => !value)}>{playing ? <Pause /> : <Play />}</Button>
              <Button variant="outline" size="icon" aria-label="Aula anterior" title="Aula anterior" onClick={() => api?.scrollPrev()}><ArrowLeft /></Button>
              <Button variant="outline" size="icon" aria-label="Próxima aula" title="Próxima aula" onClick={() => api?.scrollNext()}><ArrowRight /></Button>
            </div>
          </div>
        </Carousel>
      </div>
      <Dialog open={selected !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-lg">
          <DialogHeader>
            <DialogTitle className="pr-6 leading-snug">{selected?.title}</DialogTitle>
            <DialogDescription>{selected?.description}</DialogDescription>
          </DialogHeader>
          {selected && isPlayableVideoUrl(selected.videoUrl) && <iframe className="aspect-video w-full rounded-lg" src={selected.videoUrl}
            title={`Prévia: ${selected.title}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />}
          <Button onClick={onStart} className="justify-self-start">Ir para o curso <ArrowRight /></Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}