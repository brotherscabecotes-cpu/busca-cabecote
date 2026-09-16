import { prisma } from "@/lib/db";
import StatusSelect from "@/components/admin/StatusSelect";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold uppercase">Leads</h1>
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-bc-grafite/50 text-white/50">
            <tr>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Oficina</th>
              <th className="px-4 py-3">WhatsApp</th>
              <th className="px-4 py-3">Cidade</th>
              <th className="px-4 py-3">Cabeçote procurado</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-t border-white/10">
                <td className="px-4 py-3 text-white/60">{l.createdAt.toLocaleDateString("pt-BR")}</td>
                <td className="px-4 py-3 font-medium">{l.nome}</td>
                <td className="px-4 py-3 text-white/60">{l.oficina}</td>
                <td className="px-4 py-3 text-white/60">{l.whatsapp}</td>
                <td className="px-4 py-3 text-white/60">{l.cidade}</td>
                <td className="px-4 py-3 text-white/60">{l.veiculo}</td>
                <td className="px-4 py-3">
                  <StatusSelect leadId={l.id} status={l.status} />
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-white/40">
                  Nenhum lead recebido ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
