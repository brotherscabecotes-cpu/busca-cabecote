-- CreateTable
CREATE TABLE "Familia" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "redirecionamentoAutomatico" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Familia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "familiaId" TEXT NOT NULL,
    "motor" TEXT NOT NULL,
    "cilindrada" TEXT NOT NULL,
    "valvulas" INTEGER NOT NULL,
    "combustivel" TEXT NOT NULL,
    "condicao" TEXT NOT NULL DEFAULT 'Remanufaturado',
    "garantiaMeses" INTEGER NOT NULL DEFAULT 12,
    "baseDeTroca" BOOLEAN NOT NULL DEFAULT true,
    "mostrarPreco" BOOLEAN NOT NULL DEFAULT false,
    "preco" DOUBLE PRECISION,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "tituloSEO" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "varianteTecnica" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aplicacao" (
    "id" TEXT NOT NULL,
    "montadora" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "anoInicial" INTEGER NOT NULL,
    "anoFinal" INTEGER NOT NULL,
    "cilindrada" TEXT NOT NULL,
    "valvulas" INTEGER NOT NULL,
    "combustivel" TEXT NOT NULL,
    "motorizacaoLabel" TEXT NOT NULL,
    "familiaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "observacoes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aplicacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "oficina" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "veiculo" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Novo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pesquisa" (
    "id" TEXT NOT NULL,
    "montadora" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "motor" TEXT NOT NULL,
    "encontrado" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pesquisa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produto_slug_key" ON "Produto"("slug");

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aplicacao" ADD CONSTRAINT "Aplicacao_familiaId_fkey" FOREIGN KEY ("familiaId") REFERENCES "Familia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aplicacao" ADD CONSTRAINT "Aplicacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
