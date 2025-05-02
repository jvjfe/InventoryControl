export default function deleteProducts(prisma) {
    return async function (req, res) {
        const { id } = req.params;

        try {
            await prisma.product.delete({
                where: { id: Number(id) },
            });

            res.status(204).json({ message: "Produto deletado com sucesso." });
        } catch (error) {
            console.error("Erro ao deletar produto:", error);

            if (error.code === 'P2025') {
                res.status(404).json({ error: "Produto não encontrado (404)." });
            } else {
                res.status(500).json({ error: "Erro ao deletar produto (500)." });
            }
        }
    };
}
