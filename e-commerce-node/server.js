require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors()); // Permite requisições do HTML
app.use(express.json());

// 1. Listar produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({ orderBy: { id: 'asc' } });
    res.json(produtos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar produtos' });
  }
});

// 2. Realizar compra e atualizar estoque no banco
app.post('/api/comprar', async (req, res) => {
  try {
    const { produtoId, quantidade } = req.body;

    const produto = await prisma.produto.findUnique({
      where: { id: parseInt(produtoId) }
    });

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    }

    if (produto.estoque < quantidade) {
      return res.status(400).json({ mensagem: 'Estoque insuficiente no banco!' });
    }

    // Baixa o estoque diretamente no PostgreSQL
    const produtoAtualizado = await prisma.produto.update({
      where: { id: parseInt(produtoId) },
      data: { estoque: produto.estoque - parseInt(quantidade) }
    });

    res.json({ 
      mensagem: 'Compra realizada com sucesso!', 
      estoqueAtual: produtoAtualizado.estoque 
    });
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao processar compra', erro: erro.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});