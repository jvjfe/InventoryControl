export default function deletePurchase(prisma) {
    return async function (req, res) {
        const { id } = req.params;

        try {
            await prisma.$transaction(async (tx) => {
                const existingPurchase = await tx.purchaseOrder.findUnique({
                    where: { id },
                    include: { items: true }
                });

                if (!existingPurchase) {
                    throw Object.assign(new Error("Compra não encontrada"), { code: "P2025" });
                }

                // Atualiza o estoque de cada item da compra
                for (const item of existingPurchase.items) {
                    const product = await tx.product.findUnique({
                        where: { id: item.product_id },
                    });

                    if (!product) {
                        throw new Error(`Produto ${item.product_id} não encontrado.`);
                    }

                    await tx.product.update({
                        where: { id: item.product_id },
                        data: {
                            stock: product.stock - item.qty_total
                        }
                    });
                }

                // Deleta os itens da compra
                await tx.purchaseItem.deleteMany({
                    where: { purchase_id: id },
                });

                // Deleta a compra
                await tx.purchaseOrder.delete({
                    where: { id },
                });
            });

            res.status(204).json({ message: "Compra deletada com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar compra:", error);

            if (error.code === "P2025") {
                res.status(404).json({ error: "Compra não encontrada (404)." });
            } else {
                res.status(500).json({ error: "Erro ao deletar compra (500)." });
            }
        }
    };
}
