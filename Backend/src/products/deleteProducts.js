export default async function deleteProducts(req, res, prisma) {
    const { id } = req.params;
    try {
        await prisma.product.delete({ where: { id: Number(id) } });
        res.json({ message: "Produto deletado com sucesso." });
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar Produto." });
    }
}


// Melhorar dps com mais mensagens de erro para o Usuário entender o que falta ou o que fez de errado