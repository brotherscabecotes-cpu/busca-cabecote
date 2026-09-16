"use client";

import { atualizarStatusLead } from "@/lib/actions";

const STATUSES = ["Novo", "Em atendimento", "Orçamento realizado", "Venda realizada", "Encerrado"];

export default function StatusSelect({ leadId, status }: { leadId: string; status: string }) {
  return (
    <select
      defaultValue={status}
      onChange={(e) => atualizarStatusLead(leadId, e.target.value)}
      className="rounded-md border border-white/15 bg-black/30 px-2 py-1 text-xs text-white outline-none focus:border-bc-amarelo"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
