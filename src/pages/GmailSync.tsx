import {
  AlertCircle,
  CheckCircle2,
  Copy,
  FileText,
  Mail,
  RefreshCw,
  Database,
} from "lucide-react";

import { useState } from "react";

import { fetchEventsFromSheet } from "../services/sheetsService";

export function GmailSync() {

  const [syncing, setSyncing] =
    useState(false);

  const [lastSync, setLastSync] =
    useState("Not synced yet");

  const handleSync =
    async () => {

      setSyncing(true);

      try {

        await fetchEventsFromSheet();

        setLastSync("Just now");

      } catch (error) {

        console.error(error);

      } finally {

        setSyncing(false);
      }
    };

  const stats = [
    {
      label: "Emails Processed",
      value: "142",
      icon: Mail,
      className:
        "bg-blue-50 text-blue-600",
    },
    {
      label: "Events Extracted",
      value: "38",
      icon: CheckCircle2,
      className:
        "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Duplicates",
      value: "7",
      icon: Copy,
      className:
        "bg-violet-50 text-violet-600",
    },
    {
      label: "Needs Review",
      value: "4",
      icon: AlertCircle,
      className:
        "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <section className="mx-auto max-w-[1180px]">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl font-extrabold text-slate-950">
            Kampa Gmail Sync
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor college emails.
          </p>

        </div>

        <button
          onClick={handleSync}
          disabled={syncing}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-60"
        >

          <RefreshCw
            size={17}
            className={
              syncing
                ? "animate-spin"
                : ""
            }
          />

          {syncing
            ? "Syncing..."
            : "Sync Now"}

        </button>

      </div>

      {/* CONNECTION */}

      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" />

          <div>

            <p className="text-sm font-bold text-emerald-900">
              Workspace Studio Connected
            </p>

            <p className="text-xs text-emerald-700">
              Last successful sync: {lastSync}
            </p>

          </div>

        </div>

        <span className="text-sm font-bold text-emerald-800">
          Operational
        </span>

      </div>

      {/* STATS */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {stats.map((stat) => {

          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >

              <div
                className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${stat.className}`}
              >
                <Icon size={20} />
              </div>

              <p className="text-3xl font-extrabold text-slate-900">
                {stat.value}
              </p>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {stat.label}
              </p>

            </div>
          );
        })}

      </div>

      {/* PIPELINE */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-lg font-extrabold text-slate-900">
          Kampa 
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-4">

          <PipelineStep
            icon={<Mail />}
            title="Gmail"
            description="College email received"
          />

          <PipelineStep
            icon={<FileText />}
            title="Events Extracted"
            description="Event Showcase"
          />

          <PipelineStep
            icon={<Database />}
            title="Management"
            description="Event Management"
          />

          <PipelineStep
            icon={<CheckCircle2 />}
            title="Kampa"
            description="Event displayed"
          />

        </div>

      </div>

    </section>
  );
}

function PipelineStep({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>

    </div>
  );
}
