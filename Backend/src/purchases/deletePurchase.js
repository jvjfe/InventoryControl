export default function deletePurchase(prisma) {
    return async function (req, res) {
        const { id } = req.params;

        try {
            await prisma.purchaseOrder.delete({
                where: { id: Number(id) },
            });

            res.status(204).json({ message: "Compra deletada com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar compra:", error);

            if (error.code && error.code === 'P2025') {
                res.status(404).json({ error: "Compra não encontrada (404)." });
            } else {
                res.status(500).json({ error: "Erro ao deletar compra (500)." });
            }
        }
    };
}
