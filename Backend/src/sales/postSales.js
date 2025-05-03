import { v4 as uuid } from 'uuid';

export default function createSale(prisma) {
    return async function (req, res) {
        const saleId = uuid();
        const { customer_name, payment_method, items } = req.body;

        try {
            await prisma.$transaction(
                async (tx) => {
                    await tx.sale.create({
                        data: { id: saleId, customer_name, payment_method },
                    });

                    for (let i = 0; i < items.length; i++) {
                        const saleItemId = uuid();

                        const item = await tx.product.findUnique({
                            where: {
                                id: items[i].product_id
                            }
                        })

                        if (!item) {
                            throw new Exception(`Item ${items[i].product_id} não existe.`);
                        }

                        await tx.salesItem.create({
                            data: {
                                id: saleItemId,
                                qty_total: items[i].qty_total,
                                unit_price: items[i].unit_price,
                                sale_id: saleId,
                                product_id: items[i].product_id,
                            },
                        });

                        await tx.product.update({
                            data: {
                                stock: item.stock - Number(items[i].qty_total)
                            },
                            where: {
                                id: item.id
                            }
                        })
                    }
                }
            )

            const sale = await prisma.sale.findUnique({
                where: {
                    id: saleId
                },
                include: {
                    items: true
                }
            })

            res.status(201).json(sale);
        } catch (error) {
            console.error("Erro ao criar a venda:", error);
            res.status(500).json({ error: "Erro ao criar a venda (500)." });
        }
    };
}
