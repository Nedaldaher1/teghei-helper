import React, { useState, useEffect } from 'react';
// تمت إضافة أيقونات جديدة لاستخدامها في واجهة الاختيار
import { FaBook, FaCrown, FaStar, FaLightbulb, FaCheckCircle, FaQuoteLeft, FaQuoteRight, FaPlay, FaMagic, FaStepForward, FaArrowRight, FaArrowLeft, FaListAlt, FaArrowCircleLeft } from 'react-icons/fa';

// --- INTERFACES ---
// لا تغيير هنا، جميع الواجهات تبقى كما هي
interface DefinitionExamplePart {
  text: string;
  class?: string;
}

interface DefinitionExample {
  title?: string;
  sentence?: DefinitionExamplePart[];
  breakdown?: { subject?: string; predicate?: string };
}

interface DefinitionItem {
  term: string;
  description: string;
}

interface Definition {
  title?: string;
  items?: DefinitionItem[];
  example?: DefinitionExample;
}

interface SectionItem {
  title?: string;
  description?: string;
  examples?: string[];
  exampleWrapperClass?: string;
  exampleClass?: string;
  titleClass?: string;
  cardClass?: string;
}

interface Section {
  id?: string;
  title?: string;
  points?: string[];
  gridClass?: string;
  items?: SectionItem[];
}

interface AdvancedNote {
  type?: string;
  iconClass?: string;
  title?: string;
  content?: string;
  containerClass?: string;
}

interface VideoItem {
  videoId?: string;
}

interface Videos {
  title?: string;
  mainVideoId?: string;
  playlist?: VideoItem[];
}

interface IrabSolutionPart {
  text: string;
  class?: string;
}

interface IrabExercise {
  sentence: string;
  solutionParts: IrabSolutionPart[];
}

interface Rule {
  ruleId: string;
  title: string;
  intro: string;
  points?: string[];
  definition?: Definition;
  sections?: Section[];
  advancedNotes?: AdvancedNote[];
  videos?: Videos;
  irabExercises?: IrabExercise[];
}

interface SubjectData {
  subjectData: Rule[];
}

interface AppProps {
  title: string;
  data?: SubjectData;
}


// --- REUSABLE SUB-COMPONENTS ---
// لا تغيير في هذه المكونات الفرعية
const DefinitionSection: React.FC<{ definition: Definition }> = ({ definition }) => (
  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg mb-10 border-l-4 border-blue-500">
    {definition.title && (
      <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
        <FaBook className="mr-2 text-blue-500" />
        {definition.title}
      </h2>
    )}
    
    {definition.items && (
      <div className="space-y-4">
        {definition.items.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold mb-2">
              {item.term}
            </span>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    )}
    
    {definition.example && (
      <div className="mt-6 bg-gradient-to-r from-blue-100 to-indigo-100 border-r-4 border-blue-500 p-5 rounded-xl">
        {definition.example.title && (
          <p className="font-semibold text-blue-700 mb-3 flex items-center">
            <FaLightbulb className="mr-2 text-yellow-500" />
            {definition.example.title}
          </p>
        )}
        
        {definition.example.sentence && (
          <div className="bg-white p-4 rounded-lg mb-3 shadow-sm">
            <p className="text-xl text-gray-800 leading-relaxed text-center">
              {definition.example.sentence.map((part, idx) => (
                <span key={idx} className={part.class || ''}>
                 {''} {part.text}
                </span>
              ))}
            </p>
          </div>
        )}
        
        {definition.example.breakdown && (
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex flex-wrap gap-4 justify-center">
              {definition.example.breakdown.subject && (
                <div className="bg-green-50 p-2 px-4 rounded-full">
                  <span className="text-sm font-bold text-green-600">المبتدأ:</span>
                  <span className="text-sm text-gray-700"> {definition.example.breakdown.subject}</span>
                </div>
              )}
              {definition.example.breakdown.predicate && (
                <div className="bg-purple-50 p-2 px-4 rounded-full">
                  <span className="text-sm font-bold text-purple-600">الخبر:</span>
                  <span className="text-sm text-gray-700"> {definition.example.breakdown.predicate}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);

const SectionsBlock: React.FC<{ sections: Section[] }> = ({ sections }) => (
  <>
    {sections.map((sec, idx) => (
      <section key={sec.id || idx} className="mb-12">
        {sec.title && (
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 flex items-center justify-center">
            <FaStar className="text-yellow-500 mr-2" />
            {sec.title}
            <FaStar className="text-yellow-500 ml-2" />
          </h2>
        )}
        
        {sec.points && (
          <ul className="mb-8 bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl shadow-sm">
            {sec.points.map((pt, i) => (
              <li key={i} className="flex items-start mb-3 last:mb-0">
                <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{pt}</span>
              </li>
            ))}
          </ul>
        )}
        
        {sec.items && (
          <div className={sec.gridClass || 'grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'}>
            {sec.items.map((item, j) => (
              <div 
                key={j} 
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-blue-400"
              >
                {item.title && (
                  <h3 className="font-bold text-xl mb-3 text-blue-700 flex items-center">
                    <FaBook className="text-blue-400 mr-2" />
                    {item.title}
                  </h3>
                )}
                
                {item.description && (
                  <p className="text-gray-600 mb-4 bg-blue-50 p-3 rounded-lg">
                    {item.description}
                  </p>
                )}
                
                {item.examples && (
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    {item.examples.map((ex, k) => (
                      <p key={k} className="font-mono text-gray-700 italic text-center">
                        <FaQuoteLeft className="text-gray-400 ml-2 inline" />
                        {ex}
                        <FaQuoteRight className="text-gray-400 ml-2 inline" />
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    ))}
  </>
);

const AdvancedNotesBlock: React.FC<{ notes: AdvancedNote[] }> = ({ notes }) => (
  <section className="mt-16">
    <div className="space-y-5">
      {notes.map((note, idx) => (
        <div key={idx} className="bg-gradient-to-r from-blue-100 to-indigo-100 border-r-4 border-blue-500 text-blue-800 p-5 rounded-xl flex items-start">
          <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
            <FaLightbulb className="text-xl" />
          </div>
          <div>
            {note.title && <h3 className="font-bold mb-2 text-lg">{note.title}</h3>}
            <p className="text-sm">{note.content}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const VideosBlock: React.FC<{ 
  videos: Videos; 
  currentVideoId: string; 
  onSelect: (videoId?: string) => void; 
}> = ({ videos, currentVideoId, onSelect }) => (
  <section className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg">
    {videos.title && <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">{videos.title}</h2>}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
      <div className="aspect-w-16 aspect-h-9 mb-4 rounded-lg overflow-hidden bg-gradient-to-r from-blue-200 to-purple-200">
        {currentVideoId ? (
          <iframe 
            src={`https://www.youtube.com/embed/${currentVideoId}`} 
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube Video"
            className="w-full h-full rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
            <p>اختر مقطعًا من القائمة</p>
          </div>
        )}
      </div>
      {videos.playlist && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
          {videos.playlist.map((vid, idx) => (
            <div 
              key={idx} 
              className={`video-thumb cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                vid.videoId === currentVideoId ? 'ring-4 ring-blue-500 scale-105' : 'ring-1 ring-gray-200'
              }`}
              onClick={() => onSelect(vid.videoId)}
            >
              <div className="relative">
              <img src={`https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`} alt={`Video thumbnail ${idx + 1}`}/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black bg-opacity-50 rounded-full p-2">
                    <FaPlay className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-2 bg-white">
                <p className="text-xs font-medium truncate">مقطع تعليمي {idx + 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);

const IrabExercisesBlock: React.FC<{ 
  irabExercises: IrabExercise[]; 
  revealIndices: number[]; 
  onShowStep: (exerciseIndex: number) => void; 
  onShowFull: (exerciseIndex: number) => void; 
  currentExercise: number;
  onNextExercise: () => void;
  onPrevExercise: () => void;
}> = ({ 
  irabExercises, 
  revealIndices, 
  onShowStep, 
  onShowFull, 
  currentExercise,
  onNextExercise,
  onPrevExercise
}) => {
  const ex = irabExercises[currentExercise];
  const revealIndex = revealIndices[currentExercise] || 0;
  const totalParts = ex.solutionParts.length;
  const isCompleted = revealIndex >= totalParts;
  
  return (
    <section className="mt-16 bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          تدريبات إعرابية تفاعلية
        </h2>
        <div className="bg-blue-500 text-white px-4 py-1 rounded-full">
          السؤال {currentExercise + 1} من {irabExercises.length}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <p className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {ex.sentence}
        </p>
        
        <div className="irab-solution mt-4 pt-4 border-t border-gray-200 text-lg">
          {ex.solutionParts.map((part, pidx) => (
            <div 
              key={pidx} 
              className={`mb-3 transition-all duration-500 ${
                pidx < revealIndex 
                  ? 'text-gray-700' 
                  : 'text-transparent bg-gray-100 bg-clip-text'
              }`}
            >
              <div className="flex items-start">
                <span className={`block ${pidx < revealIndex ? '' : 'glass-effect'}`}>
                  {part.text}
                </span>
              </div>
              
              {pidx < revealIndex && part.class && (
                <div className="bg-green-50 p-3 rounded-lg mt-2 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-green-700 font-bold">الإعراب:</span>
                  <span className="text-gray-700 mr-2"> {part.class}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-3 mt-8 justify-between">
          <div className="flex gap-3">
            <button 
              className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                isCompleted 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              onClick={() => onShowStep(currentExercise)}
              disabled={isCompleted}
            >
              <FaStepForward className="ml-2" />
              {isCompleted ? 'اكتمل الحل' : 'الخطوة التالية'}
            </button>
            
            <button 
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center transition-all"
              onClick={() => onShowFull(currentExercise)}
            >
              <FaMagic className="ml-2" />
              إظهار الكامل
            </button>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onPrevExercise}
              disabled={currentExercise === 0}
              className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                currentExercise === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              <FaArrowRight className="ml-2" />
              السابق
            </button>
            
            <button 
              onClick={onNextExercise}
              disabled={currentExercise === irabExercises.length - 1}
              className={`px-4 py-2 rounded-lg flex items-center transition-all ${
                currentExercise === irabExercises.length - 1 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              التالي
              <FaArrowLeft className="mr-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- [تعديل] MAIN PAGE COMPONENT (يعرض قاعدة واحدة) ---
// تم إضافة onReturn كخاصية (prop) للتعامل مع زر العودة
const GrammarRulePage: React.FC<{ rule: Rule; onReturn: () => void }> = ({ rule, onReturn }) => {
  // إعادة تعيين الحالات عند تغيير القاعدة المعروضة
  const [currentVideoId, setCurrentVideoId] = useState('');
  const [revealIndices, setRevealIndices] = useState<number[]>([]);
  const [currentExercise, setCurrentExercise] = useState(0);

  useEffect(() => {
    setCurrentVideoId(rule.videos?.mainVideoId || '');
    setRevealIndices(rule.irabExercises?.map(() => 0) || []);
    setCurrentExercise(0);
  }, [rule]); // هذا الـ effect يعمل كلما تغيرت القاعدة `rule`

  const handleVideoSelect = (videoId?: string) => setCurrentVideoId(videoId || '');
  
  const handleShowStep = (exIdx: number) => {
    setRevealIndices(prev => {
      const updated = [...prev];
      if (rule.irabExercises) {
        const total = rule.irabExercises[exIdx].solutionParts.length;
        if (updated[exIdx] < total) updated[exIdx] += 1;
      }
      return updated;
    });
  };
  
  const handleShowFull = (exIdx: number) => {
    setRevealIndices(prev => {
      const updated = [...prev];
      if (rule.irabExercises) {
        updated[exIdx] = rule.irabExercises[exIdx].solutionParts.length;
      }
      return updated;
    });
  };

  const handleNextExercise = () => {
    if (currentExercise < (rule.irabExercises?.length || 0) - 1) {
      setCurrentExercise(prev => prev + 1);
    }
  };

  const handlePrevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
    }
  };

  return (
    <main className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          <FaCrown className="inline-block text-yellow-500 mr-3" />
          {rule.title}
        </h1>
        
        <div className="bg-white p-6 rounded-xl shadow-sm max-w-3xl mx-auto mb-6">
          <p className="text-lg text-gray-600 leading-relaxed">{rule.intro}</p>
        </div>
        
        {rule.points && (
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rule.points.map((pt, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-start hover:shadow-md transition-shadow">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-gray-700">{pt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {rule.definition && <DefinitionSection definition={rule.definition} />}
      {rule.sections && <SectionsBlock sections={rule.sections} />}
      {rule.advancedNotes && <AdvancedNotesBlock notes={rule.advancedNotes} />}
      {rule.videos && <VideosBlock videos={rule.videos} currentVideoId={currentVideoId} onSelect={handleVideoSelect} />}
      
      {rule.irabExercises && rule.irabExercises.length > 0 && (
        <IrabExercisesBlock 
          irabExercises={rule.irabExercises} 
          revealIndices={revealIndices} 
          onShowStep={handleShowStep} 
          onShowFull={handleShowFull}
          currentExercise={currentExercise}
          onNextExercise={handleNextExercise}
          onPrevExercise={handlePrevExercise}
        />
      )}

      <div className="text-center mt-16">
        {/* زر العودة الآن يستدعي دالة onReturn */}
        <button 
          onClick={onReturn}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center mx-auto"
        >
          <FaListAlt className="ml-2" />
          العودة إلى القائمة الرئيسية
        </button>
      </div>
    </main>
  );
};

// --- [جديد] مكون واجهة اختيار القواعد ---
// هذا المكون الجديد يعرض قائمة بجميع القواعد المتاحة للاختيار
const RuleSelection: React.FC<{ rules: Rule[]; onSelectRule: (ruleId: string) => void; title: string; }> = ({ rules, onSelectRule, title }) => (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600">اختر القاعدة التي تود تعلمها من القائمة أدناه.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rules.map(rule => (
                <button
                    key={rule.ruleId}
                    onClick={() => onSelectRule(rule.ruleId)}
                    className="text-right bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                >
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 flex items-center justify-between">
                        {rule.title}
                        <FaArrowCircleLeft className="text-indigo-400" />
                    </h2>
                    <p className="text-gray-600 line-clamp-3">{rule.intro}</p>
                </button>
            ))}
        </div>
    </main>
);

// --- [تعديل] App Entry Point (نقطة بداية التطبيق) ---
export default function App({ title = "قواعد اللغة العربية", data }: AppProps) {
  // state لتخزين ID القاعدة المختارة. `null` يعني لم يتم اختيار شيء بعد.
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);

  if (!data || !data.subjectData || data.subjectData.length === 0) {
    return (
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">لا توجد بيانات لعرضها</h2>
          <p className="text-gray-600">يرجى التأكد من تحميل البيانات الصحيحة.</p>
        </div>
      </div>
    );
  }
  
  // دالة لتحديث الحالة عند اختيار قاعدة
  const handleSelectRule = (ruleId: string) => {
    setSelectedRuleId(ruleId);
  };

  // دالة للعودة إلى قائمة الاختيار
  const handleReturnToList = () => {
    setSelectedRuleId(null);
  };

  // البحث عن بيانات القاعدة المختارة بناءً على ID
  const selectedRule = selectedRuleId 
    ? data.subjectData.find(rule => rule.ruleId === selectedRuleId)
    : null;

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <style >{`
        /* لا تغييرات هنا، ولكن يمكنك إضافة أنماط جديدة إذا أردت */
        .video-thumb {
          transition: all 0.3s ease;
        }
        
        .video-thumb:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .aspect-w-16 {
          position: relative;
          padding-bottom: 56.25%;
        }
        
        .aspect-h-9 {
          height: 0;
        }
        
        .aspect-w-16 > *, .aspect-h-9 > * {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glass-effect {
          background: linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3));
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.2);
          color: transparent;
          text-shadow: 0 2px 4px rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 8px;
        }

        .line-clamp-3 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
        }
      `}</style>

      {/* العرض الشرطي: 
          - إذا كانت هناك قاعدة مختارة (selectedRule)، اعرض صفحتها.
          - وإلا، اعرض قائمة الاختيار (RuleSelection).
      */}
      {selectedRule ? (
        <GrammarRulePage rule={selectedRule} onReturn={handleReturnToList} />
      ) : (
        <RuleSelection rules={data.subjectData} onSelectRule={handleSelectRule} title={title} />
      )}
    </div>
  );
}