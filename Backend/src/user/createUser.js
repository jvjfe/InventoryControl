export default async function createUser(req, res, prisma) {
    const { name, city } = req.body;
    try {
        const user = await prisma.user.create({ data: { name, city } });
        res.status(201).json(user);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({
            error: "Erro ao criar usuário.",
            details: error.message
        });
    }
}
