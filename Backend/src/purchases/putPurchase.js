import { v4 as uuid } from 'uuid';

export default function putPurchase(prisma) {
    return async function (req, res) {
        const { id } = req.params;
        const { supplier_name, payment_method, items } = req.body;

        try {
            const existingPurchase = await prisma.purchaseOrder.findUnique({
                where: { id },
                include: { items: true },
            });

            if (!existingPurchase) {
                return res.status(404).json({ error: "Compra não encontrada (404)." });
            }

            await prisma.$transaction(async (tx) => {
                // Reverter estoque dos itens antigos
                for (const oldItem of existingPurchase.items) {
                    const product = await tx.product.findUnique({
                        where: { id: oldItem.product_id },
                    });

                    if (!product) {
                        throw new Error(`Produto ${oldItem.product_id} não encontrado.`);
                    }

                    await tx.product.update({
                        where: { id: product.id },
                        data: {
                            stock: product.stock - Number(oldItem.qty_total),
                        },
                    });
                }

                // Remover itens antigos
                await tx.purchaseItem.deleteMany({
                    where: { purchase_id: id },
                });

                // Atualizar dados da compra
                await tx.purchaseOrder.update({
                    where: { id },
                    data: {
                        supplier_name,
                        payment_method,
                    },
                });

                // Criar novos itens da compra
                for (const item of items) {
                    const product = await tx.product.findUnique({
                        where: { id: item.product_id },
                    });

                    if (!product) {
                        throw new Error(`Produto ${item.product_id} não encontrado.`);
                    }

                    const purchaseItemId = uuid();

                    await tx.purchaseItem.create({
                        data: {
                            id: purchaseItemId,
                            qty_total: item.qty_total,
                            unit_price: item.unit_price,
                            purchase_id: id,
                            product_id: item.product_id,
                        },
                    });

                    // Atualizar estoque com novos valores
                    await tx.product.update({
                        where: { id: product.id },
                        data: {
                            stock: product.stock + Number(item.qty_total),
                        },
                    });
                }
            });

            const updatedPurchase = await prisma.purchaseOrder.findUnique({
                where: { id },
                include: { items: true },
            });

            res.json(updatedPurchase);
        } catch (error) {
            console.error("Erro ao atualizar a compra:", error);

            if (error.code === "P2025") {
                res.status(404).json({ error: "Compra não encontrada (404)." });
            } else {
                res.status(500).json({ error: "Erro ao atualizar a compra (500)." });
            }
        }
    };
}
