interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({
  title,
  description = "This section is part of a future update.",
}: PlaceholderPageProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-10 shadow-soft">
      <h2 className="text-2xl font-bold text-gray-400">{title}</h2>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}
