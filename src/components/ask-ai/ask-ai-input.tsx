import { PaperPlaneRightIcon, PlusIcon } from "@phosphor-icons/react";

interface AskAiInputProps {
  query: string;
  setQuery: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

export default function AskAiInput({ query, setQuery, handleSubmit, isLoading }: AskAiInputProps) {
  return (
    <div className="border-t border-slate-100 bg-gradient-to-t from-slate-50/80 to-white px-3 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-3xl items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15 sm:gap-3 sm:px-4"
      >
        <button
          type="button"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 transition hover:border-primary/40 hover:bg-primary/5 sm:size-9"
        >
          <PlusIcon className="size-4 text-muted" />
        </button>

        <input
          type="text"
          value={query}
          placeholder="Ask anything..."
          onChange={(e) => setQuery(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2 text-sm text-dark outline-none placeholder:text-slate-400 sm:py-2.5 sm:text-base"
        />

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          aria-label="Send message"
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40 sm:size-9"
        >
          <PaperPlaneRightIcon className="size-4" />
        </button>
      </form>
    </div>
  );
}
