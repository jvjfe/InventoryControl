export default function putProducts(prisma) {
    return async function (req, res) {
        const { id } = req.params;
        const { name, description, status, stock, price } = req.body;

        // Converte stock para um número inteiro e price para um número de ponto flutuante
        const parsedStock = parseInt(stock, 10);
        const parsedPrice = parseFloat(price);

        // Verifica se as conversões são válidas
        if (isNaN(parsedStock)) {
            return res.status(400).json({ error: "O campo 'stock' precisa ser um número inteiro." });
        }

        if (isNaN(parsedPrice)) {
            return res.status(400).json({ error: "O campo 'price' precisa ser um número válido." });
        }

        try {
            const product = await prisma.product.update({
                where: { id: id },
                data: {
                    name,
                    description,
                    status,
                    stock: parsedStock,
                    price: parsedPrice
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
