import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type AplicacaoSeed = {
  montadora: string;
  modelo: string;
  anoInicial: number;
  anoFinal: number;
  cilindrada: string;
  valvulas: number;
  combustivel?: string;
  ativa?: boolean;
  observacoes?: string;
};

type FamiliaSeed = {
  nome: string;
  descricao?: string;
  redirecionamentoAutomatico: boolean;
  produto: {
    nome: string;
    slug: string;
    motor: string;
    cilindrada: string;
    valvulas: number;
    combustivel: string;
    descricao: string;
    tituloSEO: string;
    metaDescription: string;
    imagem?: string;
    varianteTecnica?: string;
  };
  aplicacoes: AplicacaoSeed[];
};

const IMG_A = "/img/cabecote-ea111.jpg";
const IMG_B = "/img/cabecote-fox-real.webp";

// combustível padrão por época: antes de 2003 o parque nacional era
// majoritariamente gasolina puro; de 2003 em diante, flex. Ajuste fino
// fica por conta do cadastro no painel quando uma versão fugir da regra.
function app(
  montadora: string,
  modelo: string,
  anoInicial: number,
  anoFinal: number,
  cilindrada: string,
  valvulas: number,
  opts: Partial<AplicacaoSeed> = {}
): AplicacaoSeed {
  return {
    montadora,
    modelo,
    anoInicial,
    anoFinal,
    cilindrada,
    valvulas,
    combustivel: opts.combustivel ?? (anoInicial >= 2003 ? "Flex" : "Gasolina"),
    ativa: opts.ativa ?? true,
    observacoes: opts.observacoes,
  };
}

const NAO_CONFIRMADO = "Aplicação ainda não confirmada para o cabeçote em estoque. Revisar antes de ativar.";

const familias: FamiliaSeed[] = [
  {
    nome: "EA111 1.0 8V",
    descricao: "Motor Volkswagen EA111, bloco 1.0, 8 válvulas.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote EA111 1.0 8V",
      slug: "cabecote-ea111-1-0-8v",
      motor: "EA111",
      cilindrada: "1.0",
      valvulas: 8,
      combustivel: "Flex",
      descricao:
        "Cabeçote remanufaturado do motor EA111 1.0 8V, testado antes de sair, pronto pra instalar. Aplicação cruzada entre Fox, Gol e Voyage dessa faixa de ano.",
      tituloSEO: "Cabeçote EA111 1.0 8V | Busca Cabeçote",
      metaDescription: "Cabeçote EA111 1.0 8V remanufaturado, com garantia, pronto pra troca. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [
      app("Volkswagen", "Fox", 2003, 2018, "1.0", 8),
      app("Volkswagen", "Gol", 2005, 2016, "1.0", 8),
      app("Volkswagen", "Voyage", 2008, 2017, "1.0", 8),
    ],
  },
  {
    nome: "EA111 1.6 8V",
    descricao: "Motor Volkswagen EA111, bloco 1.6, 8 válvulas.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote EA111 1.6 8V",
      slug: "cabecote-ea111-1-6-8v",
      motor: "EA111",
      cilindrada: "1.6",
      valvulas: 8,
      combustivel: "Flex",
      descricao:
        "Cabeçote remanufaturado do motor EA111 1.6 8V, testado antes de sair. Aplicação cruzada entre Fox, Gol, Voyage, Polo, Golf, Saveiro e SpaceFox dessa faixa de ano.",
      tituloSEO: "Cabeçote EA111 1.6 8V | Busca Cabeçote",
      metaDescription: "Cabeçote EA111 1.6 8V remanufaturado, com garantia, pronto pra troca. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Volkswagen", "Fox", 2003, 2018, "1.6", 8),
      app("Volkswagen", "Gol", 2008, 2014, "1.6", 8),
      app("Volkswagen", "Voyage", 2008, 2019, "1.6", 8),
      app("Volkswagen", "Polo", 2002, 2015, "1.6", 8),
      app("Volkswagen", "Golf", 2008, 2014, "1.6", 8),
      app("Volkswagen", "Saveiro", 2009, 2019, "1.6", 8),
      app("Volkswagen", "SpaceFox", 2006, 2018, "1.6", 8),
    ],
  },
  {
    nome: "Volkswagen AP 1.8 8V Tucho Hidráulico",
    descricao:
      "Motor Volkswagen AP 1.8, 8 válvulas, versão com tucho hidráulico (peça de referência 041103353). Separado de outros cabeçotes AP quando necessário.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote Volkswagen AP 1.8 8V Tucho Hidráulico",
      slug: "cabecote-ap-1-8-8v-tucho-hidraulico",
      motor: "AP",
      cilindrada: "1.8",
      valvulas: 8,
      combustivel: "Gasolina",
      varianteTecnica: "Tucho Hidráulico",
      descricao:
        "Cabeçote remanufaturado do motor AP 1.8 8V, versão tucho hidráulico (referência 041103353), testado antes de sair. Aplicação cruzada entre Gol, Parati, Santana e Saveiro dessa faixa de ano.",
      tituloSEO: "Cabeçote Volkswagen AP 1.8 8V Tucho Hidráulico | Busca Cabeçote",
      metaDescription: "Cabeçote AP 1.8 8V tucho hidráulico remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Volkswagen", "Gol", 1994, 2006, "1.8", 8, { combustivel: "Gasolina" }),
      app("Volkswagen", "Parati", 1996, 2002, "1.8", 8, { combustivel: "Gasolina" }),
      app("Volkswagen", "Polo Classic", 1997, 2000, "1.8", 8, { combustivel: "Gasolina" }),
      app("Volkswagen", "Santana", 1994, 2006, "1.8", 8, { combustivel: "Gasolina" }),
      app("Volkswagen", "Saveiro", 1994, 2006, "1.8", 8, { combustivel: "Gasolina" }),
    ],
  },
  {
    nome: "GM 1.0 8V Tucho Grosso",
    descricao:
      "Motor GM 1.0, 8 válvulas, versão mais antiga com sistema de tucho maior. Separado do Tucho Fino: não é o mesmo cabeçote.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM 1.0 8V Tucho Grosso",
      slug: "cabecote-gm-1-0-8v-tucho-grosso",
      motor: "Família GM",
      cilindrada: "1.0",
      valvulas: 8,
      combustivel: "Gasolina",
      varianteTecnica: "Tucho Grosso",
      descricao:
        "Cabeçote remanufaturado do motor GM 1.0 8V, versão tucho grosso, testado antes de sair. Aplicação cruzada entre Corsa Wind/Super, Corsa MPFI, Corsa Classic/Sedan e Celta gasolina dessa faixa de ano.",
      tituloSEO: "Cabeçote GM 1.0 8V Tucho Grosso para Corsa e Celta | Busca Cabeçote",
      metaDescription: "Cabeçote GM 1.0 8V tucho grosso remanufaturado, com garantia, pronto pra troca. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [
      app("Chevrolet", "Corsa Wind", 1994, 1996, "1.0", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Corsa Super", 1994, 1996, "1.0", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Corsa", 1996, 2002, "1.0", 8, { combustivel: "Gasolina", observacoes: "Corsa 1.0 MPFI." }),
      app("Chevrolet", "Corsa Classic", 2002, 2006, "1.0", 8, { combustivel: "Flex" }),
      app("Chevrolet", "Corsa Sedan", 2002, 2005, "1.0", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Celta", 2000, 2006, "1.0", 8, { combustivel: "Flex", observacoes: "Celta 1.0 gasolina/flex, tucho grosso. Sobrepõe com o Tucho Fino em 2005-2006, use a etapa de confirmação." }),
    ],
  },
  {
    nome: "GM 1.0 8V Tucho Fino",
    descricao:
      "Motor GM 1.0, 8 válvulas, versão mais moderna com balancim roletado. Separado do Tucho Grosso: não é o mesmo cabeçote.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM 1.0 8V Tucho Fino",
      slug: "cabecote-gm-1-0-8v-tucho-fino",
      motor: "Família GM",
      cilindrada: "1.0",
      valvulas: 8,
      combustivel: "Flex",
      varianteTecnica: "Tucho Fino",
      descricao:
        "Cabeçote remanufaturado do motor GM 1.0 8V, versão tucho fino roletado, testado antes de sair. Aplicação cruzada entre Celta, Corsa, Prisma e Onix dessa faixa de ano.",
      tituloSEO: "Cabeçote GM 1.0 8V Tucho Fino para Celta, Corsa, Prisma e Onix | Busca Cabeçote",
      metaDescription: "Cabeçote GM 1.0 8V tucho fino remanufaturado, com garantia, pronto pra troca. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Chevrolet", "Celta", 2005, 2016, "1.0", 8, { combustivel: "Flex", observacoes: "Sobrepõe com o Tucho Grosso em 2005-2006, use a etapa de confirmação." }),
      app("Chevrolet", "Corsa", 2006, 2012, "1.0", 8, { combustivel: "Flex", observacoes: "Corsa/Novo Corsa 1.0 Flex." }),
      app("Chevrolet", "Corsa", 2009, 2016, "1.0", 8, { combustivel: "Flex" }),
      app("Chevrolet", "Classic", 2009, 2016, "1.0", 8, { combustivel: "Flex" }),
      app("Chevrolet", "Prisma", 2009, 2019, "1.0", 8, { combustivel: "Flex" }),
      app("Chevrolet", "Onix", 2013, 2019, "1.0", 8, { combustivel: "Flex" }),
      app("Chevrolet", "Joy", 2017, 2021, "1.0", 8, {
        combustivel: "Flex",
        observacoes: "Geração Joy/Joy Plus. Confirmar aplicação exata antes de divulgar.",
      }),
    ],
  },
  {
    nome: "GM Família 1.4 8V",
    descricao: "Motor GM 1.4, 8 válvulas.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM Família 1.4 8V",
      slug: "cabecote-gm-1-4-8v",
      motor: "Família GM",
      cilindrada: "1.4",
      valvulas: 8,
      combustivel: "Flex",
      descricao:
        "Cabeçote remanufaturado do motor GM 1.4 8V, testado antes de sair. Aplicação cruzada entre Agile, Celta, Corsa, Meriva, Montana, Prisma, Onix e Cobalt dessa faixa de ano.",
      tituloSEO: "Cabeçote GM 1.4 8V para Agile, Celta, Corsa, Meriva, Montana, Prisma, Onix e Cobalt | Busca Cabeçote",
      metaDescription: "Cabeçote GM 1.4 8V remanufaturado, com garantia, pronto pra troca. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Chevrolet", "Agile", 2009, 2014, "1.4", 8),
      app("Chevrolet", "Celta", 2003, 2007, "1.4", 8),
      app("Chevrolet", "Corsa", 2008, 2012, "1.4", 8, { observacoes: "Corsa Novo." }),
      app("Chevrolet", "Meriva", 2008, 2012, "1.4", 8),
      app("Chevrolet", "Montana", 2008, 2021, "1.4", 8),
      app("Chevrolet", "Prisma", 2008, 2019, "1.4", 8),
      app("Chevrolet", "Onix", 2013, 2019, "1.4", 8),
      app("Chevrolet", "Cobalt", 2012, 2020, "1.4", 8),
    ],
  },
  {
    nome: "GM Família 1.6 8V",
    descricao: "Motor GM 1.6, 8 válvulas, geração Corsa/Corsa Sedan/Classic.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM Família 1.6 8V",
      slug: "cabecote-gm-1-6-8v",
      motor: "Família GM",
      cilindrada: "1.6",
      valvulas: 8,
      combustivel: "Gasolina",
      descricao:
        "Cabeçote remanufaturado do motor GM 1.6 8V, testado antes de sair. Aplicação cruzada entre Corsa, Corsa Sedan e Classic dessa faixa de ano.",
      tituloSEO: "Cabeçote GM 1.6 8V para Corsa, Corsa Sedan e Classic | Busca Cabeçote",
      metaDescription: "Cabeçote GM 1.6 8V remanufaturado, com garantia, pronto pra troca. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [
      app("Chevrolet", "Corsa", 1995, 2002, "1.6", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Corsa Sedan", 1996, 2005, "1.6", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Classic", 1996, 2005, "1.6", 8, { combustivel: "Gasolina" }),
    ],
  },
  {
    nome: "GM Família 1.8 8V",
    descricao: "Motor GM 1.8, 8 válvulas.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM Família 1.8 8V",
      slug: "cabecote-gm-1-8-8v",
      motor: "Família GM",
      cilindrada: "1.8",
      valvulas: 8,
      combustivel: "Flex",
      descricao:
        "Cabeçote remanufaturado do motor GM 1.8 8V, testado antes de sair. Aplicação cruzada entre Corsa, Corsa Sedan, Meriva, Montana, Cobalt e Spin dessa faixa de ano.",
      tituloSEO: "Cabeçote GM 1.8 8V para Corsa, Meriva, Montana, Cobalt e Spin | Busca Cabeçote",
      metaDescription: "Cabeçote GM 1.8 8V remanufaturado, com garantia, pronto pra troca. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Chevrolet", "Corsa", 2002, 2009, "1.8", 8),
      app("Chevrolet", "Corsa Sedan", 2002, 2009, "1.8", 8),
      app("Chevrolet", "Meriva", 2002, 2012, "1.8", 8),
      app("Chevrolet", "Montana", 2003, 2010, "1.8", 8),
      app("Chevrolet", "Cobalt", 2012, 2019, "1.8", 8),
      app("Chevrolet", "Spin", 2012, 2021, "1.8", 8),
      // aplicações Fiat com o motor 1.8 de origem GM: estrutura pronta, desligada até confirmação
      app("Fiat", "Doblò", 2000, 2009, "1.8", 8, { ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Fiat", "Idea", 2005, 2009, "1.8", 8, { ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Fiat", "Palio", 2000, 2009, "1.8", 8, { ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Fiat", "Palio Weekend", 2000, 2009, "1.8", 8, { ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Fiat", "Punto", 2007, 2009, "1.8", 8, { ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Fiat", "Siena", 2000, 2009, "1.8", 8, { ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Fiat", "Stilo", 2002, 2009, "1.8", 8, { ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Fiat", "Strada", 2000, 2009, "1.8", 8, { ativa: false, observacoes: NAO_CONFIRMADO }),
    ],
  },
  {
    nome: "GM 2.0 8V Não Roletado",
    descricao:
      "Motor GM 2.0/2.4, 8 válvulas, versão original sem tucho roletado. Compartilha o mesmo cabeçote entre Astra/Vectra/Zafira (2.0) e S10/Blazer (2.4): o veículo mantém a motorização real, mas usa o mesmo produto.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM 2.0/2.4 8V Não Roletado",
      slug: "cabecote-gm-2-0-8v-nao-roletado",
      motor: "Família GM",
      cilindrada: "2.0",
      valvulas: 8,
      combustivel: "Flex",
      varianteTecnica: "Não Roletado",
      descricao:
        "Cabeçote remanufaturado do motor GM 2.0/2.4 8V, versão original (não roletada), testado antes de sair. Aplicação original GM cruzada entre Vectra, Astra e Zafira 2.0, e S10 e Blazer 2.4, dessa faixa de ano.",
      tituloSEO: "Cabeçote GM 2.0/2.4 8V Não Roletado para Astra, Vectra, Zafira, S10 e Blazer | Busca Cabeçote",
      metaDescription: "Cabeçote GM 2.0/2.4 8V não roletado remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [
      app("Chevrolet", "Vectra", 1997, 2005, "2.0", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Astra", 1999, 2005, "2.0", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Zafira", 2001, 2005, "2.0", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "S10", 2001, 2005, "2.4", 8, { combustivel: "Gasolina", observacoes: "Mesmo cabeçote do Astra/Vectra/Zafira 2.0, aplicação original GM." }),
      app("Chevrolet", "Blazer", 2001, 2005, "2.4", 8, { combustivel: "Gasolina", observacoes: "Mesmo cabeçote do Astra/Vectra/Zafira 2.0, aplicação original GM." }),
    ],
  },
  {
    nome: "GM 2.0 8V Roletado Flex",
    descricao:
      "Motor GM 2.0/2.4, 8 válvulas, versão com tucho roletado, Flex. Família separada da versão não roletada.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM 2.0/2.4 8V Roletado Flex",
      slug: "cabecote-gm-2-0-8v-roletado-flex",
      motor: "Família GM",
      cilindrada: "2.0",
      valvulas: 8,
      combustivel: "Flex",
      varianteTecnica: "Roletado",
      descricao:
        "Cabeçote remanufaturado do motor GM 2.0/2.4 8V Flex, versão com tucho roletado, testado antes de sair. Aplicação original GM cruzada entre Vectra, Astra e Zafira 2.0 Flex, S10 e Blazer 2.4 Flex, e Nova S10 2.4, dessa faixa de ano.",
      tituloSEO: "Cabeçote GM 2.0/2.4 8V Roletado Flex para Astra, Vectra, Zafira, S10 e Blazer | Busca Cabeçote",
      metaDescription: "Cabeçote GM 2.0/2.4 8V roletado Flex remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Chevrolet", "Vectra", 2009, 2011, "2.0", 8, { combustivel: "Flex" }),
      app("Chevrolet", "Astra", 2009, 2011, "2.0", 8, { combustivel: "Flex" }),
      app("Chevrolet", "Zafira", 2009, 2011, "2.0", 8, { combustivel: "Flex" }),
      app("Chevrolet", "S10", 2009, 2011, "2.4", 8, { combustivel: "Flex", observacoes: "Mesmo cabeçote do Astra/Vectra/Zafira 2.0 Flex, aplicação original GM." }),
      app("Chevrolet", "Blazer", 2009, 2011, "2.4", 8, { combustivel: "Flex", observacoes: "Mesmo cabeçote do Astra/Vectra/Zafira 2.0 Flex, aplicação original GM." }),
      app("Chevrolet", "Nova S10", 2012, 2016, "2.4", 8, { combustivel: "Flex" }),
    ],
  },
  {
    nome: "GM Família II 8V - Câmara Coração",
    descricao:
      "Motor GM Família II 8V mais antigo, conhecido internamente como \"câmara coração\". Não deve ser misturado automaticamente com os cabeçotes GM roletados mais novos (2.0/2.4 não roletado ou roletado flex).",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM Família II 8V - Câmara Coração",
      slug: "cabecote-gm-familia-ii-camara-coracao",
      motor: "Família II",
      cilindrada: "2.4",
      valvulas: 8,
      combustivel: "Gasolina",
      varianteTecnica: "Câmara Coração",
      descricao:
        "Cabeçote remanufaturado do motor GM Família II 8V, versão câmara coração, testado antes de sair. Aplicação cruzada entre S10 e Blazer nas cilindradas 2.0, 2.2 e 2.4, dessa faixa de ano.",
      tituloSEO: "Cabeçote GM Família II 8V Câmara Coração para S10 e Blazer | Busca Cabeçote",
      metaDescription: "Cabeçote GM Família II 8V câmara coração remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [
      app("Chevrolet", "S10", 1996, 2000, "2.0", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "S10", 1996, 2000, "2.2", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "S10", 1996, 2000, "2.4", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Blazer", 1995, 2001, "2.2", 8, { combustivel: "Gasolina" }),
      app("Chevrolet", "Blazer", 1995, 2001, "2.4", 8, { combustivel: "Gasolina" }),
      // mesma família de combustão, interesse principal é S10/Blazer: estrutura pronta, desligada até confirmação
      app("Chevrolet", "Monza", 1982, 1996, "2.0", 8, { combustivel: "Gasolina", ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Chevrolet", "Kadett", 1989, 1998, "2.0", 8, { combustivel: "Gasolina", ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Chevrolet", "Ipanema", 1989, 1998, "2.0", 8, { combustivel: "Gasolina", ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Chevrolet", "Omega", 1992, 1998, "2.0", 8, { combustivel: "Gasolina", ativa: false, observacoes: NAO_CONFIRMADO }),
      app("Chevrolet", "Suprema", 1992, 1998, "2.0", 8, { combustivel: "Gasolina", ativa: false, observacoes: NAO_CONFIRMADO }),
    ],
  },
  {
    nome: "GM Família 16V (Astra/Vectra/Zafira)",
    descricao: "Motor GM 16V, família separada da 8V. Não confundir com a família 2.0 8V.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote GM 16V (Astra/Vectra/Zafira)",
      slug: "cabecote-gm-16v-avz",
      motor: "Família GM 16V",
      cilindrada: "2.0",
      valvulas: 16,
      combustivel: "Gasolina",
      descricao:
        "Cabeçote remanufaturado do motor GM 16V, testado antes de sair. Aplicação cruzada entre Vectra, Astra e Zafira dessa faixa de ano, nas versões 2.0, 2.2 e 2.4 16V.",
      tituloSEO: "Cabeçote GM 16V para Astra, Vectra e Zafira | Busca Cabeçote",
      metaDescription: "Cabeçote GM 16V remanufaturado, com garantia, pronto pra troca. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Chevrolet", "Vectra", 1995, 2011, "2.0", 16, { combustivel: "Gasolina" }),
      app("Chevrolet", "Vectra", 1995, 2011, "2.2", 16, { combustivel: "Gasolina" }),
      app("Chevrolet", "Vectra", 1995, 2011, "2.4", 16, { combustivel: "Gasolina" }),
      app("Chevrolet", "Astra", 1998, 2005, "2.0", 16, { combustivel: "Gasolina" }),
      app("Chevrolet", "Zafira", 2001, 2004, "2.0", 16, { combustivel: "Gasolina" }),
    ],
  },
  {
    nome: "Hyundai Gamma 1.6 16V Flex",
    descricao: "Motor Hyundai Gamma, usado no HB20.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote Hyundai HB20 1.6 16V Gamma Flex",
      slug: "cabecote-hb20-1-6-16v-gamma",
      motor: "Gamma",
      cilindrada: "1.6",
      valvulas: 16,
      combustivel: "Flex",
      descricao: "Cabeçote remanufaturado do motor Gamma 1.6 16V Flex, testado antes de sair, pronto pra instalar no HB20.",
      tituloSEO: "Cabeçote HB20 1.6 16V Gamma Flex | Busca Cabeçote",
      metaDescription: "Cabeçote HB20 1.6 16V Gamma Flex remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [app("Hyundai", "HB20", 2012, 2019, "1.6", 16)],
  },
  {
    nome: "Renault K7M 1.6 8V",
    descricao: "Motor Renault K7M.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote Renault K7M 1.6 8V",
      slug: "cabecote-k7m-1-6-8v",
      motor: "K7M",
      cilindrada: "1.6",
      valvulas: 8,
      combustivel: "Flex",
      descricao: "Cabeçote remanufaturado do motor K7M 1.6 8V Flex, testado antes de sair, pronto pra instalar no Sandero.",
      tituloSEO: "Cabeçote Renault K7M 1.6 8V para Sandero | Busca Cabeçote",
      metaDescription: "Cabeçote Renault K7M 1.6 8V remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Renault", "Sandero", 2007, 2016, "1.6", 8),
      app("Renault", "Logan", 2007, 2016, "1.6", 8, {
        ativa: false,
        observacoes: "Mesma família K7M do Sandero. Desativado por padrão, habilitar quando confirmado.",
      }),
    ],
  },
  {
    nome: "Ford Ti-VCT 1.0 12V",
    descricao: "Motor Ford Ti-VCT 3 cilindros, 1.0, 12V.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote Ford Ti-VCT 1.0 12V",
      slug: "cabecote-ford-tivct-1-0-12v",
      motor: "Ti-VCT",
      cilindrada: "1.0",
      valvulas: 12,
      combustivel: "Flex",
      descricao:
        "Cabeçote remanufaturado do motor Ti-VCT 1.0 12V, 3 cilindros, Flex, testado antes de sair. Aplicação para Ka e Ka+ de 2018 a 2021.",
      tituloSEO: "Cabeçote Ford Ka Ti-VCT 1.0 12V | Busca Cabeçote",
      metaDescription: "Cabeçote Ford Ka Ti-VCT 1.0 12V remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [
      app("Ford", "Ka", 2018, 2021, "1.0", 12),
      app("Ford", "Ka+", 2018, 2021, "1.0", 12),
      app("Ford", "Ka", 2014, 2017, "1.0", 12, {
        ativa: false,
        observacoes: "Geração 2014-2017 ainda não disponível em estoque. Não ativar automaticamente.",
      }),
      app("Ford", "Ka+", 2014, 2017, "1.0", 12, {
        ativa: false,
        observacoes: "Geração 2014-2017 ainda não disponível em estoque. Não ativar automaticamente.",
      }),
    ],
  },
  {
    nome: "Ford Zetec Rocam 1.0 8V",
    descricao: "Motor Ford Zetec Rocam, bloco 1.0, 8 válvulas.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote Ford Zetec Rocam 1.0 8V",
      slug: "cabecote-zetec-rocam-1-0-8v",
      motor: "Zetec Rocam",
      cilindrada: "1.0",
      valvulas: 8,
      combustivel: "Flex",
      descricao:
        "Cabeçote remanufaturado do motor Zetec Rocam 1.0 8V, testado antes de sair. Aplicação cruzada entre Fiesta, Ka e EcoSport dessa faixa de ano.",
      tituloSEO: "Cabeçote Ford Zetec Rocam 1.0 8V | Busca Cabeçote",
      metaDescription: "Cabeçote Ford Zetec Rocam 1.0 8V remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Ford", "Fiesta", 2000, 2014, "1.0", 8),
      app("Ford", "Ka", 2000, 2014, "1.0", 8),
      app("Ford", "EcoSport", 2003, 2006, "1.0", 8),
    ],
  },
  {
    nome: "Ford Zetec Rocam 1.6 8V",
    descricao: "Motor Ford Zetec Rocam, bloco 1.6, 8 válvulas.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote Ford Zetec Rocam 1.6 8V",
      slug: "cabecote-zetec-rocam-1-6-8v",
      motor: "Zetec Rocam",
      cilindrada: "1.6",
      valvulas: 8,
      combustivel: "Flex",
      descricao:
        "Cabeçote remanufaturado do motor Zetec Rocam 1.6 8V, testado antes de sair. Aplicação cruzada entre Fiesta, Ka, EcoSport, Courier, Escort e Focus dessa faixa de ano.",
      tituloSEO: "Cabeçote Ford Zetec Rocam 1.6 8V | Busca Cabeçote",
      metaDescription: "Cabeçote Ford Zetec Rocam 1.6 8V remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [
      app("Ford", "Fiesta", 2001, 2014, "1.6", 8),
      app("Ford", "Ka", 2000, 2012, "1.6", 8),
      app("Ford", "EcoSport", 2003, 2012, "1.6", 8),
      app("Ford", "Courier", 1999, 2013, "1.6", 8),
      app("Ford", "Escort", 2000, 2003, "1.6", 8),
      app("Ford", "Focus", 2003, 2011, "1.6", 8),
    ],
  },
  {
    nome: "Renault K4M 1.6 16V",
    descricao: "Motor Renault K4M. Não confundir com motores mais novos H4M.",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote Renault K4M 1.6 16V",
      slug: "cabecote-k4m-1-6-16v",
      motor: "K4M",
      cilindrada: "1.6",
      valvulas: 16,
      combustivel: "Flex",
      descricao:
        "Cabeçote remanufaturado do motor K4M 1.6 16V, testado antes de sair. Aplicação cruzada entre Clio, Kangoo, Logan, Mégane, Sandero, Scénic, Symbol, Duster, Oroch e Nissan Livina dessa faixa de ano.",
      tituloSEO: "Cabeçote Renault K4M 1.6 16V | Busca Cabeçote",
      metaDescription: "Cabeçote Renault K4M 1.6 16V remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Renault", "Clio", 2000, 2009, "1.6", 16, { combustivel: "Gasolina" }),
      app("Renault", "Kangoo", 2002, 2016, "1.6", 16),
      app("Renault", "Logan", 2007, 2011, "1.6", 16),
      app("Renault", "Mégane", 2000, 2012, "1.6", 16, { combustivel: "Gasolina" }),
      app("Renault", "Sandero", 2007, 2016, "1.6", 16),
      app("Renault", "Scénic", 1999, 2010, "1.6", 16, { combustivel: "Gasolina" }),
      app("Renault", "Symbol", 2009, 2013, "1.6", 16),
      app("Renault", "Duster", 2011, 2016, "1.6", 16),
      app("Renault", "Oroch", 2015, 2016, "1.6", 16),
      app("Nissan", "Livina", 2009, 2015, "1.6", 16),
    ],
  },
  {
    nome: "Chevrolet Sonic 1.6 16V Ecotec",
    descricao: "Motor Ecotec 1.6 16V do Sonic. Família própria, não confundir com o GM 16V antigo (Astra/Vectra/Zafira).",
    redirecionamentoAutomatico: true,
    produto: {
      nome: "Cabeçote Chevrolet Sonic 1.6 16V Ecotec",
      slug: "cabecote-sonic-1-6-16v-ecotec",
      motor: "Ecotec",
      cilindrada: "1.6",
      valvulas: 16,
      combustivel: "Flex",
      descricao: "Cabeçote remanufaturado do motor Ecotec 1.6 16V Flex, testado antes de sair. Aplicação para Sonic Hatch e Sonic Sedan.",
      tituloSEO: "Cabeçote Chevrolet Sonic 1.6 16V Ecotec | Busca Cabeçote",
      metaDescription: "Cabeçote Chevrolet Sonic 1.6 16V Ecotec remanufaturado, com garantia. Fale agora no WhatsApp.",
      imagem: IMG_A,
    },
    aplicacoes: [
      app("Chevrolet", "Sonic Hatch", 2012, 2014, "1.6", 16),
      app("Chevrolet", "Sonic Sedan", 2012, 2014, "1.6", 16),
    ],
  },
  {
    nome: "Ford Duratec",
    descricao:
      "Família criada mas sem redirecionamento automático até confirmar exatamente qual versão do Duratec está em estoque. Existem várias versões e não devem ser misturadas.",
    redirecionamentoAutomatico: false,
    produto: {
      nome: "Cabeçote Ford Duratec HE 2.0 16V (a confirmar)",
      slug: "cabecote-ford-duratec-2-0-16v",
      motor: "Duratec HE",
      cilindrada: "2.0",
      valvulas: 16,
      combustivel: "Flex",
      descricao:
        "Cabeçote do motor Duratec. Aguardando confirmação da versão exata em estoque antes de ativar o redirecionamento automático.",
      tituloSEO: "Cabeçote Ford Duratec 2.0 16V | Busca Cabeçote",
      metaDescription: "Cabeçote Ford Duratec, em confirmação de aplicação.",
      imagem: IMG_B,
    },
    aplicacoes: [
      app("Ford", "EcoSport", 2003, 2012, "2.0", 16, {
        ativa: false,
        observacoes: "Conferir se é exatamente o Duratec HE 2.0 16V antes de ativar.",
      }),
      app("Ford", "Focus", 2000, 2012, "2.0", 16, {
        ativa: false,
        observacoes: "Conferir se é exatamente o Duratec HE 2.0 16V antes de ativar.",
      }),
    ],
  },
];

async function main() {
  console.log("Limpando base atual...");
  await prisma.aplicacao.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.familia.deleteMany();

  for (const f of familias) {
    console.log(`Criando família: ${f.nome}`);
    const familia = await prisma.familia.create({
      data: {
        nome: f.nome,
        descricao: f.descricao,
        redirecionamentoAutomatico: f.redirecionamentoAutomatico,
      },
    });

    const produto = await prisma.produto.create({
      data: {
        ...f.produto,
        imagem: f.produto.imagem ?? IMG_A,
        familiaId: familia.id,
      },
    });

    for (const a of f.aplicacoes) {
      const combustivel = a.combustivel ?? "Flex";
      await prisma.aplicacao.create({
        data: {
          montadora: a.montadora,
          modelo: a.modelo,
          anoInicial: a.anoInicial,
          anoFinal: a.anoFinal,
          cilindrada: a.cilindrada,
          valvulas: a.valvulas,
          combustivel,
          motorizacaoLabel: `${a.cilindrada} ${a.valvulas}V ${combustivel}`,
          ativa: a.ativa ?? true,
          observacoes: a.observacoes,
          familiaId: familia.id,
          produtoId: produto.id,
        },
      });
    }
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
