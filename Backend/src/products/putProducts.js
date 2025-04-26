export default async function putProducts(req, res, prisma) {
    const { id } = req.params;
    const { name, description, status } = req.body;
    try {
        const user = await prisma.product.update({
            where: { id: Number(id) },
            data: { name, description, status },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar o Produto." });
    }
}

