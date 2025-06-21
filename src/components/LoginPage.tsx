import { useState } from 'react';

// نستخدم 'export default' لتصدير المكون
export default function LoginPage() {
    // نستخدم useState لإدارة حالة المدخلات ورسالة الخطأ
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // دالة للتعامل مع عملية تسجيل الدخول
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // منع إعادة تحميل الصفحة عند الضغط على الزر

        // التحقق من أن الحقول ليست فارغة
        if (!email || !password) {
            setError('الرجاء إدخال البريد الإلكتروني وكلمة المرور.');
            return; // إيقاف تنفيذ الدالة
        }

        // إذا كانت الحقول ممتلئة، قم بإزالة أي خطأ سابق
        setError('');

        // هنا يمكنك إضافة منطق تسجيل الدخول الفعلي
        // (مثلاً، إرسال البيانات إلى السيرفر)
        console.log('بيانات تسجيل الدخول:', { email, password });
        alert(`تم تسجيل الدخول بنجاح!\nالبريد الإلكتروني: ${email}`);
    };

    // كود JSX الذي يمثل واجهة المستخدم
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-slate-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-3xl font-black text-center text-sky-700">تسجيل الدخول</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                            البريد الإلكتروني
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 text-slate-900 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            placeholder="example@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                            كلمة المرور
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 text-slate-900 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            placeholder="********"
                        />
                    </div>

                    {/* إظهار رسالة الخطأ هنا فقط إذا كانت موجودة */}
                    {error && (
                        <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-lg">
                            {error}
                        </p>
                    )}

                    <div>
                        <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
                            تسجيل الدخول
                        </button>
                    </div>
                </form>

                <div className="flex flex-col gap-2 text-center text-sm text-slate-500">
                    <a href="/register" className="font-medium text-sky-600 hover:underline">ليس لديك حساب ؟</a>
                    <a href="#" className="font-medium text-sky-600 hover:underline">هل نسيت كلمة المرور؟</a>
                </div>
            </div>
        </div>
    );
}
