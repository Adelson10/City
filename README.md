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
            PORT=8000

5. Execute as migrações para configurar o banco de dados:

   ```bash
   npm run knex:migrate

### Configuração do Frontend

1. Inicie o servidor backend:

   ```bash
   cd ../frontend

2. Instale as dependências:

    ```bash
    npm install

3. Configure o arquivo de ambiente .env se necessário (por exemplo, para configurar a URL da API):

   ```bash
    process.env.ENABLE_CORS=http://localhost:8000

4. Inicie o servidor frontend:

    ```bash
        npm run dev

### Estrutura do Projeto
- backend/: Contém o código do servidor Node.js.

    * database/models/: Definições de modelos para o PostgreSQL.
    * database/migrations/: Migrações para criar e atualizar o esquema do banco de dados.
    * routes/: Rotas e controladores para a API.
    * database/knex: Configurações de conexão e outras configurações.
    * server.ts: Ponto de entrada do servidor.

- frontend/: Contém o código do cliente React.

    * src/shared/components: Componentes React.
    * src/pages/: Páginas principais da aplicação.
    * src/shared/services: Funções para interagir com a API backend.
    * src/App.js: Ponto de entrada do aplicativo React.

### Funcionalidades
* Cidades

    * Adicionar nova cidade
    * Editar detalhes da cidade
    * Excluir cidade
    * Listar cidades

* Pessoas

    * Adicionar nova pessoa
    * Editar detalhes da pessoa
    * Excluir pessoa
    * Listar pessoas
 
### Contribuição
Sinta-se à vontade para contribuir com melhorias e correções. Faça um fork do repositório e envie um pull request com suas alterações.

### Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

### Contato
Se tiver alguma dúvida ou sugestão, entre em contato:

* Nome: Adelson Barros Dos Santos
* E-mail: barros.adelson101@gmail.com
* GitHub: github.com/Adelson10
