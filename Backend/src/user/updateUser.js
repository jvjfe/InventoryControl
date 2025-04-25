export default async function updateUser(req, res, prisma) {
    const { id } = req.params;
    const { name, city } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, city },
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
}
