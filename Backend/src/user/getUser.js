export async function getUsers(req, res, prisma) {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao buscar usuários." });
    }
}

export async function getUserById(req, res, prisma) {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "Usuário não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuário." });
    }
}
