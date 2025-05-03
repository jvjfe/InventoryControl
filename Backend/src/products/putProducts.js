export default function putProducts(prisma) {
    return async function (req, res) {
        const { id } = req.params;
        const {
            name,
            description,
            status,
            stock,
            price
        } = req.body;

        try {
            const product = await prisma.product.update({
                where: { id: id },
                data: {
                    name,
                    description,
                    status,
                    stock,
                    price
                },
            });

            res.json(product);
        } catch (error) {
            console.error("Erro ao atualizar o produto:", error);

            if (error.code === "P2025") {
                res.status(404).json({ error: "Produto não encontrado (404)." });
            } else {
                res.status(500).json({ error: "Erro ao atualizar o produto (500)." });
            }
        }
    };
}
