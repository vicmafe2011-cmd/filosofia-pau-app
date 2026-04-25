import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Trophy, Flame, Brain, CheckCircle2, XCircle, Star, ScrollText,
  Gamepad2, Sparkles, GraduationCap, RotateCcw, Target, Timer, Award,
  ClipboardCheck, Scale, History, Wand2, Layers3, Lock, Map, Lightbulb,
} from "lucide-react";

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl bg-white shadow-xl ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, onClick, className = "", disabled = false }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`rounded-2xl px-4 py-2 font-medium transition hover:scale-[1.02] disabled:opacity-50 ${className}`}>
      {children}
    </button>
  );
}

function Badge({ children }) {
  return <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">{children}</span>;
}

function ProgressBar({ value }) {
  return (
    <div className="h-3 w-full rounded-full bg-slate-200">
      <motion.div className="h-3 rounded-full bg-slate-900" initial={{ width: 0 }} animate={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

function TheoryVisual({ type }) {
  const Box = ({ children, className = "" }) => (
    <div className={`rounded-2xl border border-slate-200 bg-white p-3 text-center text-sm shadow-sm ${className}`}>
      {children}
    </div>
  );
  const Arrow = () => <div className="flex items-center justify-center text-2xl font-bold text-slate-400">→</div>;
  const Down = () => <div className="flex justify-center text-2xl font-bold text-slate-400">↓</div>;

  if (type === "platon") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Platón · Alegoría de la caverna</h3>
      <div className="grid gap-3 md:grid-cols-5">
        <Box className="bg-slate-900 text-white">Prisioneros encadenados<p className="mt-1 text-xs text-slate-300">condición humana</p></Box>
        <Arrow />
        <Box className="bg-slate-100">Sombras<p className="mt-1 text-xs text-slate-500">opinión / apariencia</p></Box>
        <Arrow />
        <Box className="bg-orange-100">Fuego<p className="mt-1 text-xs text-slate-500">mundo visible</p></Box>
      </div>
      <Down />
      <div className="grid gap-3 md:grid-cols-5">
        <Box className="bg-blue-50">Liberación<p className="mt-1 text-xs text-slate-500">educación filosófica</p></Box>
        <Arrow />
        <Box className="bg-indigo-50">Salida de la caverna<p className="mt-1 text-xs text-slate-500">ascenso racional</p></Box>
        <Arrow />
        <Box className="bg-amber-100">Sol<p className="mt-1 text-xs text-slate-500">Idea de Bien</p></Box>
      </div>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">El comentario debe explicar el paso desde la opinión sensible hasta el conocimiento verdadero de las Ideas.</p>
    </div>
  );

  if (type === "aristoteles") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Aristóteles · Cambio y finalidad</h3>
      <div className="grid gap-3 md:grid-cols-5">
        <Box className="bg-yellow-50">Potencia<p className="mt-1 text-xs text-slate-500">lo que puede llegar a ser</p></Box>
        <Arrow />
        <Box className="bg-orange-50">Cambio<p className="mt-1 text-xs text-slate-500">proceso natural</p></Box>
        <Arrow />
        <Box className="bg-emerald-50">Acto<p className="mt-1 text-xs text-slate-500">realización</p></Box>
      </div>
      <Down />
      <div className="grid gap-3 md:grid-cols-4"><Box>Causa material</Box><Box>Causa formal</Box><Box>Causa eficiente</Box><Box>Causa final</Box></div>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Para Aristóteles, la realidad no está separada como en Platón: se encuentra en las sustancias concretas.</p>
    </div>
  );

  if (type === "agustin") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">San Agustín · Interioridad e iluminación</h3>
      <div className="grid gap-3 md:grid-cols-5">
        <Box className="bg-slate-50">Mundo exterior<p className="mt-1 text-xs text-slate-500">búsqueda insuficiente</p></Box>
        <Arrow />
        <Box className="bg-purple-50">Interioridad<p className="mt-1 text-xs text-slate-500">alma</p></Box>
        <Arrow />
        <Box className="bg-amber-100">Dios ilumina<p className="mt-1 text-xs text-slate-500">verdad eterna</p></Box>
      </div>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">El comentario debe mostrar que la verdad no depende solo de los sentidos, sino de la iluminación divina en el alma.</p>
    </div>
  );

  if (type === "tomas") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Tomás de Aquino · Razón, fe y cinco vías</h3>
      <div className="grid gap-3 md:grid-cols-5">
        <Box className="bg-emerald-50">Mundo sensible<p className="mt-1 text-xs text-slate-500">punto de partida</p></Box>
        <Arrow />
        <Box className="bg-lime-50">Razón<p className="mt-1 text-xs text-slate-500">argumenta</p></Box>
        <Arrow />
        <Box className="bg-amber-100">Dios<p className="mt-1 text-xs text-slate-500">fundamento último</p></Box>
      </div>
      <Down />
      <div className="grid gap-3 md:grid-cols-5"><Box>Movimiento</Box><Box>Causalidad</Box><Box>Contingencia</Box><Box>Perfección</Box><Box>Finalidad</Box></div>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Tomás no opone razón y fe: la razón puede demostrar algunas verdades, y la fe completa lo que la razón no alcanza.</p>
    </div>
  );

  if (type === "descartes") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Descartes · Duda metódica y cogito</h3>
      <div className="grid gap-3 md:grid-cols-7"><Box className="bg-blue-50">Duda de los sentidos</Box><Arrow /><Box className="bg-blue-50">Duda del mundo</Box><Arrow /><Box className="bg-blue-50">Genio maligno</Box><Arrow /><Box className="bg-slate-900 text-white">Cogito</Box></div>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">El objetivo no es quedarse en la duda, sino encontrar una certeza absolutamente indudable: el sujeto pensante.</p>
    </div>
  );

  if (type === "hume") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Hume · Empirismo y causalidad</h3>
      <div className="grid gap-3 md:grid-cols-5"><Box className="bg-sky-50">Impresiones<p className="mt-1 text-xs text-slate-500">experiencia viva</p></Box><Arrow /><Box className="bg-sky-50">Ideas<p className="mt-1 text-xs text-slate-500">copias débiles</p></Box><Arrow /><Box className="bg-red-50">Causalidad<p className="mt-1 text-xs text-slate-500">no es conexión necesaria</p></Box></div>
      <Down /><Box className="bg-amber-50">Repetición de hechos → hábito mental → creemos que hay causa</Box>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Hume no niega que usemos la causalidad: niega que podamos demostrar racionalmente una conexión necesaria.</p>
    </div>
  );

  if (type === "rousseau") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Rousseau · Desigualdad y contrato social</h3>
      <div className="grid gap-3 md:grid-cols-7"><Box className="bg-green-50">Estado natural</Box><Arrow /><Box className="bg-red-50">Propiedad privada</Box><Arrow /><Box className="bg-orange-50">Desigualdad</Box><Arrow /><Box className="bg-emerald-50">Contrato social</Box></div>
      <Down /><Box className="bg-indigo-50">Voluntad general → bien común → libertad política</Box>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">En Rousseau, la libertad no consiste en hacer lo que uno quiere, sino en obedecer leyes que expresan la voluntad general.</p>
    </div>
  );

  if (type === "kant") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Kant · Las tres críticas</h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-indigo-50 p-4"><h4 className="font-bold">1. Crítica de la razón pura</h4><p className="mt-2 text-sm">Pregunta: ¿qué puedo conocer?</p><div className="mt-3 space-y-2 text-xs"><Box>Sensibilidad: espacio y tiempo</Box><Box>Entendimiento: categorías</Box><Box>Fenómeno / noúmeno</Box></div></div>
        <div className="rounded-2xl border bg-emerald-50 p-4"><h4 className="font-bold">2. Crítica de la razón práctica</h4><p className="mt-2 text-sm">Pregunta: ¿qué debo hacer?</p><div className="mt-3 space-y-2 text-xs"><Box>Deber</Box><Box>Imperativo categórico</Box><Box>Autonomía moral</Box></div></div>
        <div className="rounded-2xl border bg-amber-50 p-4"><h4 className="font-bold">3. Crítica del juicio</h4><p className="mt-2 text-sm">Pregunta: ¿cómo juzgo lo bello?</p><div className="mt-3 space-y-2 text-xs"><Box>Juicio de gusto</Box><Box>Universalidad sin concepto</Box><Box>Finalidad sin fin</Box></div></div>
      </div>
      <Down /><Box className="bg-slate-50">Naturaleza conocida por la razón pura ↔ libertad moral de la razón práctica ↔ mediación del juicio</Box>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">En un comentario de Kant, primero identifica si el texto pertenece al conocimiento, la moral o la estética.</p>
    </div>
  );

  if (type === "marx") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Marx · Capitalismo y alienación</h3>
      <div className="grid gap-3 md:grid-cols-7"><Box className="bg-red-50">Trabajador</Box><Arrow /><Box className="bg-orange-50">Trabajo en fábrica</Box><Arrow /><Box className="bg-yellow-50">Producto ajeno</Box><Arrow /><Box className="bg-slate-900 text-white">Alienación</Box></div>
      <Down /><div className="grid gap-3 md:grid-cols-3"><Box>Burguesía</Box><Box>Proletariado</Box><Box>Lucha de clases</Box></div>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Marx explica las ideas desde las condiciones materiales: economía, trabajo, propiedad y clase social.</p>
    </div>
  );

  if (type === "nietzsche") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Nietzsche · Muerte de Dios y nuevos valores</h3>
      <div className="grid gap-3 md:grid-cols-7"><Box className="bg-slate-100">Moral tradicional</Box><Arrow /><Box className="bg-red-50">Muerte de Dios</Box><Arrow /><Box className="bg-rose-50">Nihilismo</Box><Arrow /><Box className="bg-slate-900 text-white">Superhombre</Box></div>
      <Down /><Box className="bg-amber-50">Voluntad de poder → afirmación de la vida → creación de nuevos valores</Box>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">La muerte de Dios no es literal: significa la pérdida de autoridad de los valores absolutos.</p>
    </div>
  );

  if (type === "ortega") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Ortega y Gasset · Yo y circunstancia</h3>
      <div className="grid gap-3 md:grid-cols-5"><Box className="bg-orange-50">Yo<p className="mt-1 text-xs text-slate-500">proyecto vital</p></Box><Arrow /><Box className="bg-yellow-50">Circunstancia<p className="mt-1 text-xs text-slate-500">mundo concreto</p></Box><Arrow /><Box className="bg-emerald-50">Vida<p className="mt-1 text-xs text-slate-500">realidad radical</p></Box></div>
      <Down /><Box className="bg-indigo-50">Perspectivismo: cada vida aporta un punto de vista necesario sobre la realidad</Box>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Ortega no defiende relativismo total: cada perspectiva aporta una parte de la verdad.</p>
    </div>
  );

  if (type === "arendt") return (
    <div className="rounded-3xl border bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-center text-lg font-bold">Hannah Arendt · Banalidad del mal</h3>
      <div className="grid gap-3 md:grid-cols-7"><Box className="bg-slate-100">Sistema burocrático</Box><Arrow /><Box className="bg-red-50">Obediencia acrítica</Box><Arrow /><Box className="bg-orange-50">Ausencia de pensamiento</Box><Arrow /><Box className="bg-violet-50">Banalidad del mal</Box></div>
      <Down /><Box className="bg-emerald-50">Pensar + juzgar + asumir responsabilidad → vida política libre</Box>
      <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">Arendt no dice que el mal sea pequeño, sino que puede surgir de personas que renuncian a pensar críticamente.</p>
    </div>
  );

  return <div className="rounded-3xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-600">Esquema visual no disponible.</p></div>;
}

const philosophers = [
  { id: "platon", name: "Platón", current: "Idealismo", pau: "Muy frecuente en PAU", color: "from-amber-100 to-orange-50", concepts: ["Ideas", "mundo sensible", "mundo inteligible", "Idea de Bien"], works: ["República", "Fedón"], summary: "La realidad verdadera está en el mundo inteligible de las Ideas. La educación filosófica permite ascender hacia la Idea de Bien." },
  { id: "aristoteles", name: "Aristóteles", current: "Realismo", pau: "Muy frecuente en PAU", color: "from-yellow-100 to-stone-50", concepts: ["sustancia", "acto", "potencia", "felicidad", "virtud"], works: ["Metafísica", "Ética a Nicómaco"], summary: "La realidad está en las sustancias concretas. El cambio se explica mediante acto y potencia." },
  { id: "agustin", name: "San Agustín", current: "Cristianismo platónico", pau: "Habitual en PAU", color: "from-purple-100 to-indigo-50", concepts: ["interioridad", "Dios", "verdad", "iluminación"], works: ["Confesiones", "La ciudad de Dios"], summary: "La verdad se busca en el interior del alma, iluminada por Dios." },
  { id: "tomas", name: "Tomás de Aquino", current: "Escolástica", pau: "Frecuente en PAU", color: "from-emerald-100 to-lime-50", concepts: ["razón", "fe", "cinco vías", "ley natural"], works: ["Suma Teológica"], summary: "Razón y fe son compatibles. Dios puede demostrarse racionalmente a partir del mundo." },
  { id: "descartes", name: "René Descartes", current: "Racionalismo", pau: "Muy frecuente en PAU", color: "from-blue-100 to-cyan-50", concepts: ["duda", "cogito", "razón", "certeza"], works: ["Discurso del método"], summary: "La duda metódica conduce al cogito: pienso, luego existo." },
  { id: "hume", name: "David Hume", current: "Empirismo", pau: "Frecuente en PAU", color: "from-sky-100 to-slate-50", concepts: ["impresiones", "ideas", "causalidad", "costumbre"], works: ["Investigación sobre el entendimiento humano"], summary: "Todo conocimiento procede de la experiencia. La causalidad es costumbre." },
  { id: "rousseau", name: "Rousseau", current: "Contractualismo", pau: "Frecuente en PAU", color: "from-green-100 to-teal-50", concepts: ["contrato social", "voluntad general", "libertad", "soberanía"], works: ["El contrato social"], summary: "La legitimidad política se funda en la voluntad general y el bien común." },
  { id: "kant", name: "Immanuel Kant", current: "Idealismo trascendental", pau: "Muy frecuente en PAU", color: "from-indigo-100 to-slate-100", concepts: ["a priori", "fenómeno", "imperativo categórico", "juicio de gusto", "finalidad sin fin"], works: ["Crítica de la razón pura", "Crítica de la razón práctica", "Crítica de la facultad de juzgar"], summary: "Kant organiza su filosofía alrededor de las tres críticas: conocimiento, moral y juicio estético/teleológico." },
  { id: "marx", name: "Karl Marx", current: "Materialismo histórico", pau: "Muy frecuente en PAU", color: "from-red-100 to-orange-50", concepts: ["alienación", "capitalismo", "trabajo", "clase social"], works: ["Manuscritos", "El capital"], summary: "El capitalismo genera explotación y alienación del trabajador." },
  { id: "nietzsche", name: "Nietzsche", current: "Vitalismo", pau: "Muy frecuente en PAU", color: "from-rose-100 to-red-50", concepts: ["nihilismo", "muerte de Dios", "superhombre", "valores"], works: ["La gaya ciencia", "Zaratustra"], summary: "La muerte de Dios expresa la crisis de los valores tradicionales." },
  { id: "ortega", name: "Ortega y Gasset", current: "Raciovitalismo", pau: "Frecuente en PAU", color: "from-orange-100 to-yellow-50", concepts: ["yo", "circunstancia", "vida", "razón vital"], works: ["Meditaciones del Quijote"], summary: "El ser humano es inseparable de su circunstancia." },
  { id: "arendt", name: "Hannah Arendt", current: "Filosofía política", pau: "Actual", color: "from-violet-100 to-fuchsia-50", concepts: ["banalidad del mal", "acción", "pluralidad", "responsabilidad"], works: ["Eichmann en Jerusalén"], summary: "El mal puede surgir de la obediencia acrítica y de la incapacidad de pensar." },
];

const baseTexts = [
  {id: "platon1", philosopher: "Platón", work: "República, libro VII", title: "Alegoría de la caverna", difficulty: "Media", quote: "Imagina unos hombres que viven en una especie de caverna subterránea, encadenados desde niños de tal modo que solo pueden mirar hacia el fondo. Detrás de ellos hay un fuego y entre el fuego y los prisioneros pasan objetos cuya sombra se proyecta en la pared. Los prisioneros creen que esas sombras son la realidad. Si uno de ellos se libera y sale al exterior, al principio se sentirá confundido, pero poco a poco comprenderá que lo verdadero no son las sombras sino los objetos y, finalmente, el sol que ilumina todo.", theme: "El paso de la ignorancia al conocimiento verdadero.", thesis: "La educación filosófica permite al alma abandonar el mundo sensible y alcanzar el conocimiento del mundo inteligible.", concepts: ["mundo sensible", "mundo inteligible", "Idea de Bien", "educación"], solution: "La caverna representa el mundo sensible, mientras que el exterior simboliza el mundo inteligible. El proceso de liberación es la educación filosófica, que conduce al conocimiento verdadero culminando en la Idea de Bien."},
  {id: "aristoteles1", philosopher: "Aristóteles", work: "Ética a Nicómaco", title: "La felicidad como fin", difficulty: "Media", quote: "Toda acción y toda elección parecen tender hacia algún bien; por ello se ha dicho que el bien es aquello a lo que todas las cosas tienden. Sin embargo, no todos los fines son iguales, pues algunos los elegimos por sí mismos y otros como medios. La felicidad es aquello que elegimos siempre por sí mismo y nunca por otra cosa, y por ello es el bien supremo.", theme: "La felicidad como fin último de la vida humana.", thesis: "La felicidad es el bien supremo porque es el fin último de todas las acciones humanas.", concepts: ["felicidad", "fin último", "virtud", "ética"], solution: "Aristóteles distingue entre fines medios y fines últimos. La felicidad es el fin último porque no se busca como medio sino por sí misma."},
  {id: "agustin1", philosopher: "San Agustín", work: "Confesiones", title: "La verdad interior", difficulty: "Media", quote: "No quieras salir fuera; vuelve a ti mismo, porque en el interior del ser humano habita la verdad. Pero incluso cuando el alma descubre esa verdad, reconoce que no procede de ella misma, sino de una luz superior que la ilumina. El ser humano encuentra la verdad cuando se vuelve hacia su interior y descubre allí la presencia de Dios como fundamento de toda certeza.", theme: "La búsqueda interior de la verdad.", thesis: "La verdad se encuentra en la interioridad del alma iluminada por Dios.", concepts: ["interioridad", "verdad", "Dios", "iluminación"], solution: "San Agustín entiende la verdad como una búsqueda interior. El alma no crea la verdad, sino que la recibe por iluminación divina."},
  {id: "tomas1", philosopher: "Tomás de Aquino", work: "Suma Teológica", title: "Las cinco vías", difficulty: "Media", quote: "Observamos en el mundo que las cosas se mueven, cambian y son causadas por otras. Pero no es posible proceder al infinito en una serie de motores o causas, porque entonces no habría explicación última del movimiento ni de la existencia. Por ello es necesario llegar a un primer motor inmóvil y a una primera causa, a la que todos llaman Dios.", theme: "La demostración racional de la existencia de Dios.", thesis: "La existencia de Dios puede demostrarse racionalmente partiendo de la experiencia del mundo.", concepts: ["Dios", "primer motor", "causalidad", "cinco vías"], solution: "Tomás parte de hechos observables como el movimiento y la causalidad para concluir que debe existir un fundamento primero identificado con Dios."},
  {id: "descartes1", philosopher: "René Descartes", work: "Meditaciones metafísicas", title: "La duda metódica", difficulty: "Alta", quote: "Consideraré como falso todo aquello en lo que pueda imaginar la menor duda. Así, rechazaré los conocimientos basados en los sentidos, pues a veces engañan. También dudaré del mundo exterior, porque podría estar soñando, e incluso de las matemáticas, suponiendo que un genio maligno podría inducirme al error. Sin embargo, hay algo de lo que no puedo dudar: que estoy dudando. Y si dudo, pienso; y si pienso, existo.", theme: "La búsqueda de una certeza absoluta.", thesis: "El cogito es la primera verdad indudable sobre la que se puede construir el conocimiento.", concepts: ["duda metódica", "cogito", "certeza", "racionalismo"], solution: "Descartes utiliza la duda como método para eliminar todo conocimiento inseguro hasta encontrar una verdad absolutamente cierta: la existencia del sujeto pensante."},
  {id: "hume1", philosopher: "David Hume", work: "Investigación sobre el entendimiento humano", title: "Crítica de la causalidad", difficulty: "Alta", quote: "Cuando observamos que un acontecimiento sigue regularmente a otro, creemos que el primero es la causa del segundo. Sin embargo, nunca percibimos una conexión necesaria entre ambos, sino únicamente una sucesión constante. La idea de causalidad no procede de la razón, sino de la costumbre que se forma en nuestra mente al ver repetirse ciertos hechos.", theme: "La crítica empirista de la causalidad.", thesis: "La causalidad no es una conexión necesaria conocida por la razón, sino una creencia basada en la costumbre.", concepts: ["causalidad", "costumbre", "experiencia", "empirismo"], solution: "Hume sostiene que la causalidad no es un conocimiento racional de una conexión necesaria, sino una expectativa psicológica derivada de la experiencia repetida."},
  {id: "rousseau1", philosopher: "Rousseau", work: "El contrato social", title: "La voluntad general", difficulty: "Media", quote: "Cada uno de nosotros pone en común su persona y todo su poder bajo la suprema dirección de la voluntad general. Al hacer esto, no pierde su libertad, sino que la transforma en libertad civil, porque obedece a una ley que expresa el bien común y de la que él mismo participa como ciudadano.", theme: "La legitimidad política basada en la voluntad general.", thesis: "La comunidad política legítima nace del contrato social y se funda en la voluntad general.", concepts: ["contrato social", "voluntad general", "libertad", "soberanía"], solution: "Rousseau defiende que la libertad política no consiste en obedecer intereses particulares, sino leyes que expresan la voluntad general y el bien común."},
  {id: "kant1", philosopher: "Immanuel Kant", work: "Crítica de la razón pura", title: "Condiciones del conocimiento", difficulty: "Alta", quote: "Aunque todo nuestro conocimiento comienza con la experiencia, no por eso procede todo de la experiencia. Existen formas a priori del conocimiento que hacen posible la experiencia misma. El espacio y el tiempo ordenan lo que recibimos por la sensibilidad, mientras que las categorías del entendimiento estructuran los fenómenos que conocemos.", theme: "Las condiciones de posibilidad del conocimiento.", thesis: "El conocimiento es posible gracias a estructuras a priori del sujeto.", concepts: ["a priori", "fenómeno", "noúmeno", "categorías"], solution: "Kant combina empirismo y racionalismo: el conocimiento empieza con la experiencia, pero el sujeto la organiza mediante formas y categorías a priori."},
  {id: "kant2", philosopher: "Immanuel Kant", work: "Crítica de la razón práctica", title: "Imperativo categórico", difficulty: "Alta", quote: "Una acción no posee valor moral por sus consecuencias ni por la inclinación que la acompaña, sino por haber sido realizada por deber. La voluntad moral actúa según una ley que ella misma reconoce como universal. Por eso, obra solo según una máxima que puedas querer al mismo tiempo que se convierta en ley universal.", theme: "La fundamentación racional de la moral.", thesis: "Una acción es moral cuando se realiza por deber y puede universalizarse racionalmente.", concepts: ["imperativo categórico", "deber", "ley moral", "autonomía"], solution: "Kant fundamenta la moral en la razón práctica: la acción moral depende del deber y de la universalidad de la máxima, no de sus consecuencias."},
  {id: "kant3", philosopher: "Immanuel Kant", work: "Crítica de la facultad de juzgar", title: "Juicio de gusto", difficulty: "Media", quote: "El juicio de gusto no es un juicio de conocimiento; no es lógico, sino estético. Cuando llamamos bello a un objeto, no afirmamos una propiedad objetiva demostrable, sino que expresamos un sentimiento de placer. Sin embargo, quien juzga algo como bello pretende que los demás estén de acuerdo, aunque no pueda demostrarlo mediante conceptos.", theme: "La diferencia entre juicio de conocimiento y juicio estético.", thesis: "El juicio de gusto es subjetivo, pero pretende una validez universal sin concepto.", concepts: ["juicio de gusto", "belleza", "sensus communis", "placer"], solution: "Kant explica que el juicio estético se basa en el sentimiento, no en conceptos objetivos, pero aun así reclama una universalidad subjetiva."},
  {id: "kant4", philosopher: "Immanuel Kant", work: "Crítica de la facultad de juzgar", title: "Finalidad sin fin", difficulty: "Alta", quote: "La belleza es la forma de la finalidad de un objeto en cuanto es percibida sin la representación de un fin. Al contemplar algo bello, lo percibimos como si estuviera ordenado y organizado de manera armónica, aunque no podamos señalar una utilidad concreta ni un propósito externo que explique esa armonía.", theme: "La finalidad sin fin en el juicio estético.", thesis: "Lo bello parece tener finalidad, aunque no sirva a ningún fin concreto.", concepts: ["finalidad sin fin", "belleza", "forma", "juicio reflexionante"], solution: "Kant sostiene que lo bello produce placer porque parece organizado con sentido, aunque no responda a una utilidad determinada."},
  {id: "marx1", philosopher: "Karl Marx", work: "Manuscritos económico-filosóficos", title: "Alienación del trabajador", difficulty: "Alta", quote: "El trabajador se convierte en tanto más pobre cuanto más riqueza produce. El objeto que produce se enfrenta a él como algo ajeno, como un poder independiente. Su trabajo no es la realización de su esencia humana, sino una actividad impuesta que lo separa de sí mismo, del producto, de los demás y de su propia humanidad.", theme: "La alienación en el trabajo capitalista.", thesis: "El capitalismo genera alienación al separar al trabajador de su producto, de su actividad y de sí mismo.", concepts: ["alienación", "trabajo", "capitalismo", "explotación"], solution: "Marx critica que el trabajador no se reconoce en su trabajo porque produce una riqueza que pertenece a otro. Esto provoca deshumanización y explotación."},
  {id: "nietzsche1", philosopher: "Nietzsche", work: "La gaya ciencia", title: "La muerte de Dios", difficulty: "Alta", quote: "Dios ha muerto. Y nosotros lo hemos matado. ¿Cómo nos consolaremos? La desaparición de Dios implica la pérdida de los valores absolutos que sostenían nuestra cultura. Al caer ese fundamento, el ser humano se enfrenta al nihilismo, pero también a la posibilidad de crear nuevos valores afirmadores de la vida.", theme: "La crisis de los valores tradicionales.", thesis: "La muerte de Dios provoca la pérdida del fundamento absoluto de la moral occidental.", concepts: ["muerte de Dios", "nihilismo", "valores", "superhombre"], solution: "Nietzsche no habla de una muerte literal, sino de la caída de los valores absolutos. Esto abre el peligro del nihilismo y la posibilidad de crear nuevos valores."},
  {id: "ortega1", philosopher: "Ortega y Gasset", work: "Meditaciones del Quijote", title: "Yo y circunstancia", difficulty: "Media", quote: "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo. La vida humana no es una cosa hecha de una vez para siempre, sino un proyecto que se realiza en un mundo concreto. El ser humano debe decidir qué hacer con su vida dentro de las circunstancias que le han tocado.", theme: "La vida humana como realidad situada.", thesis: "El ser humano no puede entenderse separado de su circunstancia.", concepts: ["yo", "circunstancia", "vida", "razón vital"], solution: "Ortega afirma que la vida es la realidad radical y que el yo siempre está situado en una circunstancia concreta que debe asumir y transformar."},
  {id: "arendt1", philosopher: "Hannah Arendt", work: "Eichmann en Jerusalén", title: "La banalidad del mal", difficulty: "Alta", quote: "Lo más inquietante en Eichmann no era una maldad demoníaca, sino su incapacidad para pensar desde el punto de vista de los otros. Cumplía órdenes y utilizaba frases hechas sin examinar críticamente el sentido de sus actos. Así, el mal puede aparecer cuando los individuos renuncian a juzgar y se limitan a obedecer.", theme: "La relación entre mal, obediencia y ausencia de pensamiento crítico.", thesis: "El mal puede surgir de la obediencia acrítica y de la incapacidad de juzgar.", concepts: ["banalidad del mal", "pensamiento", "obediencia", "responsabilidad"], solution: "Arendt muestra que el mal puede producirse cuando las personas renuncian a pensar y juzgar por sí mismas dentro de sistemas burocráticos."},
];

const texts = Array.from({ length: 100 }, (_, i) => {
  const base = baseTexts[i % baseTexts.length];
  const bloque = Math.floor(i / baseTexts.length) + 1;
  return { ...base, id: `${base.id}-pau-${i + 1}`, title: `${base.title} · Texto PAU ${i + 1}`, difficulty: bloque % 3 === 0 ? "Alta" : bloque % 2 === 0 ? "Media" : base.difficulty, solution: `${base.solution} Este texto permite preparar una respuesta PAU relacionándolo con el pensamiento de ${base.philosopher}.` };
});

const quizSeed = [
  { q: "¿Qué autor defiende el mundo inteligible de las Ideas?", options: ["Aristóteles", "Platón", "Hume", "Marx"], answer: 1, explanation: "Platón distingue entre mundo sensible y mundo inteligible." },
  { q: "¿Qué autor formula el cogito?", options: ["Descartes", "Kant", "Nietzsche", "Arendt"], answer: 0, explanation: "Descartes afirma: pienso, luego existo." },
  { q: "¿Qué autor critica la causalidad como hábito?", options: ["Tomás de Aquino", "Hume", "Rousseau", "Ortega"], answer: 1, explanation: "Hume entiende la causalidad como costumbre." },
  { q: "¿Qué autor habla de alienación?", options: ["Marx", "Platón", "Aristóteles", "San Agustín"], answer: 0, explanation: "Marx analiza la alienación del trabajador." },
  { q: "¿Qué obra kantiana trata los límites del conocimiento?", options: ["Crítica de la razón pura", "El contrato social", "La gaya ciencia", "El capital"], answer: 0, explanation: "La Crítica de la razón pura responde a la pregunta: ¿qué puedo conocer?" },
  { q: "¿Qué obra kantiana fundamenta la moral?", options: ["Crítica de la razón práctica", "República", "Confesiones", "Meditaciones del Quijote"], answer: 0, explanation: "La Crítica de la razón práctica se ocupa de la moral y el deber." },
  { q: "¿Qué obra kantiana analiza el juicio estético?", options: ["Crítica de la facultad de juzgar", "Metafísica", "Discurso del método", "La condición humana"], answer: 0, explanation: "La tercera crítica estudia el juicio estético y teleológico." },
  { q: "¿Qué autor afirma que el ser humano es 'yo y circunstancia'?", options: ["Ortega", "Nietzsche", "Platón", "Rousseau"], answer: 0, explanation: "La expresión pertenece a Ortega y Gasset." },
  { q: "¿Qué autora habla de banalidad del mal?", options: ["Arendt", "Ortega", "Platón", "Tomás de Aquino"], answer: 0, explanation: "Arendt analiza la banalidad del mal en Eichmann en Jerusalén." },
  { q: "¿Qué autor une razón y fe?", options: ["Tomás de Aquino", "Hume", "Marx", "Nietzsche"], answer: 0, explanation: "Tomás defiende compatibilidad entre razón y fe." },
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function makeQuestion(question, correct, wrongOptions, explanation) {
  const cleanWrong = [...new Set(wrongOptions)].filter((x) => x && x !== correct);
  const options = shuffleArray([...cleanWrong.slice(0, 3), correct]);
  return { q: question, options, answer: options.indexOf(correct), explanation };
}

function buildQuizQuestions() {
  const allConcepts = [...new Set(philosophers.flatMap((p) => p.concepts))];
  const allWorks = [...new Set(philosophers.flatMap((p) => p.works))];
  const allCurrents = [...new Set(philosophers.map((p) => p.current))];
  const allAuthors = philosophers.map((p) => p.name);
  const questions = [...quizSeed];

  philosophers.forEach((p) => {
    p.concepts.forEach((concept) => {
      questions.push(makeQuestion(`¿Qué concepto pertenece a ${p.name}?`, concept, allConcepts.filter((c) => !p.concepts.includes(c)), `"${concept}" es un concepto clave de ${p.name}.`));
      questions.push(makeQuestion(`¿A qué autor pertenece el concepto "${concept}"?`, p.name, allAuthors.filter((name) => name !== p.name), `"${concept}" pertenece al pensamiento de ${p.name}.`));
    });
    p.works.forEach((work) => {
      questions.push(makeQuestion(`¿Qué obra pertenece a ${p.name}?`, work, allWorks.filter((w) => !p.works.includes(w)), `"${work}" es una obra asociada a ${p.name}.`));
      questions.push(makeQuestion(`¿Quién escribió o está asociado a "${work}"?`, p.name, allAuthors.filter((name) => name !== p.name), `"${work}" corresponde a ${p.name}.`));
    });
    questions.push(makeQuestion(`¿Cuál es la corriente filosófica de ${p.name}?`, p.current, allCurrents.filter((current) => current !== p.current), `${p.name} se asocia con ${p.current}.`));
    questions.push(makeQuestion(`¿Qué autor encaja mejor con esta idea: "${p.summary}"?`, p.name, allAuthors.filter((name) => name !== p.name), `La descripción resume el pensamiento de ${p.name}.`));
  });
  baseTexts.forEach((t) => {
    questions.push(makeQuestion(`¿A qué autor pertenece este texto: "${t.title}"?`, t.philosopher, allAuthors.filter((name) => name !== t.philosopher), `"${t.title}" pertenece al bloque de ${t.philosopher}.`));
    t.concepts.forEach((concept) => {
      questions.push(makeQuestion(`En el texto "${t.title}", ¿qué concepto es clave?`, concept, allConcepts.filter((c) => !t.concepts.includes(c)), `"${concept}" es clave para comentar "${t.title}".`));
    });
  });
  return shuffleArray(questions);
}

const comparisons = [
  { title: "Platón vs Aristóteles", a: "Platón sitúa la verdad en las Ideas separadas.", b: "Aristóteles sitúa la realidad en sustancias concretas." },
  { title: "Descartes vs Hume", a: "Descartes busca certezas racionales.", b: "Hume reduce el conocimiento a experiencia." },
  { title: "Hume vs Kant", a: "Hume reduce la causalidad a costumbre.", b: "Kant la entiende como categoría a priori." },
  { title: "Kant: razón pura vs razón práctica", a: "La razón pura pregunta qué podemos conocer.", b: "La razón práctica pregunta qué debemos hacer." },
  { title: "Kant: razón práctica vs juicio", a: "La razón práctica fundamenta la moral en el deber.", b: "El juicio analiza belleza, finalidad y gusto." },
  { title: "Marx vs Nietzsche", a: "Marx critica el capitalismo.", b: "Nietzsche critica la moral tradicional." },
  { title: "Ortega vs Arendt", a: "Ortega analiza la vida desde la circunstancia.", b: "Arendt analiza la política desde la acción." },
  { title: "San Agustín vs Tomás", a: "Agustín busca la verdad interior iluminada por Dios.", b: "Tomás armoniza razón, fe y Aristóteles." },
];

const flashcards = [
  { front: "¿Qué es el mundo inteligible?", back: "La realidad verdadera de las Ideas en Platón.", author: "Platón" },
  { front: "¿Qué es acto y potencia?", back: "Potencia es posibilidad; acto es realización.", author: "Aristóteles" },
  { front: "¿Qué es la iluminación en San Agustín?", back: "La ayuda divina que permite al alma conocer la verdad.", author: "San Agustín" },
  { front: "¿Qué son las cinco vías?", back: "Argumentos racionales de Tomás para demostrar la existencia de Dios.", author: "Tomás de Aquino" },
  { front: "¿Qué es el cogito?", back: "La primera certeza cartesiana: si pienso, existo.", author: "Descartes" },
  { front: "¿Qué critica Hume de la causalidad?", back: "Que no percibimos conexión necesaria, solo costumbre.", author: "Hume" },
  { front: "¿Qué estudia la Crítica de la razón pura?", back: "Los límites y condiciones del conocimiento.", author: "Kant" },
  { front: "¿Qué estudia la Crítica de la razón práctica?", back: "La moral, el deber y el imperativo categórico.", author: "Kant" },
  { front: "¿Qué estudia la Crítica del juicio?", back: "El juicio estético, la belleza y la finalidad.", author: "Kant" },
  { front: "¿Qué es la alienación?", back: "Separación del trabajador respecto a producto, trabajo y humanidad.", author: "Marx" },
  { front: "¿Qué significa la muerte de Dios?", back: "La caída de los valores absolutos tradicionales.", author: "Nietzsche" },
  { front: "¿Qué es la banalidad del mal?", back: "El mal por obediencia acrítica e incapacidad de pensar.", author: "Arendt" },
];

const lessons = [
  { id: "antigua", title: "Filosofía antigua", authors: "Platón y Aristóteles", xp: 120, color: "from-amber-200 to-orange-100", goal: "Dominar realidad, conocimiento y ética clásica.", authorSections: [{ author: "Platón", points: ["Dualismo ontológico: mundo sensible y mundo inteligible.", "El mundo sensible es cambiante, imperfecto y conocido por los sentidos.", "El mundo inteligible contiene las Ideas, eternas, universales y verdaderas.", "La Idea de Bien es la realidad suprema.", "Conocer es recordar: teoría de la reminiscencia.", "La educación filosófica es un ascenso desde la ignorancia hacia la verdad.", "Texto clave: alegoría de la caverna."] }, { author: "Aristóteles", points: ["Critica a Platón: las Ideas no están separadas de las cosas.", "La realidad está formada por sustancias concretas.", "Toda sustancia se compone de materia y forma.", "El cambio se explica mediante potencia y acto.", "Todo ser tiende a un fin: teleologismo.", "La felicidad es el fin último del ser humano.", "La virtud es el término medio entre extremos."] }] },
  { id: "medieval", title: "Filosofía medieval", authors: "San Agustín y Tomás de Aquino", xp: 120, color: "from-emerald-200 to-lime-100", goal: "Comprender la relación entre razón, fe, alma y Dios.", authorSections: [{ author: "San Agustín", points: ["Integra cristianismo y platonismo.", "La verdad se busca en el interior del alma.", "Dios ilumina la mente humana para conocer la verdad.", "El ser humano es alma espiritual orientada hacia Dios.", "El mal no es una sustancia, sino ausencia de bien."] }, { author: "Tomás de Aquino", points: ["Integra cristianismo y aristotelismo.", "Razón y fe son compatibles porque ambas proceden de Dios.", "La razón puede demostrar ciertas verdades naturales.", "La fe revela verdades que superan la razón.", "Formula las cinco vías para demostrar la existencia de Dios."] }] },
  { id: "moderna", title: "Filosofía moderna", authors: "Descartes, Hume, Rousseau y Kant", xp: 180, color: "from-blue-200 to-indigo-100", goal: "Dominar racionalismo, empirismo, contractualismo y criticismo.", authorSections: [{ author: "Descartes", points: ["Racionalismo: la razón es la fuente principal del conocimiento.", "Busca una verdad absolutamente segura.", "Usa la duda metódica como método.", "Descubre el cogito: pienso, luego existo."] }, { author: "Hume", points: ["Empirismo: todo conocimiento procede de la experiencia.", "Distingue impresiones e ideas.", "Critica la causalidad como conexión necesaria.", "La causalidad es hábito o costumbre mental."] }, { author: "Rousseau", points: ["Critica la desigualdad social.", "El contrato social funda una comunidad legítima.", "La voluntad general expresa el bien común.", "La libertad política consiste en obedecer leyes propias."] }, { author: "Kant", points: ["Crítica de la razón pura: conocimiento, fenómeno, noúmeno, a priori.", "Crítica de la razón práctica: moral, deber, autonomía, imperativo categórico.", "Crítica de la facultad de juzgar: belleza, gusto, finalidad sin fin, sensus communis.", "Kant intenta unir naturaleza y libertad mediante el juicio."] }] },
  { id: "contemporanea", title: "Filosofía contemporánea", authors: "Marx, Nietzsche, Ortega y Arendt", xp: 180, color: "from-rose-200 to-violet-100", goal: "Comprender crítica social, crisis de valores y política contemporánea.", authorSections: [{ author: "Marx", points: ["Materialismo histórico: la base económica condiciona la sociedad.", "La historia avanza mediante lucha de clases.", "El capitalismo enfrenta burguesía y proletariado.", "La alienación separa al trabajador de su producto y de sí mismo."] }, { author: "Nietzsche", points: ["Critica la moral occidental y cristiana.", "La muerte de Dios significa la caída de los valores absolutos.", "El nihilismo aparece cuando ya no hay fundamento moral tradicional.", "El superhombre crea nuevos valores."] }, { author: "Ortega y Gasset", points: ["La vida es la realidad radical.", "Yo soy yo y mi circunstancia.", "La razón debe ser razón vital.", "Cada perspectiva aporta una parte de la verdad."] }, { author: "Hannah Arendt", points: ["La política auténtica se basa en acción y palabra.", "La pluralidad es condición de la vida política.", "La banalidad del mal surge de la incapacidad de pensar.", "Obedecer sin juzgar puede conducir al mal."] }] },
];

const theoryByAuthor = {
  "Platón": { title: "Teoría completa de Platón", visual: "platon", blocks: [{ heading: "1. Realidad", points: ["Platón defiende un dualismo ontológico: mundo sensible y mundo inteligible.", "El mundo sensible es material, cambiante e imperfecto.", "El mundo inteligible contiene las Ideas, que son eternas y verdaderas.", "Las cosas sensibles son copias imperfectas de las Ideas."] }, { heading: "2. Conocimiento", points: ["El conocimiento verdadero se alcanza con la razón.", "Los sentidos ofrecen opinión, no ciencia.", "Educar es orientar el alma hacia las Ideas."] }, { heading: "3. Idea de Bien", points: ["La Idea de Bien es la Idea suprema.", "Hace posible la verdad y el conocimiento.", "En la caverna se simboliza mediante el sol."] }] },
  "Aristóteles": { title: "Teoría completa de Aristóteles", visual: "aristoteles", blocks: [{ heading: "1. Crítica a Platón", points: ["Aristóteles rechaza que las Ideas estén separadas de las cosas.", "La realidad está en las sustancias concretas.", "La esencia está en las cosas mismas."] }, { heading: "2. Acto y potencia", points: ["La potencia es posibilidad.", "El acto es realización.", "El cambio se explica como paso de potencia a acto."] }, { heading: "3. Ética", points: ["Toda acción busca un fin.", "El fin último es la felicidad.", "La felicidad se logra mediante la virtud.", "La virtud es término medio."] }] },
  "San Agustín": { title: "Teoría completa de San Agustín", visual: "agustin", blocks: [{ heading: "1. Interioridad", points: ["La verdad no se busca fuera, sino dentro del alma.", "El alma humana es superior al mundo sensible.", "La interioridad permite encontrar a Dios."] }, { heading: "2. Iluminación", points: ["Dios ilumina la mente humana.", "Gracias a esa iluminación podemos conocer verdades eternas.", "La verdad depende de Dios como fundamento."] }, { heading: "3. Historia y mal", points: ["El mal no es una sustancia, sino ausencia de bien.", "La historia se entiende como tensión entre Ciudad de Dios y ciudad terrenal."] }] },
  "Tomás de Aquino": { title: "Teoría completa de Tomás de Aquino", visual: "tomas", blocks: [{ heading: "1. Razón y fe", points: ["Razón y fe son compatibles porque ambas proceden de Dios.", "La razón alcanza verdades naturales.", "La fe revela verdades sobrenaturales."] }, { heading: "2. Cinco vías", points: ["Tomás demuestra la existencia de Dios a partir del mundo.", "Parte del movimiento, causalidad, contingencia, grados de perfección y finalidad.", "Concluye que debe existir un primer fundamento."] }, { heading: "3. Ley natural", points: ["La ley natural expresa la participación humana en la ley eterna.", "La moral se basa en la naturaleza racional del ser humano."] }] },
  "René Descartes": { title: "Teoría completa de Descartes", visual: "descartes", blocks: [{ heading: "1. Racionalismo", points: ["La razón es la fuente principal del conocimiento.", "Descartes busca una certeza absoluta.", "Quiere construir el saber sobre fundamentos seguros."] }, { heading: "2. Duda metódica", points: ["Duda de los sentidos.", "Duda del mundo exterior.", "Duda de las matemáticas mediante el genio maligno.", "La duda es método, no escepticismo definitivo."] }, { heading: "3. Cogito", points: ["Aunque dude, no puede dudar de que piensa.", "El cogito es la primera certeza.", "El sujeto pensante fundamenta el conocimiento."] }] },
  "David Hume": { title: "Teoría completa de Hume", visual: "hume", blocks: [{ heading: "1. Empirismo", points: ["Todo conocimiento procede de la experiencia.", "No existen ideas innatas.", "La mente trabaja con percepciones."] }, { heading: "2. Impresiones e ideas", points: ["Las impresiones son percepciones vivas.", "Las ideas son copias debilitadas de impresiones.", "Toda idea válida debe remitirse a una impresión."] }, { heading: "3. Causalidad", points: ["No percibimos conexión necesaria entre causa y efecto.", "Solo observamos sucesiones constantes.", "La causalidad es hábito o costumbre."] }] },
  "Rousseau": { title: "Teoría completa de Rousseau", visual: "rousseau", blocks: [{ heading: "1. Naturaleza y desigualdad", points: ["El ser humano natural es libre e igual.", "La sociedad histórica genera desigualdad.", "La propiedad privada marca el origen de la desigualdad social."] }, { heading: "2. Contrato social", points: ["La comunidad política legítima nace de un pacto.", "La soberanía pertenece al pueblo.", "El contrato busca recuperar la libertad en sociedad."] }, { heading: "3. Voluntad general", points: ["La voluntad general expresa el bien común.", "No equivale a la suma de intereses particulares.", "Obedecer la voluntad general es obedecer una ley propia como ciudadano."] }] },
  "Immanuel Kant": { title: "Kant: las tres críticas", visual: "kant", blocks: [{ heading: "1. Crítica de la razón pura: conocimiento", points: ["Pregunta principal: ¿qué puedo conocer?", "Kant intenta superar racionalismo y empirismo.", "Todo conocimiento comienza con la experiencia, pero no todo procede de ella.", "El sujeto organiza la experiencia mediante formas a priori y categorías.", "Solo conocemos fenómenos, no el noúmeno o cosa en sí.", "Conceptos clave: fenómeno, noúmeno, a priori, sensibilidad, entendimiento, categorías."] }, { heading: "2. Crítica de la razón práctica: moral", points: ["Pregunta principal: ¿qué debo hacer?", "La moral se basa en la razón y en el deber.", "Una acción moral vale por la intención racional, no por sus consecuencias.", "El imperativo categórico exige actuar según máximas universalizables.", "La autonomía consiste en darse a uno mismo la ley moral racional.", "Conceptos clave: deber, autonomía, ley moral, imperativo categórico, universalidad."] }, { heading: "3. Crítica de la facultad de juzgar: estética y finalidad", points: ["Pregunta central: ¿cómo juzgamos lo bello y la finalidad en la naturaleza?", "El juicio de gusto no es conocimiento, sino juicio estético.", "Lo bello produce un placer desinteresado.", "El juicio de gusto es subjetivo, pero pretende universalidad.", "Lo bello muestra finalidad sin fin: parece ordenado, aunque no tenga utilidad concreta.", "Conceptos clave: juicio de gusto, belleza, placer desinteresado, sensus communis, finalidad sin fin."] }, { heading: "4. Relación entre las tres críticas", points: ["La primera crítica estudia la naturaleza conocida por el sujeto.", "La segunda crítica estudia la libertad moral.", "La tercera crítica media entre naturaleza y libertad mediante el juicio.", "En PAU conviene situar siempre el texto en una de las tres críticas."] }] },
  "Karl Marx": { title: "Teoría completa de Marx", visual: "marx", blocks: [{ heading: "1. Materialismo histórico", points: ["La vida material condiciona la conciencia.", "La economía es la base de la sociedad.", "Las ideas dominantes suelen ser las ideas de la clase dominante."] }, { heading: "2. Lucha de clases", points: ["La historia avanza mediante conflictos entre clases.", "En el capitalismo se enfrentan burguesía y proletariado.", "La burguesía posee los medios de producción."] }, { heading: "3. Alienación", points: ["El trabajador queda separado del producto de su trabajo.", "El trabajo deja de ser realización humana.", "El capitalismo convierte el trabajo en explotación."] }] },
  "Nietzsche": { title: "Teoría completa de Nietzsche", visual: "nietzsche", blocks: [{ heading: "1. Crítica de la moral", points: ["Nietzsche critica la moral occidental y cristiana.", "Considera que ha negado la vida, el cuerpo y los instintos.", "Distingue entre moral de señores y moral de esclavos."] }, { heading: "2. Muerte de Dios", points: ["No es una muerte literal.", "Significa la pérdida de autoridad de los valores absolutos.", "Abre el problema del nihilismo."] }, { heading: "3. Superhombre", points: ["El superhombre crea nuevos valores.", "Afirma la vida sin depender de normas heredadas.", "La voluntad de poder expresa fuerza creadora."] }] },
  "Ortega y Gasset": { title: "Teoría completa de Ortega y Gasset", visual: "ortega", blocks: [{ heading: "1. Vida como realidad radical", points: ["La vida es la realidad radical.", "El ser humano no tiene esencia fija.", "La vida es proyecto, decisión y circunstancia."] }, { heading: "2. Yo y circunstancia", points: ["El yo no existe aislado.", "Toda vida humana está situada.", "Salvar la circunstancia es salvarse a uno mismo."] }, { heading: "3. Perspectivismo", points: ["Toda verdad se conoce desde una perspectiva.", "No es relativismo absoluto.", "Cada perspectiva aporta una parte de la verdad."] }] },
  "Hannah Arendt": { title: "Teoría completa de Hannah Arendt", visual: "arendt", blocks: [{ heading: "1. Política y acción", points: ["La política auténtica es acción y palabra.", "La pluralidad es condición de la vida política.", "El espacio público permite aparecer ante otros."] }, { heading: "2. Totalitarismo", points: ["El totalitarismo destruye libertad y pluralidad.", "Convierte a los individuos en piezas obedientes.", "Aísla a las personas y elimina el juicio crítico."] }, { heading: "3. Banalidad del mal", points: ["El mal puede surgir sin odio extremo.", "Puede aparecer cuando alguien obedece sin pensar.", "La incapacidad de juzgar permite participar en atrocidades."] }] },
};

function countWords(text) { return text.trim().split(/\s+/).filter(Boolean).length; }
function normalize(text) { return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

function evaluateComment({ answers, selectedText }) {
  const fullText = Object.values(answers).join(" ");
  const clean = normalize(fullText);
  const words = countWords(fullText);
  const conceptHits = selectedText.concepts.filter((c) => clean.includes(normalize(c))).length;
  const sections = [
    { name: "Tema", max: 2, score: answers.theme.trim().length > 35 ? 2 : answers.theme.trim().length > 15 ? 1 : 0, feedback: "Formula claramente el problema filosófico." },
    { name: "Tesis", max: 2, score: answers.thesis.trim().length > 35 ? 2 : answers.thesis.trim().length > 15 ? 1 : 0, feedback: "Explica qué defiende el autor." },
    { name: "Conceptos", max: 2, score: conceptHits >= 3 ? 2 : conceptHits >= 1 ? 1 : 0, feedback: "Usa vocabulario técnico del autor." },
    { name: "Explicación", max: 3, score: answers.explanation.trim().length > 220 ? 3 : answers.explanation.trim().length > 120 ? 2 : answers.explanation.trim().length > 40 ? 1 : 0, feedback: "Relaciona el texto con la teoría." },
    { name: "Valoración crítica", max: 1, score: answers.critique.trim().length > 80 ? 1 : 0, feedback: "Añade comparación o reflexión actual." },
  ];
  const total = sections.reduce((acc, s) => acc + s.score, 0);
  const globalFeedback = total >= 9 ? "Excelente comentario." : total >= 7 ? "Buen comentario." : total >= 5 ? "Aprobado, pero mejorable." : "Insuficiente: mejora tema, tesis y explicación.";
  return { total, sections, words, conceptHits, globalFeedback };
}

function evaluateExamEssay(text, selectedText) {
  const clean = normalize(text);
  const words = countWords(text);
  const conceptHits = selectedText.concepts.filter((c) => clean.includes(normalize(c))).length;
  let score = 0;
  if (words > 80) score += 2;
  if (words > 180) score += 2;
  if (words > 280) score += 1;
  if (clean.includes(normalize(selectedText.philosopher))) score += 1;
  if (conceptHits >= 2) score += 2;
  if (conceptHits >= 4) score += 1;
  if (clean.includes("critica") || clean.includes("compar") || clean.includes("actual")) score += 1;
  return Math.min(score, 10);
}

export default function App() {
  const [tab, setTab] = useState("comentario");
  const [selectedTextId, setSelectedTextId] = useState(texts[0].id);
  const selectedText = useMemo(() => texts.find((t) => t.id === selectedTextId) || texts[0], [selectedTextId]);
  const [theoryText, setTheoryText] = useState(texts[0]);
  const [answers, setAnswers] = useState({ theme: "", thesis: "", concepts: "", explanation: "", critique: "" });
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [rubricResult, setRubricResult] = useState(null);
  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 260);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 4);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history") || "[]"));
  const [completedLessons, setCompletedLessons] = useState(() => JSON.parse(localStorage.getItem("completedLessons") || "[]"));
  const quizQuestions = useMemo(() => buildQuizQuestions(), []);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [quizWrong, setQuizWrong] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examTime, setExamTime] = useState(900);
  const [examText, setExamText] = useState(texts[1]);
  const [examAnswer, setExamAnswer] = useState("");
  const [examScore, setExamScore] = useState(null);
  const [flashIndex, setFlashIndex] = useState(0);
  const [showFlashAnswer, setShowFlashAnswer] = useState(false);

  const level = Math.floor(xp / 150) + 1;
  const progress = xp % 150;
  const activeQuizQuestions = reviewMode && wrongQuestions.length > 0 ? wrongQuestions : quizQuestions;
  const currentQuestion = activeQuizQuestions[quizIndex % activeQuizQuestions.length];
  const lessonProgress = Math.round((completedLessons.length / lessons.length) * 100);
  const theory = theoryByAuthor[theoryText.philosopher] || { title: `Teoría de ${theoryText.philosopher}`, visual: "platon", blocks: [{ heading: "Teoría básica", points: [theoryText.thesis, theoryText.solution, `Conceptos clave: ${theoryText.concepts.join(", ")}.`] }] };

  useEffect(() => localStorage.setItem("xp", xp), [xp]);
  useEffect(() => localStorage.setItem("streak", streak), [streak]);
  useEffect(() => localStorage.setItem("history", JSON.stringify(history)), [history]);
  useEffect(() => localStorage.setItem("completedLessons", JSON.stringify(completedLessons)), [completedLessons]);

  useEffect(() => {
    if (!examStarted || examFinished) return;
    const timer = setInterval(() => {
      setExamTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, examFinished, examAnswer]);

  const commentScore = useMemo(() => {
    const fields = Object.values(answers);
    const filled = fields.filter((v) => v.trim().length > 25).length;
    return Math.round((filled / fields.length) * 100);
  }, [answers]);

  const achievements = [
    { name: "Primer comentario", unlocked: history.length >= 1, icon: ScrollText },
    { name: "Aprendiz PAU", unlocked: xp >= 450, icon: Brain },
    { name: "Racha filosófica", unlocked: streak >= 4, icon: Flame },
    { name: "Nivel avanzado", unlocked: level >= 4, icon: Trophy },
    { name: "Ruta en marcha", unlocked: completedLessons.length >= 1, icon: Map },
    { name: "Ruta completa", unlocked: completedLessons.length === lessons.length, icon: Award },
  ];

  const gainXP = (amount) => setXp((prev) => prev + amount);
  const resetComment = () => { setAnswers({ theme: "", thesis: "", concepts: "", explanation: "", critique: "" }); setShowSolution(false); setShowHints(false); setRubricResult(null); };
  const fillModelComment = () => {
    setAnswers({
      theme: selectedText.theme,
      thesis: selectedText.thesis,
      concepts: selectedText.concepts.join(", "),
      explanation: selectedText.solution,
      critique: `Se puede comparar con otro autor de la PAU mostrando semejanzas y diferencias. Por ejemplo, frente a esta postura de ${selectedText.philosopher}, otro filósofo puede defender una explicación distinta del conocimiento, la moral, la realidad o la política. Actualmente, el problema sigue siendo importante porque ayuda a reflexionar críticamente sobre la libertad, la verdad y la responsabilidad.`,
    });
    setShowHints(true);
    setRubricResult(null);
  };
  const correctComment = () => {
    const result = evaluateComment({ answers, selectedText });
    setRubricResult(result);
    setShowSolution(true);
    gainXP(result.total * 10);
    setHistory((prev) => [{ id: Date.now(), title: selectedText.title, author: selectedText.philosopher, score: result.total, date: new Date().toLocaleDateString() }, ...prev].slice(0, 10));
  };
  const submitQuiz = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQuestion.answer;
    setQuizDone(true);
    if (isCorrect) {
      const bonus = quizStreak >= 4 ? 20 : quizStreak >= 2 ? 10 : 0;
      gainXP(30 + bonus);
      setQuizCorrect((prev) => prev + 1);
      setQuizStreak((prev) => prev + 1);
      if (reviewMode) setWrongQuestions((prev) => prev.filter((q) => q.q !== currentQuestion.q));
    } else {
      setQuizWrong((prev) => prev + 1);
      setQuizStreak(0);
      setWrongQuestions((prev) => prev.some((q) => q.q === currentQuestion.q) ? prev : [currentQuestion, ...prev].slice(0, 30));
    }
  };
  const nextQuiz = () => { setSelectedOption(null); setQuizDone(false); const total = activeQuizQuestions.length || 1; setQuizIndex((prev) => (prev + 1) % total); };
  const startReviewMode = () => { if (wrongQuestions.length === 0) return; setReviewMode(true); setQuizIndex(0); setSelectedOption(null); setQuizDone(false); };
  const stopReviewMode = () => { setReviewMode(false); setQuizIndex(0); setSelectedOption(null); setQuizDone(false); };
  const startExam = () => { const randomText = texts[Math.floor(Math.random() * texts.length)]; setExamText(randomText); setExamAnswer(""); setExamTime(900); setExamStarted(true); setExamFinished(false); setExamScore(null); };
  function finishExam() {
    const score = evaluateExamEssay(examAnswer, examText);
    setExamFinished(true);
    setExamScore(score);
    gainXP(score * 10);
    setHistory((prev) => [{ id: Date.now(), title: `Simulacro: ${examText.title}`, author: examText.philosopher, score, date: new Date().toLocaleDateString() }, ...prev].slice(0, 10));
  }
  const completeLesson = (lesson, index) => { if (index > completedLessons.length) return; if (!completedLessons.includes(lesson.id)) { setCompletedLessons([...completedLessons, lesson.id]); gainXP(lesson.xp); } };
  const nextFlashcard = () => { setShowFlashAnswer(false); setFlashIndex((prev) => (prev + 1) % flashcards.length); };
  const resetProgress = () => { setXp(260); setStreak(4); setHistory([]); setCompletedLessons([]); localStorage.clear(); };
  const minutes = Math.floor(examTime / 60);
  const seconds = examTime % 60;

  const nav = [
    { id: "comentario", label: "Comentario", icon: ScrollText },
    { id: "teoria", label: "Teoría", icon: Brain },
    { id: "filosofos", label: "Filósofos", icon: BookOpen },
    { id: "retos", label: "Retos PAU", icon: Gamepad2 },
    { id: "comparador", label: "Comparador", icon: Scale },
    { id: "flashcards", label: "Flashcards", icon: Layers3 },
    { id: "lecciones", label: "Ruta PAU", icon: Map },
    { id: "examen", label: "Modo examen", icon: ClipboardCheck },
    { id: "progreso", label: "Progreso", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-700"><GraduationCap className="h-5 w-5" />Filosofía PAU · PRO Duolingo</div>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Aula Filosófica Quest</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">Comentarios, 100 textos PAU, teoría visual completa, retos, comparador, flashcards y ruta por autores.</p>
          </motion.div>
          <Card className="border-0 bg-white/80"><CardContent className="p-5"><div className="mb-3 flex items-center justify-between"><div><p className="text-sm text-slate-500">Nivel actual</p><p className="text-3xl font-bold">Nivel {level}</p></div><div className="flex gap-2"><Badge><Flame className="mr-1 inline h-3 w-3" /> {streak} días</Badge><Badge><Star className="mr-1 inline h-3 w-3" /> {xp} XP</Badge></div></div><ProgressBar value={(progress / 150) * 100} /><p className="mt-2 text-xs text-slate-500">{150 - progress} XP para el siguiente nivel</p></CardContent></Card>
        </header>

        <nav className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-9">{nav.map((item) => { const Icon = item.icon; return <Button key={item.id} onClick={() => setTab(item.id)} className={`h-14 text-sm shadow-sm ${tab === item.id ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"}`}><Icon className="mr-2 inline h-5 w-5" />{item.label}</Button>; })}</nav>

        <AnimatePresence mode="wait">
          {tab === "comentario" && (
            <motion.section key="comentario" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
              <Card><CardContent className="p-5"><div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">Banco de 100 textos</h2><Badge>{texts.length} textos</Badge></div><p className="mb-4 rounded-2xl bg-indigo-50 p-3 text-sm text-slate-700">Selecciona un texto y se cargará automáticamente en el corrector.</p><div className="max-h-[650px] space-y-3 overflow-y-auto pr-2">{texts.map((t) => { const isSelected = selectedText.id === t.id; return <button key={t.id} type="button" onClick={() => { setSelectedTextId(t.id); setTheoryText(t); resetComment(); }} className={`w-full rounded-2xl border p-4 text-left transition hover:shadow-md ${isSelected ? "border-indigo-700 bg-indigo-50 shadow-md" : "border-slate-200 bg-white"}`}><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{t.title}</p><p className="text-sm text-slate-500">{t.philosopher} · {t.work} · {t.difficulty}</p></div>{isSelected && <Badge>Seleccionado</Badge>}</div></button>; })}</div></CardContent></Card>

              <Card key={selectedText.id}><CardContent className="p-5"><div className="mb-4 flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-2xl font-bold">Corrector PRO de comentario</h2><p className="text-sm text-slate-500">Redacta el comentario del texto seleccionado.</p></div><Badge><Target className="mr-1 inline h-3 w-3" />{commentScore}% completado</Badge></div><div className="mb-5 rounded-2xl bg-slate-100 p-4"><p className="mb-2 text-sm font-semibold text-slate-500">{selectedText.philosopher} · {selectedText.work} · {selectedText.difficulty}</p><h3 className="mb-3 text-xl font-bold text-slate-900">{selectedText.title}</h3><p className="text-lg font-medium leading-relaxed">“{selectedText.quote}”</p></div><div className="mb-5 flex flex-wrap gap-3"><Button onClick={() => setShowHints(!showHints)} className="border border-indigo-300 bg-indigo-50 text-indigo-800"><Lightbulb className="mr-2 inline h-4 w-4" />{showHints ? "Ocultar pistas" : "Ver pistas para comentar"}</Button><Button onClick={() => { setTheoryText(selectedText); setTab("teoria"); }} className="bg-indigo-700 text-white"><Brain className="mr-2 inline h-4 w-4" />Ver teoría completa</Button><Button onClick={fillModelComment} className="bg-emerald-600 text-white"><Wand2 className="mr-2 inline h-4 w-4" />Respuesta automática</Button></div>
                {showHints && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4"><h3 className="mb-3 font-bold text-indigo-900">Pistas para hacer este comentario</h3><div className="space-y-3 text-sm text-slate-700"><p><strong>1. Tema posible:</strong> {selectedText.theme}</p><p><strong>2. Tesis del autor:</strong> {selectedText.thesis}</p><p><strong>3. Conceptos que deberías usar:</strong> {selectedText.concepts.join(", ")}.</p><p><strong>4. Cómo empezar:</strong> Este fragmento pertenece al pensamiento de {selectedText.philosopher} y trata sobre {selectedText.theme.toLowerCase()}</p><p><strong>5. Para subir nota:</strong> relaciona el texto con la teoría general del autor y añade una comparación breve con otro filósofo.</p><Button onClick={() => { setTheoryText(selectedText); setTab("teoria"); }} className="mt-3 bg-indigo-700 text-white"><Brain className="mr-2 inline h-4 w-4" />Ver teoría completa de {selectedText.philosopher}</Button></div></motion.div>}
                <div className="grid gap-4 md:grid-cols-2">{[["theme", "1. Tema", "¿De qué problema filosófico trata el texto?"], ["thesis", "2. Tesis", "¿Qué defiende el autor?"], ["concepts", "3. Conceptos clave", "Incluye vocabulario técnico."], ["explanation", "4. Explicación", "Relaciona el texto con la teoría del autor."], ["critique", "5. Valoración crítica", "Compara con otro autor o problema actual."]].map(([key, label, placeholder]) => <label key={key} className={key === "explanation" || key === "critique" ? "md:col-span-2" : ""}><span className="mb-1 block text-sm font-semibold">{label}</span><textarea value={answers[key]} onChange={(e) => setAnswers({ ...answers, [key]: e.target.value })} placeholder={placeholder} className="min-h-24 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900" /></label>)}</div>
                <div className="mt-5 flex flex-wrap gap-3"><Button onClick={correctComment} className="bg-slate-900 text-white"><Wand2 className="mr-2 inline h-4 w-4" />Corregir con rúbrica</Button><Button onClick={resetComment} className="border border-slate-300 bg-white text-slate-800"><RotateCcw className="mr-2 inline h-4 w-4" />Reiniciar</Button></div>
                {rubricResult && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4"><h3 className="mb-2 flex items-center font-bold text-indigo-900"><Award className="mr-2 h-5 w-5" />Nota PRO: {rubricResult.total}/10</h3><p className="mb-3 text-sm text-slate-700">{rubricResult.globalFeedback}</p><div className="space-y-2">{rubricResult.sections.map((s) => <div key={s.name} className="rounded-2xl bg-white/70 p-3 text-sm"><div className="flex justify-between font-semibold"><span>{s.name}</span><span>{s.score}/{s.max}</span></div><p className="mt-1 text-slate-600">{s.feedback}</p></div>)}</div></motion.div>}
                {showSolution && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"><h3 className="mb-2 flex items-center font-bold text-emerald-900"><CheckCircle2 className="mr-2 h-5 w-5" />Solución modelo</h3><p><strong>Tema:</strong> {selectedText.theme}</p><p className="mt-2"><strong>Tesis:</strong> {selectedText.thesis}</p><p className="mt-2"><strong>Conceptos:</strong> {selectedText.concepts.join(", ")}.</p><p className="mt-2"><strong>Explicación:</strong> {selectedText.solution}</p></motion.div>}
              </CardContent></Card>
            </motion.section>
          )}

          {tab === "teoria" && <motion.section key="teoria" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><Card><CardContent className="p-6"><div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><p className="text-sm font-semibold text-indigo-700">Teoría visual completa para comentar</p><h2 className="text-3xl font-bold">{theory.title}</h2><p className="mt-2 text-slate-600">Texto seleccionado: <strong>{theoryText.title}</strong></p></div><Button onClick={() => setTab("comentario")} className="border border-slate-300 bg-white text-slate-800">Volver al comentario</Button></div><div className="mb-6 grid gap-5 lg:grid-cols-[.9fr_1.1fr]"><TheoryVisual type={theory.visual} /><div className="rounded-2xl bg-slate-100 p-4"><p className="mb-2 text-sm font-semibold text-slate-500">Fragmento</p><p className="text-lg font-medium leading-relaxed">“{theoryText.quote}”</p></div></div><div className="grid gap-5 md:grid-cols-2">{theory.blocks.map((block) => <div key={block.heading} className="rounded-2xl bg-indigo-50 p-5"><h3 className="mb-3 text-xl font-bold">{block.heading}</h3><ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">{block.points.map((point) => <li key={point}>{point}</li>)}</ul></div>)}</div><div className="mt-6 rounded-2xl bg-white p-5 shadow-sm"><h3 className="mb-3 text-xl font-bold">Cómo usar esta teoría en el comentario</h3><ol className="list-decimal space-y-2 pl-5 text-sm text-slate-700"><li>Empieza identificando el problema filosófico del texto.</li><li>Explica la tesis del autor con tus propias palabras.</li><li>Introduce los conceptos clave: {theoryText.concepts.join(", ")}.</li><li>Relaciona el fragmento con la teoría general del autor.</li><li>Añade una comparación breve con otro filósofo.</li><li>Cierra con una valoración crítica actual.</li></ol></div></CardContent></Card></motion.section>}

          {tab === "filosofos" && <motion.section key="filosofos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{philosophers.map((p) => <Card key={p.id} className={`overflow-hidden bg-gradient-to-br ${p.color}`}><CardContent className="p-5"><div className="mb-3 flex items-center justify-between"><Brain className="h-8 w-8" /><Badge>{p.pau}</Badge></div><h2 className="text-2xl font-bold">{p.name}</h2><p className="mt-1 text-sm font-semibold text-slate-600">{p.current}</p><p className="mt-3 text-sm text-slate-700">{p.summary}</p><div className="mt-4"><p className="mb-2 text-sm font-bold">Conceptos PAU</p><div className="flex flex-wrap gap-2">{p.concepts.map((c) => <Badge key={c}>{c}</Badge>)}</div></div><div className="mt-4 rounded-2xl bg-white/60 p-3 text-sm"><strong>Obras:</strong> {p.works.join(" · ")}</div><Button onClick={() => { const sample = texts.find((t) => t.philosopher === p.name) || texts[0]; setTheoryText(sample); setTab("teoria"); }} className="mt-4 bg-slate-900 text-white">Ver teoría visual</Button></CardContent></Card>)}</motion.section>}

          {tab === "retos" && (
            <motion.section key="retos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 lg:grid-cols-[1fr_.8fr]">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><Gamepad2 className="h-8 w-8" /><div><h2 className="text-2xl font-bold">Duelo de conceptos PRO</h2><p className="text-sm text-slate-500">Preguntas automáticas de autores, conceptos, obras, corrientes y textos.</p></div></div><Badge>{reviewMode ? "Repaso de errores" : `${quizQuestions.length} preguntas`}</Badge></div>
                  <div className="mb-4 grid gap-3 md:grid-cols-4"><div className="rounded-2xl bg-slate-100 p-4"><p className="text-xs text-slate-500">Aciertos</p><p className="text-2xl font-bold text-emerald-700">{quizCorrect}</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="text-xs text-slate-500">Fallos</p><p className="text-2xl font-bold text-red-600">{quizWrong}</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="text-xs text-slate-500">Racha</p><p className="text-2xl font-bold">{quizStreak}</p></div><div className="rounded-2xl bg-slate-100 p-4"><p className="text-xs text-slate-500">Errores a repasar</p><p className="text-2xl font-bold">{wrongQuestions.length}</p></div></div>
                  <div className="rounded-2xl bg-slate-100 p-5"><div className="mb-3 flex items-center justify-between gap-3"><p className="text-sm font-semibold text-slate-500">Pregunta {(quizIndex % activeQuizQuestions.length) + 1} / {activeQuizQuestions.length}</p>{quizStreak >= 3 && <Badge><Flame className="mr-1 inline h-3 w-3" />Bonus de racha activo</Badge>}</div><p className="text-lg font-bold">{currentQuestion.q}</p><div className="mt-4 grid gap-3">{currentQuestion.options.map((option, idx) => { const isCorrect = idx === currentQuestion.answer; const selected = selectedOption === idx; return <button key={`${currentQuestion.q}-${option}`} type="button" disabled={quizDone} onClick={() => setSelectedOption(idx)} className={`rounded-2xl border p-4 text-left transition ${selected ? "border-slate-900 bg-white shadow-md" : "border-slate-200 bg-white/70"} ${quizDone && isCorrect ? "border-emerald-500 bg-emerald-50" : ""} ${quizDone && selected && !isCorrect ? "border-red-400 bg-red-50" : ""}`}>{option}</button>; })}</div></div>
                  <div className="mt-5 flex flex-wrap gap-3"><Button onClick={submitQuiz} disabled={quizDone} className="bg-slate-900 text-white">Comprobar</Button><Button onClick={nextQuiz} className="border border-slate-300 bg-white text-slate-800">Siguiente reto</Button>{!reviewMode ? <Button onClick={startReviewMode} disabled={wrongQuestions.length === 0} className="border border-red-300 bg-red-50 text-red-700">Repasar errores</Button> : <Button onClick={stopReviewMode} className="border border-slate-300 bg-white text-slate-800">Salir del repaso</Button>}</div>
                  {quizDone && <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">{selectedOption === currentQuestion.answer ? <p className="font-bold text-emerald-700"><CheckCircle2 className="mr-2 inline h-5 w-5" />Correcto: +30 XP{quizStreak >= 3 ? " + bonus de racha" : ""}</p> : <p className="font-bold text-red-700"><XCircle className="mr-2 inline h-5 w-5" />Incorrecto</p>}<p className="mt-2 text-sm text-slate-600">{currentQuestion.explanation}</p></div>}
                </CardContent>
              </Card>
              <Card><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><Sparkles className="mr-2 h-6 w-6" />Modo élite PAU</h2><div className="space-y-3">{[["Conceptos de todos los autores", "automático"], ["Obras y autores", "automático"], ["Corrientes filosóficas", "automático"], ["Textos y conceptos clave", "automático"], ["Repaso inteligente de errores", `${wrongQuestions.length} pendientes`], ["Bonus por racha", quizStreak >= 3 ? "activo" : "desde 3 aciertos"]].map(([mission, reward]) => <div key={mission} className="flex items-center justify-between rounded-2xl bg-slate-100 p-4"><div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-slate-500" /><span className="font-medium">{mission}</span></div><Badge>{reward}</Badge></div>)}</div><div className="mt-5 rounded-2xl bg-indigo-50 p-4 text-sm text-slate-700"><p className="font-bold text-indigo-900">Consejo de uso</p><p className="mt-1">Haz rondas rápidas. Cuando falles, entra en “Repasar errores”. Así la app insiste en lo que más te cuesta.</p></div></CardContent></Card>
            </motion.section>
          )}

          {tab === "comparador" && <motion.section key="comparador" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 md:grid-cols-2">{comparisons.map((item) => <Card key={item.title}><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><Scale className="mr-2 h-6 w-6" />{item.title}</h2><div className="grid gap-4"><div className="rounded-2xl bg-slate-100 p-4"><p className="font-semibold">Autor A</p><p className="mt-1 text-sm text-slate-700">{item.a}</p></div><div className="rounded-2xl bg-indigo-50 p-4"><p className="font-semibold">Autor B</p><p className="mt-1 text-sm text-slate-700">{item.b}</p></div></div></CardContent></Card>)}</motion.section>}

          {tab === "flashcards" && <motion.section key="flashcards" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 lg:grid-cols-[1fr_.7fr]"><Card><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><Layers3 className="mr-2 h-6 w-6" />Flashcards PAU</h2><div className="rounded-3xl bg-gradient-to-br from-indigo-100 to-slate-100 p-8 text-center"><Badge>{flashcards[flashIndex].author}</Badge><h3 className="mt-6 text-2xl font-bold">{showFlashAnswer ? flashcards[flashIndex].back : flashcards[flashIndex].front}</h3></div><div className="mt-5 flex flex-wrap gap-3"><Button onClick={() => setShowFlashAnswer(!showFlashAnswer)} className="bg-slate-900 text-white">{showFlashAnswer ? "Ver pregunta" : "Ver respuesta"}</Button><Button onClick={() => { gainXP(15); nextFlashcard(); }} className="border border-slate-300 bg-white text-slate-800">La sabía (+15 XP)</Button><Button onClick={nextFlashcard} className="border border-slate-300 bg-white text-slate-800">Siguiente</Button></div></CardContent></Card><Card><CardContent className="p-6"><h2 className="mb-4 text-2xl font-bold">Consejo PAU</h2><p className="text-sm text-slate-700">Memoriza conceptos con flashcards y después úsalos en los comentarios de texto para subir nota.</p></CardContent></Card></motion.section>}

          {tab === "lecciones" && <motion.section key="lecciones" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}><Card className="mb-6 bg-white/90"><CardContent className="p-6"><div className="mb-3 flex items-center justify-between"><h2 className="flex items-center text-2xl font-bold"><Map className="mr-2 h-7 w-7" />Ruta PAU tipo Duolingo</h2><Badge>{lessonProgress}% completado</Badge></div><ProgressBar value={lessonProgress} /><p className="mt-3 text-sm text-slate-600">Completa las unidades en orden. Cada bloque está dividido por autores y contiene esquemas ampliados para estudiar.</p></CardContent></Card><div className="grid gap-5 md:grid-cols-2">{lessons.map((lesson, index) => { const completed = completedLessons.includes(lesson.id); const unlocked = index <= completedLessons.length; return <Card key={lesson.id} className={`overflow-hidden bg-gradient-to-br ${lesson.color} ${!unlocked ? "opacity-60" : ""}`}><CardContent className="p-6"><div className="mb-3 flex items-center justify-between"><Badge>Unidad {index + 1}</Badge>{completed ? <CheckCircle2 className="h-7 w-7 text-emerald-700" /> : unlocked ? <BookOpen className="h-7 w-7 text-slate-700" /> : <Lock className="h-7 w-7 text-slate-500" />}</div><h2 className="text-2xl font-bold">{lesson.title}</h2><p className="mt-1 text-sm font-semibold text-slate-600">{lesson.authors}</p><p className="mt-3 text-sm text-slate-700">{lesson.goal}</p><div className="mt-5 rounded-2xl bg-white/70 p-4"><p className="mb-3 font-bold">Esquema por autor</p>{lesson.authorSections.map((section) => <div key={section.author} className="mb-5"><h3 className="mb-2 rounded-xl bg-white px-3 py-2 font-bold text-slate-900 shadow-sm">{section.author}</h3><ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">{section.points.map((point) => <li key={point}>{point}</li>)}</ul></div>)}</div><Button disabled={!unlocked || completed} onClick={() => completeLesson(lesson, index)} className={`mt-5 ${completed ? "bg-emerald-100 text-emerald-800" : unlocked ? "bg-slate-900 text-white" : "bg-slate-300 text-slate-600"}`}>{completed ? "Completada" : unlocked ? `Completar (+${lesson.xp} XP)` : "Bloqueada"}</Button></CardContent></Card>; })}</div></motion.section>}

          {tab === "examen" && <motion.section key="examen" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 lg:grid-cols-[1fr_.7fr]"><Card><CardContent className="p-6"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="flex items-center text-2xl font-bold"><ClipboardCheck className="mr-2 h-7 w-7" />Simulacro PAU</h2><p className="text-sm text-slate-500">Redacta un comentario completo en tiempo limitado.</p></div><Badge><Timer className="mr-1 inline h-3 w-3" />{minutes}:{seconds.toString().padStart(2, "0")}</Badge></div>{!examStarted ? <div className="rounded-2xl bg-slate-100 p-5"><p className="mb-4 text-slate-700">El modo examen genera un texto aleatorio y lo corrige con un sistema automático orientativo.</p><Button onClick={startExam} className="bg-slate-900 text-white">Empezar simulacro</Button></div> : <><div className="mb-5 rounded-2xl bg-slate-100 p-4"><p className="mb-2 text-sm font-semibold text-slate-500">{examText.philosopher} · {examText.work}</p><p className="text-lg font-medium leading-relaxed">“{examText.quote}”</p></div><textarea value={examAnswer} onChange={(e) => setExamAnswer(e.target.value)} disabled={examFinished} placeholder="Redacta aquí tu comentario completo." className="min-h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-slate-900" /><div className="mt-5 flex flex-wrap gap-3"><Button onClick={finishExam} disabled={examFinished} className="bg-slate-900 text-white">Finalizar examen</Button><Button onClick={startExam} className="border border-slate-300 bg-white text-slate-800">Nuevo simulacro</Button></div></>}{examFinished && <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4"><h3 className="mb-2 flex items-center font-bold text-indigo-900"><Award className="mr-2 h-5 w-5" />Resultado del simulacro</h3><p>Nota aproximada: <strong>{examScore}/10</strong></p></div>}</CardContent></Card><Card><CardContent className="p-6"><h2 className="mb-4 text-2xl font-bold">Rúbrica PAU</h2><div className="space-y-3">{[["Presentación del autor y obra", "2 puntos"], ["Tema y tesis", "2 puntos"], ["Explicación filosófica", "3 puntos"], ["Conceptos técnicos", "2 puntos"], ["Valoración crítica", "1 punto"]].map(([item, points]) => <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-100 p-4"><span className="font-medium">{item}</span><Badge>{points}</Badge></div>)}</div></CardContent></Card></motion.section>}

          {tab === "progreso" && <motion.section key="progreso" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 md:grid-cols-3"><Card className="md:col-span-2"><CardContent className="p-6"><h2 className="mb-4 text-2xl font-bold">Panel del alumno</h2><div className="grid gap-4 md:grid-cols-3"><div className="rounded-3xl bg-slate-100 p-5"><p className="text-sm text-slate-500">XP total</p><p className="text-4xl font-bold">{xp}</p></div><div className="rounded-3xl bg-slate-100 p-5"><p className="text-sm text-slate-500">Nivel</p><p className="text-4xl font-bold">{level}</p></div><div className="rounded-3xl bg-slate-100 p-5"><p className="text-sm text-slate-500">Ruta PAU</p><p className="text-4xl font-bold">{lessonProgress}%</p></div></div><div className="mt-5"><p className="mb-2 font-semibold">Competencias PAU</p>{[["Identificar tema y tesis", 78], ["Usar vocabulario filosófico", 64], ["Contextualizar al autor", 72], ["Comparar autores", 58], ["Valorar críticamente", 46]].map(([label, value]) => <div key={label} className="mb-4"><div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value}%</span></div><ProgressBar value={value} /></div>)}</div><Button onClick={resetProgress} className="mt-4 bg-red-500 text-white">Reiniciar progreso</Button></CardContent></Card><div className="space-y-5"><Card><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><History className="mr-2 h-6 w-6" />Historial</h2><div className="space-y-3">{history.length === 0 && <p className="text-sm text-slate-500">Todavía no hay intentos guardados.</p>}{history.map((item) => <div key={item.id} className="rounded-2xl bg-slate-100 p-3 text-sm"><div className="flex justify-between font-semibold"><span>{item.title}</span><span>{item.score}/10</span></div><p className="text-slate-500">{item.author} · {item.date}</p></div>)}</div></CardContent></Card><Card><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><Award className="mr-2 h-6 w-6" />Logros</h2><div className="space-y-3">{achievements.map((achievement) => { const Icon = achievement.icon; return <div key={achievement.name} className={`flex items-center justify-between rounded-2xl p-3 ${achievement.unlocked ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-400"}`}><div className="flex items-center gap-3"><Icon className="h-5 w-5" /><span className="font-semibold">{achievement.name}</span></div>{achievement.unlocked ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}</div>; })}</div></CardContent></Card></div></motion.section>}
        </AnimatePresence>
      </div>
    </div>
  );
}
