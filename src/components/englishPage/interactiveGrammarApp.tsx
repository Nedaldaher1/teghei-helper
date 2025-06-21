import React, {
  useState,
  useEffect,
  type DragEvent,
  type FC,
} from 'react';

/* -------------------------------------------------------------------------- */
/*                                أنواع البيانات                              */
/* -------------------------------------------------------------------------- */

interface GrammarExample {
  en: string;
  ar: string;
}

type Formation = Record<string, any>;

interface Tip {
  title: string;
  content: string;
}

interface SentenceBuilder {
  words: string[];
  correctSentence: string;
}

interface ErrorSpotter {
  sentence: string[];
  incorrectWord: string;
  correctWord: string;
}

interface GrammarRule {
  id: string;
  title: string;
  videoId?: string;
  videoIds?: string[];
  usage: string;
  formation: Formation;
  examples: GrammarExample[];
  keywords: string[];
  tips: Tip[];
  sentenceBuilders: SentenceBuilder[];
  errorSpotter: ErrorSpotter[];
}

interface InteractiveGrammarAppProps {
  items?: GrammarRule[];
  summaryTitle?: string;
}

/* -------------------------------------------------------------------------- */
/*                    مكوّن معرض فيديوهات YouTube (ارتفاع أكبر)               */
/* -------------------------------------------------------------------------- */
const VideoGallery: FC<{ videoIds: string[]; title: string }> = ({
  videoIds,
  title,
}) => {
  const [current, setCurrent] = useState(0);

  if (!videoIds || videoIds.length === 0) {
    return (
      <div className="flex items-center justify-center bg-gray-100 text-gray-500 h-48 rounded-lg">
        لا يوجد فيديو
      </div>
    );
  }

  return (
    <div>
      <div
        className="w-full rounded-lg overflow-hidden border-2 mb-4"
        style={{ height: '420px' }} // ارتفاع أكبر
      >
        <iframe
          key={videoIds[current]}
          src={`https://www.youtube.com/embed/${videoIds[current]}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {videoIds.map((id, idx) => (
          <button
            key={id}
            onClick={() => setCurrent(idx)}
            className={`flex-shrink-0 rounded-lg overflow-hidden border-4 ${
              current === idx ? 'border-blue-600' : 'border-transparent'
            } hover:border-blue-400 transition-colors`}
            style={{ width: '140px', height: '80px' }}
          >
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={`thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*            دالة عرض التكوين (layout مُدمَج بلا فراغات غير ضرورية)            */
/* -------------------------------------------------------------------------- */
const renderFormation = (data: any): React.ReactNode => {
  if (typeof data === 'string' || typeof data === 'number')
    return <span className="text-blue-800 font-semibold">{data}</span>;

  if (Array.isArray(data)) {
    return (
      <ul className="list-disc list-inside space-y-1 ml-4">
        {data.map((item, i) => (
          <li key={i}>{renderFormation(item)}</li>
        ))}
      </ul>
    );
  }

  if (typeof data === 'object' && data !== null) {
    return (
      <dl className="space-y-3">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="border rounded-md p-3 bg-gray-50">
            <dt className="font-bold text-gray-800 mb-1">{key}</dt>
            <dd className="ml-2">{renderFormation(value)}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return null;
};

/* -------------------------------------------------------------------------- */
/*                        المكوّن الرئيسي للتطبيق                              */
/* -------------------------------------------------------------------------- */
const InteractiveGrammarApp: FC<InteractiveGrammarAppProps> = ({
  items = [],
  summaryTitle = 'قواعد اللغة الإنجليزية التفاعلية',
}) => {
  const grammarRules = items;

  /* ----------------------------- الحالة العامة ---------------------------- */
  const [searchTerm, setSearchTerm] = useState('');
  const [openRuleId, setOpenRuleId] = useState<string | null>(null);
  const [masteredRules, setMasteredRules] = useState<Record<string, boolean>>({});
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<
    Record<string, number>
  >({});
  const [draggedWord, setDraggedWord] = useState<{
    word: string;
    ruleId: string;
    challengeIndex: number;
  } | null>(null);
  const [sentenceBuilderState, setSentenceBuilderState] = useState<
    Record<string, string[]>
  >({});
  const [errorSpotterState, setErrorSpotterState] = useState<
    Record<string, { selected: boolean; shown: boolean }>
  >({});
  const [feedback, setFeedback] = useState<
    Record<string, { type: 'success' | 'error' | 'info'; message: string }>
  >({});
  const [loading, setLoading] = useState(true);

  /* -------------------------- التهيئة من التخزين -------------------------- */
  useEffect(() => {
    const m: Record<string, boolean> = {};
    const b: Record<string, string[]> = {};
    const c: Record<string, number> = {};
    grammarRules.forEach((r) => {
      m[r.id] = localStorage.getItem(`mastery_${r.id}`) === 'true';
      b[r.id] = [];
      c[r.id] = 0;
    });
    setMasteredRules(m);
    setSentenceBuilderState(b);
    setCurrentChallengeIndex(c);
    setLoading(false);
  }, [items]);

  /* ----------------------------- دوال مساعدة ----------------------------- */
  const toggleAccordion = (id: string) =>
    setOpenRuleId((p) => (p === id ? null : id));
  const toggleMastery = (id: string) => {
    const v = !masteredRules[id];
    setMasteredRules((p) => ({ ...p, [id]: v }));
    localStorage.setItem(`mastery_${id}`, v.toString());
  };

  /* ------------------------ Drag & Drop معالجــــات ----------------------- */
  const onDragStart = (
    e: DragEvent,
    word: string,
    ruleId: string,
    idx: number,
  ) => {
    setDraggedWord({ word, ruleId, challengeIndex: idx });
    e.dataTransfer.setData('text/plain', word);
  };
  const onDrop = (e: DragEvent, ruleId: string, idx: number) => {
    e.preventDefault();
    if (
      draggedWord &&
      draggedWord.ruleId === ruleId &&
      draggedWord.challengeIndex === idx
    ) {
      setSentenceBuilderState((p) => ({
        ...p,
        [ruleId]: [...p[ruleId], draggedWord.word],
      }));
    }
  };

  /* -------------------- التحقق من الجملة -------------------- */
  const checkSentence = (ruleId: string) => {
    const i = currentChallengeIndex[ruleId];
    const rule = grammarRules.find((r) => r.id === ruleId);
    if (!rule) return;
    const correct = rule.sentenceBuilders[i].correctSentence;
    const user = sentenceBuilderState[ruleId].join(' ');
    setFeedback((p) => ({
      ...p,
      [ruleId]:
        user === correct
          ? { type: 'success', message: 'إجابة صحيحة! ممتاز.' }
          : { type: 'error', message: 'إجابة خاطئة. حاول مرة أخرى.' },
    }));
  };
  const provideHint = (ruleId: string) => {
    const idx = currentChallengeIndex[ruleId];
    const rule = grammarRules.find((r) => r.id === ruleId);
    if (!rule) return;
    const first = rule.sentenceBuilders[idx].correctSentence.split(' ')[0];
    setSentenceBuilderState((p) => ({ ...p, [ruleId]: [first] }));
  };
  const resetSentence = (ruleId: string) => {
    setSentenceBuilderState((p) => ({ ...p, [ruleId]: [] }));
    setFeedback((p) => {
      const { [ruleId]: _, ...rest } = p;
      return rest;
    });
  };
  const nextChallenge = (ruleId: string) => {
    setCurrentChallengeIndex((p) => ({ ...p, [ruleId]: p[ruleId] + 1 }));
    setSentenceBuilderState((p) => ({ ...p, [ruleId]: [] }));
    setFeedback((p) => {
      const { [ruleId]: _, ...rest } = p;
      return rest;
    });
  };

  /* -------------------- لعبة اكتشاف الخطأ -------------------- */
  const spotError = (ruleId: string, word: string, idx: number) => {
    const rule = grammarRules.find((r) => r.id === ruleId);
    if (!rule) return;
    const item = rule.errorSpotter[idx];
    if (word === item.incorrectWord) {
      setErrorSpotterState((p) => ({
        ...p,
        [`${ruleId}_${idx}`]: { selected: true, shown: false },
      }));
      setFeedback((p) => ({
        ...p,
        [ruleId]: {
          type: 'success',
          message: `صحيح! الكلمة السليمة "${item.correctWord}".`,
        },
      }));
    } else {
      setFeedback((p) => ({
        ...p,
        [ruleId]: { type: 'error', message: 'ليست هذه الكلمة.' },
      }));
    }
  };
  const showError = (ruleId: string, idx: number) => {
    const rule = grammarRules.find((r) => r.id === ruleId);
    if (!rule) return;
    const item = rule.errorSpotter[idx];
    setErrorSpotterState((p) => ({
      ...p,
      [`${ruleId}_${idx}`]: { selected: true, shown: true },
    }));
    setFeedback((p) => ({
      ...p,
      [ruleId]: {
        type: 'info',
        message: `الخاطئة "${item.incorrectWord}" والصحيحة "${item.correctWord}".`,
      },
    }));
  };

  /* --------------------------- البحث والتصفية --------------------------- */
  const filteredRules = grammarRules.filter(
    (r) =>
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.keywords || []).some((kw) =>
        kw.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  /* ------------------------------ التحميل ------------------------------ */
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>جاري التحميل...</p>
      </div>
    );

  /* -------------------------------------------------------------------------- */
  /*                            واجهة المستخدم                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
        body{font-family:'Cairo',sans-serif}
        .accordion-content{max-height:0;overflow:hidden;transition:max-height .6s ease}
        .animated-gradient{background:linear-gradient(-45deg,#1d4ed8,#3b82f6,#2563eb,#1e3a8a);background-size:400% 400%;animation:gradient 15s ease infinite;-webkit-background-clip:text;background-clip:text;color:transparent}
        @keyframes gradient{0%{background-position:0 50%}50%{background-position:100% 50%}100%{background-position:0 50%}}
        .sentence-target{min-height:60px;background:#fff}
      `}</style>

      <div className="container mx-auto max-w-5xl p-6">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold animated-gradient">
            {summaryTitle}
          </h1>
          <p className="text-gray-600 mt-3">
            مرجع تفاعلي لإتقان قواعد اللغة الإنجليزية.
          </p>
        </header>

        {/* Search */}
        <div className="mb-8">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ابحث عن قاعدة..."
            className="w-full p-4 text-lg border-2 border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rules */}
        <div className="space-y-4">
          {filteredRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white border border-gray-200 rounded-xl shadow"
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleAccordion(rule.id)}
                className="cursor-pointer flex justify-between items-center p-5 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={masteredRules[rule.id] || false}
                    onChange={(e) => {
                      e.stopPropagation();
                      toggleMastery(rule.id);
                    }}
                    className="h-5 w-5 text-green-600 border-gray-300 rounded mr-3"
                  />
                  <h2 className="text-xl font-bold text-blue-700">
                    {rule.title}
                  </h2>
                </div>
                <svg
                  className={`w-7 h-7 text-blue-700 transform transition-transform ${
                    openRuleId === rule.id ? 'rotate-45' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v6m3-3H9" />
                </svg>
              </div>

              {/* Accordion Content */}
              <div
                className="accordion-content"
                style={{ maxHeight: openRuleId === rule.id ? '5000px' : 0 }}
              >
                <div className="p-6 border-t">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <section>
                        <h3 className="font-bold text-xl mb-2">الاستخدام:</h3>
                        <div dangerouslySetInnerHTML={{ __html: rule.usage }} />
                      </section>

                      <section>
                        <h3 className="font-bold text-xl mb-2">التكوين:</h3>
                        <div className="space-y-4">
                          {renderFormation(rule.formation)}
                        </div>
                      </section>

                      <section>
                        <h3 className="font-bold text-xl mb-2">
                          الكلمات الدلالية:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {rule.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <section>
                        <h3 className="font-bold text-xl mb-2">
                          فيديوهات توضيحية:
                        </h3>
                        <VideoGallery
                          title={rule.title}
                          videoIds={
                            rule.videoIds && rule.videoIds.length > 0
                              ? rule.videoIds
                              : rule.videoId
                              ? [rule.videoId]
                              : []
                          }
                        />
                      </section>

                      <section>
                        <h3 className="font-bold text-xl mb-2">أمثلة:</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {rule.examples.map((ex, i) => (
                            <li key={i}>
                              <strong>{ex.en}</strong>
                              <br />
                              <span className="text-sm text-gray-600">
                                {ex.ar}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  </div>

                  {/* Interactive Exercises */}
                  <div className="mt-10 space-y-8 border-t pt-6">
                    {/* Tips */}
                    {rule.tips.length > 0 && (
                      <section>
                        <h4 className="text-lg font-bold mb-4">
                          نصائح وإرشادات:
                        </h4>
                        <div className="space-y-3">
                          {rule.tips.map((tip, i) => (
                            <div
                              key={i}
                              className="bg-yellow-50 border-r-4 border-yellow-400 p-4 rounded"
                            >
                              <h5 className="font-bold text-yellow-800">
                                {tip.title}
                              </h5>
                              <p className="text-yellow-700">{tip.content}</p>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Error Spotter */}
                    {rule.errorSpotter.length > 0 && (
                      <section>
                        <h4 className="text-lg font-bold mb-4">
                          لعبة اكتشاف الخطأ:
                        </h4>
                        <p className="font-semibold mb-3">
                          انقر على الكلمة الخاطئة:
                        </p>
                        <div className="p-4 bg-gray-100 rounded">
                          {rule.errorSpotter[0].sentence.map((word, i) => {
                            const state = errorSpotterState[`${rule.id}_0`];
                            const isIncorrect =
                              word === rule.errorSpotter[0].incorrectWord;
                            const selected = isIncorrect && state?.selected;
                            const revealed = isIncorrect && state?.shown;
                            return (
                              <span
                                key={i}
                                onClick={() => spotError(rule.id, word, 0)}
                                className={`cursor-pointer mx-1 p-1 rounded transition-colors ${
                                  selected ? 'bg-red-200' : ''
                                } ${revealed ? 'ring-2 ring-red-500' : ''}`}
                              >
                                {word}
                              </span>
                            );
                          })}
                        </div>
                        <button
                          onClick={() => showError(rule.id, 0)}
                          className="mt-3 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                        >
                          أرني الإجابة
                        </button>
                        {feedback[rule.id] && (
                          <p
                            className={`mt-3 font-bold ${
                              feedback[rule.id].type === 'success'
                                ? 'text-green-600'
                                : feedback[rule.id].type === 'error'
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }`}
                          >
                            {feedback[rule.id].message}
                          </p>
                        )}
                      </section>
                    )}

                    {/* Sentence Builder */}
                    {rule.sentenceBuilders.length > 0 && (
                      <section>
                        <h4 className="text-lg font-bold mb-4">
                          تمرين بناء الجملة:
                        </h4>
                        {/* Drop Zone */}
                        <div
                          className="sentence-target border-2 border-dashed p-3 rounded flex flex-wrap gap-2 mb-4"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) =>
                            onDrop(
                              e,
                              rule.id,
                              currentChallengeIndex[rule.id],
                            )
                          }
                        >
                          {sentenceBuilderState[rule.id].length === 0 ? (
                            <span className="text-gray-400">
                              اسحب الكلمات هنا...
                            </span>
                          ) : (
                            sentenceBuilderState[rule.id].map((w, i) => (
                              <span
                                key={i}
                                draggable
                                onDragStart={(e) =>
                                  onDragStart(
                                    e,
                                    w,
                                    rule.id,
                                    currentChallengeIndex[rule.id],
                                  )
                                }
                                className="bg-white p-2 rounded shadow cursor-grab"
                              >
                                {w}
                              </span>
                            ))
                          )}
                        </div>

                        {/* Word Bank */}
                        <div className="flex flex-wrap gap-2 bg-gray-200 p-3 rounded mb-4">
                          {rule.sentenceBuilders[
                            currentChallengeIndex[rule.id]
                          ].words
                            .filter(
                              (w) =>
                                !sentenceBuilderState[rule.id].includes(w),
                            )
                            .map((w, i) => (
                              <span
                                key={i}
                                draggable
                                onDragStart={(e) =>
                                  onDragStart(
                                    e,
                                    w,
                                    rule.id,
                                    currentChallengeIndex[rule.id],
                                  )
                                }
                                className="bg-white p-2 rounded shadow cursor-grab"
                              >
                                {w}
                              </span>
                            ))}
                        </div>

                        {/* Controls */}
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => checkSentence(rule.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                          >
                            تحقق
                          </button>
                          <button
                            onClick={() => provideHint(rule.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                          >
                            تلميح
                          </button>
                          <button
                            onClick={() => resetSentence(rule.id)}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                          >
                            إعادة
                          </button>
                          {currentChallengeIndex[rule.id] <
                            rule.sentenceBuilders.length - 1 && (
                            <button
                              onClick={() => nextChallenge(rule.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                              التالي
                            </button>
                          )}
                        </div>

                        {feedback[rule.id] && (
                          <p
                            className={`mt-3 font-bold ${
                              feedback[rule.id].type === 'success'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }`}
                          >
                            {feedback[rule.id].message}
                          </p>
                        )}
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveGrammarApp;
