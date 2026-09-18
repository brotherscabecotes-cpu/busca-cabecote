declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function push(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function trackBuscaIniciada() {
  push("busca_iniciada");
}

export function trackBuscaConcluida(veiculo: string, disponivel: boolean) {
  push("busca_concluida", { veiculo, disponivel });
  push(disponivel ? "produto_encontrado" : "produto_nao_encontrado", { veiculo });
}

export function trackWhatsappClick(veiculo: string, produtoNome?: string) {
  push("whatsapp_click", { veiculo, produto: produtoNome });
}

export function trackTelefoneClick() {
  push("telefone_click");
}

export function trackFormularioEnviado(veiculo: string) {
  push("formulario_enviado", { veiculo });
}
