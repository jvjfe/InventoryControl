import { v4 as uuid } from 'uuid';

export default function updateSale(prisma) {
    return async function (req, res) {
        const { id } = req.params;
        const { customer_name, payment_method, items } = req.body;

        try {
            await prisma.$transaction(async (tx) => {
                const existingSale = await tx.sale.findUnique({
                    where: { id },
                    include: { items: true },
                });

                if (!existingSale) {
                    return res.status(404).json({ error: "Venda não encontrada ou inexistente." });
                }

                // Repor estoque dos itens antigos
                for (const oldItem of existingSale.items) {
                    const product = await tx.product.findUnique({
                        where: { id: oldItem.product_id },
                    });

                    if (product) {
                        await tx.product.update({
                            where: { id: product.id },
                            data: {
                                stock: product.stock + Number(oldItem.qty_total),
                            },
                        });
                    }
                }

                // Deleta os itens antigos
                await tx.salesItem.deleteMany({
                    where: { sale_id: id },
                });

                // Atualiza a venda
                await tx.sale.update({
                    where: { id },
                    data: { customer_name, payment_method },
                });

                // Inserção dos novos itens com verificação de estoque
                for (const item of items) {
                    const saleItemId = uuid();

                    const product = await tx.product.findUnique({
                        where: { id: item.product_id },
                    });

                    if (!product) {
                        throw new Error(`Produto ${item.product_id} não encontrado.`);
                    }

                    // Verificação de estoque antes de subtrair
                    if (product.stock < item.qty_total) {
                        throw new Error(`Estoque insuficiente para o produto "${product.name}". Disponível: ${product.stock}, Requerido: ${item.qty_total}`);
                    }

                    await tx.salesItem.create({
                        data: {
                            id: saleItemId,
                            qty_total: item.qty_total,
                            unit_price: item.unit_price,
                            sale_id: id,
                            product_id: item.product_id,
                        },
                    });

                    await tx.product.update({
                        where: { id: product.id },
                        data: {
                            stock: product.stock - Number(item.qty_total),
                        },
                    });
                }
            });

            const updatedSale = await prisma.sale.findUnique({
                where: { id },
                include: { items: true },
            });

            res.status(200).json(updatedSale);
        } catch (error) {
            console.error("Erro ao atualizar a venda:", error);
            res.status(500).json({ error: error.message || "Erro ao atualizar a venda (500)." });
        }
    };
}
