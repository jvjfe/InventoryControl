import { v4 as uuid } from 'uuid';

export default function createPurchase(prisma) {
    return async function (req, res) {
        const purchaseOrderId = uuid();
        const { supplier_name, payment_method, items } = req.body;

        try {
            await prisma.$transaction(async (tx) => {
                // Criação da ordem de compra
                await tx.purchaseOrder.create({
                    data: {
                        id: purchaseOrderId,
                        supplier_name,
                        payment_method
                    },
                });

                // Itera sobre os itens da compra
                for (let i = 0; i < items.length; i++) {
                    const purchaseItemId = uuid();

                    const item = await tx.product.findUnique({
                        where: {
                            id: items[i].product_id
                        }
                    });

                    if (!item) {
                        throw new Error(`Item ${items[i].product_id} não existe.`);
                    }

                    await tx.purchaseItem.create({
                        data: {
                            id: purchaseItemId,
                            qty_total: items[i].qty_total,
                            unit_price: items[i].unit_price,
                            purchase_id: purchaseOrderId, // chave estrangeira correta
                            product_id: items[i].product_id,
                        },
                    });

                    await tx.product.update({
                        data: {
                            stock: item.stock + Number(items[i].qty_total)
                        },
                        where: {
                            id: item.id
                        }
                    });
                }
            });

            // Busca a ordem de compra com os itens relacionados
            const purchase = await prisma.purchaseOrder.findUnique({
                where: {
                    id: purchaseOrderId
                },
                include: {
                    items: true
                }
            });

            res.status(201).json(purchase);
        } catch (error) {
            console.error("Erro ao criar a compra:", error);
            res.status(500).json({ error: "Erro ao criar a compra (500)." });
        }
    };
}
