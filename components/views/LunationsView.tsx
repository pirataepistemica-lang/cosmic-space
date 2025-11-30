import type { FC } from "react";

interface Lunation {
  phase: "Lua Nova" | "Lua Cheia";
  date: string;
}

const lunations: Lunation[] = [
  { phase: "Lua Nova", date: "02 Dez 2025" },
  { phase: "Lua Cheia", date: "17 Dez 2025" },
  { phase: "Lua Nova", date: "01 Jan 2026" },
  { phase: "Lua Cheia", date: "15 Jan 2026" },
  { phase: "Lua Nova", date: "30 Jan 2026" },
  { phase: "Lua Cheia", date: "13 Fev 2026" }
];

export const LunationsView: FC = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-indigo-100">Lunações</h3>
      <p className="text-xs text-slate-300">
        Próximas 6 lunações em um fio contínuo, conectadas por uma órbita
        trocoidal estilizada.
      </p>

      <div className="mt-2">
        <svg
          className="h-40 w-full"
          viewBox="0 0 320 160"
          aria-hidden="true"
        >
          {/* Curva trocoidal estilizada */}
          <path
            d="M 10 80 C 60 10, 100 150, 150 80 S 240 10, 310 80"
            fill="none"
            stroke="rgba(129,140,248,0.8)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {lunations.map((l, index) => {
            const x = 20 + (index * 280) / 5;
            const isNew = l.phase === "Lua Nova";
            const y = 80;

            return (
              <g key={index}>
                {/* Orbita local */}
                <circle
                  cx={x}
                  cy={y}
                  r={18}
                  fill="none"
                  stroke="rgba(148,163,184,0.6)"
                  strokeWidth="1"
                />

                {/* Disco lunar */}
                <circle
                  cx={x}
                  cy={y}
                  r={10}
                  fill={isNew ? "#020617" : "#e5e7eb"}
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />

                {/* Sombra para Lua Cheia ficar mais viva */}
                {!isNew && (
                  <circle
                    cx={x - 3}
                    cy={y - 2}
                    r={6}
                    fill="rgba(15,23,42,0.5)"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-1 grid grid-cols-2 gap-2 text-[0.7rem] text-slate-300 md:grid-cols-3">
        {lunations.map((l, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-700/80 bg-slate-900/70 px-2 py-1.5"
          >
            <p className="font-medium text-[0.72rem]">
              {l.phase === "Lua Nova" ? "🌑 Lua Nova" : "🌕 Lua Cheia"}
            </p>
            <p className="text-[0.68rem] text-slate-400">{l.date}</p>
          </div>
        ))}
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-3 text-[0.68rem] text-slate-400">
        <div className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-100" />
          Lua Cheia
        </div>
        <div className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-slate-100" />
          Lua Nova
        </div>
        <span className="text-slate-500">
          (Datas simuladas; conecte a uma API astronômica depois.)
        </span>
      </div>
    </div>
  );
};
