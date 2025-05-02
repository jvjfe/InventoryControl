export default function putProducts(prisma) {
    return async function (req, res) {
        const { id } = req.params;
        const {
            name,
            description,
            status,
            stock,
            price,
            created_at,
            update_at,
        } = req.body;

        try {
            const product = await prisma.product.update({
                where: { id: Number(id) },
                data: {
                    name,
                    description,
                    status,
                    stock,
                    price,
                    created_at: created_at ? new Date(created_at) : undefined,
                    updated_at: update_at ? new Date(update_at) : new Date(),
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
