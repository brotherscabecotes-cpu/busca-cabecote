"use client";

import { useState, FormEvent } from "react";
import { criarLead } from "@/lib/actions";
import { trackFormularioEnviado } from "@/lib/tracking";

export default function LeadForm({ veiculo }: { veiculo: string }) {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [aceite, setAceite] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setEnviando(true);
    await criarLead({
      nome: String(form.get("nome") || ""),
      oficina: String(form.get("oficina") || ""),
      whatsapp: String(form.get("whatsapp") || ""),
      cidade: String(form.get("cidade") || ""),
      veiculo,
    });
    setEnviando(false);
    setEnviado(true);
    trackFormularioEnviado(veiculo);
  }

  if (enviado) {
    return (
      <div className="rounded-xl border border-bc-amarelo/30 bg-black/30 p-6 text-center">
        <p className="font-display text-lg font-extrabold uppercase text-bc-amarelo">Recebemos seus dados</p>
        <p className="mt-2 text-sm text-white/70">
          Vamos verificar essa peça e entrar em contato assim que localizarmos o cabeçote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-white/10 bg-bc-grafite/40 p-6">
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Cabeçote procurado</label>
        <input
          readOnly
          value={veiculo}
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white/60"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Nome</label>
        <input
          name="nome"
          required
          className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-bc-amarelo"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Nome da oficina ou mecânica</label>
        <input
          name="oficina"
          required
          className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-bc-amarelo"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">WhatsApp</label>
        <input
          name="whatsapp"
          required
          type="tel"
          className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-bc-amarelo"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-white/50">Cidade</label>
        <input
          name="cidade"
          required
          className="w-full rounded-md border border-white/15 bg-black/20 px-3 py-2 text-sm outline-none focus:border-bc-amarelo"
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-white/60">
        <input
          type="checkbox"
          required
          checked={aceite}
          onChange={(e) => setAceite(e.target.checked)}
          className="mt-0.5"
        />
        Concordo com o uso dos meus dados para atendimento desta solicitação.
      </label>
      <button
        type="submit"
        disabled={enviando}
        className="btn-toque w-full rounded-md bg-bc-amarelo py-3 font-display text-sm font-extrabold uppercase tracking-wide text-bc-preto hover:brightness-110 disabled:opacity-60"
      >
        {enviando ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
