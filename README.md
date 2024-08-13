# Dashboard de Cidades e Pessoas

Um projeto full stack para gerenciar um dashboard simples de cidades e pessoas. O sistema permite realizar operações CRUD (Criar, Ler, Atualizar e Deletar) para cidades e pessoas.

## Tecnologias Utilizadas

- **Frontend**: React
- **Backend**: Node.js com Express
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Bibliotecas**: Axios, React Router, etc.

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (utilizando um serviço em nuvem)

### Configuração do Backend

1. Clone o repositório:

    ```bash
    git clone https://github.com/Adelson10/City.git

2. Navegue até o diretório do backend:

    ```bash
    cd backend

3. Instale as dependências:

    ```bash
    npm install

4. Crie um arquivo .env na raiz do diretório do backend e adicione suas variáveis de ambiente:

    ```bash
            DATABASE_URL=postgres://usuario:senha@localhost:5432/nome-do-banco
            JWT_SECRET=seu_segredo_jwt
            PORT=5000
