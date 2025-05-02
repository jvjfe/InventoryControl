export default function putSale(prisma) {
    return async function (req, res) {
        const { id } = req.params;
        const {
            customer_name,
            payment_method,
            created_at,
            update_at,
        } = req.body;

        try {
            const sale = await prisma.sale.update({
                where: { id: Number(id) },
                data: {
                    customer_name,
                    payment_method,
                    created_at: created_at ? new Date(created_at) : undefined,
                    updated_at: update_at ? new Date(update_at) : new Date(),
                },
            });

            res.json(sale);
        } catch (error) {
            console.error("Erro ao atualizar o venda:", error);

            if (error.code === "P2025") {
                res.status(404).json({ error: "Venda não encontrado (404)." });
            } else {
                res.status(500).json({ error: "Erro ao atualizar a Venda (500)." });
            }
        }
    };
}
