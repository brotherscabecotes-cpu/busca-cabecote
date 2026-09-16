"use client";

import { useMemo, useRef, useState } from "react";
import type { AplicacaoPublica } from "@/lib/catalog";
import { linkWhatsApp } from "@/lib/whatsapp";
import LeadForm from "@/components/LeadForm";

type Passo = "marca" | "modelo" | "ano" | "motor" | "variante" | "resultado";

export default function GuidedSearch({ aplicacoes }: { aplicacoes: AplicacaoPublica[] }) {
  const [passo, setPasso] = useState<Passo>("marca");
  const [marca, setMarca] = useState<string | null>(null);
  const [modelo, setModelo] = useState<string | null>(null);
  const [ano, setAno] = useState<number | null>(null);
  const [motor, setMotor] = useState<string | null>(null);
  const [produtoEscolhidoId, setProdutoEscolhidoId] = useState<string | null>(null);
  const anoDetailsRef = useRef<HTMLDetailsElement>(null);

  const marcas = useMemo(() => Array.from(new Set(aplicacoes.map((a) => a.montadora))).sort(), [aplicacoes]);

  const modelos = useMemo(
    () => (marca ? Array.from(new Set(aplicacoes.filter((a) => a.montadora === marca).map((a) => a.modelo))).sort() : []),
    [aplicacoes, marca]
  );

  const anos = useMemo(() => {
    if (!marca || !modelo) return [];
    const linhas = aplicacoes.filter((a) => a.montadora === marca && a.modelo === modelo);
    if (linhas.length === 0) return [];
    const min = Math.min(...linhas.map((a) => a.anoInicial));
    const max = Math.max(...linhas.map((a) => a.anoFinal));
    const lista: number[] = [];
    for (let y = max; y >= min; y--) lista.push(y);
    return lista;
  }, [aplicacoes, marca, modelo]);

  const motores = useMemo(() => {
    if (!marca || !modelo || !ano) return [];
    return Array.from(
      new Set(
        aplicacoes
          .filter((a) => a.montadora === marca && a.modelo === modelo && ano >= a.anoInicial && ano <= a.anoFinal)
          .map((a) => a.motorizacaoLabel)
      )
    );
  }, [aplicacoes, marca, modelo, ano]);

  // todas as aplicações que batem com marca+modelo+ano+motor. Normalmente é uma só,
  // mas quando duas famílias diferentes usam o mesmo rótulo de motor pro mesmo veículo
  // (ex: transição tucho fino/tucho grosso), aparece mais de uma aqui.
  const candidatos = useMemo(() => {
    if (!marca || !modelo || !ano || !motor) return [];
    return aplicacoes.filter(
      (a) => a.montadora === marca && a.modelo === modelo && a.motorizacaoLabel === motor && ano >= a.anoInicial && ano <= a.anoFinal
    );
  }, [aplicacoes, marca, modelo, ano, motor]);

  const variantes = useMemo(() => {
    const porProduto = new Map<string, AplicacaoPublica>();
    candidatos.forEach((c) => {
      if (!porProduto.has(c.produtoId)) porProduto.set(c.produtoId, c);
    });
    return Array.from(porProduto.values());
  }, [candidatos]);

  const resultado = produtoEscolhidoId
    ? variantes.find((v) => v.produtoId === produtoEscolhidoId)
    : variantes.length === 1
      ? variantes[0]
      : undefined;

  function reiniciar() {
    setMarca(null);
    setModelo(null);
    setAno(null);
    setMotor(null);
    setProdutoEscolhidoId(null);
    setPasso("marca");
  }

  function escolherAno(a: number) {
    setAno(a);
    setMotor(null);
    setPasso("motor");
    anoDetailsRef.current?.removeAttribute("open");
  }

  function escolherMotor(m: string) {
    setMotor(m);
    setProdutoEscolhidoId(null);
    // o cálculo de variantes depende do estado ainda não atualizado nesse render,
    // então refaz o filtro aqui pra decidir o próximo passo corretamente.
    const bateram = aplicacoes.filter(
      (a) => a.montadora === marca && a.modelo === modelo && a.motorizacaoLabel === m && ano! >= a.anoInicial && ano! <= a.anoFinal
    );
    const produtosDistintos = new Set(bateram.map((b) => b.produtoId));
    setPasso(produtosDistintos.size > 1 ? "variante" : "resultado");
  }

  function escolherVariante(produtoId: string) {
    setProdutoEscolhidoId(produtoId);
    setPasso("resultado");
  }

  const steps: { label: string; done: boolean }[] = [
    { label: "Marca", done: !!marca },
    { label: "Modelo", done: !!modelo },
    { label: "Ano", done: !!ano },
    { label: "Motor", done: !!motor },
  ];

  const mensagemWhatsApp = resultado
    ? `Olá! Vim do Busca Cabeçote para um ${marca} ${modelo} ${ano} ${motor} e gostaria de solicitar um orçamento.`
    : "";

  return (
    <div id="buscar" className="rounded-2xl border-2 border-bc-amarelo/50 bg-bc-grafite p-6 shadow-2xl shadow-bc-amarelo/10 sm:p-8">
      <div className="mb-6 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider text-white/50">
        {steps.map((s, i) => (
          <span
            key={s.label}
            className={`rounded-full border px-3 py-1 ${s.done ? "border-bc-amarelo text-bc-amarelo" : "border-white/15"}`}
          >
            {i + 1}. {s.label}
          </span>
        ))}
      </div>

      {passo !== "resultado" && passo !== "variante" && (
        <div className="space-y-6">
          <div>
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white/80">Marca</p>
            <div className="flex flex-wrap gap-2">
              {marcas.map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMarca(m);
                    setModelo(null);
                    setAno(null);
                    setMotor(null);
                    setPasso("modelo");
                  }}
                  className={`btn-toque rounded-full border px-4 py-2 text-sm transition ${
                    marca === m ? "border-bc-amarelo bg-bc-amarelo/15 text-bc-amarelo" : "border-white/15 text-white/80 hover:border-bc-amarelo/60"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {marca && (
            <div>
              <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white/80">Modelo</p>
              <div className="flex flex-wrap gap-2">
                {modelos.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setModelo(m);
                      setAno(null);
                      setMotor(null);
                      setPasso("ano");
                    }}
                    className={`btn-toque rounded-full border px-4 py-2 text-sm transition ${
                      modelo === m ? "border-bc-amarelo bg-bc-amarelo/15 text-bc-amarelo" : "border-white/15 text-white/80 hover:border-bc-amarelo/60"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          {marca && modelo && (
            <div>
              <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white/80">Ano</p>
              <details ref={anoDetailsRef} className="relative w-full max-w-xs">
                <summary
                  className="btn-toque flex cursor-pointer list-none items-center justify-between gap-3 rounded-md border-2 border-bc-amarelo bg-bc-preto px-4 py-3 font-display text-base font-bold text-bc-branco [&::-webkit-details-marker]:hidden"
                >
                  <span>{ano ?? "Selecione o ano"}</span>
                  <span aria-hidden className="text-bc-amarelo">▾</span>
                </summary>
                <div className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-md border-2 border-bc-amarelo bg-bc-preto shadow-2xl">
                  {anos.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => escolherAno(a)}
                      className={`btn-toque block w-full px-4 py-3 text-left font-display text-base font-bold transition ${
                        a === ano ? "bg-bc-amarelo text-bc-preto" : "text-bc-branco hover:bg-bc-amarelo/20"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          )}

          {marca && modelo && ano && (
            <div>
              <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-white/80">Motor</p>
              <div className="flex flex-wrap gap-2">
                {motores.map((m) => (
                  <button
                    key={m}
                    onClick={() => escolherMotor(m)}
                    className={`btn-toque rounded-full border px-4 py-2 text-sm transition ${
                      motor === m ? "border-bc-amarelo bg-bc-amarelo/15 text-bc-amarelo" : "border-white/15 text-white/80 hover:border-bc-amarelo/60"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {passo === "variante" && (
        <div className="rounded-xl border border-bc-amarelo/30 bg-black/30 p-6 text-center">
          <p className="mb-1 font-mono text-xs uppercase tracking-wider text-white/50">
            {marca} {modelo} {ano} · {motor}
          </p>
          <p className="mb-6 font-display text-xl font-extrabold uppercase sm:text-2xl">
            Encontramos duas versões para este veículo. Qual é a sua?
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {variantes.map((v) => (
              <button
                key={v.produtoId}
                onClick={() => escolherVariante(v.produtoId)}
                className="btn-toque rounded-md border border-white/20 px-6 py-4 text-left hover:border-bc-amarelo/60"
              >
                <span className="block font-display text-sm font-extrabold uppercase tracking-wide text-bc-amarelo">
                  {v.varianteTecnica ?? v.produtoNome}
                </span>
                <span className="mt-1 block text-xs text-white/50">{v.produtoNome}</span>
              </button>
            ))}
          </div>
          <button onClick={reiniciar} className="mt-4 text-xs text-white/40 hover:text-white/70">
            Não sei, recomeçar busca
          </button>
        </div>
      )}

      {passo === "resultado" && resultado && resultado.disponivel && (
        <div className="rounded-xl border border-bc-amarelo/30 bg-black/30 p-6 text-center sm:p-10">
          <p className="mb-6 font-display text-2xl font-extrabold uppercase leading-tight sm:text-3xl">
            Encontramos o cabeçote para o seu veículo.
          </p>
          <a
            href={linkWhatsApp(mensagemWhatsApp)}
            className="btn-toque block w-full rounded-md bg-bc-amarelo py-5 text-center font-display text-lg font-extrabold uppercase tracking-wide text-bc-preto shadow-lg shadow-bc-amarelo/20 hover:brightness-110 sm:inline-block sm:w-auto sm:px-14 sm:text-xl"
          >
            Quer saber o valor deste cabeçote?
          </a>
          <button
            onClick={reiniciar}
            className="btn-toque mx-auto mt-5 flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-white/80 transition hover:border-bc-amarelo hover:text-bc-amarelo"
          >
            <span aria-hidden>↺</span> Buscar outro veículo
          </button>
        </div>
      )}

      {passo === "resultado" && resultado && !resultado.disponivel && (
        <div>
          <p className="mb-4 text-center font-display text-lg font-extrabold uppercase text-white">
            Ainda não temos este cabeçote disponível.
          </p>
          <p className="mb-6 text-center text-sm text-white/60">Deixe seus dados e podemos verificar essa peça para você.</p>
          <LeadForm veiculo={`${marca} ${modelo} ${ano} ${motor}`} />
          <button
            onClick={reiniciar}
            className="btn-toque mx-auto mt-4 flex items-center justify-center gap-2 rounded-md border border-white/25 px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-white/80 transition hover:border-bc-amarelo hover:text-bc-amarelo"
          >
            <span aria-hidden>↺</span> Buscar outro veículo
          </button>
        </div>
      )}
    </div>
  );
}
