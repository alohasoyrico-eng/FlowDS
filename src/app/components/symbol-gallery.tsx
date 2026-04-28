/**
 * FlowGallery — Full-bleed interactive illustration slideshow
 * ────────────────────────────────────────────────────────────
 * Reusable gallery component for FLOW's visual content.
 * Images fill the entire card. Click to enter fullscreen
 * via Overlay primitive.
 *
 * Built with FLOW primitives: Surface, ActionSurface, Stack,
 * Inline, Text, Overlay, FlowCard.
 */
import { useCallback, useEffect, useState } from "react";

import { ActionSurface, Inline, Overlay, Stack, Surface, Text } from "@flow/primitives";
import { FlowCard } from "@flow/components";

// ── Slide data ──
export interface GallerySlide {
  src: string;
  title: string;
  caption: string;
}

// ── Symbol slides ──
const SYMBOL_SLIDES: GallerySlide[] = [
  {
    src: "/symbols/tarjeta-baseline.jpeg",
    title: "Tarjeta Baseline",
    caption:
      "El punto de partida: la tarjeta como objeto aislado. Forma pura, sin contexto, sin personaje. El primitivo financiero desde el cual todo escala.",
  },
  {
    src: "/symbols/personaje-tarjeta.jpeg",
    title: "Personaje + Tarjeta",
    caption:
      "El personaje neutro sostiene la tarjeta. Primer nivel de composición: cuerpo + accesorio. Sin entorno, la relación humano-producto es el mensaje.",
  },
  {
    src: "/symbols/personaje-tarjeta-pos.jpeg",
    title: "Personaje + Tarjeta + Escenario POS",
    caption:
      "Composición completa: personaje interactúa con terminal POS en un entorno. Tres capas de profundidad — planos de luz, arquitectura, figura humana.",
  },
  {
    src: "/symbols/escenario-1.jpeg",
    title: "Escenario 1",
    caption:
      "Primera variación de escenario completo. El sistema modular genera narrativas distintas recombinando los mismos primitivos de personaje y entorno.",
  },
  {
    src: "/symbols/escenario-2.jpeg",
    title: "Escenario 2",
    caption:
      "Segunda variación. Mismo personaje, diferente contexto ambiental. La arquitectura del entorno define la historia sin necesidad de texto.",
  },
  {
    src: "/symbols/escenario-3.jpeg",
    title: "Escenario 3",
    caption:
      "Tercera variación. Demuestra la escalabilidad del sistema: primitivos finitos generan escenas infinitas manteniendo coherencia visual.",
  },
];

// ── Evolution slides (Demo0–Demo10) ──
const EVOLUTION_SLIDES: GallerySlide[] = [
  {
    src: "/symbols/demo-0.jpeg",
    title: "Demo 0",
    caption:
      "Punto de partida: el personaje base sin accesorios ni contexto. La figura geométrica mínima que ancla todo el sistema.",
  },
  {
    src: "/symbols/demo-1.jpeg",
    title: "Demo 1",
    caption:
      "Primera iteración: se introduce un accesorio simple. El personaje comienza a adquirir identidad funcional.",
  },
  {
    src: "/symbols/demo-2.jpeg",
    title: "Demo 2",
    caption:
      "Se añade postura y orientación. El cuerpo comunica intención antes de que exista un entorno.",
  },
  {
    src: "/symbols/demo-3.jpeg",
    title: "Demo 3",
    caption: "Aparece el plano de suelo. El personaje deja de flotar — primer anclaje espacial.",
  },
  {
    src: "/symbols/demo-4.jpeg",
    title: "Demo 4",
    caption:
      "Se introduce un objeto de contexto. La narrativa emerge de la relación personaje-objeto.",
  },
  {
    src: "/symbols/demo-5.jpeg",
    title: "Demo 5",
    caption:
      "Primer plano de luz. La atmósfera define profundidad sin necesidad de arquitectura compleja.",
  },
  {
    src: "/symbols/demo-6.jpeg",
    title: "Demo 6",
    caption:
      "Aparece arquitectura mínima. Kiosco, mostrador o estación — el entorno sugiere un escenario.",
  },
  {
    src: "/symbols/demo-7.jpeg",
    title: "Demo 7",
    caption:
      "Composición de dos capas: personaje + entorno. La escena se lee como una situación completa.",
  },
  {
    src: "/symbols/demo-8.jpeg",
    title: "Demo 8",
    caption:
      "Se añaden objetos secundarios. La complejidad visual crece sin perder claridad jerárquica.",
  },
  {
    src: "/symbols/demo-9.jpeg",
    title: "Demo 9",
    caption: "Tres capas de profundidad activas. Fondo, medio y primer plano operan en armonía.",
  },
  {
    src: "/symbols/demo-10.jpeg",
    title: "Demo 10",
    caption:
      "Composición máxima: todos los primitivos activos. El sistema completo en su expresión más rica.",
  },
];

// ── Nav button styles (token-driven) ──
const NAV_BTN: React.CSSProperties = {
  width: "var(--ref-frame-space-10)",
  height: "var(--ref-frame-space-10)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--sys-energy-surface-accent)",
  color: "var(--sys-energy-text-accent)",
  backdropFilter: "blur(var(--ref-depth-blur-sm))",
  transition: "background var(--ref-momentum-duration-fast) var(--ref-momentum-easing-standard)",
};

const NAV_BTN_OVERLAY: React.CSSProperties = {
  ...NAV_BTN,
  background: "var(--sys-energy-action-high)",
  color: "var(--sys-energy-text-on-action)",
};

// ── Inventory data ──
const INVENTORY_2D: GallerySlide[] = [
  {
    src: "/symbols/2d-carreteras.jpeg",
    title: "Carreteras",
    caption: "Infraestructura vial y autopistas.",
  },
  {
    src: "/symbols/2d-caseta.jpeg",
    title: "Caseta",
    caption: "Casetas de peaje y puntos de cobro.",
  },
  {
    src: "/symbols/2d-gasolineras.jpeg",
    title: "Gasolineras",
    caption: "Estaciones de servicio y combustible.",
  },
  {
    src: "/symbols/2d-vehiculos1.jpeg",
    title: "Vehículos",
    caption: "Flotilla de vehículos corporativos.",
  },
];

const INVENTORY_ISO: GallerySlide[] = [
  {
    src: "/symbols/iso-biometrics.jpeg",
    title: "Biometrics",
    caption: "Autenticación biométrica.",
  },
  {
    src: "/symbols/iso-carga-de-combustible.jpeg",
    title: "Carga de Combustible",
    caption: "Proceso de carga de combustible.",
  },
  {
    src: "/symbols/iso-carga-electrica.jpeg",
    title: "Carga Eléctrica",
    caption: "Estación de carga eléctrica.",
  },
  {
    src: "/symbols/iso-electromovilidad.jpeg",
    title: "Electromovilidad",
    caption: "Ecosistema de electromovilidad.",
  },
  {
    src: "/symbols/iso-flotillas.jpeg",
    title: "Flotillas",
    caption: "Gestión de flotillas vehiculares.",
  },
  { src: "/symbols/iso-high-mile.jpeg", title: "High Mile", caption: "Rutas de largo alcance." },
  { src: "/symbols/iso-last-mile.jpeg", title: "Last Mile", caption: "Última milla de entrega." },
  { src: "/symbols/iso-logistica.jpeg", title: "Logística", caption: "Operaciones logísticas." },
  {
    src: "/symbols/iso-mantenimiento-correctivo.jpeg",
    title: "Mantenimiento Correctivo",
    caption: "Reparación y mantenimiento correctivo.",
  },
  {
    src: "/symbols/iso-mantenimiento-preventivo.jpeg",
    title: "Mantenimiento Preventivo",
    caption: "Mantenimiento programado preventivo.",
  },
  {
    src: "/symbols/iso-middle-mile.jpeg",
    title: "Middle Mile",
    caption: "Distribución intermedia.",
  },
  { src: "/symbols/iso-mobile-app.jpeg", title: "Mobile App", caption: "Aplicación móvil." },
  { src: "/symbols/iso-otp.jpeg", title: "OTP", caption: "Autenticación por código único." },
  {
    src: "/symbols/iso-passcode.jpeg",
    title: "Passcode",
    caption: "Autenticación por contraseña.",
  },
  { src: "/symbols/iso-qr.jpeg", title: "QR", caption: "Pago y verificación por código QR." },
  {
    src: "/symbols/iso-recompensas1.jpeg",
    title: "Recompensas 1",
    caption: "Sistema de recompensas — variante 1.",
  },
  {
    src: "/symbols/iso-recompensas-2.jpeg",
    title: "Recompensas 2",
    caption: "Sistema de recompensas — variante 2.",
  },
  {
    src: "/symbols/iso-recompensas-3.jpeg",
    title: "Recompensas 3",
    caption: "Sistema de recompensas — variante 3.",
  },
  {
    src: "/symbols/iso-recompensas-4.jpeg",
    title: "Recompensas 4",
    caption: "Sistema de recompensas — variante 4.",
  },
  {
    src: "/symbols/iso-refacciones1.jpeg",
    title: "Refacciones 1",
    caption: "Refacciones y partes — variante 1.",
  },
  {
    src: "/symbols/iso-refacciones2.jpeg",
    title: "Refacciones 2",
    caption: "Refacciones y partes — variante 2.",
  },
  { src: "/symbols/iso-rutas.jpeg", title: "Rutas", caption: "Planificación de rutas." },
  {
    src: "/symbols/iso-señaletica.jpeg",
    title: "Señalética",
    caption: "Señalización digital y física.",
  },
];

// ── Pre-configured exports ──
export function SymbolGallery() {
  return <FlowGallery slides={SYMBOL_SLIDES} imageHeight={480} />;
}

export function EvolutionGallery() {
  return <FlowGallery slides={EVOLUTION_SLIDES} imageHeight={480} />;
}

// ── Inventory card with overlay browser ──
interface InventoryCardProps {
  title: string;
  count: number;
  thumbnail: string;
  description: string;
  slides: GallerySlide[];
}

export function InventoryCard({
  title,
  count,
  thumbnail,
  description,
  slides,
}: InventoryCardProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const current = slides[activeIndex];

  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  );
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % slides.length), [slides.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, prev, next]);

  return (
    <>
      <ActionSurface
        onPress={() => {
          setActiveIndex(0);
          setOpen(true);
        }}
        aria-label={`Ver inventario: ${title}`}
        style={{
          padding: 0,
          textAlign: "left",
          borderRadius: "var(--sys-frame-radius-container)",
          height: "100%",
        }}
      >
        <Surface
          variant="secondary"
          radius="container"
          style={{ overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}
        >
          <img
            src={thumbnail}
            alt={title}
            style={{
              width: "100%",
              height: "var(--ref-frame-space-40)",
              objectFit: "cover",
              display: "block",
            }}
          />
          <Inline
            gap={4}
            align="start"
            style={{ padding: "var(--ref-frame-space-4) var(--ref-frame-space-5)", flex: 1 }}
          >
            <Text variant="display-l">{count}</Text>
            <div
              style={{
                width: "var(--ref-frame-border-thin)",
                alignSelf: "stretch",
                background: "var(--sys-energy-border-default)",
                flexShrink: 0,
              }}
            />
            <Stack gap={1} style={{ flex: 1 }}>
              <Text variant="label-l">{title}</Text>
              <Text variant="paragraph-s" color="secondary">
                {description}
              </Text>
            </Stack>
          </Inline>
        </Surface>
      </ActionSurface>

      <Overlay visible={open} onDismiss={() => setOpen(false)}>
        <div
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--ref-frame-space-4)",
            padding: "var(--ref-frame-space-6)",
          }}
        >
          {/* Close */}
          <ActionSurface
            onPress={() => setOpen(false)}
            aria-label="Cerrar"
            style={{
              position: "absolute",
              top: "var(--ref-frame-space-5)",
              right: "var(--ref-frame-space-5)",
              ...NAV_BTN_OVERLAY,
            }}
          >
            <Text variant="label-l" style={{ color: "var(--sys-energy-text-on-action)" }}>
              ✕
            </Text>
          </ActionSurface>

          {/* Image */}
          <img
            src={current.src}
            alt={current.title}
            style={{
              maxWidth: "90vw",
              maxHeight: "65vh",
              objectFit: "contain",
              borderRadius: "var(--ref-frame-radius-3)",
            }}
          />

          {/* Caption */}
          <Stack gap={1} align="center" style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <Text variant="label-l" color="inverse">
              {current.title}
            </Text>
            <Text
              variant="paragraph-s"
              color="inverse"
              style={{ opacity: "var(--ref-state-opacity-muted)", textAlign: "center" }}
            >
              {current.caption}
            </Text>
            <Text
              variant="caption"
              color="inverse"
              style={{ opacity: "var(--ref-state-opacity-dimmed)" }}
            >
              {activeIndex + 1} / {slides.length}
            </Text>
          </Stack>

          {/* Nav */}
          <Inline gap={3}>
            <ActionSurface onPress={prev} aria-label="Anterior" style={NAV_BTN_OVERLAY}>
              <Text variant="label-m" style={{ color: "var(--sys-energy-text-on-action)" }}>
                ←
              </Text>
            </ActionSurface>
            <ActionSurface onPress={next} aria-label="Siguiente" style={NAV_BTN_OVERLAY}>
              <Text variant="label-m" style={{ color: "var(--sys-energy-text-on-action)" }}>
                →
              </Text>
            </ActionSurface>
          </Inline>
        </div>
      </Overlay>
    </>
  );
}

export { INVENTORY_2D, INVENTORY_ISO };

// ── Generic gallery component ──
interface FlowGalleryProps {
  slides: GallerySlide[];
  imageHeight?: string | number;
}

function FlowGallery({
  slides,
  imageHeight = "var(--comp-gallery-image-height)",
}: FlowGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const slide = slides[activeIndex];

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  }, [slides.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % slides.length);
    setIsPlaying(false);
  }, [slides.length]);

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen, prev, next]);

  const goTo = useCallback((i: number) => {
    setActiveIndex(i);
    setIsPlaying(false);
  }, []);

  return (
    <>
      <Stack gap={6}>
        {/* ── Main image — full bleed ── */}
        <FlowCard elevation={2} padding="none" style={{ overflow: "hidden", position: "relative" }}>
          <ActionSurface
            onPress={() => setFullscreen(true)}
            aria-label={`Ver en pantalla completa: ${slide.title}`}
            style={{ padding: 0, display: "block", width: "100%", cursor: "zoom-in" }}
          >
            <img
              src={slide.src}
              alt={slide.title}
              style={{
                width: "100%",
                height: imageHeight,
                objectFit: "cover",
                display: "block",
              }}
            />
          </ActionSurface>

          {/* Navigation controls */}
          <Inline
            gap={2}
            justify="between"
            align="center"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "var(--ref-frame-space-4) var(--ref-frame-space-5)",
              background: "linear-gradient(transparent, var(--sys-depth-overlay))",
            }}
          >
            <Inline gap={2}>
              <ActionSurface onPress={prev} aria-label="Anterior" style={NAV_BTN}>
                <Text variant="label-m" color="accent">
                  ←
                </Text>
              </ActionSurface>
              <ActionSurface
                onPress={() => setIsPlaying(!isPlaying)}
                selected={isPlaying}
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
                style={NAV_BTN}
              >
                <Text variant="label-s" color="accent">
                  {isPlaying ? "❚❚" : "▶"}
                </Text>
              </ActionSurface>
              <ActionSurface onPress={next} aria-label="Siguiente" style={NAV_BTN}>
                <Text variant="label-m" color="accent">
                  →
                </Text>
              </ActionSurface>
            </Inline>
            <Inline gap={3} align="center">
              <ActionSurface
                onPress={() => setFullscreen(true)}
                aria-label="Pantalla completa"
                style={{
                  ...NAV_BTN,
                  width: "var(--ref-frame-space-8)",
                  height: "var(--ref-frame-space-8)",
                }}
              >
                <Text variant="label-s" color="accent">
                  ⛶
                </Text>
              </ActionSurface>
              <Text variant="label-s" color="secondary">
                {activeIndex + 1} / {slides.length}
              </Text>
            </Inline>
          </Inline>
        </FlowCard>

        {/* ── Caption ── */}
        <Stack gap={1}>
          <Text variant="label-l">{slide.title}</Text>
          <Text variant="paragraph-s" color="secondary">
            {slide.caption}
          </Text>
        </Stack>

        {/* ── Thumbnails ── */}
        <Inline gap={2}>
          {slides.map((s, i) => (
            <ActionSurface
              key={s.src}
              selected={i === activeIndex}
              onPress={() => goTo(i)}
              aria-label={s.title}
              style={{
                flexShrink: 0,
                width: "var(--comp-gallery-thumb-width)",
                height: "var(--comp-gallery-thumb-height)",
                borderRadius: "var(--ref-frame-radius-2)",
                overflow: "hidden",
                padding: 0,
                opacity: i === activeIndex ? 1 : "var(--ref-state-opacity-dimmed)",
                outline:
                  i === activeIndex
                    ? "2px solid var(--sys-energy-border-focus)"
                    : "2px solid transparent",
                transition: `opacity var(--ref-momentum-duration-fast), outline-color var(--ref-momentum-duration-fast)`,
              }}
            >
              <img
                src={s.src}
                alt={s.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </ActionSurface>
          ))}
        </Inline>
      </Stack>

      {/* ── Fullscreen overlay ── */}
      <Overlay visible={fullscreen} onDismiss={() => setFullscreen(false)}>
        <div
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--ref-frame-space-4)",
            padding: "var(--ref-frame-space-6)",
          }}
        >
          {/* Close button */}
          <ActionSurface
            onPress={() => setFullscreen(false)}
            aria-label="Cerrar"
            style={{
              position: "absolute",
              top: "var(--ref-frame-space-5)",
              right: "var(--ref-frame-space-5)",
              ...NAV_BTN_OVERLAY,
            }}
          >
            <Text variant="label-l" style={{ color: "var(--sys-energy-text-on-action)" }}>
              ✕
            </Text>
          </ActionSurface>

          {/* Full image */}
          <img
            src={slide.src}
            alt={slide.title}
            style={{
              maxWidth: "90vw",
              maxHeight: "75vh",
              objectFit: "contain",
              borderRadius: "var(--ref-frame-radius-3)",
            }}
          />

          {/* Caption */}
          <Stack gap={1} align="center" style={{ maxWidth: "var(--sys-frame-content-prose)" }}>
            <Text variant="label-l" color="inverse">
              {slide.title}
            </Text>
            <Text
              variant="paragraph-s"
              color="inverse"
              style={{ opacity: "var(--ref-state-opacity-muted)", textAlign: "center" }}
            >
              {slide.caption}
            </Text>
          </Stack>

          {/* Navigation */}
          <Inline gap={3}>
            <ActionSurface onPress={prev} aria-label="Anterior" style={NAV_BTN_OVERLAY}>
              <Text variant="label-m" style={{ color: "var(--sys-energy-text-on-action)" }}>
                ←
              </Text>
            </ActionSurface>
            {slides.map((s, i) => (
              <ActionSurface
                key={s.src}
                selected={i === activeIndex}
                onPress={() => goTo(i)}
                aria-label={s.title}
                style={{
                  width: "var(--ref-frame-space-16)",
                  height: "var(--comp-gallery-thumb-height-overlay)",
                  borderRadius: "var(--ref-frame-radius-1)",
                  overflow: "hidden",
                  padding: 0,
                  opacity: i === activeIndex ? 1 : "var(--ref-state-opacity-faint)",
                  outline:
                    i === activeIndex
                      ? "2px solid var(--sys-energy-border-focus)"
                      : "2px solid transparent",
                  transition: `opacity var(--ref-momentum-duration-fast)`,
                }}
              >
                <img
                  src={s.src}
                  alt={s.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </ActionSurface>
            ))}
            <ActionSurface onPress={next} aria-label="Siguiente" style={NAV_BTN_OVERLAY}>
              <Text variant="label-m" style={{ color: "var(--sys-energy-text-on-action)" }}>
                →
              </Text>
            </ActionSurface>
          </Inline>
        </div>
      </Overlay>
    </>
  );
}
