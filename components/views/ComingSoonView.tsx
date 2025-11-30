import type { FC } from "react";

interface ComingSoonViewProps {
  label: string;
}

export const ComingSoonView: FC<ComingSoonViewProps> = ({ label }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-indigo-100">{label}</h3>
      <p className="text-xs text-slate-300">
        Esta esfera ainda está se condensando a partir do vácuo quântico das
        ideias. Em breve, um novo módulo vai habitar aqui.
      </p>

      <div className="mt-2 flex items-center justify-center">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-500/40 via-indigo-400/40 to-rose-500/40 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-dashed border-slate-500/70 bg-black/60">
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-300">
              Em breve
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
