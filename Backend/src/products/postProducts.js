export default async function createProducts(req, res, prisma) {
    const { name, description, status } = req.body;
    try {
        const user = await prisma.user.create({ data: { name, description, status } });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar o Produto." });
    }
}
