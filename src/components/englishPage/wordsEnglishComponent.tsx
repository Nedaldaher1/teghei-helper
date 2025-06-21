import React, { useState, useEffect, useCallback } from 'react';

interface VocabularyItem {
  id: number | string;
  word: string;
  translation: string;
  example: string;
  imageUrl: string;
  category?: string;
}

interface VocabularyCardsAppProps {
  subjectData: any[];
  appTitle?: string;
  dataMapper?: (item: any) => VocabularyItem;
}

const VocabularyCardsApp: React.FC<VocabularyCardsAppProps> = ({
  subjectData = [],
  appTitle = "مفرداتي",
  dataMapper
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const mappedData = React.useMemo(() => {
    if (!subjectData || subjectData.length === 0) return [];
    
    if (dataMapper) {
      return subjectData.map(dataMapper);
    }
    
    return subjectData.map((item, index) => ({
      id: item.id || index,
      word: item.word || item.title || item.term,
      translation: item.translation || item.meaning || "",
      example: item.example || item.description || item.definition,
      imageUrl: item.imageUrl || item.image,
      category: item.category || item.type || "عام"
    }));
  }, [subjectData, dataMapper]);

  const categories = React.useMemo(() => {
    const cats = new Set(mappedData.map(item => item.category || "عام"));
    return ['الكل', ...cats];
  }, [mappedData]);

  const filteredData = mappedData.filter(item => {
    const matchesSearch = (item.word && item.word.toLowerCase().includes(searchTerm.toLowerCase())) || 
                          (item.example && item.example.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (item.translation && item.translation.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'الكل' || 
                           (item.category === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const handleFlip = useCallback((id: string | number) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  return (
    <div 
      className="min-h-screen bg-sky-50 text-slate-800"
      dir="rtl"
      lang="ar"
      style={{ fontFamily: "'Cairo', sans-serif" }}
    >
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap');
          
          .perspective {
            perspective: 1000px;
          }
          
          .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }
          
          .is-flipped .card-inner {
            transform: rotateY(180deg);
          }
          
          .card-front,
          .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 0.75rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            box-sizing: border-box;
          }
          
          .card-back {
            transform: rotateY(180deg);
          }
        `}
      </style>


      <section className="container mx-auto px-6 mt-8">
        <div className="bg-white p-5 rounded-xl border border-sky-200/80 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                    selectedCategory === category
                      ? 'text-white bg-sky-600 hover:bg-sky-700'
                      : 'text-sky-700 bg-sky-100 hover:bg-sky-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-auto">
              <input
                type="search"
                placeholder="ابحث عن كلمة أو معنى..."
                className="w-full md:w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-10">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-sky-700">لا توجد نتائج تطابق بحثك</p>
            <button 
              className="mt-4 px-5 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('الكل');
              }}
            >
              إعادة تعيين الفلتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredData.map((item) => (
              <div 
                key={item.id}
                className={`w-full h-60 perspective cursor-pointer group ${flippedCards[item.id] ? 'is-flipped' : ''}`}
                onClick={() => handleFlip(item.id)}
                role="button"
                aria-label={`بطاقة كلمة ${item.word}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleFlip(item.id)}
              >
                <div className="card-inner h-full w-full">
                  {/* الوجه الأمامي */}
                  <div className="card-front bg-white border border-sky-200/80 shadow-lg rounded-xl flex flex-col justify-center items-center p-4 group-hover:shadow-sky-200 transition-shadow">
                    <h3 
                      className="text-2xl font-bold text-sky-800 text-center" 
                      lang="en"
                      dir="ltr"
                    >
                      {item.word}
                    </h3>
                    
                    {item.translation && (
                      <p className="text-xl text-sky-600 mt-2 text-center">
                        {item.translation}
                      </p>
                    )}
                    
                    <div className="mt-4 text-center">
                      <p className="text-base text-gray-500">
                        {item.category}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        اضغط لترى الجملة التوضيحية
                      </p>
                    </div>
                  </div>
                  
                  {/* الوجه الخلفي */}
                  <div className="card-back bg-gradient-to-br from-sky-700 to-sky-900 text-white rounded-xl flex flex-col justify-center items-center p-4 text-center shadow-lg">
                    <img 
                      src={item.imageUrl} 
                      alt={`صورة توضيحية لكلمة ${item.word}`}
                      className="mb-3 rounded-full h-16 w-16 object-cover border-4 border-sky-500 mx-auto"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/80x80/ffffff/38bdf8?text=📚';
                      }}
                    />
                    
                    <h3 className="text-lg font-bold text-sky-200 mb-1">
                      {item.word}
                    </h3>
                    
                    {item.translation && (
                      <p className="text-lg text-sky-100 mb-2">
                        {item.translation}
                      </p>
                    )}
                    
                    <p 
                      className="text-base font-medium mt-2 italic" 
                      lang="en"
                      dir="ltr"
                    >
                      "{item.example}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default VocabularyCardsApp;