import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Zap,
  Mail,
  FileText,
  Phone,
  ExternalLink,
} from "lucide-react";

import type { Event } from "../types/event";

export function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const event: Event | null = location.state?.event || null;

  if (!event) {
    return (
      <section className="mx-auto max-w-[1180px]">
        <button
          onClick={() => navigate("/events")}
          className="mb-6 inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800"
        >
          <ArrowLeft size={18} />
          Back to Events
        </button>

        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
          <p className="text-slate-600">Event not found</p>
        </div>
      </section>
    );
  }

  const formatDate = (date: string) => {
    if (!date) return "Date TBA";
    const value = new Date(`${date}T00:00:00`);
    if (Number.isNaN(value.getTime())) return date;
    return value.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (value?: number) => {
    if (!value || value === 0) return "Available Soon";
    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <section className="mx-auto max-w-[1180px]">
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/events")}
        className="mb-6 inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800"
      >
        <ArrowLeft size={18} />
        Back to Events
      </button>

      {/* HERO SECTION */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-emerald-50 to-emerald-100 relative overflow-hidden">
          {event.media?.[0]?.url ? (
            <img
              src={event.media[0].url}
              alt={event.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-6xl">🌱</div>
                <p className="mt-3 text-lg font-bold text-emerald-800">
                  {event.type}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-950">
                {event.name}
              </h1>
              <p className="mt-2 text-lg font-semibold text-slate-600">
                {event.type}
              </p>
              <p className="mt-3 text-slate-700 leading-7">
                {event.description || event.shortDescription}
              </p>
            </div>

            {event.status && (
              <div className="rounded-xl bg-emerald-100 px-4 py-2 text-center">
                <p className="text-sm font-bold text-emerald-900">
                  {event.status}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INFO GRID */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* DATE & TIME */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">DATE & TIME</p>
              <p className="mt-1 font-bold text-slate-900">
                {formatDate(event.startDate)}
              </p>
              {event.durationHours && (
                <p className="text-xs text-slate-600">
                  Duration: {event.durationHours} hours
                </p>
              )}
            </div>
          </div>
        </div>

        {/* VENUE */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">VENUE</p>
              <p className="mt-1 font-bold text-slate-900">
                {event.venue || "Venue TBA"}
              </p>
            </div>
          </div>
        </div>

        {/* TEAM SIZE */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <Users size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">TEAM SIZE</p>
              <p className="mt-1 font-bold text-slate-900">
                {event.teamSize || "All students"}
              </p>
            </div>
          </div>
        </div>

        {/* REGISTRATION FEE */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">
                REGISTRATION FEE
              </p>
              <p className="mt-1 font-bold text-slate-900">
                {formatCurrency(Number(event.registrationFee))}
              </p>
            </div>
          </div>
        </div>

        {/* PRIZE POOL */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-700">
              <Trophy size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">PRIZE POOL</p>
              <p className="mt-1 font-bold text-slate-900">
                {formatCurrency(Number(event.prizePool))}
              </p>
            </div>
          </div>
        </div>

        {/* EE CREDITS */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
              <Zap size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">EE CREDITS</p>
              <p className="mt-1 font-bold text-slate-900">
                {event.eeCredits ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ORGANIZER INFO */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-extrabold text-slate-900">
          Organizer Information
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-xs font-semibold text-slate-500">ORGANIZER</p>
            <p className="mt-2 font-semibold text-slate-900">
              {event.organizer || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500">DEPARTMENT</p>
            <p className="mt-2 font-semibold text-slate-900">
              {event.department || "Not specified"}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500">SCHOOL</p>
            <p className="mt-2 font-semibold text-slate-900">
              {event.school || "Not specified"}
            </p>
          </div>
        </div>
      </div>

      {/* CONTACTS */}
      {event.contacts && event.contacts.length > 0 && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-extrabold text-slate-900">Contacts</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {event.contacts.map((contact, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <p className="font-bold text-slate-900">{contact.name}</p>
                {contact.role && (
                  <p className="text-sm text-slate-600">{contact.role}</p>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <Phone size={14} />
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-1 block text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    {contact.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REGISTRATION */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-extrabold text-slate-900">Registration</h2>

        <div className="mt-6 flex flex-wrap gap-3">
          {event.registrationUrl && (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800"
            >
              Register Now
              <ExternalLink size={16} />
            </a>
          )}

          {event.whatsappUrl && (
            <a
              href={event.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 hover:bg-slate-50"
            >
              Join WhatsApp
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* SOURCE INFORMATION */}
      {(event.sourceEmailSubject ||
        event.sourceEmailDate ||
        event.sourceEmailId) && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-extrabold text-slate-900">
            Source Information
          </h2>

          <div className="mt-6 space-y-4">
            {event.sourceEmailSubject && (
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  EMAIL SUBJECT
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {event.sourceEmailSubject}
                </p>
              </div>
            )}

            {event.sourceEmailDate && (
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  EMAIL DATE
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {formatDate(event.sourceEmailDate)}
                </p>
              </div>
            )}

            {event.confidence && (
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  EXTRACTION CONFIDENCE
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {event.confidence}
                </p>
              </div>
            )}

            <div className="mt-4 flex gap-3">
              {event.sourceEmailId && (
                <a
                  href={event.sourceEmailId}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800"
                >
                  <Mail size={14} />
                  Open Original Email
                </a>
              )}

              {event.sourceAttachmentUrl && (
                <a
                  href={event.sourceAttachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100"
                >
                  <FileText size={14} />
                  View Attachment
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}