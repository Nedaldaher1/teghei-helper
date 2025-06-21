import React, { useState } from 'react';

// نستخدم 'export default' لتصدير المكون
export default function SignupPage() {
    // نستخدم useState لإدارة حالة المدخلات ورسالة الخطأ
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // دالة للتعامل مع عملية إنشاء الحساب
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // منع إعادة تحميل الصفحة

        // التحقق من أن جميع الحقول ليست فارغة
        if (!firstName || !lastName || !username || !email || !password) {
            setError('الرجاء تعبئة جميع الحقول المطلوبة.');
            return; // إيقاف تنفيذ الدالة
        }

        // إذا كانت الحقول ممتلئة، قم بإزالة أي خطأ سابق
        setError('');

        // هنا يمكنك إضافة منطق إنشاء الحساب الفعلي
        console.log('بيانات الحساب الجديد:', { firstName, lastName, username, email, password });
        alert(`تم إنشاء الحساب بنجاح!\nمرحباً بك، ${firstName}`);
    };

    // كود JSX الذي يمثل واجهة المستخدم
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-slate-50 py-12">
            <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-lg">
                <h1 className="text-3xl font-black text-center text-sky-700">إنشاء حساب جديد</h1>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 mb-2">الاسم الأول</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full px-4 py-2 text-slate-900 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                placeholder="مثال: أحمد"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 mb-2">الاسم الأخير</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full px-4 py-2 text-slate-900 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                                placeholder="مثال: العلي"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-bold text-slate-700 mb-2">اسم المستخدم</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 text-slate-900 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            placeholder="مثال: ahmadali123"
                        />
                    </div>
                    <div>
                        <label htmlFor="signup-email" className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                        <input
                            type="email"
                            id="signup-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 text-slate-900 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            placeholder="example@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="signup-password" className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
                        <input
                            type="password"
                            id="signup-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 text-slate-900 bg-slate-100 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                            placeholder="********"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-lg">
                            {error}
                        </p>
                    )}

                    <div>
                        <button type="submit" className="w-full px-4 py-3 font-bold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
                            إنشاء الحساب
                        </button>
                    </div>
                </form>

                 <div className="text-center text-sm text-slate-500">
                    <span>لديك حساب بالفعل؟ </span>
                    <a href="/login" className="font-medium text-sky-600 hover:underline">سجّل الدخول</a>
                </div>
            </div>
        </div>
    );
}
