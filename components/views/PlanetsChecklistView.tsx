import type { FC } from "react";

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface PlanetsChecklistViewProps {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
}

export const PlanetsChecklistView: FC<PlanetsChecklistViewProps> = ({
  items,
  onToggle
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-indigo-100">
        Planetas & Checklist
      </h3>
      <p className="text-xs text-slate-300">
        Um pequeno sistema planetário acompanhado de uma lista de intenções /
        tarefas orbitando seu agora.
      </p>

      <div className="mt-2 grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)]">
        {/* Visualização planetária simples */}
        <div className="flex items-center justify-center">
          <svg
            className="h-40 w-40"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            {/* Estrela central */}
            <defs>
              <radialGradient id="star" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="60%" stopColor="#f97316" stopOpacity="0.9" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle
              cx="100"
              cy="100"
              r="20"
              fill="url(#star)"
              opacity="0.9"
            />

            {/* Órbitas */}
            <circle
              cx="100"
              cy="100"
              r="36"
              fill="none"
              stroke="rgba(148,163,184,0.7)"
              strokeWidth="1"
            />
            <circle
              cx="100"
              cy="100"
              r="56"
              fill="none"
              stroke="rgba(148,163,184,0.6)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <circle
              cx="100"
              cy="100"
              r="76"
              fill="none"
              stroke="rgba(129,140,248,0.7)"
              strokeWidth="1"
            />

            {/* Planetas em órbita */}
            <g className="origin-center animate-[spin_13s_linear_infinite]">
              <circle cx="136" cy="100" r="5" fill="#38bdf8" />
            </g>
            <g className="origin-center animate-[spin_18s_linear_infinite_reverse]">
              <circle cx="156" cy="100" r="6" fill="#a855f7" />
            </g>
            <g className="origin-center animate-[spin_24s_linear_infinite]">
              <circle cx="176" cy="100" r="4" fill="#f97316" />
            </g>
          </svg>
        </div>

        {/* Checklist */}
        <div className="space-y-2 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-3">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
            Checklist Orbital
          </p>
          <ul className="mt-1 space-y-1.5 text-xs">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onToggle(item.id)}
                  className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left transition hover:bg-slate-800/80 focus-visible:outline-none"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      item.done
                        ? "border-emerald-400 bg-emerald-500/20"
                        : "border-slate-500 bg-slate-900/80"
                    }`}
                    aria-hidden="true"
                  >
                    {item.done && (
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    )}
                  </span>
                  <span
                    className={`flex-1 ${
                      item.done
                        ? "text-slate-400 line-through"
                        : "text-slate-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-1 text-[0.65rem] text-slate-500">
            Estado mantido apenas em memória local da página. Posteriormente,
            você pode salvar isso em localStorage ou em um backend real.
          </p>
        </div>
      </div>
    </div>
  );
};
