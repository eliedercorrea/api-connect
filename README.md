# API Connect - Gerenciamento de Usuários

## Descrição

A API Connect é uma API REST desenvolvida como projeto prático de Desenvolvimento Back-end. Seu objetivo é realizar o gerenciamento de usuários por meio das principais operações CRUD: criação, consulta, atualização e exclusão de registros.

A aplicação foi desenvolvida utilizando Node.js e Express e utiliza um array em memória para simular a persistência de dados durante a execução do servidor.

## Tecnologias utilizadas

- Node.js
- Express
- JavaScript
- JSON
- Nodemon
- Git
- GitHub

## Estrutura do projeto

```text
api-connect/
├── src/
│   ├── controllers/
│   │   └── userController.js
│   ├── data/
│   │   └── users.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── routes/
│   │   └── userRoutes.js
│   └── app.js
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## Instalação e execução

Clone o repositório ou baixe os arquivos e acesse a pasta do projeto.

Instale as dependências:

```bash
npm install
```

Para iniciar o servidor normalmente:

```bash
npm start
```

Para iniciar em modo de desenvolvimento com Nodemon:

```bash
npm run dev
```

O servidor ficará disponível em:

```text
http://localhost:3000
```

## Endpoints da API

| Método | Endpoint | Finalidade | Status de sucesso |
|---|---|---|---|
| GET | `/usuarios` | Listar todos os usuários | 200 OK |
| GET | `/usuarios/:id` | Buscar usuário por ID | 200 OK |
| POST | `/usuarios` | Cadastrar usuário | 201 Created |
| PUT | `/usuarios/:id` | Substituir dados do usuário | 200 OK |
| PATCH | `/usuarios/:id` | Atualizar parcialmente um usuário | 200 OK |
| DELETE | `/usuarios/:id` | Remover usuário | 200 OK |

## Exemplos de uso

### Listar todos os usuários

```http
GET /usuarios
```

### Buscar usuário por ID

```http
GET /usuarios/1
```

Quando o usuário não existe, a API retorna `404 Not Found`.

### Cadastrar usuário

```http
POST /usuarios
Content-Type: application/json
```

```json
{
  "nome": "Carlos Oliveira",
  "email": "carlos@email.com"
}
```

Em caso de sucesso, a API retorna `201 Created`.

### Atualizar parcialmente um usuário

```http
PATCH /usuarios/1
Content-Type: application/json
```

```json
{
  "nome": "Carlos da Silva"
}
```

### Atualizar totalmente um usuário

```http
PUT /usuarios/1
Content-Type: application/json
```

```json
{
  "nome": "Carlos da Silva",
  "email": "carlos.silva@email.com"
}
```

### Excluir usuário

```http
DELETE /usuarios/2
```

## Validação dos dados

A API valida os dados recebidos antes de cadastrar ou atualizar usuários.

Regras principais:

- `nome` e `email` são obrigatórios no cadastro;
- o nome deve possuir pelo menos 2 caracteres;
- o e-mail deve apresentar um formato válido;
- não é permitido cadastrar dois usuários com o mesmo e-mail;
- IDs inexistentes retornam `404 Not Found`.

## Persistência dos dados

Para este MVP foi utilizada uma estrutura em memória por meio de um array JavaScript.

Cada usuário possui:

- `id`
- `nome`
- `email`

Os IDs são gerados de maneira incremental. Como os dados permanecem apenas na memória RAM, eles retornam ao estado inicial sempre que o servidor é reiniciado.

## Códigos HTTP utilizados

- `200 OK` - operação realizada com sucesso;
- `201 Created` - usuário criado com sucesso;
- `400 Bad Request` - dados inválidos ou obrigatórios não informados;
- `404 Not Found` - usuário ou rota não encontrada;
- `409 Conflict` - e-mail já utilizado por outro usuário;
- `500 Internal Server Error` - erro interno inesperado no servidor.

## Objetivo do projeto

O projeto demonstra conceitos fundamentais de desenvolvimento back-end, incluindo arquitetura REST, métodos HTTP, rotas parametrizadas, manipulação de JSON, validação de entrada, códigos de status HTTP, separação de responsabilidades, operações CRUD e versionamento com Git.

## Repositório

https://github.com/eliedercorrea/api-connect
