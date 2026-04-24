import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award, BookOpen, Brain, CalendarDays, CheckCircle2, ClipboardCheck,
  Flame, Gamepad2, GraduationCap, History, Layers3, RotateCcw,
  Scale, School, Search, Sparkles, Star, Target, Timer, Trophy,
  Users, Wand2, XCircle
} from "lucide-react";

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl bg-white shadow-xl ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, onClick, className = "", disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl px-4 py-2 font-medium transition hover:scale-[1.02] disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
      {children}
    </span>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-3 w-full rounded-full bg-slate-200">
      <motion.div
        className="h-3 rounded-full bg-slate-900"
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

const philosophers = [
  {
    id: "platon",
    name: "Platón",
    current: "Idealismo / dualismo ontológico",
    pau: "Muy frecuente en PAU",
    color: "from-amber-100 to-orange-50",
    concepts: ["Ideas", "mundo sensible", "mundo inteligible", "Idea de Bien", "alma"],
    works: ["República", "Fedón", "Fedro"],
    summary: "La realidad verdadera pertenece al mundo inteligible de las Ideas. La educación filosófica permite ascender desde las apariencias hasta la Idea de Bien.",
  },
  {
    id: "aristoteles",
    name: "Aristóteles",
    current: "Realismo / teleologismo",
    pau: "Muy frecuente en PAU",
    color: "from-yellow-100 to-stone-50",
    concepts: ["sustancia", "acto y potencia", "causas", "felicidad", "virtud"],
    works: ["Metafísica", "Ética a Nicómaco", "Política"],
    summary: "Critica el dualismo platónico y sitúa la realidad en las sustancias concretas. Explica la naturaleza mediante causas, finalidad y desarrollo.",
  },
  {
    id: "agustin",
    name: "San Agustín",
    current: "Cristianismo platónico",
    pau: "Habitual en algunas comunidades",
    color: "from-purple-100 to-indigo-50",
    concepts: ["interioridad", "Dios", "verdad", "iluminación", "ciudad de Dios"],
    works: ["Confesiones", "La ciudad de Dios"],
    summary: "Integra cristianismo y platonismo. La verdad se encuentra en el interior del alma iluminada por Dios.",
  },
  {
    id: "tomas",
    name: "Tomás de Aquino",
    current: "Escolástica aristotélica",
    pau: "Muy frecuente en PAU",
    color: "from-emerald-100 to-lime-50",
    concepts: ["cinco vías", "ley natural", "acto y potencia", "esencia y existencia"],
    works: ["Suma Teológica", "Suma contra gentiles"],
    summary: "Une cristianismo y aristotelismo. Defiende la compatibilidad entre razón y fe y formula las cinco vías para demostrar la existencia de Dios.",
  },
  {
    id: "descartes",
    name: "René Descartes",
    current: "Racionalismo",
    pau: "Muy frecuente en PAU",
    color: "from-blue-100 to-cyan-50",
    concepts: ["duda metódica", "cogito", "ideas innatas", "dualismo", "método"],
    works: ["Discurso del método", "Meditaciones metafísicas"],
    summary: "Busca una certeza absoluta mediante la duda metódica. El cogito se convierte en fundamento del conocimiento.",
  },
  {
    id: "hume",
    name: "David Hume",
    current: "Empirismo",
    pau: "Frecuente en PAU",
    color: "from-sky-100 to-slate-50",
    concepts: ["impresiones", "ideas", "causalidad", "costumbre", "escepticismo"],
    works: ["Tratado de la naturaleza humana", "Investigación sobre el entendimiento humano"],
    summary: "Reduce el conocimiento a la experiencia y critica la causalidad entendida como conexión necesaria.",
  },
  {
    id: "rousseau",
    name: "Jean-Jacques Rousseau",
    current: "Contractualismo / Ilustración crítica",
    pau: "Frecuente en PAU",
    color: "from-green-100 to-teal-50",
    concepts: ["estado de naturaleza", "contrato social", "voluntad general", "libertad"],
    works: ["El contrato social", "Discurso sobre la desigualdad"],
    summary: "Critica la desigualdad social y defiende que la legitimidad política debe basarse en la voluntad general.",
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    current: "Idealismo trascendental",
    pau: "Muy frecuente en PAU",
    color: "from-indigo-100 to-slate-100",
    concepts: ["a priori", "fenómeno", "noúmeno", "imperativo categórico", "juicio reflexionante"],
    works: ["Crítica de la razón pura", "Crítica de la razón práctica", "Crítica de la facultad de juzgar"],
    summary: "Estudia las condiciones de posibilidad del conocimiento, la moral y el juicio estético. La facultad de juzgar media entre naturaleza y libertad.",
  },
  {
    id: "marx",
    name: "Karl Marx",
    current: "Materialismo histórico",
    pau: "Muy frecuente en PAU",
    color: "from-red-100 to-orange-50",
    concepts: ["alienación", "ideología", "lucha de clases", "infraestructura", "plusvalía"],
    works: ["Manuscritos económico-filosóficos", "El capital", "La ideología alemana"],
    summary: "Analiza la sociedad desde las condiciones materiales de producción y critica el capitalismo por generar explotación y alienación.",
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    current: "Vitalismo / crítica de la moral",
    pau: "Muy frecuente en PAU",
    color: "from-rose-100 to-red-50",
    concepts: ["nihilismo", "muerte de Dios", "superhombre", "voluntad de poder", "eterno retorno"],
    works: ["Así habló Zaratustra", "Genealogía de la moral", "Más allá del bien y del mal"],
    summary: "Critica la moral tradicional, la metafísica y el cristianismo. Propone una afirmación creadora de la vida frente al nihilismo.",
  },
  {
    id: "ortega",
    name: "Ortega y Gasset",
    current: "Raciovitalismo",
    pau: "Frecuente en PAU",
    color: "from-orange-100 to-yellow-50",
    concepts: ["yo y circunstancia", "razón vital", "perspectivismo", "vida", "masa"],
    works: ["Meditaciones del Quijote", "La rebelión de las masas", "El tema de nuestro tiempo"],
    summary: "Defiende que la vida humana es la realidad radical. La razón debe entenderse como razón vital situada en una circunstancia concreta.",
  },
  {
    id: "arendt",
    name: "Hannah Arendt",
    current: "Filosofía política contemporánea",
    pau: "Cada vez más frecuente",
    color: "from-violet-100 to-fuchsia-50",
    concepts: ["totalitarismo", "acción", "pluralidad", "banalidad del mal", "espacio público"],
    works: ["Los orígenes del totalitarismo", "La condición humana", "Eichmann en Jerusalén"],
    summary: "Analiza el totalitarismo, la acción política y la responsabilidad. La banalidad del mal muestra cómo el mal puede surgir de la obediencia acrítica.",
  },
];

const texts = [
  {
    id: "platon1",
    philosopher: "Platón",
    work: "República, libro VII",
    title: "Alegoría de la caverna",
    difficulty: "Media",
    quote: "Los prisioneros toman las sombras por realidades, hasta que uno de ellos asciende hacia la luz.",
    theme: "El paso de la ignorancia al conocimiento.",
    thesis: "La educación filosófica libera al alma de las apariencias sensibles y la orienta hacia las Ideas.",
    concepts: ["mundo sensible", "mundo inteligible", "Idea de Bien", "educación"],
    solution: "La caverna representa la ignorancia del mundo sensible. El ascenso del prisionero simboliza la educación filosófica hacia el conocimiento verdadero de las Ideas y de la Idea de Bien.",
  },
  {
    id: "platon2",
    philosopher: "Platón",
    work: "República",
    title: "La Idea de Bien",
    difficulty: "Alta",
    quote: "Lo que proporciona la verdad a los objetos conocidos y la facultad de conocer al que conoce es la Idea de Bien.",
    theme: "La función ontológica y epistemológica de la Idea de Bien.",
    thesis: "La Idea de Bien es el fundamento de la realidad y del conocimiento.",
    concepts: ["Idea de Bien", "verdad", "conocimiento", "mundo inteligible"],
    solution: "La Idea de Bien ocupa el lugar supremo en el mundo inteligible. Hace posible que las cosas sean conocidas y que el alma pueda conocerlas.",
  },
  {
    id: "aristoteles1",
    philosopher: "Aristóteles",
    work: "Ética a Nicómaco",
    title: "La felicidad como fin último",
    difficulty: "Media",
    quote: "La felicidad es aquello que elegimos siempre por sí mismo y nunca por otra cosa.",
    theme: "La felicidad como finalidad de la vida humana.",
    thesis: "La felicidad es el bien supremo al que tienden todas las acciones humanas.",
    concepts: ["felicidad", "fin último", "virtud", "ética"],
    solution: "Toda acción busca un fin, pero la felicidad es el fin último porque no se desea como medio, sino por sí misma.",
  },
  {
    id: "aristoteles2",
    philosopher: "Aristóteles",
    work: "Metafísica",
    title: "Acto y potencia",
    difficulty: "Alta",
    quote: "El ser se dice de muchas maneras.",
    theme: "La explicación aristotélica del cambio y del ser.",
    thesis: "La realidad se comprende mediante la distinción entre acto y potencia.",
    concepts: ["acto", "potencia", "sustancia", "cambio"],
    solution: "El cambio se explica como paso de la potencia al acto. Una cosa puede llegar a ser algo porque ya posee esa posibilidad.",
  },
  {
    id: "agustin1",
    philosopher: "San Agustín",
    work: "Confesiones",
    title: "La verdad interior",
    difficulty: "Media",
    quote: "No salgas fuera; vuelve a ti mismo. En el interior del hombre habita la verdad.",
    theme: "La búsqueda interior de la verdad.",
    thesis: "La verdad se encuentra en la interioridad del alma iluminada por Dios.",
    concepts: ["interioridad", "verdad", "Dios", "iluminación"],
    solution: "San Agustín defiende que la verdad no debe buscarse solo fuera, sino en el interior, donde Dios ilumina el alma.",
  },
  {
    id: "tomas1",
    philosopher: "Tomás de Aquino",
    work: "Suma Teológica",
    title: "Las cinco vías",
    difficulty: "Media",
    quote: "Es necesario llegar a un primer motor que no sea movido por nadie, y este todos entienden que es Dios.",
    theme: "La demostración racional de la existencia de Dios.",
    thesis: "La existencia de Dios puede demostrarse racionalmente a partir del mundo.",
    concepts: ["cinco vías", "Dios", "primer motor", "causalidad"],
    solution: "Tomás parte de la experiencia del movimiento y la causalidad para concluir que debe existir una primera causa o primer motor, identificado con Dios.",
  },
  {
    id: "tomas2",
    philosopher: "Tomás de Aquino",
    work: "Suma Teológica",
    title: "Razón y fe",
    difficulty: "Media",
    quote: "La gracia no destruye la naturaleza, sino que la perfecciona.",
    theme: "La relación entre razón y fe.",
    thesis: "La fe y la razón son compatibles porque proceden de Dios.",
    concepts: ["razón", "fe", "naturaleza", "gracia"],
    solution: "La razón humana alcanza ciertas verdades, mientras que la fe completa aquello que supera sus límites.",
  },
  {
    id: "descartes1",
    philosopher: "René Descartes",
    work: "Discurso del método",
    title: "La duda metódica",
    difficulty: "Media",
    quote: "Pienso, luego existo.",
    theme: "La búsqueda de una verdad absolutamente segura.",
    thesis: "La existencia del sujeto pensante es la primera certeza indudable.",
    concepts: ["duda metódica", "cogito", "racionalismo", "certeza"],
    solution: "Descartes duda de todo lo que puede ser falso, pero descubre que no puede dudar de que está dudando. De ahí surge el cogito.",
  },
  {
    id: "descartes2",
    philosopher: "René Descartes",
    work: "Meditaciones metafísicas",
    title: "La duda y el genio maligno",
    difficulty: "Alta",
    quote: "Supondré que hay un genio maligno, astuto y poderoso, que emplea toda su industria en engañarme.",
    theme: "La radicalización de la duda cartesiana.",
    thesis: "Descartes lleva la duda al extremo para encontrar una certeza absolutamente firme.",
    concepts: ["genio maligno", "duda hiperbólica", "certeza", "cogito"],
    solution: "La hipótesis del genio maligno permite dudar incluso de las matemáticas, pero no de la existencia del sujeto que piensa.",
  },
  {
    id: "hume1",
    philosopher: "David Hume",
    work: "Investigación sobre el entendimiento humano",
    title: "Crítica de la causalidad",
    difficulty: "Alta",
    quote: "No percibimos jamás conexión necesaria alguna entre causa y efecto.",
    theme: "La crítica empirista de la causalidad.",
    thesis: "La causalidad no es una conexión necesaria conocida por la razón, sino una costumbre.",
    concepts: ["causalidad", "costumbre", "impresiones", "empirismo"],
    solution: "Hume afirma que solo observamos sucesiones constantes de hechos, pero no una conexión necesaria entre ellos.",
  },
  {
    id: "hume2",
    philosopher: "David Hume",
    work: "Tratado de la naturaleza humana",
    title: "Impresiones e ideas",
    difficulty: "Media",
    quote: "Todas nuestras ideas simples proceden, en su primera aparición, de impresiones simples.",
    theme: "El origen empírico del conocimiento.",
    thesis: "Todas las ideas proceden de impresiones sensibles previas.",
    concepts: ["impresiones", "ideas", "experiencia", "empirismo"],
    solution: "Para Hume, la mente no posee ideas innatas. Todo contenido mental deriva de la experiencia sensible.",
  },
  {
    id: "rousseau1",
    philosopher: "Jean-Jacques Rousseau",
    work: "El contrato social",
    title: "La voluntad general",
    difficulty: "Media",
    quote: "Cada uno de nosotros pone en común su persona y todo su poder bajo la suprema dirección de la voluntad general.",
    theme: "La legitimidad política basada en la voluntad general.",
    thesis: "La comunidad política legítima surge del pacto social y de la voluntad general.",
    concepts: ["contrato social", "voluntad general", "libertad", "soberanía"],
    solution: "El individuo solo es políticamente libre cuando obedece leyes que expresan la voluntad general.",
  },
  {
    id: "rousseau2",
    philosopher: "Jean-Jacques Rousseau",
    work: "Discurso sobre la desigualdad",
    title: "Origen de la desigualdad",
    difficulty: "Media",
    quote: "El primero que cercó un terreno y dijo ‘esto es mío’ fue el verdadero fundador de la sociedad civil.",
    theme: "La crítica del origen social de la desigualdad.",
    thesis: "La propiedad privada marca el inicio de la desigualdad social.",
    concepts: ["desigualdad", "propiedad privada", "sociedad civil", "estado de naturaleza"],
    solution: "Rousseau critica cómo la sociedad y la propiedad privada han corrompido la libertad originaria y han generado desigualdad.",
  },
  {
    id: "kant1",
    philosopher: "Immanuel Kant",
    work: "Crítica de la facultad de juzgar",
    title: "El juicio de gusto no es conocimiento",
    difficulty: "Media",
    quote: "El juicio de gusto no es un juicio de conocimiento; no es lógico, sino estético.",
    theme: "La diferencia entre juicio estético y juicio de conocimiento.",
    thesis: "El juicio de gusto no describe objetivamente el objeto, sino que expresa una satisfacción subjetiva.",
    concepts: ["juicio de gusto", "estético", "subjetividad", "placer"],
    solution: "Kant distingue el juicio de conocimiento, basado en conceptos, del juicio estético, basado en el sentimiento de placer.",
  },
  {
    id: "kant2",
    philosopher: "Immanuel Kant",
    work: "Crítica de la facultad de juzgar",
    title: "Universalidad sin concepto",
    difficulty: "Alta",
    quote: "Lo bello es lo que place universalmente sin concepto.",
    theme: "La paradoja de la universalidad estética.",
    thesis: "El juicio de gusto pretende validez universal, aunque no se fundamente en conceptos objetivos.",
    concepts: ["universalidad subjetiva", "sensus communis", "gusto", "concepto"],
    solution: "Quien llama bello a algo espera la aprobación de los demás, aunque no pueda demostrarlo mediante conceptos. Kant lo explica mediante el sensus communis.",
  },
  {
    id: "kant3",
    philosopher: "Immanuel Kant",
    work: "Crítica de la facultad de juzgar",
    title: "Finalidad sin fin",
    difficulty: "Alta",
    quote: "La belleza es la forma de la finalidad de un objeto en cuanto es percibida sin representación de un fin.",
    theme: "La finalidad sin fin en el juicio estético.",
    thesis: "Lo bello parece organizado con sentido, aunque no tenga una finalidad concreta.",
    concepts: ["finalidad sin fin", "belleza", "juicio reflexionante", "forma"],
    solution: "Lo bello parece tener una organización armónica, pero sin que podamos asignarle una función determinada.",
  },
  {
    id: "kant4",
    philosopher: "Immanuel Kant",
    work: "Fundamentación de la metafísica de las costumbres",
    title: "Imperativo categórico",
    difficulty: "Alta",
    quote: "Obra solo según una máxima tal que puedas querer al mismo tiempo que se torne ley universal.",
    theme: "La universalidad de la ley moral.",
    thesis: "Una acción es moral cuando su máxima puede universalizarse racionalmente.",
    concepts: ["imperativo categórico", "deber", "ley moral", "universalidad"],
    solution: "La moral no depende de consecuencias ni inclinaciones, sino del deber racional.",
  },
  {
    id: "marx1",
    philosopher: "Karl Marx",
    work: "Manuscritos económico-filosóficos",
    title: "Alienación del trabajador",
    difficulty: "Alta",
    quote: "El trabajador se vuelve tanto más pobre cuanta más riqueza produce.",
    theme: "La alienación en el trabajo capitalista.",
    thesis: "El capitalismo separa al trabajador del producto, de su actividad, de sí mismo y de los demás.",
    concepts: ["alienación", "capitalismo", "trabajo", "explotación"],
    solution: "En el capitalismo, el trabajador produce riqueza que no le pertenece. Su trabajo deja de ser realización humana y se convierte en actividad impuesta.",
  },
  {
    id: "marx2",
    philosopher: "Karl Marx",
    work: "La ideología alemana",
    title: "Materialismo histórico",
    difficulty: "Alta",
    quote: "No es la conciencia la que determina la vida, sino la vida la que determina la conciencia.",
    theme: "La primacía de las condiciones materiales.",
    thesis: "Las ideas dependen de las condiciones materiales e históricas de existencia.",
    concepts: ["materialismo histórico", "ideología", "infraestructura", "conciencia"],
    solution: "Marx invierte el idealismo: no son las ideas las que explican la sociedad, sino las relaciones materiales de producción.",
  },
  {
    id: "nietzsche1",
    philosopher: "Friedrich Nietzsche",
    work: "La gaya ciencia",
    title: "La muerte de Dios",
    difficulty: "Alta",
    quote: "Dios ha muerto. Y nosotros lo hemos matado.",
    theme: "La crisis de los valores tradicionales.",
    thesis: "La cultura occidental ha perdido su fundamento religioso y moral.",
    concepts: ["muerte de Dios", "nihilismo", "valores", "superhombre"],
    solution: "Nietzsche no habla de muerte literal, sino de la pérdida de autoridad de los valores absolutos.",
  },
  {
    id: "nietzsche2",
    philosopher: "Friedrich Nietzsche",
    work: "Así habló Zaratustra",
    title: "El superhombre",
    difficulty: "Alta",
    quote: "El hombre es algo que debe ser superado.",
    theme: "La superación del ser humano decadente.",
    thesis: "El ser humano debe crear nuevos valores y superar la moral tradicional.",
    concepts: ["superhombre", "voluntad de poder", "nihilismo", "creación de valores"],
    solution: "El superhombre representa la capacidad de afirmar la vida y crear valores propios tras la muerte de Dios.",
  },
  {
    id: "ortega1",
    philosopher: "Ortega y Gasset",
    work: "Meditaciones del Quijote",
    title: "Yo y mi circunstancia",
    difficulty: "Media",
    quote: "Yo soy yo y mi circunstancia, y si no la salvo a ella no me salvo yo.",
    theme: "La vida humana como realidad situada.",
    thesis: "El ser humano no puede entenderse separado de su circunstancia.",
    concepts: ["yo", "circunstancia", "vida", "raciovitalismo"],
    solution: "La vida humana es la realidad radical y siempre se da en una circunstancia concreta.",
  },
  {
    id: "ortega2",
    philosopher: "Ortega y Gasset",
    work: "El tema de nuestro tiempo",
    title: "Perspectivismo",
    difficulty: "Media",
    quote: "Cada vida es un punto de vista sobre el universo.",
    theme: "La verdad como perspectiva.",
    thesis: "La realidad solo puede conocerse desde perspectivas concretas.",
    concepts: ["perspectivismo", "vida", "razón vital", "verdad"],
    solution: "Cada perspectiva aporta una parte necesaria de la verdad, sin caer en un relativismo absoluto.",
  },
  {
    id: "arendt1",
    philosopher: "Hannah Arendt",
    work: "Eichmann en Jerusalén",
    title: "La banalidad del mal",
    difficulty: "Alta",
    quote: "Lo más grave en Eichmann era su incapacidad para pensar.",
    theme: "La relación entre mal, obediencia y ausencia de pensamiento crítico.",
    thesis: "El mal puede surgir de la obediencia acrítica y la incapacidad de juzgar.",
    concepts: ["banalidad del mal", "responsabilidad", "pensamiento", "obediencia"],
    solution: "Personas aparentemente normales pueden participar en atrocidades cuando renuncian a pensar y juzgar por sí mismas.",
  },
  {
    id: "arendt2",
    philosopher: "Hannah Arendt",
    work: "La condición humana",
    title: "Acción y pluralidad",
    difficulty: "Media",
    quote: "La pluralidad es la condición de la acción humana.",
    theme: "La política como espacio de acción entre seres plurales.",
    thesis: "La acción política solo existe entre seres humanos diversos y libres.",
    concepts: ["acción", "pluralidad", "espacio público", "política"],
    solution: "La política no es mera administración, sino acción y palabra en un espacio común compartido.",
  },
];

const quizQuestions = [
  { q: "¿Qué autor defiende el mundo inteligible de las Ideas?", options: ["Aristóteles", "Platón", "Hume", "Marx"], answer: 1, explanation: "Platón distingue entre mundo sensible y mundo inteligible." },
  { q: "¿Qué autor formula el cogito?", options: ["Descartes", "Kant", "Nietzsche", "Arendt"], answer: 0, explanation: "Descartes afirma: pienso, luego existo." },
  { q: "¿Qué autor critica la causalidad como hábito?", options: ["Tomás", "Hume", "Rousseau", "Ortega"], answer: 1, explanation: "Hume entiende la causalidad como una asociación basada en la costumbre." },
  { q: "¿Qué autor habla de alienación?", options: ["Marx", "Platón", "Aristóteles", "San Agustín"], answer: 0, explanation: "Marx analiza la alienación del trabajador en el capitalismo." },
  { q: "¿Qué concepto pertenece a Kant?", options: ["plusvalía", "sensus communis", "cogito", "voluntad general"], answer: 1, explanation: "El sensus communis aparece en la estética kantiana." },
  { q: "¿Qué autor afirma que el ser humano es 'yo y circunstancia'?", options: ["Ortega", "Nietzsche", "Platón", "Rousseau"], answer: 0, explanation: "La expresión pertenece a Ortega y Gasset." },
];

const comparisons = [
  { title: "Platón vs Aristóteles", a: "Platón defiende Ideas separadas del mundo sensible.", b: "Aristóteles sitúa la realidad en las sustancias concretas." },
  { title: "Descartes vs Hume", a: "Descartes es racionalista y busca certezas mediante la razón.", b: "Hume es empirista y reduce el conocimiento a la experiencia." },
  { title: "Hume vs Kant", a: "Hume reduce la causalidad a costumbre.", b: "Kant afirma que la causalidad es una categoría a priori." },
  { title: "Marx vs Nietzsche", a: "Marx critica el capitalismo desde la economía y la lucha de clases.", b: "Nietzsche critica la moral occidental y propone crear nuevos valores." },
  { title: "Ortega vs Arendt", a: "Ortega analiza la vida desde la razón vital y la circunstancia.", b: "Arendt analiza la acción política, la pluralidad y el espacio público." },
];

const flashcards = [
  { front: "¿Qué es el mundo inteligible en Platón?", back: "La realidad verdadera formada por Ideas, accesible mediante la razón.", author: "Platón" },
  { front: "¿Qué significa acto y potencia?", back: "La potencia es posibilidad; el acto es realización de esa posibilidad.", author: "Aristóteles" },
  { front: "¿Qué es el cogito?", back: "La primera certeza indudable: si pienso, existo.", author: "Descartes" },
  { front: "¿Qué critica Hume de la causalidad?", back: "Que no percibimos conexión necesaria, sino sucesión habitual.", author: "Hume" },
  { front: "¿Qué es el imperativo categórico?", back: "La ley moral que exige actuar según máximas universalizables.", author: "Kant" },
  { front: "¿Qué es la alienación?", back: "Separación del trabajador respecto al producto, su actividad y sí mismo.", author: "Marx" },
  { front: "¿Qué significa la muerte de Dios?", back: "Pérdida de validez de los valores absolutos tradicionales.", author: "Nietzsche" },
  { front: "¿Qué significa 'yo y mi circunstancia'?", back: "Que la vida humana está siempre situada en un contexto concreto.", author: "Ortega" },
  { front: "¿Qué es la banalidad del mal?", back: "El mal cometido por obediencia acrítica e incapacidad de pensar.", author: "Arendt" },
];

const lessons = [
  { id: "antigua", title: "Filosofía antigua", authors: "Platón y Aristóteles", goal: "Dominar realidad, conocimiento y ética clásica.", xp: 80 },
  { id: "medieval", title: "Filosofía medieval", authors: "San Agustín y Tomás de Aquino", goal: "Comprender la relación entre razón, fe y Dios.", xp: 80 },
  { id: "moderna", title: "Filosofía moderna", authors: "Descartes, Hume, Rousseau y Kant", goal: "Dominar racionalismo, empirismo, política moderna y criticismo.", xp: 100 },
  { id: "contemporanea", title: "Filosofía contemporánea", authors: "Marx, Nietzsche, Ortega y Arendt", goal: "Comprender crítica social, crisis de valores y política contemporánea.", xp: 120 },
];

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function evaluateComment({ answers, selectedText }) {
  const fullText = Object.values(answers).join(" ");
  const clean = normalize(fullText);
  const conceptHits = selectedText.concepts.filter((c) => clean.includes(normalize(c))).length;

  const sections = [
    { name: "Tema", max: 2, score: answers.theme.trim().length > 35 ? 2 : answers.theme.trim().length > 15 ? 1 : 0, feedback: answers.theme.trim().length > 35 ? "Tema bien identificado." : "Formula el problema filosófico con más precisión." },
    { name: "Tesis", max: 2, score: answers.thesis.trim().length > 35 ? 2 : answers.thesis.trim().length > 15 ? 1 : 0, feedback: answers.thesis.trim().length > 35 ? "Tesis clara." : "Expresa con más claridad qué defiende el autor." },
    { name: "Conceptos", max: 2, score: conceptHits >= 3 ? 2 : conceptHits >= 1 ? 1 : 0, feedback: conceptHits >= 3 ? "Buen uso del vocabulario técnico." : "Incluye más conceptos propios del autor." },
    { name: "Explicación", max: 3, score: answers.explanation.trim().length > 220 ? 3 : answers.explanation.trim().length > 120 ? 2 : answers.explanation.trim().length > 40 ? 1 : 0, feedback: answers.explanation.trim().length > 220 ? "Explicación amplia y conectada con la teoría." : "Desarrolla mejor la relación entre texto y teoría." },
    { name: "Valoración crítica", max: 1, score: answers.critique.trim().length > 80 ? 1 : 0, feedback: answers.critique.trim().length > 80 ? "Incluyes valoración crítica." : "Añade comparación o reflexión crítica actual." },
  ];

  const total = sections.reduce((acc, s) => acc + s.score, 0);
  let globalFeedback = "Buen intento. Sigue practicando.";
  if (total >= 9) globalFeedback = "Excelente comentario: estructura, conceptos y explicación sólidos.";
  else if (total >= 7) globalFeedback = "Buen comentario: faltan pequeños ajustes para sobresaliente.";
  else if (total >= 5) globalFeedback = "Comentario aprobado: mejora conceptos y desarrollo explicativo.";
  else globalFeedback = "Comentario insuficiente: revisa tema, tesis y explicación.";

  return { total, sections, conceptHits, globalFeedback };
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
  const [selectedText, setSelectedText] = useState(texts[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("Todos");
  const [difficultyFilter, setDifficultyFilter] = useState("Todas");
  const [flashIndex, setFlashIndex] = useState(0);
  const [showFlashAnswer, setShowFlashAnswer] = useState(false);
  const [answers, setAnswers] = useState({ theme: "", thesis: "", concepts: "", explanation: "", critique: "" });
  const [showSolution, setShowSolution] = useState(false);
  const [rubricResult, setRubricResult] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizDone, setQuizDone] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examTime, setExamTime] = useState(900);
  const [examText, setExamText] = useState(texts[1]);
  const [examAnswer, setExamAnswer] = useState("");
  const [examScore, setExamScore] = useState(null);

  const [xp, setXp] = useState(() => Number(localStorage.getItem("xp")) || 260);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak")) || 4);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("history") || "[]"));
  const [completedLessons, setCompletedLessons] = useState(() => JSON.parse(localStorage.getItem("completedLessons") || "[]"));

  const level = Math.floor(xp / 150) + 1;
  const progress = xp % 150;
  const currentQuestion = quizQuestions[quizIndex];

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
    { name: "Primer comentario", unlocked: history.length >= 1, icon: BookOpen },
    { name: "Aprendiz PAU", unlocked: xp >= 450, icon: Brain },
    { name: "Racha filosófica", unlocked: streak >= 4, icon: Flame },
    { name: "Nivel avanzado", unlocked: level >= 4, icon: Trophy },
    { name: "Comentario sobresaliente", unlocked: history.some((h) => h.score >= 9), icon: Award },
    { name: "Ruta en marcha", unlocked: completedLessons.length >= 1, icon: School },
  ];

  const gainXP = (amount) => setXp((prev) => prev + amount);

  const resetComment = () => {
    setAnswers({ theme: "", thesis: "", concepts: "", explanation: "", critique: "" });
    setShowSolution(false);
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
    setQuizDone(true);
    if (selectedOption === currentQuestion.answer) gainXP(30);
  };

  const nextQuiz = () => {
    setSelectedOption(null);
    setQuizDone(false);
    setQuizIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  const startExam = () => {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    setExamText(randomText);
    setExamAnswer("");
    setExamTime(900);
    setExamStarted(true);
    setExamFinished(false);
    setExamScore(null);
  };

  function finishExam() {
    const score = evaluateExamEssay(examAnswer, examText);
    setExamFinished(true);
    setExamScore(score);
    gainXP(score * 10);
    setHistory((prev) => [{ id: Date.now(), title: `Simulacro: ${examText.title}`, author: examText.philosopher, score, date: new Date().toLocaleDateString() }, ...prev].slice(0, 10));
  }

  const resetProgress = () => {
    setXp(260);
    setStreak(4);
    setHistory([]);
    setCompletedLessons([]);
    localStorage.clear();
  };

  const authorsForFilter = ["Todos", ...new Set(texts.map((t) => t.philosopher))];
  const difficultiesForFilter = ["Todas", ...new Set(texts.map((t) => t.difficulty))];

  const filteredTexts = texts.filter((t) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = t.title.toLowerCase().includes(q) || t.philosopher.toLowerCase().includes(q) || t.concepts.join(" ").toLowerCase().includes(q);
    const matchesAuthor = authorFilter === "Todos" || t.philosopher === authorFilter;
    const matchesDifficulty = difficultyFilter === "Todas" || t.difficulty === difficultyFilter;
    return matchesSearch && matchesAuthor && matchesDifficulty;
  });

  const dailyText = texts[new Date().getDate() % texts.length];

  const completeLesson = (lesson) => {
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id]);
      gainXP(lesson.xp);
    }
  };

  const nextFlashcard = () => {
    setShowFlashAnswer(false);
    setFlashIndex((prev) => (prev + 1) % flashcards.length);
  };

  const minutes = Math.floor(examTime / 60);
  const seconds = examTime % 60;

  const nav = [
    { id: "comentario", label: "Comentario", icon: BookOpen },
    { id: "filosofos", label: "Filósofos", icon: Brain },
    { id: "retos", label: "Retos PAU", icon: Gamepad2 },
    { id: "comparador", label: "Comparador", icon: Scale },
    { id: "flashcards", label: "Flashcards", icon: Layers3 },
    { id: "lecciones", label: "Ruta PAU", icon: School },
    { id: "examen", label: "Modo examen", icon: ClipboardCheck },
    { id: "progreso", label: "Progreso", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-700">
              <GraduationCap className="h-5 w-5" /> Filosofía PAU · Versión PRO+
            </div>
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Aula Filosófica Quest</h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
              Entrena comentarios de texto con rúbrica automática, autores PAU, filtros, flashcards, ruta de aprendizaje,
              logros, historial y simulacros.
            </p>
          </motion.div>

          <Card className="border-0 bg-white/80">
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Nivel actual</p>
                  <p className="text-3xl font-bold">Nivel {level}</p>
                </div>
                <div className="flex gap-2">
                  <Badge><Flame className="mr-1 inline h-3 w-3" /> {streak} días</Badge>
                  <Badge><Star className="mr-1 inline h-3 w-3" /> {xp} XP</Badge>
                </div>
              </div>
              <ProgressBar value={(progress / 150) * 100} />
              <p className="mt-2 text-xs text-slate-500">{150 - progress} XP para el siguiente nivel</p>
            </CardContent>
          </Card>
        </header>

        <nav className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`h-14 text-sm shadow-sm ${tab === item.id ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"}`}
              >
                <Icon className="mr-2 inline h-5 w-5" /> {item.label}
              </Button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          {tab === "comentario" && (
            <motion.section key="comentario" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
              <Card>
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Banco de textos</h2>
                    <Badge>{selectedText.difficulty}</Badge>
                  </div>

                  <div className="mb-4 grid gap-3">
                    <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2">
                      <Search className="h-4 w-4 text-slate-400" />
                      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por autor, texto o concepto..." className="w-full bg-transparent text-sm outline-none" />
                    </div>

                    <div className="grid gap-2 md:grid-cols-2">
                      <select value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} className="rounded-2xl border border-slate-200 bg-white p-2 text-sm">
                        {authorsForFilter.map((author) => <option key={author}>{author}</option>)}
                      </select>
                      <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="rounded-2xl border border-slate-200 bg-white p-2 text-sm">
                        {difficultiesForFilter.map((difficulty) => <option key={difficulty}>{difficulty}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="mb-4 rounded-2xl bg-indigo-50 p-4">
                    <p className="mb-1 flex items-center font-semibold text-indigo-900"><CalendarDays className="mr-2 h-4 w-4" /> Reto diario</p>
                    <p className="text-sm text-slate-700">Hoy toca practicar: <strong>{dailyText.title}</strong> de {dailyText.philosopher}.</p>
                  </div>

                  <div className="max-h-[650px] space-y-3 overflow-y-auto pr-2">
                    {filteredTexts.map((t) => (
                      <button key={t.id} onClick={() => { setSelectedText(t); resetComment(); }} className={`w-full rounded-2xl border p-4 text-left transition hover:shadow-md ${selectedText.id === t.id ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"}`}>
                        <p className="font-semibold">{t.title}</p>
                        <p className="text-sm text-slate-500">{t.philosopher} · {t.work}</p>
                      </button>
                    ))}
                    {filteredTexts.length === 0 && <p className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-500">No hay textos con esos filtros.</p>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold">Corrector PRO de comentario</h2>
                      <p className="text-sm text-slate-500">Redacta por apartados y recibe nota con rúbrica.</p>
                    </div>
                    <Badge><Target className="mr-1 inline h-3 w-3" /> {commentScore}% completado</Badge>
                  </div>

                  <div className="mb-5 rounded-2xl bg-slate-100 p-4">
                    <p className="mb-2 text-sm font-semibold text-slate-500">{selectedText.philosopher} · {selectedText.work}</p>
                    <p className="text-lg font-medium leading-relaxed">“{selectedText.quote}”</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      ["theme", "1. Tema", "¿De qué problema filosófico trata el texto?"],
                      ["thesis", "2. Tesis", "¿Qué defiende el autor?"],
                      ["concepts", "3. Conceptos clave", "Incluye vocabulario técnico."],
                      ["explanation", "4. Explicación", "Relaciona el texto con la teoría del autor."],
                      ["critique", "5. Valoración crítica", "Compara con otro autor o problema actual."],
                    ].map(([key, label, placeholder]) => (
                      <label key={key} className={key === "explanation" || key === "critique" ? "md:col-span-2" : ""}>
                        <span className="mb-1 block text-sm font-semibold">{label}</span>
                        <textarea value={answers[key]} onChange={(e) => setAnswers({ ...answers, [key]: e.target.value })} placeholder={placeholder} className="min-h-24 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900" />
                      </label>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button onClick={correctComment} className="bg-slate-900 text-white"><Wand2 className="mr-2 inline h-4 w-4" /> Corregir con rúbrica</Button>
                    <Button onClick={resetComment} className="border border-slate-300 bg-white text-slate-800"><RotateCcw className="mr-2 inline h-4 w-4" /> Reiniciar</Button>
                  </div>

                  {rubricResult && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                      <h3 className="mb-2 flex items-center font-bold text-indigo-900"><Award className="mr-2 h-5 w-5" /> Nota PRO: {rubricResult.total}/10</h3>
                      <p className="mb-3 text-sm text-slate-700">{rubricResult.globalFeedback}</p>
                      <div className="space-y-2">
                        {rubricResult.sections.map((s) => (
                          <div key={s.name} className="rounded-2xl bg-white/70 p-3 text-sm">
                            <div className="flex justify-between font-semibold"><span>{s.name}</span><span>{s.score}/{s.max}</span></div>
                            <p className="mt-1 text-slate-600">{s.feedback}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {showSolution && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                      <h3 className="mb-2 flex items-center font-bold text-emerald-900"><CheckCircle2 className="mr-2 h-5 w-5" /> Solución modelo</h3>
                      <p><strong>Tema:</strong> {selectedText.theme}</p>
                      <p className="mt-2"><strong>Tesis:</strong> {selectedText.thesis}</p>
                      <p className="mt-2"><strong>Conceptos:</strong> {selectedText.concepts.join(", ")}.</p>
                      <p className="mt-2"><strong>Explicación:</strong> {selectedText.solution}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.section>
          )}

          {tab === "filosofos" && (
            <motion.section key="filosofos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {philosophers.map((p) => (
                <Card key={p.id} className={`overflow-hidden bg-gradient-to-br ${p.color}`}>
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between"><Brain className="h-8 w-8" /><Badge>{p.pau}</Badge></div>
                    <h2 className="text-2xl font-bold">{p.name}</h2>
                    <p className="mt-1 text-sm font-semibold text-slate-600">{p.current}</p>
                    <p className="mt-3 text-sm text-slate-700">{p.summary}</p>
                    <div className="mt-4"><p className="mb-2 text-sm font-bold">Conceptos PAU</p><div className="flex flex-wrap gap-2">{p.concepts.map((c) => <Badge key={c}>{c}</Badge>)}</div></div>
                    <div className="mt-4 rounded-2xl bg-white/60 p-3 text-sm"><strong>Obras:</strong> {p.works.join(" · ")}</div>
                  </CardContent>
                </Card>
              ))}
            </motion.section>
          )}

          {tab === "retos" && (
            <motion.section key="retos" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 lg:grid-cols-[1fr_.8fr]">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3"><Gamepad2 className="h-8 w-8" /><div><h2 className="text-2xl font-bold">Duelo de conceptos</h2><p className="text-sm text-slate-500">Responde y gana XP para subir de nivel.</p></div></div>
                  <div className="rounded-2xl bg-slate-100 p-5">
                    <p className="text-lg font-bold">{currentQuestion.q}</p>
                    <div className="mt-4 grid gap-3">
                      {currentQuestion.options.map((option, idx) => {
                        const isCorrect = idx === currentQuestion.answer;
                        const selected = selectedOption === idx;
                        return <button key={option} disabled={quizDone} onClick={() => setSelectedOption(idx)} className={`rounded-2xl border p-4 text-left transition ${selected ? "border-slate-900 bg-white shadow-md" : "border-slate-200 bg-white/70"} ${quizDone && isCorrect ? "border-emerald-500 bg-emerald-50" : ""} ${quizDone && selected && !isCorrect ? "border-red-400 bg-red-50" : ""}`}>{option}</button>;
                      })}
                    </div>
                  </div>
                  <div className="mt-5 flex gap-3"><Button onClick={submitQuiz} className="bg-slate-900 text-white">Comprobar</Button><Button onClick={nextQuiz} className="border border-slate-300 bg-white text-slate-800">Siguiente reto</Button></div>
                  {quizDone && <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">{selectedOption === currentQuestion.answer ? <p className="font-bold text-emerald-700"><CheckCircle2 className="mr-2 inline h-5 w-5" />Correcto: +30 XP</p> : <p className="font-bold text-red-700"><XCircle className="mr-2 inline h-5 w-5" />Incorrecto</p>}<p className="mt-2 text-sm text-slate-600">{currentQuestion.explanation}</p></div>}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center text-2xl font-bold"><Sparkles className="mr-2 h-6 w-6" />Misiones rápidas</h2>
                  <div className="space-y-3">{[["Comenta un texto filosófico", "+50 XP"], ["Compara dos autores", "+40 XP"], ["Define 5 conceptos PAU", "+25 XP"], ["Haz una valoración crítica", "+35 XP"]].map(([mission, reward]) => <div key={mission} className="flex items-center justify-between rounded-2xl bg-slate-100 p-4"><div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-slate-500" /><span className="font-medium">{mission}</span></div><Badge>{reward}</Badge></div>)}</div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {tab === "comparador" && <motion.section key="comparador" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 md:grid-cols-2">{comparisons.map((item) => <Card key={item.title}><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><Scale className="mr-2 h-6 w-6" />{item.title}</h2><div className="grid gap-4"><div className="rounded-2xl bg-slate-100 p-4"><p className="font-semibold">Autor A</p><p className="mt-1 text-sm text-slate-700">{item.a}</p></div><div className="rounded-2xl bg-indigo-50 p-4"><p className="font-semibold">Autor B</p><p className="mt-1 text-sm text-slate-700">{item.b}</p></div></div></CardContent></Card>)}</motion.section>}

          {tab === "flashcards" && <motion.section key="flashcards" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 lg:grid-cols-[1fr_.7fr]"><Card><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><Layers3 className="mr-2 h-6 w-6" />Flashcards PAU</h2><div className="rounded-3xl bg-gradient-to-br from-indigo-100 to-slate-100 p-8 text-center"><Badge>{flashcards[flashIndex].author}</Badge><h3 className="mt-6 text-2xl font-bold">{showFlashAnswer ? flashcards[flashIndex].back : flashcards[flashIndex].front}</h3></div><div className="mt-5 flex flex-wrap gap-3"><Button onClick={() => setShowFlashAnswer(!showFlashAnswer)} className="bg-slate-900 text-white">{showFlashAnswer ? "Ver pregunta" : "Ver respuesta"}</Button><Button onClick={() => { gainXP(15); nextFlashcard(); }} className="border border-slate-300 bg-white text-slate-800">La sabía (+15 XP)</Button><Button onClick={nextFlashcard} className="border border-slate-300 bg-white text-slate-800">Siguiente</Button></div></CardContent></Card><Card><CardContent className="p-6"><h2 className="mb-4 text-2xl font-bold">Consejo de estudio</h2><p className="text-sm text-slate-700">Usa las flashcards para memorizar conceptos breves. Después aplícalos en comentarios de texto.</p></CardContent></Card></motion.section>}

          {tab === "lecciones" && <motion.section key="lecciones" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 md:grid-cols-2">{lessons.map((lesson, index) => { const completed = completedLessons.includes(lesson.id); return <Card key={lesson.id}><CardContent className="p-6"><div className="mb-3 flex items-center justify-between"><Badge>Unidad {index + 1}</Badge>{completed ? <CheckCircle2 className="h-6 w-6 text-emerald-600" /> : <School className="h-6 w-6 text-slate-400" />}</div><h2 className="text-2xl font-bold">{lesson.title}</h2><p className="mt-1 text-sm font-semibold text-slate-500">{lesson.authors}</p><p className="mt-4 text-sm text-slate-700">{lesson.goal}</p><Button onClick={() => completeLesson(lesson)} disabled={completed} className={`mt-5 ${completed ? "bg-emerald-100 text-emerald-800" : "bg-slate-900 text-white"}`}>{completed ? "Completada" : `Completar (+${lesson.xp} XP)`}</Button></CardContent></Card>; })}</motion.section>}

          {tab === "examen" && <motion.section key="examen" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 lg:grid-cols-[1fr_.7fr]"><Card><CardContent className="p-6"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="flex items-center text-2xl font-bold"><ClipboardCheck className="mr-2 h-7 w-7" />Simulacro PAU</h2><p className="text-sm text-slate-500">Redacta un comentario completo en tiempo limitado.</p></div><Badge><Timer className="mr-1 inline h-3 w-3" />{minutes}:{seconds.toString().padStart(2, "0")}</Badge></div>{!examStarted ? <div className="rounded-2xl bg-slate-100 p-5"><p className="mb-4 text-slate-700">El modo examen genera un texto aleatorio y lo corrige con un sistema automático orientativo.</p><Button onClick={startExam} className="bg-slate-900 text-white">Empezar simulacro</Button></div> : <><div className="mb-5 rounded-2xl bg-slate-100 p-4"><p className="mb-2 text-sm font-semibold text-slate-500">{examText.philosopher} · {examText.work}</p><p className="text-lg font-medium leading-relaxed">“{examText.quote}”</p></div><textarea value={examAnswer} onChange={(e) => setExamAnswer(e.target.value)} disabled={examFinished} placeholder="Redacta aquí tu comentario completo." className="min-h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-slate-900" /><div className="mt-5 flex flex-wrap gap-3"><Button onClick={finishExam} disabled={examFinished} className="bg-slate-900 text-white">Finalizar examen</Button><Button onClick={startExam} className="border border-slate-300 bg-white text-slate-800">Nuevo simulacro</Button></div></>}{examFinished && <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4"><h3 className="mb-2 flex items-center font-bold text-indigo-900"><Award className="mr-2 h-5 w-5" />Resultado del simulacro</h3><p>Nota aproximada: <strong>{examScore}/10</strong></p></div>}</CardContent></Card><Card><CardContent className="p-6"><h2 className="mb-4 text-2xl font-bold">Rúbrica PAU</h2><div className="space-y-3">{[["Presentación del autor y obra", "2 puntos"], ["Tema y tesis", "2 puntos"], ["Explicación filosófica", "3 puntos"], ["Conceptos técnicos", "2 puntos"], ["Valoración crítica", "1 punto"]].map(([item, points]) => <div key={item} className="flex items-center justify-between rounded-2xl bg-slate-100 p-4"><span className="font-medium">{item}</span><Badge>{points}</Badge></div>)}</div></CardContent></Card></motion.section>}

          {tab === "progreso" && <motion.section key="progreso" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="grid gap-5 md:grid-cols-3"><Card className="md:col-span-2"><CardContent className="p-6"><h2 className="mb-4 text-2xl font-bold">Panel del alumno</h2><div className="grid gap-4 md:grid-cols-3"><div className="rounded-3xl bg-slate-100 p-5"><p className="text-sm text-slate-500">XP total</p><p className="text-4xl font-bold">{xp}</p></div><div className="rounded-3xl bg-slate-100 p-5"><p className="text-sm text-slate-500">Nivel</p><p className="text-4xl font-bold">{level}</p></div><div className="rounded-3xl bg-slate-100 p-5"><p className="text-sm text-slate-500">Racha</p><p className="text-4xl font-bold">{streak}</p></div></div><div className="mt-5"><p className="mb-2 font-semibold">Competencias PAU</p>{[["Identificar tema y tesis", 78], ["Usar vocabulario filosófico", 64], ["Contextualizar al autor", 72], ["Comparar autores", 58], ["Valorar críticamente", 46]].map(([label, value]) => <div key={label} className="mb-4"><div className="mb-1 flex justify-between text-sm"><span>{label}</span><span>{value}%</span></div><ProgressBar value={value} /></div>)}</div><Button onClick={resetProgress} className="mt-4 bg-red-500 text-white">Reiniciar progreso</Button></CardContent></Card><div className="space-y-5"><Card><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><History className="mr-2 h-6 w-6" />Historial</h2><div className="space-y-3">{history.length === 0 && <p className="text-sm text-slate-500">Todavía no hay intentos guardados.</p>}{history.map((item) => <div key={item.id} className="rounded-2xl bg-slate-100 p-3 text-sm"><div className="flex justify-between font-semibold"><span>{item.title}</span><span>{item.score}/10</span></div><p className="text-slate-500">{item.author} · {item.date}</p></div>)}</div></CardContent></Card><Card><CardContent className="p-6"><h2 className="mb-4 flex items-center text-2xl font-bold"><Award className="mr-2 h-6 w-6" />Logros</h2><div className="space-y-3">{achievements.map((achievement) => { const Icon = achievement.icon; return <div key={achievement.name} className={`flex items-center justify-between rounded-2xl p-3 ${achievement.unlocked ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-400"}`}><div className="flex items-center gap-3"><Icon className="h-5 w-5" /><span className="font-semibold">{achievement.name}</span></div>{achievement.unlocked ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}</div>; })}</div></CardContent></Card></div></motion.section>}
        </AnimatePresence>
      </div>
    </div>
  );
}
