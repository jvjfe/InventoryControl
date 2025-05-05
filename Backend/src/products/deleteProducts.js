export default function deleteProducts(prisma) {
    return async function (req, res) {
        const { id } = req.params;

        try {
            const [salesItemCount, purchaseItemCount] = await Promise.all([
                prisma.salesItem.count({ where: { product_id: id } }),
                prisma.purchaseItem.count({ where: { product_id: id } }),
            ]);

            if (salesItemCount > 0 || purchaseItemCount > 0) {
                return res.status(400).json({
                    error: "Não é possível excluir o produto: ele está associado a uma venda ou compra.",
                });
            }

            await prisma.product.delete({
                where: { id },
            });

            res.status(204).json({ message: "Produto deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar produto:", error);

            if (error.code === "P2025") {
                res.status(404).json({ error: "Produto não encontrado (404)." });
            } else {
                res.status(500).json({ error: "Erro ao deletar produto (500)." });
            }
        }
    };
}
