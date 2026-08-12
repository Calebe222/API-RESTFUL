# E-Commerce Node API & Frontend

API RESTful desenvolvida em Node.js com Express, utilizando Prisma ORM e PostgreSQL, acompanhada de uma interface frontend simples para listagem e simulação de compras com controle de estoque em tempo real.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** & **Express** (Framework web e API REST)
- **Prisma ORM** (Gerenciamento e acesso ao banco de dados)
- **PostgreSQL** (Banco de dados relacional)
- **CORS** (Habilitação de requisições de origem cruzada)
- **Dotenv** (Gerenciamento de variáveis de ambiente)

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- Um banco de dados **PostgreSQL** ativo (local ou em nuvem, como Neon, Supabase, etc.)

---

## 📦 Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Calebe222/API-RESTFUL.git
   cd e-commerce-node
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto baseado no seu banco de dados PostgreSQL:
   ```env
   DATABASE_URL="postgresql://usuario:senha@host:porta/nome_do_banco?schema=public"
   ```

4. **Execute as migrações/configuração do Prisma e seed (se houver):**
   ```bash
   npx prisma db push
   node seed.js
   ```

5. **Inicie o servidor:**
   ```bash
   node server.js
   ```

   O servidor estará rodando em `http://localhost:3000`.

---

## 🔌 Endpoints da API

### 1. Listar Produtos
- **Método:** `GET`
- **Rota:** `/api/produtos`
- **Descrição:** Retorna a lista de todos os produtos cadastrados no banco de dados.

### 2. Realizar Compra
- **Método:** `POST`
- **Rota:** `/api/comprar`
- **Descrição:** Processa a compra de um produto específico, validando e dando baixa no estoque.
- **Corpo da Requisição (JSON):**
  ```json
  {
    "produtoId": 1,
    "quantidade": 2
  }
  ```

---

## 📂 Estrutura do Projeto

```text
e-commerce-node/
├── public/
│   └── index.html      # Interface frontend estática
├── prisma/
│   └── schema.prisma   # Esquema do banco de dados (Prisma)
├── .env                # Variáveis de ambiente (não versionado)
├── .gitignore          # Arquivos ignorados pelo Git
├── package.json        # Dependências e scripts do projeto
├── prisma.config.ts    # Configuração do Prisma
├── seed.js             # Script de população inicial do banco
└── server.js           # Servidor principal (Express + Prisma)
```

---

## 📝 Licença

Este projeto está sob a licença ISC.
