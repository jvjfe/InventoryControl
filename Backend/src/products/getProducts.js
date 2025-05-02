export async function getProducts(req, res, prisma) {
    try {
        const products = await prisma.product.findMany();
        res.json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        res.status(500).json({ error: "Erro ao buscar produtos." });
    }
}

export async function getProductsById(req, res, prisma) {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: Number(id) },
        });

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: "Produto não encontrado (404)." });
        }
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
        res.status(500).json({ error: "Erro (500) ao buscar produto." });
    }
}