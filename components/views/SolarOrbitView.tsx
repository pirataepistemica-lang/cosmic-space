import type { FC } from "react";

export const SolarOrbitView: FC = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-indigo-100">
        Órbita Solar & Galáctica
      </h3>
      <p className="text-xs text-slate-300">
        Uma visão em camadas da dança do Sol em torno do centro da galáxia — e
        da própria galáxia movendo-se em algo ainda maior.
      </p>

      <div className="mt-2 flex items-center justify-center">
        <svg
          className="h-48 w-48"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          {/* Fundo galáctico */}
          <defs>
            <radialGradient id="galaxyCore" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle
            cx="100"
            cy="100"
            r="80"
            fill="url(#galaxyCore)"
            opacity="0.6"
          />

          {/* Centro galáctico */}
          <circle
            cx="100"
            cy="100"
            r="6"
            fill="#0f172a"
            stroke="#e5e7eb"
            strokeWidth="1.5"
          />

          {/* Órbita do Sol */}
          <circle
            cx="100"
            cy="100"
            r="40"
            fill="none"
            stroke="rgba(248,250,252,0.9)"
            strokeWidth="1.4"
          />

          {/* Sol orbitando */}
          <g className="origin-center animate-[spin_16s_linear_infinite]">
            <circle
              cx="140"
              cy="100"
              r="7"
              fill="#facc15"
              stroke="#fde68a"
              strokeWidth="1.3"
            />
          </g>

          {/* Órbita da galáxia em algo maior (apenas sugerida) */}
          <circle
            cx="100"
            cy="100"
            r="65"
            fill="none"
            stroke="rgba(148,163,184,0.5)"
            strokeWidth="1"
            strokeDasharray="5 4"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 text-[0.7rem] text-slate-300">
        <div className="space-y-1 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-2">
          <p className="font-semibold text-indigo-100/90">Órbita Solar</p>
          <p className="text-slate-400">
            Representada pelo círculo interno. O Sol não está parado; é um
            viajante orbitando o núcleo galáctico.
          </p>
        </div>
        <div className="space-y-1 rounded-2xl border border-slate-700/80 bg-slate-900/60 p-2">
          <p className="font-semibold text-indigo-100/90">Órbita Galáctica</p>
          <p className="text-slate-400">
            O círculo tracejado maior sugere que até a galáxia participa de
            órbitas em escalas maiores, ainda mais abstratas.
          </p>
        </div>
      </div>
    </div>
  );
};
