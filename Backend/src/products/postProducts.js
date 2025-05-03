import { v4 as uuid } from 'uuid';

export default function createProducts(prisma) {
    return async function (req, res) {
        const id = uuid();
        const { name, description, stock, status, price } = req.body;

        try {
            const product = await prisma.product.create({
                data: { id, name, description, stock, status, price },
            });

            res.status(201).json(product);
        } catch (error) {
            console.error("Erro ao criar produto:", error);
            res.status(500).json({ error: "Erro ao criar produto (500)." });
        }
    };
}
