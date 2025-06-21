import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  type FC,
} from 'react';
import Chart from 'chart.js/auto';
import type { Chart as ChartJS } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';

/* ----------------------------- أنواع البيانات ----------------------------- */
interface Item {
  name: string;
  lesson: string;
  details: string;
}
interface Props {
  summaryTitle: string;
  book: string;
  items: Item[];
}

/* --------------------------- وظائف مساعدة للتاريخ -------------------------- */
const parseDateToGregorian = (text: string): number | null => {
  if (!text) return null;
  const hijriMatch = text.match(/(\d+)\s*هـ/i);
  if (hijriMatch?.[1])
    return Math.floor(parseInt(hijriMatch[1], 10) * 0.9702249 + 621.57);
  const bcMatch = text.match(/(\d+)\s*(ق\.?م\.?|bc)/i);
  if (bcMatch?.[1]) return -parseInt(bcMatch[1], 10);
  const gregorianMatch = text.match(/\b(\d{3,4})\b/);
  return gregorianMatch?.[1] ? parseInt(gregorianMatch[1], 10) : null;
};
const formatDecadeLabel = (decade: number): string =>
  decade < 0 ? `عقد ${Math.abs(decade)} ق.م` : `عقد ${decade}`;

/* -------------------------------------------------------------------------- */
const TimelineView: FC<Props> = ({ summaryTitle, book, items }) => {
  /* -------------------------- state management --------------------------- */
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [decadeFilter, setDecadeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [modalItem, setModalItem] = useState<Item | null>(null);

  /* ------------------------------- refs ---------------------------------- */
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  /* ------------------------- حساب قيم العقود ----------------------------- */
  const decades = useMemo(() => {
    const decadeSet = new Set(
      items
        .map((i) => {
          const y = parseDateToGregorian(i.name);
          return y !== null ? Math.floor(y / 10) * 10 : null;
        })
        .filter((d): d is number => d !== null),
    );
    return [...decadeSet].sort((a, b) => b - a);
  }, [items]);

  /* ------------------ تصفية و فرز العناصر المعروضة ----------------------- */
  const filteredAndSortedItems = useMemo(() => {
    return items
      .filter((it) => {
        const y = parseDateToGregorian(it.name);
        const decade = y !== null ? Math.floor(y / 10) * 10 : null;
        const decadeMatch =
          decadeFilter === 'all' || decade?.toString() === decadeFilter;
        const searchMatch =
          !searchTerm ||
          `${it.name} ${it.lesson} ${it.details}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return decadeMatch && searchMatch;
      })
      .sort((a, b) => {
        const yA =
          parseDateToGregorian(a.name) ??
          (sortOrder === 'asc' ? Infinity : -Infinity);
        const yB =
          parseDateToGregorian(b.name) ??
          (sortOrder === 'asc' ? Infinity : -Infinity);
        return sortOrder === 'asc' ? yA - yB : yB - yA;
      });
  }, [items, searchTerm, decadeFilter, sortOrder]);

  /* -------------------------- رسم الرسم البياني -------------------------- */
  useEffect(() => {
    if (!chartRef.current || !items.length) return;

    const counts = items.reduce<Record<number, number>>((acc, it) => {
      const y = parseDateToGregorian(it.name);
      if (y !== null) {
        const d = Math.floor(y / 10) * 10;
        acc[d] = (acc[d] ?? 0) + 1;
      }
      return acc;
    }, {});

    const sorted = Object.keys(counts)
      .map(Number)
      .sort((a, b) => a - b);
    const labels = sorted.map(formatDecadeLabel);
    const data = sorted.map((d) => counts[d]);

    chartInstance.current?.destroy();
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'عدد الأحداث',
            data,
            backgroundColor: 'rgba(14,165,233,.6)',
            borderColor: 'rgba(14,165,233,1)',
            borderWidth: 1,
            borderRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });
  }, [items]);

  /* -------------------- مكون تمييز النص عند البحث ----------------------- */
  const Highlighted: FC<{ text: string; highlight: string }> = ({
    text,
    highlight,
  }) => {
    if (!highlight.trim()) return <>{text}</>;
    const regex = new RegExp(
      `(${highlight.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})`,
      'gi',
    );
    return (
      <>
        {text.split(regex).map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200 px-1 rounded-sm">
              {part}
            </mark>
          ) : (
            <React.Fragment key={i}>{part}</React.Fragment>
          ),
        )}
      </>
    );
  };

  /* ------------------------- عرض التفاصيل داخل مودال -------------------- */
  const DetailsModal: FC<{ item: Item; onClose: () => void }> = ({
    item,
    onClose,
  }) => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.article
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <button
          className="mb-4 ml-auto rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
          onClick={onClose}
        >
          إغلاق
        </button>
        <h3 className="mb-2 text-2xl font-bold text-sky-800">{item.name}</h3>
        <p className="text-sky-700">
          <span className="font-semibold">الدرس/الوحدة:</span> {item.lesson}
        </p>
        <ul className="mt-4 list-disc list-inside space-y-1 text-gray-700">
          {item.details.split('\n').map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </motion.article>
    </motion.div>
  );

  /* ---------------------------------------------------------------------- */
  return (
    <>
      {/* رأس الصفحة */}
      <header className="mt-24 mb-8 text-center md:mt-24 md:mb-12">
        <h1 className="text-4xl font-bold text-sky-800 md:text-5xl">
          {summaryTitle}
        </h1>
        <p className="mt-2 text-lg text-sky-600">{book}</p>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4" dir="rtl">
        {/* الرسم البياني */}
        {items.length > 0 && (
          <section className="my-16 rounded-2xl bg-white p-6 shadow-lg md:p-8">
            <h2 className="mb-6 text-center text-2xl font-bold text-sky-800">
              تحليل بيانات الملخص
            </h2>
            <div className="relative h-96 w-full">
              <canvas ref={chartRef}></canvas>
            </div>
          </section>
        )}

        {/* أدوات التصفية */}
        <section
          id="filter-controls"
          className="mb-8 rounded-2xl bg-white p-6 shadow-lg"
        >
          <h2 className="mb-4 text-center text-xl font-bold text-gray-800">
            استكشف الخط الزمني
          </h2>
          {/* فلتر العقود */}
          <h3 className="mb-2 text-center font-bold text-gray-700">
            تصفية حسب العقد:
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setDecadeFilter('all')}
              className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                decadeFilter === 'all'
                  ? 'bg-sky-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              الكل
            </button>
            {decades.map((d) => (
              <button
                key={d}
                onClick={() => setDecadeFilter(d.toString())}
                className={`rounded-lg px-4 py-2 font-semibold transition-colors ${
                  decadeFilter === d.toString()
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {formatDecadeLabel(d)}
              </button>
            ))}
          </div>

          {/* البحث و الفرز */}
          <div className="mt-6 grid grid-cols-1 items-center gap-4 border-t pt-6 sm:grid-cols-2">
            {/* مربع البحث */}
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </span>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث بالكلمة المفتاحية..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pr-10 pl-4 text-gray-700 focus:border-sky-500 focus:ring-sky-500"
              />
            </div>
            {/* أزرار الفرز */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder('asc')}
                className={`flex-1 rounded-lg px-4 py-3 font-semibold transition-colors ${
                  sortOrder === 'asc'
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                الأقدم &uarr;
              </button>
              <button
                onClick={() => setSortOrder('desc')}
                className={`flex-1 rounded-lg px-4 py-3 font-semibold transition-colors ${
                  sortOrder === 'desc'
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                الأحدث &darr;
              </button>
            </div>
          </div>
        </section>

        {/* البطاقات */}
        <section className="px-4 py-8">
          {filteredAndSortedItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filteredAndSortedItems.map((item, idx) => {
                const lines = item.details.split('\n');
                const isLong = lines.length > 3;
                const previewLines = isLong ? lines.slice(0, 3) : lines;

                return (
                  <article
                    key={idx}
                    className="flex h-full flex-col rounded-xl border-t-4 border-sky-400 bg-white p-6 shadow-lg"
                  >
                    <h3 className="mb-2 text-xl font-bold text-sky-800">
                      <Highlighted text={item.name} highlight={searchTerm} />
                    </h3>

                    <p className="mt-1 text-md text-sky-700">
                      <span className="font-semibold">الدرس/الوحدة:</span>{' '}
                      <Highlighted text={item.lesson} highlight={searchTerm} />
                    </p>

                    <div className="mt-2 text-gray-700">
                      <span className="font-semibold">التفاصيل/التاريخ:</span>
                      <ul className="mt-1 list-disc list-inside space-y-1">
                        {previewLines.map((l, i) => (
                          <li key={i}>
                            <Highlighted text={l} highlight={searchTerm} />
                          </li>
                        ))}
                      </ul>
                      {isLong && (
                        <button
                          onClick={() => setModalItem(item)}
                          className="mt-3 inline-block rounded-lg bg-sky-50 px-3 py-1 text-sm font-semibold text-sky-700 hover:bg-sky-100"
                        >
                          اضغط لقراءة المزيد...
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-md">
              <p className="text-lg font-semibold">
                {searchTerm
                  ? 'لا توجد نتائج مطابقة لبحثك.'
                  : 'لا توجد عناصر لعرضها في هذا الملخص حالياً.'}
              </p>
            </div>
          )}
        </section>
      </main>

      {/* مودال التفاصيل مع حركة فتح/إغلاق */}
      <AnimatePresence mode="wait">
        {modalItem && (
          <DetailsModal
            key="modal"
            item={modalItem}
            onClose={() => setModalItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default TimelineView;
