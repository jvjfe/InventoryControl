export async function getSale(req, res, prisma) {
    try {
        const sale = await prisma.sale.findMany();
        res.json(sale);
    } catch (error) {
        console.error("Erro ao buscar vendas:", error);
        res.status(500).json({ error: "Erro ao buscar as vendas." });
    }
}

export async function getSaleById(req, res, prisma) {
    const { id } = req.params;
    try {
        const sale = await prisma.sale.findUnique({
            where: { id: Number(id) },
        });

        if (sale) {
            res.json(sale);
        } else {
            res.status(404).json({ error: "Venda não encontrado (404)." });
        }
    } catch (error) {
        console.error("Erro ao buscar venda:", error);
        res.status(500).json({ error: "Erro (500) ao buscar venda." });
    }
}