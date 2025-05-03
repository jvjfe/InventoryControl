export default function deleteSale(prisma) {
    return async function (req, res) {
        const { id } = req.params;

        try {
            await prisma.$transaction(async (tx) => {
                const existingSale = await tx.sale.findUnique({
                    where: { id },
                    include: { items: true }
                });

                if (!existingSale) {
                    throw Object.assign(new Error("Venda não encontrada"), { code: "P2025" });
                }

                for (const item of existingSale.items) {
                    const product = await tx.product.findUnique({
                        where: { id: item.product_id },
                    });

                    if (!product) {
                        throw new Error(`Produto ${item.product_id} não encontrado.`);
                    }

                    await tx.product.update({
                        where: { id: item.product_id },
                        data: {
                            stock: product.stock + item.qty_total
                        }
                    });
                }

                await tx.salesItem.deleteMany({
                    where: { sale_id: id },
                });
                await tx.sale.delete({
                    where: { id },
                });
            });

            res.status(204).json({ message: "Venda deletada com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar venda:", error);

            if (error.code === "P2025") {
                res.status(404).json({ error: "Venda não encontrada (404)." });
            } else {
                res.status(500).json({ error: "Erro ao deletar venda (500)." });
            }
        }
    };
}
