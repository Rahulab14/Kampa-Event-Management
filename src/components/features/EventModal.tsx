import { 
  X, Calendar, Clock, MapPin, Users, CreditCard, Trophy, 
  Star, Monitor, UserCheck,Share2, 
  ExternalLink, MessageCircle, FileText 
} from "lucide-react";
import type { Event } from "../../types/event";
import logo from "../../assets/logo2.png";

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

function formatCurrency(value?: number | string) {
  if (!value || value === 0 || value === "0") return "Available Soon";
  const num = Number(value);
  return isNaN(num) ? String(value) : `₹${num.toLocaleString("en-IN")}`;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "TBA";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function EventModal({ event, onClose }: EventModalProps) {
  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  const imageUrl = event.media?.[0]?.url || null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/60 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose} // Clicking the backdrop closes the modal
    >
      <div 
        className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-[32px] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-12 lg:p-10">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            
            {/* Hero Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
              {imageUrl ? (
                <img src={imageUrl} alt={event.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
                  <div className="flex items-center gap-3 mb-8 mt-2">
        <div className="bg-[#ffffff] p-2.5 rounded-xl">
          <img src={logo} alt="Kampa Logo" className="h-6 w-6" />
        </div>
      </div>
                  <span className="text-xl font-bold text-brand-800 text-center px-4">{event.name}</span>
                </div>
              )}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-brand-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm">
                  {event.type || "Event"}
                </span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-6">
              <StatItem icon={<Calendar />} label="Date" value={formatDate(event.startDate)} />
              <StatItem icon={<Clock />} label="Duration" value={event.durationHours ? `${event.durationHours} Hours` : "TBA"} />
              <StatItem icon={<MapPin />} label="Venue" value={event.venue || "TBA"} />
              <StatItem icon={<Users />} label="Team Size" value={event.teamSize ? String(event.teamSize) : "Individual"} />
              <StatItem icon={<CreditCard />} label="Registration Fee" value={formatCurrency(event.registrationFee)} />
              <StatItem icon={<Trophy />} label="Prize Pool" value={formatCurrency(event.prizePool)} />
              <StatItem icon={<Star />} label="EE Credits" value={event.eeCredits ? "Yes" : "No"} />
              <StatItem icon={<Monitor />} label="Mode" value="Offline" />
              <StatItem icon={<UserCheck />} label="Eligibility" value="Open to all" />
            </div>

            <hr className="border-gray-100" />

            {/* Organized By */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-4">Organized By</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-bold">
                    {event.organizer ? event.organizer.charAt(0) : "O"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{event.organizer || "Kalasalingam University"}</p>
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">Verified</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Primary Organizer</p>
                  </div>
                </div>
                {event.department && (
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 font-bold">
                      {event.department.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{event.department}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{event.school || "University Department"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>


          {/* ================= RIGHT COLUMN ================= */}
          <div className="flex flex-col gap-8 lg:col-span-7 lg:pl-4">
            
            {/* Header Area */}
            <div className="pr-12">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
                {event.name}
              </h2>
              <p className="text-base text-gray-600 font-medium leading-relaxed">
                {event.shortDescription}
              </p>
              
              {/* Fake Tags for aesthetics matching the image */}
              <div className="mt-4 flex flex-wrap gap-2">
                {["Innovation", "Problem Solving", "Technology"].map(tag => (
                  <span key={tag} className="rounded-full bg-brand-50 text-brand-700 px-3 py-1 text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">About the Event</h3>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {event.description || "Detailed description will be updated soon by the organizers."}
              </p>
            </div>

            {/* Layout Grid for Timeline & Prizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Timeline */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline</h3>
                <div className="relative border-l-2 border-gray-100 ml-3 space-y-6">
                  {event.registrationOpenAt && (
                    <TimelineItem title="Registration Opens" date={formatDate(event.registrationOpenAt)} />
                  )}
                  <TimelineItem title="Event Starts" date={formatDate(event.startDate)} />
                  {event.endDate && (
                    <TimelineItem title="Event Ends" date={formatDate(event.endDate)} />
                  )}
                </div>
              </div>

              {/* Prizes & Links */}
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Prizes</h3>
                  <div className="flex items-center justify-between rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                        <Trophy size={20} className="text-yellow-600" />
                      </div>
                      <span className="font-bold text-yellow-900">Total Pool</span>
                    </div>
                    <span className="text-lg font-extrabold text-yellow-700">{formatCurrency(event.prizePool)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Important Links</h3>
                  <div className="flex flex-col gap-3">
                    {event.registrationUrl && (
                      <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-700">
                        <ExternalLink size={16} /> Register Now
                      </a>
                    )}
                    {event.whatsappUrl && (
                      <a href={event.whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-bold text-green-700 transition hover:bg-green-100">
                        <MessageCircle size={16} /> Join WhatsApp Group
                      </a>
                    )}
                    {event.sourceAttachmentUrl && (
                      <a href={event.sourceAttachmentUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50">
                        <FileText size={16} /> Event Guidelines
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-4 flex items-center justify-end gap-4 border-t border-gray-100 pt-6">
              <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50">
                <Share2 size={16} /> Share
              </button>
              {event.registrationUrl ? (
                <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-brand-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-brand-700 shadow-sm">
                  Register Now
                </a>
              ) : (
                <button disabled className="rounded-xl bg-gray-100 px-8 py-3 text-sm font-bold text-gray-400">
                  Registration Closed
                </button>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// Helper components for the Modal
function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-gray-400 [&>svg]:h-5 [&>svg]:w-5">{icon}</div>
      <p className="text-xs font-semibold text-gray-500 mt-1">{label}</p>
      <p className="text-sm font-bold text-gray-900 truncate">{value}</p>
    </div>
  );
}

function TimelineItem({ title, date }: { title: string; date: string }) {
  return (
    <div className="relative pl-6">
      <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-brand-600 ring-4 ring-white" />
      <p className="text-sm font-bold text-gray-900">{title}</p>
      <p className="text-xs text-gray-500 mt-0.5">{date}</p>
    </div>
  );
}