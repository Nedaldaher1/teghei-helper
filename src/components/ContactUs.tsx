import React, { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react";

// @ts-expect-error لتمرير الاختلاف في اسم الحزمة
import emailjs from "@emailjs/browser";
import { Toaster, toast } from "react-hot-toast"; // ✅ مكتبة Toasta (react-hot-toast)


// متغيرات البيئة
const PUBLIC_EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY as string;
const PUBLIC_EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID as string;
const PUBLIC_EMAILJS_TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID as string;

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isOther, setIsOther] = useState(false);

  // تهيئة EmailJS
  useEffect(() => {
    if (!PUBLIC_EMAILJS_PUBLIC_KEY || !PUBLIC_EMAILJS_SERVICE_ID || !PUBLIC_EMAILJS_TEMPLATE_ID) {
      console.error("❌ تأكد من ضبط مفاتيح EmailJS في .env (تبدأ بـ PUBLIC_)");
      return;
    }
    emailjs.init(PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsOther(e.target.value === "other");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    if (isOther) {
      const otherInput = formRef.current.querySelector<HTMLInputElement>("#other-subject");
      if (otherInput?.value.trim()) {
        const hidden = document.createElement("input");
        hidden.type = "hidden";
        hidden.name = "subject";
        hidden.value = otherInput.value.trim();
        formRef.current.appendChild(hidden);
      }
    }

    try {
      await emailjs.sendForm(
        PUBLIC_EMAILJS_SERVICE_ID,
        PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
      );
      toast.success("تم إرسال رسالتك بنجاح!", { duration: 4000, position: "top-right" });
      formRef.current.reset();
      setIsOther(false);
    } catch (err) {
      console.error("EmailJS Error", err);
      toast.error("حدث خطأ أثناء الإرسال. حاول مرة أخرى.", { duration: 4000, position: "top-right" });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div dir="rtl" className="bg-gray-100 flex items-center justify-center min-h-screen">
      {/* Toast Container */}
      <Toaster  />

      <div className="container mx-auto p-4 max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">تواصل معنا</h1>
              <p className="text-gray-500 mt-2">نحن هنا للمساعدة. أرسل لنا رسالة وسنعود إليك في أقرب وقت ممكن.</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" id="contactForm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                  <input
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="مثال: محمد الأحمد"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                <select
                  name="subject"
                  id="subject"
                  onChange={handleSubjectChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option>ابلاغ عن خطأ</option>
                  <option>طلب ميزة</option>
                  <option>تحديث المحتوى</option>
                  <option value="other">غير ذلك</option>
                </select>
              </div>

              {isOther && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">الرجاء تحديد الموضوع</label>
                  <input
                    name="other-subject"
                    id="other-subject"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="اكتب موضوع رسالتك هنا"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رسالتك</label>
                <textarea
                  rows={5}
                  name="message"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="كيف يمكننا مساعدتك؟"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition transform hover:-translate-y-1 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSending ? "جارٍ الإرسال…" : "إرسال الرسالة"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
