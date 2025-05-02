export default function putPurchase(prisma) {
    return async function (req, res) {
        const { id } = req.params;
        const {
            supplier_name,
            payment_method,
            created_at,
            update_at,
        } = req.body;

        try {
            const purchase = await prisma.purchaseOrder.update({
                where: { id: Number(id) },
                data: {
                    supplier_name,
                    payment_method,
                    created_at: created_at ? new Date(created_at) : undefined,
                    updated_at: update_at ? new Date(update_at) : new Date(),
                },
            });

            res.json(purchase);
        } catch (error) {
            console.error("Erro ao atualizar o compra:", error);

            if (error.code === "P2025") {
                res.status(404).json({ error: "Compra não encontrada (404)." });
            } else {
                res.status(500).json({ error: "Erro ao atualizar a Compra (500)." });
            }
        }
    };
}
