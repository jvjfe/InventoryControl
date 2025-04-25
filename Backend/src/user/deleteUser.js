export default async function deleteUser(req, res, prisma) {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id: Number(id) } });
        res.json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar usuário." });
    }
}
