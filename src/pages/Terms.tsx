import { useState, useEffect } from "react";
import { 
  FileText, Info, Sparkles, CalendarDays, Landmark, 
  UserCheck, Shield, CheckCircle, Server, RefreshCw, 
  AlertTriangle, MessageSquare, AlertCircle, 
  ArrowUpRight
} from "lucide-react";

// ==========================================
// CUSTOM ANIMATED SVG KAMPA LOADER
// ==========================================
function KampaLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Glowing background aura */}
        <div className="absolute inset-0 bg-[#B82126]/15 rounded-full blur-2xl animate-pulse"></div>

        {/* Interactive Animated SVG Kampa Logo using Exact Path Data */}
        <svg 
          viewBox="0 0 424 500" 
          className="w-16 h-20 relative z-10 drop-shadow-lg" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Part 1: Left Vertical Stem */}
          <path 
            d="M 192 250 L 192 67 C 192 51 180 39 163 39 L 53 39 C 37 39 24 50 24 66 L 24 448 C 24 457 29 464 37 466 C 44 468 50 464 55 457 L 192 250 Z" 
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: '1.2s' }}
          />
          {/* Part 2: Top Right Wing */}
          <path 
            d="M 192 250 L 353 51 C 361 41 369 38 377 39 C 390 41 400 52 400 66 L 400 212 C 400 234 384 250 362 250 L 192 250 Z"
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: '0.9s', animationDelay: '0.3s' }}
          />
          {/* Part 3: Bottom Right Wing */}
          <path 
            d="M 192 250 L 392 402 C 401 409 404 418 402 429 C 400 449 388 465 369 465 L 223 465 C 205 465 192 452 192 435 L 192 250 Z"
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: '1.5s', animationDelay: '0.6s' }}
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-black uppercase tracking-widest text-black animate-pulse">{text}</p>
      </div>
    </div>
  );
}

// The newly updated Terms & Conditions content
const termsData = [
  {
    icon: <Info size={20} />,
    title: "1. About Kampa",
    content: "Kampa helps users discover information such as events, activities, announcements, workshops, seminars, important dates, and other educational updates from available university or college sources. Kampa is designed to assist users and does not replace official university or college communication."
  },
  {
    icon: <Sparkles size={20} />,
    title: "2. AI-Assisted Information",
    content: "Some information provided through Kampa may be processed, summarized, or generated with the assistance of artificial intelligence. While we aim to provide accurate and useful information, AI-assisted content may occasionally contain errors, omissions, or outdated information. Users should verify important information through official university or college communications."
  },
  {
    icon: <CalendarDays size={20} />,
    title: "3. Events and Announcements",
    content: "Event details such as dates, times, venues, organizers, registration information, and other details may change. Kampa may not immediately reflect every update or change. For the latest and most reliable information, users should refer to the relevant official announcement or contact the respective university or college department."
  },
  {
    icon: <Landmark size={20} />,
    title: "4. Official Information",
    content: "Where information displayed on Kampa differs from an official university or college communication, the official communication takes precedence. For important matters such as examinations, deadlines, registrations, fees, admissions, academic requirements, or other official decisions, users should always rely on authorized university or college sources."
  },
  {
    icon: <UserCheck size={20} />,
    title: "5. User Responsibility",
    content: "Users are responsible for verifying information before making decisions based on it. Kampa should be used as an informational assistance tool and not as the sole source for decisions that may have academic, administrative, financial, or other significant consequences."
  },
  {
    icon: <Shield size={20} />,
    title: "6. Privacy",
    content: "Kampa may process information required to provide its services and features. The collection and handling of personal information is governed by our Privacy Policy. Users should avoid submitting unnecessary confidential or sensitive information through the Service."
  },
  {
    icon: <CheckCircle size={20} />,
    title: "7. Acceptable Use",
    content: "Users must use Kampa responsibly and lawfully. Users must not attempt to gain unauthorized access, interfere with the Service, misuse information, or use Kampa in a way that violates applicable laws or university or college policies."
  },
  {
    icon: <Server size={20} />,
    title: "8. Service Availability",
    content: "Kampa may occasionally be unavailable due to maintenance, technical issues, updates, or circumstances beyond reasonable control. We do not guarantee uninterrupted or error-free availability of the Service."
  },
  {
    icon: <RefreshCw size={20} />,
    title: "9. Changes to the Service and Terms",
    content: "Kampa may update its features, content, and these Terms from time to time. Any changes will be reflected on this page along with the updated date."
  },
  {
    icon: <AlertTriangle size={20} />,
    title: "10. Disclaimer",
    content: "Kampa is provided as an informational assistance service. Although reasonable efforts are made to provide reliable information, Kampa does not guarantee that all information will always be accurate, complete, or current. Users should always verify important information through official university or college sources."
  },
  {
    icon: <MessageSquare size={20} />,
    title: "11. Contact",
    content: "For questions regarding an event, announcement, academic matter, or other university or college information, users should contact the relevant department or authorized representative. For technical concerns regarding Kampa, users may contact the support team through the available support channel."
  }
];

export function Terms() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] w-full max-w-[900px] mx-auto px-4">
        <KampaLoader text="Loading Terms & Conditions..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-16 w-full max-w-[900px] mx-auto px-4 sm:px-6 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col items-center text-center mt-6 mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#B82126]/10 text-[#B82126] mb-6 shadow-sm">
          <FileText size={32} strokeWidth={2} />
        </div>
        <p className="text-sm font-bold text-[#B82126] mb-2 uppercase tracking-widest">
          Legal Documentation
        </p>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#000000] mb-4">
          Terms & Conditions
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-xl leading-relaxed font-medium">
          Welcome to Kampa, an AI-powered information assistant designed to help students discover and understand university and college-related information.
        </p>
      </div>

      {/* MAIN CONTENT DOCUMENT */}
      <div className="bg-[#FFFFFF] rounded-[32px] p-6 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#000000] to-[#B82126]"></div>

        <p className="text-base text-[#000000] font-bold text-center mb-10 pb-8 border-b border-gray-100">
          By accessing or using Kampa, you agree to the following Terms & Conditions.
        </p>

        {/* Mapped Terms Sections */}
        <div className="flex flex-col gap-10">
          {termsData.map((term, index) => (
            <section key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 group">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-[#B82126] border border-gray-100 transition-colors group-hover:bg-[#B82126]/5 group-hover:border-[#B82126]/20">
                {term.icon}
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-extrabold text-[#000000] tracking-tight mb-2">
                  {term.title}
                </h2>
                <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                  {term.content}
                </p>
              </div>
            </section>
          ))}
        </div>

      </div>

      {/* SUPPORT CALLOUT */}
      <div
        className="
          mt-4 flex flex-col gap-5
          rounded-[24px]
          border border-emerald-200/80
          bg-emerald-50/70
          p-6 sm:p-8
          shadow-sm
          sm:flex-row sm:items-start
        "
      >
        {/* Icon */}
        <div
          className="
            flex h-12 w-12 shrink-0
            items-center justify-center
            rounded-full
            bg-emerald-600
            text-white
            shadow-md shadow-emerald-600/20
          "
        >
          <AlertCircle size={23} strokeWidth={2.5} />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2">
          <h3
            className="
              text-lg
              font-black
              tracking-tight
              text-emerald-800
            "
          >
            Need Further Assistance?
          </h3>

          <p
            className="
              max-w-3xl
              text-sm
              font-medium
              leading-relaxed
              text-slate-700
            "
          >
            For further clarification, support, or questions regarding the
            information provided on Kampa, please contact our support team.
          </p>

          {/* Divider */}
          <div className="my-2 h-px w-full bg-emerald-700/10" />

          {/* Support Link */}
          <a
            href="/support"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              bg-emerald-600
              px-4
              py-2
              text-sm
              font-bold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-emerald-700
              hover:shadow-md
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-emerald-600/30
              focus-visible:ring-offset-2
            "
          >
            Contact / Support
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </a>
        </div>
      </div>
      
    </div>
  );
}