"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { ADMIN_COOKIE, checkAdminPassword, createSessionToken } from "./auth";

/* ---------------- autenticação ---------------- */

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!checkAdminPassword(password)) {
    redirect("/admin/login?erro=1");
  }
  const token = await createSessionToken();
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* ---------------- lead (formulário de peça não disponível) ---------------- */

export async function criarLead(data: { nome: string; oficina: string; whatsapp: string; cidade: string; veiculo: string }) {
  await prisma.lead.create({ data });
  revalidatePath("/admin/leads");
}

/* ---------------- família ---------------- */

export async function criarFamilia(formData: FormData) {
  await prisma.familia.create({
    data: {
      nome: String(formData.get("nome")),
      descricao: String(formData.get("descricao") || "") || null,
      redirecionamentoAutomatico: formData.get("redirecionamentoAutomatico") === "on",
    },
  });
  revalidatePath("/admin/familias");
  redirect("/admin/familias");
}

export async function atualizarFamilia(id: string, formData: FormData) {
  await prisma.familia.update({
    where: { id },
    data: {
      nome: String(formData.get("nome")),
      descricao: String(formData.get("descricao") || "") || null,
      redirecionamentoAutomatico: formData.get("redirecionamentoAutomatico") === "on",
    },
  });
  revalidatePath("/admin/familias");
  revalidatePath("/");
  redirect("/admin/familias");
}

export async function alternarRedirecionamentoFamilia(id: string, valorAtual: boolean) {
  await prisma.familia.update({
    where: { id },
    data: { redirecionamentoAutomatico: !valorAtual },
  });
  revalidatePath("/admin/familias");
  revalidatePath("/");
}

/* ---------------- produto ---------------- */

export async function criarProduto(formData: FormData) {
  await prisma.produto.create({
    data: {
      nome: String(formData.get("nome")),
      slug: String(formData.get("slug")),
      familiaId: String(formData.get("familiaId")),
      motor: String(formData.get("motor")),
      cilindrada: String(formData.get("cilindrada")),
      valvulas: Number(formData.get("valvulas")),
      combustivel: String(formData.get("combustivel")),
      condicao: String(formData.get("condicao") || "Remanufaturado"),
      garantiaMeses: Number(formData.get("garantiaMeses") || 12),
      baseDeTroca: formData.get("baseDeTroca") === "on",
      mostrarPreco: formData.get("mostrarPreco") === "on",
      preco: formData.get("preco") ? Number(formData.get("preco")) : null,
      descricao: String(formData.get("descricao")),
      imagem: String(formData.get("imagem") || "/img/cabecote-ea111.jpg"),
      tituloSEO: String(formData.get("tituloSEO")),
      metaDescription: String(formData.get("metaDescription")),
      disponivel: formData.get("disponivel") === "on",
      varianteTecnica: String(formData.get("varianteTecnica") || "") || null,
    },
  });
  revalidatePath("/admin/produtos");
  redirect("/admin/produtos");
}

export async function atualizarProduto(id: string, formData: FormData) {
  await prisma.produto.update({
    where: { id },
    data: {
      nome: String(formData.get("nome")),
      slug: String(formData.get("slug")),
      familiaId: String(formData.get("familiaId")),
      motor: String(formData.get("motor")),
      cilindrada: String(formData.get("cilindrada")),
      valvulas: Number(formData.get("valvulas")),
      combustivel: String(formData.get("combustivel")),
      condicao: String(formData.get("condicao") || "Remanufaturado"),
      garantiaMeses: Number(formData.get("garantiaMeses") || 12),
      baseDeTroca: formData.get("baseDeTroca") === "on",
      mostrarPreco: formData.get("mostrarPreco") === "on",
      preco: formData.get("preco") ? Number(formData.get("preco")) : null,
      descricao: String(formData.get("descricao")),
      imagem: String(formData.get("imagem") || "/img/cabecote-ea111.jpg"),
      tituloSEO: String(formData.get("tituloSEO")),
      metaDescription: String(formData.get("metaDescription")),
      disponivel: formData.get("disponivel") === "on",
      varianteTecnica: String(formData.get("varianteTecnica") || "") || null,
    },
  });
  revalidatePath("/admin/produtos");
  revalidatePath("/");
  redirect("/admin/produtos");
}

/* ---------------- aplicação ---------------- */

function motorizacaoLabelDe(cilindrada: string, valvulas: number, combustivel: string) {
  return `${cilindrada} ${valvulas}V ${combustivel}`;
}

export async function criarAplicacao(formData: FormData) {
  const cilindrada = String(formData.get("cilindrada"));
  const valvulas = Number(formData.get("valvulas"));
  const combustivel = String(formData.get("combustivel"));
  await prisma.aplicacao.create({
    data: {
      montadora: String(formData.get("montadora")),
      modelo: String(formData.get("modelo")),
      anoInicial: Number(formData.get("anoInicial")),
      anoFinal: Number(formData.get("anoFinal")),
      cilindrada,
      valvulas,
      combustivel,
      motorizacaoLabel: motorizacaoLabelDe(cilindrada, valvulas, combustivel),
      familiaId: String(formData.get("familiaId")),
      produtoId: String(formData.get("produtoId")),
      ativa: formData.get("ativa") === "on",
      observacoes: String(formData.get("observacoes") || "") || null,
    },
  });
  revalidatePath("/admin/aplicacoes");
  revalidatePath("/");
  redirect("/admin/aplicacoes");
}

export async function atualizarAplicacao(id: string, formData: FormData) {
  const cilindrada = String(formData.get("cilindrada"));
  const valvulas = Number(formData.get("valvulas"));
  const combustivel = String(formData.get("combustivel"));
  await prisma.aplicacao.update({
    where: { id },
    data: {
      montadora: String(formData.get("montadora")),
      modelo: String(formData.get("modelo")),
      anoInicial: Number(formData.get("anoInicial")),
      anoFinal: Number(formData.get("anoFinal")),
      cilindrada,
      valvulas,
      combustivel,
      motorizacaoLabel: motorizacaoLabelDe(cilindrada, valvulas, combustivel),
      familiaId: String(formData.get("familiaId")),
      produtoId: String(formData.get("produtoId")),
      ativa: formData.get("ativa") === "on",
      observacoes: String(formData.get("observacoes") || "") || null,
    },
  });
  revalidatePath("/admin/aplicacoes");
  revalidatePath("/");
  redirect("/admin/aplicacoes");
}

export async function alternarAtivaAplicacao(id: string, valorAtual: boolean) {
  await prisma.aplicacao.update({
    where: { id },
    data: { ativa: !valorAtual },
  });
  revalidatePath("/admin/aplicacoes");
  revalidatePath("/");
}

export async function excluirAplicacao(id: string) {
  await prisma.aplicacao.delete({ where: { id } });
  revalidatePath("/admin/aplicacoes");
  revalidatePath("/");
}

/* ---------------- leads ---------------- */

export async function atualizarStatusLead(id: string, status: string) {
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath("/admin/leads");
}
