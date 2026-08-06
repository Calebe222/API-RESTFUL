<p align="center">
  <h1 align="center">Task Manager API</h1>
</p>

<p align="center">
  Uma API RESTful robusta e moderna para gerenciamento de tarefas, desenvolvida com Node.js, Express, TypeScript, Prisma ORM e Autenticação JWT.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v20%2B-green?style=flat-square&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/TypeScript-v5%2B-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Express-v5-lightgrey?style=flat-square&logo=express" alt="Express">
  <img src="https://img.shields.io/badge/Prisma-v6-2O3238?style=flat-square&logo=prisma" alt="Prisma">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite" alt="SQLite">
  <img src="https://img.shields.io/badge/License-ISC-yellow.svg?style=flat-square" alt="License">
</p>

---

## 🚀 Tecnologias

Este projeto foi construído utilizando as seguintes tecnologias e ferramentas:

- **[Node.js](https://nodejs.org/)** - Ambiente de execução JavaScript/TypeScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Express](https://expressjs.com/)** - Framework web rápido e minimalista
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para Node.js e TypeScript
- **[SQLite](https://www.sqlite.org/)** - Banco de dados relacional leve (modo arquivo)
- **[Zod](https://zod.dev/)** - Validação de esquemas TypeScript-first
- **[JSON Web Token (JWT)](https://jwt.io/)** - Autenticação baseada em tokens
- **[Bcryptjs](https://github.com/dcodeIO/bcrypt.js/)** - Hash seguro de senhas

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18 ou superior recomendada)
- **npm** (ou gerenciador de pacotes compatível)

---

## 📦 Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/task-manager-api.git
cd task-manager-api
```

2. Instale as dependências do projeto:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example` ou utilize a configuração padrão:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
```

4. Execute as migrações do banco de dados e gere o Prisma Client:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Inicie o servidor em modo de desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3333`.

---

## 📋 Endpoints da API

### 🔐 Autenticação (`/auth`)

- **POST /auth/register**
  - Cadastra um novo usuário.
  - **Body JSON:**
    ```json
    {
      "name": "Nome do Usuário",
      "email": "usuario@email.com",
      "password": "senha_segura"
    }
    ```

- **POST /auth/login**
  - Realiza o login e retorna o token JWT.
  - **Body JSON:**
    ```json
    {
      "email": "usuario@email.com",
      "password": "senha_segura"
    }
    ```

---

### ✅ Tarefas (`/tasks`)
*(Todas as rotas abaixo exigem autenticação via Header `Authorization: Bearer <seu_token>`)*

- **GET /tasks**
  - Lista todas as tarefas do usuário autenticado.

- **POST /tasks**
  - Cria uma nova tarefa.
  - **Body JSON:**
    ```json
    {
      "title": "Estudar TypeScript",
      "description": "Praticar conceitos avançados",
      "priority": "HIGH",
      "completed": false
    }
    ```

- **PUT /tasks/:id**
  - Atualiza uma tarefa existente pelo ID.

- **DELETE /tasks/:id**
  - Remove uma tarefa pelo ID.

---

## 🛠️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento com recarregamento automático (`tsx watch`).
- `npm run build`: Compila o código TypeScript para JavaScript na pasta `dist/`.
- `npm start`: Executa a aplicação em modo de produção utilizando o build compilado.

---

## 📄 Licença

Este projeto está sob a licença [ISC](LICENSE).
