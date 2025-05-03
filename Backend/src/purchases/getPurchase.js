export async function getPurchase(req, res, prisma) {
    try {
        const purchases = await prisma.purchaseOrder.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.json(purchases);
    } catch (error) {
        console.error("Erro ao buscar compras:", error);
        res.status(500).json({ error: "Erro ao buscar as compras." });
    }
}
export async function getPurchaseById(req, res, prisma) {
    const { id } = req.params;
    try {
        const purchase = await prisma.purchaseOrder.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (purchase) {
            res.json(purchase);
        } else {
            res.status(404).json({ error: "Compra não encontrada (404)." });
        }
    } catch (error) {
        console.error("Erro ao buscar compra:", error);
        res.status(500).json({ error: "Erro (500) ao buscar compra." });
    }
}

