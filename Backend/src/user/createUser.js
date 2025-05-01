/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um usuário com os dados fornecidos (nome e cidade).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               city:
 *                 type: string
 *             required:
 *               - name
 *               - city
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 city:
 *                   type: string
 *       500:
 *         description: Erro ao criar usuário. Detalhes do erro podem ser fornecidos na resposta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 */
export default async function createUser(req, res, prisma) {
    const { name, city } = req.body;

    try {
        const user = await prisma.user.create({ data: { name, city } });
        res.status(201).json(user);
    } catch (error) {
        // Especificando melhor o erro
        console.error('Erro ao criar usuário:', error);  // Erro completo no terminal
        res.status(500).json({
            error: "Erro ao criar usuário.",
            details: error.message  // Detalhes do erro completo
        });
    }
}
