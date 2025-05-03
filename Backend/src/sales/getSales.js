export async function getSale(req, res, prisma) {
    try {
        const sales = await prisma.sale.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        res.json(sales);
    } catch (error) {
        console.error("Erro ao buscar vendas:", error);
        res.status(500).json({ error: "Erro ao buscar as vendas." });
    }
}
export async function getSaleById(req, res, prisma) {
    const { id } = req.params;
    try {
        const sale = await prisma.sale.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (sale) {
            res.json(sale);
        } else {
            res.status(404).json({ error: "Venda não encontrada (404)." });
        }
    } catch (error) {
        console.error("Erro ao buscar venda:", error);
        res.status(500).json({ error: "Erro (500) ao buscar venda." });
    }
}
