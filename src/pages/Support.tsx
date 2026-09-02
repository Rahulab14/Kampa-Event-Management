import { useState } from "react";
import { 
  HelpCircle, MessageSquare, Send, CheckCircle2, 
  ChevronDown, AlertCircle 
} from "lucide-react";
import { formatDateTime } from "../utils/dateFormatter";

// Updated FAQ Data with AI and Accuracy Disclaimers
const faqs = [
    {
    question: "Can I use Kampa to find upcoming college events?",
    answer: "Yes. Kampa can help you discover and understand upcoming events, activities, workshops, seminars, competitions, and other university-related information. However, always verify important details with the official event announcement."
  },
  {
    question: "Are the event details accurate?",
    answer: "Event information displayed on Kampa may be automatically generated or summarized using AI based on available information. While we aim to provide accurate and useful details, information may occasionally be incomplete, outdated, or inaccurate. For the most reliable and up-to-date information, please verify important event details through your college/university email, official announcements, or the respective department before making plans."
  },
  {
    question: "Where does Kampa get event information from?",
    answer: "Kampa may process information from university emails using AI to generate concise event details and summaries, helping students quickly understand upcoming activities, events, and important announcements."
  },
  {
    question: "Should I rely on Kampa for official announcements?",
    answer: "Kampa is designed as an informational assistant and should not be considered the final source for official university announcements. For important updates, deadlines, hackathon registrations, or event changes, always refer to official university email."
  },
  {
    question: "What should I do if an event detail looks incorrect?",
    answer: "If you notice that an event date, time, venue, organizer, or other information appears incorrect, please verify it through your official college email or the relevant department. Official university communication should always take precedence over information displayed on Kampa."
  },
  {
    question: "Can event details change after they are shown on Kampa?",
    answer: "Yes. Events may be postponed, rescheduled, relocated, cancelled, or updated by the organizers. Kampa may not immediately reflect every change, so please check the latest official communication before attending an event."
  },
  {
    question: "Why is some event information missing?",
    answer: "Some event announcements may not contain complete details. When information is unavailable, Kampa may be unable to provide certain fields such as the venue, time, organizer, registration link, or eligibility criteria."
  },
  
  
  {
    question: "Where should I check for the final confirmation?",
    answer: "For the latest and most authoritative information, check your official college/university email, department announcements, university website, or communication from the event organizer. Important: Kampa is intended to make university information easier to discover and understand. For official confirmation, deadlines, schedules, and changes, always rely on communication issued by the university or the respective department."
  }
];

export function Support() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Feature Request",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    const GOOGLE_SHEET_API_URL = import.meta.env.VITE_FEEDBACK_API_URL;

    if (!GOOGLE_SHEET_API_URL) {
      console.error("Missing VITE_FEEDBACK_API_URL in .env file");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    try {
      await fetch(GOOGLE_SHEET_API_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: formatDateTime(new Date().toISOString()),
          ...formData
        }),
      });

      // Show success state
      setStatus("success");
      setFormData({ name: "", email: "", type: "Feature Request", message: "" });
      
      // Reset status after 3.5 seconds to let them read the success message
      setTimeout(() => setStatus("idle"), 3500);
    } catch (error) {
      console.error("Feedback submission error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12 w-full max-w-[1200px] mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col mb-4">
        <p className="text-sm font-bold text-[#B82126] mb-1.5 uppercase tracking-wider flex items-center gap-2">
          <HelpCircle size={16} /> Help & Support
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#000000] mb-2">
          How can we help you?
        </h1>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed font-medium">
          Find answers to common questions below, or send us your feedback and feature requests to help improve the Kampa experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* LEFT COLUMN: FAQ Accordion */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-extrabold text-[#000000] mb-2">Recently Asked Questions</h2>
          
          <div className="flex flex-col gap-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? "bg-white border-[#B82126]/30 shadow-[0_8px_24px_rgba(184,33,38,0.08)]" : "bg-white border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span className={`text-[15px] font-bold pr-4 ${isOpen ? "text-[#B82126]" : "text-[#000000]"}`}>
                      {faq.question}
                    </span>
                    <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#B82126]" : "text-gray-400"}`} />
                  </button>
                  
                  <div 
                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[300px] pb-5 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Feedback Form Box */}
        <div 
          className={`rounded-[32px] p-8 min-h-[520px] flex flex-col relative overflow-hidden transition-all duration-500 ease-out h-fit ${
            status === "success" 
              ? "bg-emerald-500 text-white shadow-[0_12px_40px_rgba(16,185,129,0.3)] scale-[1.02] justify-center" 
              : "bg-[#FFFFFF] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 justify-start"
          }`}
        >
          {status === "success" ? (
            
            // ==========================================
            // SUCCESS STATE (Full Green Box)
            // ==========================================
            <div className="flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
              <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <CheckCircle2 size={40} className="text-white" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3 drop-shadow-sm">Thank You!</h2>
              <p className="text-emerald-50 text-base font-medium max-w-[280px] leading-relaxed drop-shadow-sm">
                Your feedback has been successfully submitted to the Kampa team.
              </p>
            </div>

          ) : (

            // ==========================================
            // FORM STATE
            // ==========================================
            <div className="animate-in fade-in duration-500">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#000000] to-[#B82126]"></div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-[#000000]">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-[#000000]">Submit Feedback</h2>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">Helps us improve Kampa</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 ml-1">Name</label>
                    <input 
                      type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl px-4 py-3 outline-none transition-all focus:bg-white focus:border-[#000000] focus:ring-4 focus:ring-[#000000]/5"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 ml-1">Email</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email Id"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl px-4 py-3 outline-none transition-all focus:bg-white focus:border-[#000000] focus:ring-4 focus:ring-[#000000]/5"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 ml-1">Feedback Type</label>
                  <div className="relative">
                    <select 
                      name="type" value={formData.type} onChange={handleChange}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold rounded-xl px-4 py-3 outline-none transition-all focus:bg-white focus:border-[#000000] focus:ring-4 focus:ring-[#000000]/5 cursor-pointer"
                    >
                      <option value="Feature Request">💡 Feature Request</option>
                      <option value="Bug Report">🐛 Bug Report</option>
                      <option value="General Feedback">💬 General Feedback</option>
                      <option value="Others">❓ Others</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-500 ml-1">Message</label>
                  <textarea 
                    name="message" value={formData.message} onChange={handleChange} required rows={4}
                    placeholder="Tell us what you love or what needs fixing..."
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl px-4 py-3 outline-none transition-all focus:bg-white focus:border-[#000000] focus:ring-4 focus:ring-[#000000]/5 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#000000] px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-gray-800 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                >
                  {status === "idle" || status === "error" ? (
                    <><Send size={16} /> Send Feedback</>
                  ) : (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-white"></div>
                  )}
                </button>
                {status === "error" && (
                  <p className="text-center text-xs font-bold text-red-500 flex items-center justify-center gap-1 mt-1">
                    <AlertCircle size={14} /> Failed to send. Please try again.
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}