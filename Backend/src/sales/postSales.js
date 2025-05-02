export default function createSale(prisma) {
    return async function (req, res) {
        const { customer_name, payment_method } = req.body;

        try {
            const sale = await prisma.sale.create({
                data: { customer_name, payment_method },
            });

            res.status(201).json(sale);
        } catch (error) {
            console.error("Erro ao criar a venda:", error);
            res.status(500).json({ error: "Erro ao criar a venda (500)." });
        }
    };
}
