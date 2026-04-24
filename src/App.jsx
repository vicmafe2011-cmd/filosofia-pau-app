import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Flame,
  Brain,
  CheckCircle2,
  XCircle,
  Star,
  ScrollText,
  Gamepad2,
  Users,
  Sparkles,
  GraduationCap,
  ChevronRight,
  RotateCcw,
  Target,
  Timer,
  Award,
  ClipboardCheck,
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

const philosophers = [
  {
    id: "kant",
    name: "Immanuel Kant",
    current: "Idealismo trascendental",
    pau: "Muy frecuente en PAU",
    color: "from-indigo-100 to-slate-100",
    concepts: ["juicio reflexionante", "belleza", "sensus communis", "finalidad sin fin"],
    works: ["Crítica de la razón pura", "Crítica de la razón práctica", "Crítica de la facultad de juzgar"],
    summary:
      "Kant intenta explicar cómo son posibles el conocimiento, la moral y la experiencia estética. En la Crítica del Juicio, la facultad de juzgar actúa como puente entre naturaleza y libertad.",
  },
  {
    id: "platon",
    name: "Platón",
    current: "Idealismo / dualismo ontológico",
    pau: "Frecuente en PAU",
    color: "from-amber-100 to-orange-50",
    concepts: ["mundo sensible", "mundo inteligible", "Idea de Bien", "reminiscencia"],
    works: ["República", "Fedón", "Fedro"],
    summary:
      "Platón defiende que la realidad verdadera es inteligible y que el conocimiento consiste en elevarse desde lo sensible hacia las Ideas.",
  },
  {
    id: "tomas",
    name: "Tomás de Aquino",
    current: "Escolástica cristiana",
    pau: "Frecuente según comunidad autónoma",
    color: "from-emerald-100 to-lime-50",
    concepts: ["cinco vías", "ley natural", "acto y potencia", "fe y razón"],
    works: ["Suma Teológica", "Suma contra gentiles"],
    summary:
      "Tomás integra el aristotelismo con la teología cristiana, defendiendo la compatibilidad entre razón filosófica y fe revelada.",
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    current: "Vitalismo / crítica de la moral",
    pau: "Muy frecuente en PAU",
    color: "from-rose-100 to-red-50",
    concepts: ["nihilismo", "superhombre", "voluntad de poder", "muerte de Dios"],
    works: ["Así habló Zaratustra", "Genealogía de la moral", "Más allá del bien y del mal"],
    summary:
      "Nietzsche critica la tradición occidental, la moral cristiana y la metafísica, proponiendo una afirmación vital de la existencia.",
  },
];

const texts = [
  {
    id: "kant1",
    philosopher: "Immanuel Kant",
    work: "Crítica de la facultad de juzgar, §1 y §5",
    title: "El juicio de gusto no es conocimiento",
    difficulty: "Media",
    quote:
      "El juicio de gusto no es, pues, un juicio de conocimiento; no es lógico, sino estético. El gusto es la facultad de juzgar un objeto mediante una satisfacción sin ningún interés.",
    theme: "La diferencia entre juicio estético y juicio de conocimiento.",
    thesis:
      "El juicio de gusto no describe objetivamente el objeto, sino que expresa una satisfacción subjetiva y desinteresada.",
    concepts: ["juicio de gusto", "satisfacción desinteresada", "estético", "subjetividad"],
    solution:
      "Kant sostiene que llamar bello a algo no equivale a conocerlo científicamente. El juicio estético no se funda en conceptos, sino en el sentimiento de placer producido por el libre juego de imaginación y entendimiento. Por eso es subjetivo, aunque aspire a ser compartido.",
  },
  {
    id: "kant2",
    philosopher: "Immanuel Kant",
    work: "Crítica de la facultad de juzgar, §6 y §8",
    title: "Universalidad sin concepto",
    difficulty: "Alta",
    quote:
      "Lo bello es lo que place universalmente sin concepto. Quien declara bella una cosa exige la aprobación de todos.",
    theme: "La paradoja de la universalidad estética.",
    thesis:
      "El juicio de gusto pretende validez universal, aunque no pueda demostrarla mediante conceptos objetivos.",
    concepts: ["universalidad subjetiva", "sensus communis", "gusto", "concepto"],
    solution:
      "El juicio estético no es una opinión privada como el simple agrado, porque quien dice que algo es bello espera que otros lo reconozcan. Pero tampoco es una verdad científica demostrable. La solución kantiana es el sensus communis: una comunidad de facultades compartidas por los sujetos racionales.",
  },
  {
    id: "kant3",
    philosopher: "Immanuel Kant",
    work: "Crítica de la facultad de juzgar, §10 y §11",
    title: "Finalidad sin fin",
    difficulty: "Alta",
    quote:
      "La belleza es la forma de la finalidad de un objeto en cuanto es percibida en él sin representación de un fin.",
    theme: "La forma finalista de lo bello.",
    thesis:
      "Lo bello parece organizado como si tuviera un propósito, aunque no podamos asignarle un fin concreto.",
    concepts: ["finalidad sin fin", "forma", "juicio reflexionante", "belleza"],
    solution:
      "Para Kant, lo bello produce la impresión de que sus partes encajan armónicamente, como si respondieran a un plan. Sin embargo, ese plan no es una función práctica ni un concepto científico. Por eso habla de finalidad sin fin.",
  },
];

const quizQuestions = [
  {
    q: "Para Kant, el juicio de gusto es...",
    options: ["un juicio lógico", "un juicio de conocimiento", "un juicio estético", "una demostración científica"],
    answer: 2,
    explanation:
      "El juicio de gusto es estético porque se refiere al sentimiento de placer o displacer, no al conocimiento del objeto.",
  },
  {
    q: "¿Qué significa ‘finalidad sin fin’ en Kant?",
    options: [
      "Que todo arte debe tener utilidad moral",
      "Que algo parece organizado con sentido, pero sin fin concreto",
      "Que la belleza depende de la religión",
      "Que el gusto es completamente privado",
    ],
    answer: 1,
    explanation:
      "Lo bello parece tener una organización finalista, aunque no podamos señalar una función o finalidad determinada.",
  },
  {
    q: "¿Qué concepto permite explicar la universalidad subjetiva del gusto?",
    options: ["imperativo categórico", "sensus communis", "mundo inteligible", "voluntad de poder"],
    answer: 1,
    explanation:
      "El sensus communis aestheticus permite pensar una comunidad de facultades compartidas.",
  },
];

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

export default function App() {
  const [tab, setTab] = useState("comentario");
  const [selectedText, setSelectedText] = useState(texts[0]);

  const [answers, setAnswers] = useState({
    theme: "",
    thesis: "",
    concepts: "",
    explanation: "",
    critique: "",
  });

  const [showSolution, setShowSolution] = useState(false);

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem("xp");
    return saved ? Number(saved) : 260;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? Number(saved) : 4;
  });

  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizDone, setQuizDone] = useState(false);

  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [examTime, setExamTime] = useState(900);
  const [examText, setExamText] = useState(texts[1]);
  const [examAnswer, setExamAnswer] = useState("");

  const level = Math.floor(xp / 150) + 1;
  const progress = xp % 150;
  const currentQuestion = quizQuestions[quizIndex];

  useEffect(() => {
    localStorage.setItem("xp", xp);
  }, [xp]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  useEffect(() => {
    if (!examStarted || examFinished) return;

    const timer = setInterval(() => {
      setExamTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setExamFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, examFinished]);

  const commentScore = useMemo(() => {
    const fields = Object.values(answers);
    const filled = fields.filter((v) => v.trim().length > 25).length;
    return Math.round((filled / fields.length) * 100);
  }, [answers]);

  const examScore = useMemo(() => {
    const words = examAnswer.trim().split(/\s+/).filter(Boolean).length;
    if (words > 300) return 10;
    if (words > 220) return 8;
    if (words > 150) return 6;
    if (words > 80) return 4;
    if (words > 30) return 2;
    return 0;
  }, [examAnswer]);

  const achievements = [
    {
      name: "Primer comentario",
      unlocked: xp >= 300,
      icon: ScrollText,
    },
    {
      name: "Aprendiz kantiano",
      unlocked: xp >= 450,
      icon: Brain,
    },
    {
      name: "Racha filosófica",
      unlocked: streak >= 4,
      icon: Flame,
    },
    {
      name: "Nivel PAU",
      unlocked: level >= 4,
      icon: Trophy,
    },
  ];

  const gainXP = (amount) => {
    setXp((prev) => prev + amount);
  };

  const resetComment = () => {
    setAnswers({
      theme: "",
      thesis: "",
      concepts: "",
      explanation: "",
      critique: "",
    });
    setShowSolution(false);
  };

  const submitQuiz = () => {
    if (selectedOption === null) return;
    setQuizDone(true);

    if (selectedOption === currentQuestion.answer) {
      gainXP(30);
    }
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
  };

  const finishExam = () => {
    setExamFinished(true);
    gainXP(examScore * 10);
  };

  const resetProgress = () => {
    setXp(260);
    setStreak(4);
    localStorage.removeItem("xp");
    localStorage.removeItem("streak");
  };

  const minutes = Math.floor(examTime / 60);
  const seconds = examTime % 60;

  const nav = [
    { id: "comentario", label: "Comentario", icon: ScrollText },
    { id: "filosofos", label: "Filósofos", icon: BookOpen },
    { id: "retos", label: "Retos PAU", icon: Gamepad2 },
    { id: "examen", label: "Modo examen", icon: ClipboardCheck },
    { id: "progreso", label: "Progreso", icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-4 text-slate-900 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 grid gap-4 md:grid-cols-[1.2fr_.8fr]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-indigo-700">
              <GraduationCap className="h-5 w-5" />
              Filosofía PAU · 2.º Bachillerato
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              Aula Filosófica Quest
            </h1>

            <p className="mt-3 max-w-2xl text-base text-slate-600 md:text-lg">
              Aprende filósofos, corrientes y comentario de texto con misiones, puntos,
              niveles, logros y simulacros PAU.
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
                  <Badge>
                    <Flame className="mr-1 inline h-3 w-3" /> {streak} días
                  </Badge>
                  <Badge>
                    <Star className="mr-1 inline h-3 w-3" /> {xp} XP
                  </Badge>
                </div>
              </div>

              <ProgressBar value={(progress / 150) * 100} />

              <p className="mt-2 text-xs text-slate-500">
                {150 - progress} XP para el siguiente nivel
              </p>
            </CardContent>
          </Card>
        </header>

        <nav className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {nav.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`h-14 text-sm shadow-sm ${
                  tab === item.id
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="mr-2 inline h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          {tab === "comentario" && (
            <motion.section
              key="comentario"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]"
            >
              <Card>
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Banco de textos</h2>
                    <Badge>{selectedText.difficulty}</Badge>
                  </div>

                  <div className="space-y-3">
                    {texts.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setSelectedText(t);
                          resetComment();
                        }}
                        className={`w-full rounded-2xl border p-4 text-left transition hover:shadow-md ${
                          selectedText.id === t.id
                            ? "border-slate-900 bg-slate-50"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <p className="font-semibold">{t.title}</p>
                        <p className="text-sm text-slate-500">
                          {t.philosopher} · {t.work}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold">Misión: comentario PAU</h2>
                      <p className="text-sm text-slate-500">
                        Completa los pasos y desbloquea la solución modelo.
                      </p>
                    </div>

                    <Badge>
                      <Target className="mr-1 inline h-3 w-3" />
                      {commentScore}% completado
                    </Badge>
                  </div>

                  <div className="mb-5 rounded-2xl bg-slate-100 p-4">
                    <p className="mb-2 text-sm font-semibold text-slate-500">
                      {selectedText.philosopher} · {selectedText.work}
                    </p>
                    <p className="text-lg font-medium leading-relaxed">
                      “{selectedText.quote}”
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      ["theme", "1. Tema", "¿De qué problema filosófico trata el texto?"],
                      ["thesis", "2. Tesis", "¿Qué defiende el autor?"],
                      ["concepts", "3. Conceptos clave", "Incluye vocabulario técnico."],
                      ["explanation", "4. Explicación", "Relaciona el texto con la teoría del autor."],
                      ["critique", "5. Valoración crítica", "Compara con otro autor o problema actual."],
                    ].map(([key, label, placeholder]) => (
                      <label
                        key={key}
                        className={
                          key === "explanation" || key === "critique"
                            ? "md:col-span-2"
                            : ""
                        }
                      >
                        <span className="mb-1 block text-sm font-semibold">{label}</span>
                        <textarea
                          value={answers[key]}
                          onChange={(e) =>
                            setAnswers({ ...answers, [key]: e.target.value })
                          }
                          placeholder={placeholder}
                          className="min-h-24 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-slate-900"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Button
                      onClick={() => {
                        setShowSolution(true);
                        gainXP(50);
                      }}
                      className="bg-slate-900 text-white"
                    >
                      Corregir y ver modelo
                      <ChevronRight className="ml-2 inline h-4 w-4" />
                    </Button>

                    <Button
                      onClick={resetComment}
                      className="border border-slate-300 bg-white text-slate-800"
                    >
                      <RotateCcw className="mr-2 inline h-4 w-4" />
                      Reiniciar
                    </Button>
                  </div>

                  {showSolution && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                    >
                      <h3 className="mb-2 flex items-center font-bold text-emerald-900">
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Solución modelo
                      </h3>

                      <p>
                        <strong>Tema:</strong> {selectedText.theme}
                      </p>

                      <p className="mt-2">
                        <strong>Tesis:</strong> {selectedText.thesis}
                      </p>

                      <p className="mt-2">
                        <strong>Conceptos:</strong>{" "}
                        {selectedText.concepts.join(", ")}.
                      </p>

                      <p className="mt-2">
                        <strong>Explicación:</strong> {selectedText.solution}
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.section>
          )}

          {tab === "filosofos" && (
            <motion.section
              key="filosofos"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            >
              {philosophers.map((p) => (
                <Card
                  key={p.id}
                  className={`overflow-hidden bg-gradient-to-br ${p.color}`}
                >
                  <CardContent className="p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <Brain className="h-8 w-8" />
                      <Badge>{p.pau}</Badge>
                    </div>

                    <h2 className="text-2xl font-bold">{p.name}</h2>

                    <p className="mt-1 text-sm font-semibold text-slate-600">
                      {p.current}
                    </p>

                    <p className="mt-3 text-sm text-slate-700">{p.summary}</p>

                    <div className="mt-4">
                      <p className="mb-2 text-sm font-bold">Conceptos PAU</p>
                      <div className="flex flex-wrap gap-2">
                        {p.concepts.map((c) => (
                          <Badge key={c}>{c}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-white/60 p-3 text-sm">
                      <strong>Obras:</strong> {p.works.join(" · ")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.section>
          )}

          {tab === "retos" && (
            <motion.section
              key="retos"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-5 lg:grid-cols-[1fr_.8fr]"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Gamepad2 className="h-8 w-8" />
                    <div>
                      <h2 className="text-2xl font-bold">Duelo de conceptos</h2>
                      <p className="text-sm text-slate-500">
                        Responde y gana XP para subir de nivel.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-5">
                    <p className="text-lg font-bold">{currentQuestion.q}</p>

                    <div className="mt-4 grid gap-3">
                      {currentQuestion.options.map((option, idx) => {
                        const isCorrect = idx === currentQuestion.answer;
                        const selected = selectedOption === idx;

                        return (
                          <button
                            key={option}
                            disabled={quizDone}
                            onClick={() => setSelectedOption(idx)}
                            className={`rounded-2xl border p-4 text-left transition ${
                              selected
                                ? "border-slate-900 bg-white shadow-md"
                                : "border-slate-200 bg-white/70"
                            } ${
                              quizDone && isCorrect
                                ? "border-emerald-500 bg-emerald-50"
                                : ""
                            } ${
                              quizDone && selected && !isCorrect
                                ? "border-red-400 bg-red-50"
                                : ""
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <Button onClick={submitQuiz} className="bg-slate-900 text-white">
                      Comprobar
                    </Button>

                    <Button
                      onClick={nextQuiz}
                      className="border border-slate-300 bg-white text-slate-800"
                    >
                      Siguiente reto
                    </Button>
                  </div>

                  {quizDone && (
                    <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                      {selectedOption === currentQuestion.answer ? (
                        <p className="font-bold text-emerald-700">
                          <CheckCircle2 className="mr-2 inline h-5 w-5" />
                          Correcto: +30 XP
                        </p>
                      ) : (
                        <p className="font-bold text-red-700">
                          <XCircle className="mr-2 inline h-5 w-5" />
                          Incorrecto
                        </p>
                      )}

                      <p className="mt-2 text-sm text-slate-600">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 flex items-center text-2xl font-bold">
                    <Sparkles className="mr-2 h-6 w-6" />
                    Misiones rápidas
                  </h2>

                  <div className="space-y-3">
                    {[
                      ["Comenta un texto de Kant", "+50 XP"],
                      ["Relaciona Kant con Hume", "+40 XP"],
                      ["Define 5 conceptos PAU", "+25 XP"],
                      ["Haz una valoración crítica", "+35 XP"],
                    ].map(([mission, reward]) => (
                      <div
                        key={mission}
                        className="flex items-center justify-between rounded-2xl bg-slate-100 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-slate-500" />
                          <span className="font-medium">{mission}</span>
                        </div>

                        <Badge>{reward}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {tab === "examen" && (
            <motion.section
              key="examen"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-5 lg:grid-cols-[1fr_.7fr]"
            >
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="flex items-center text-2xl font-bold">
                        <ClipboardCheck className="mr-2 h-7 w-7" />
                        Simulacro PAU
                      </h2>
                      <p className="text-sm text-slate-500">
                        Redacta un comentario completo en tiempo limitado.
                      </p>
                    </div>

                    <Badge>
                      <Timer className="mr-1 inline h-3 w-3" />
                      {minutes}:{seconds.toString().padStart(2, "0")}
                    </Badge>
                  </div>

                  {!examStarted ? (
                    <div className="rounded-2xl bg-slate-100 p-5">
                      <p className="mb-4 text-slate-700">
                        El modo examen genera un texto aleatorio y te permite practicar
                        como en una prueba real.
                      </p>

                      <Button onClick={startExam} className="bg-slate-900 text-white">
                        Empezar simulacro
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-5 rounded-2xl bg-slate-100 p-4">
                        <p className="mb-2 text-sm font-semibold text-slate-500">
                          {examText.philosopher} · {examText.work}
                        </p>
                        <p className="text-lg font-medium leading-relaxed">
                          “{examText.quote}”
                        </p>
                      </div>

                      <textarea
                        value={examAnswer}
                        onChange={(e) => setExamAnswer(e.target.value)}
                        disabled={examFinished}
                        placeholder="Redacta aquí tu comentario completo: presentación, tema, tesis, explicación, contexto y valoración crítica."
                        className="min-h-80 w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-slate-900"
                      />

                      <div className="mt-5 flex flex-wrap gap-3">
                        <Button
                          onClick={finishExam}
                          disabled={examFinished}
                          className="bg-slate-900 text-white"
                        >
                          Finalizar examen
                        </Button>

                        <Button
                          onClick={startExam}
                          className="border border-slate-300 bg-white text-slate-800"
                        >
                          Nuevo simulacro
                        </Button>
                      </div>
                    </>
                  )}

                  {examFinished && (
                    <div className="mt-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-4">
                      <h3 className="mb-2 flex items-center font-bold text-indigo-900">
                        <Award className="mr-2 h-5 w-5" />
                        Resultado del simulacro
                      </h3>

                      <p>
                        Nota aproximada: <strong>{examScore}/10</strong>
                      </p>

                      <p className="mt-2 text-sm text-slate-700">
                        La puntuación se calcula de forma orientativa por extensión.
                        En una versión avanzada se podría corregir con rúbrica por tema,
                        tesis, conceptos, contexto y valoración crítica.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Rúbrica PAU</h2>

                  <div className="space-y-3">
                    {[
                      ["Presentación del autor y obra", "2 puntos"],
                      ["Tema y tesis", "2 puntos"],
                      ["Explicación filosófica", "3 puntos"],
                      ["Conceptos técnicos", "2 puntos"],
                      ["Valoración crítica", "1 punto"],
                    ].map(([item, points]) => (
                      <div
                        key={item}
                        className="flex items-center justify-between rounded-2xl bg-slate-100 p-4"
                      >
                        <span className="font-medium">{item}</span>
                        <Badge>{points}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {tab === "progreso" && (
            <motion.section
              key="progreso"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="grid gap-5 md:grid-cols-3"
            >
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Panel del alumno</h2>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-3xl bg-slate-100 p-5">
                      <p className="text-sm text-slate-500">XP total</p>
                      <p className="text-4xl font-bold">{xp}</p>
                    </div>

                    <div className="rounded-3xl bg-slate-100 p-5">
                      <p className="text-sm text-slate-500">Nivel</p>
                      <p className="text-4xl font-bold">{level}</p>
                    </div>

                    <div className="rounded-3xl bg-slate-100 p-5">
                      <p className="text-sm text-slate-500">Racha</p>
                      <p className="text-4xl font-bold">{streak}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 font-semibold">Competencias PAU</p>

                    {[
                      ["Identificar tema y tesis", 78],
                      ["Usar vocabulario filosófico", 64],
                      ["Contextualizar al autor", 72],
                      ["Valorar críticamente", 46],
                    ].map(([label, value]) => (
                      <div key={label} className="mb-4">
                        <div className="mb-1 flex justify-between text-sm">
                          <span>{label}</span>
                          <span>{value}%</span>
                        </div>

                        <ProgressBar value={value} />
                      </div>
                    ))}
                  </div>

                  <Button onClick={resetProgress} className="mt-4 bg-red-500 text-white">
                    Reiniciar progreso
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-5">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 flex items-center text-2xl font-bold">
                      <Users className="mr-2 h-6 w-6" />
                      Ranking aula
                    </h2>

                    <div className="space-y-3">
                      {[
                        ["Lucía", 620],
                        ["Marcos", 575],
                        ["Tú", xp],
                        ["Aitana", 240],
                      ]
                        .sort((a, b) => b[1] - a[1])
                        .map(([name, points], idx) => (
                          <div
                            key={name}
                            className={`flex items-center justify-between rounded-2xl p-3 ${
                              name === "Tú" ? "bg-indigo-100" : "bg-slate-100"
                            }`}
                          >
                            <span className="font-semibold">
                              #{idx + 1} {name}
                            </span>

                            <Badge>{points} XP</Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 flex items-center text-2xl font-bold">
                      <Award className="mr-2 h-6 w-6" />
                      Logros
                    </h2>

                    <div className="space-y-3">
                      {achievements.map((achievement) => {
                        const Icon = achievement.icon;

                        return (
                          <div
                            key={achievement.name}
                            className={`flex items-center justify-between rounded-2xl p-3 ${
                              achievement.unlocked
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="h-5 w-5" />
                              <span className="font-semibold">{achievement.name}</span>
                            </div>

                            {achievement.unlocked ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <XCircle className="h-5 w-5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}