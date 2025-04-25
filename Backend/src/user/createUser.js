export default async function createUser(req, res, prisma) {
    const { name, city } = req.body;
    try {
        const user = await prisma.user.create({ data: { name, city } });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário." });
    }
}
