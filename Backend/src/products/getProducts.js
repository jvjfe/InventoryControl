export async function getProducts(req, res, prisma) {
    try {
        const users = await prisma.product.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
}

export async function getProductsById(req, res, prisma) {
    const { id } = req.params;
    try {
        const user = await prisma.product.findUnique({ where: { id: Number(id) } });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Produto não encontrado (404)." });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro (500) ao buscar Produto." });
    }
}