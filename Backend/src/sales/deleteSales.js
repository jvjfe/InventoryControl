export default function deleteSale(prisma) {
    return async function (req, res) {
        const { id } = req.params;

        try {
            await prisma.sale.delete({
                where: { id: Number(id) },
            });

            res.status(204).json({ message: "Venda deletada com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar venda:", error);

            if (error.code === 'P2025') {
                res.status(404).json({ error: "Venda não encontrado (404)." });
            } else {
                res.status(500).json({ error: "Erro ao deletar venda (500)." });
            }
        }
    };
}
