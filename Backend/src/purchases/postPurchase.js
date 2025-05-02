export default function createPurchase(prisma) {
    return async function (req, res) {
        const { supplier_name, payment_method } = req.body;

        try {
            const purchase = await prisma.purchaseOrder.create({
                data: { supplier_name, payment_method },
            });

            res.status(201).json(purchase);
        } catch (error) {
            console.error("Erro ao criar a compra:", error);
            res.status(500).json({ error: "Erro ao criar a compra (500)." });
        }
    };
}
