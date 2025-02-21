# Todo List

Este é um projeto de lista de tarefas (Todo List) desenvolvido utilizando tecnologias modernas para o frontend e backend. O objetivo do projeto é permitir que os usuários criem, atualizem, visualizem e excluam tarefas.

## Tecnologias Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.4.2**
- **Spring Data JPA**
- **PostgreSQL**
- **H2 Database** (para testes)
- **Lombok**

### Frontend
- **React 19.0.0**
- **Vite**
- **Axios**
- **React Icons**

## Funcionalidades do Projeto

### Backend
- **CRUD de Tarefas**: Criação, leitura, atualização e exclusão de tarefas.
- **Validação**: Validação de dados de entrada.
- **Tratamento de Exceções**: Tratamento de exceções para erros comuns.
- **CORS**: Configuração de CORS para permitir requisições do frontend.

### Frontend
- **Interface Responsiva**: Interface amigável e responsiva para interação com as tarefas.
- **Formulário de Tarefas**: Formulário para adicionar novas tarefas.
- **Edição de Tarefas**: Possibilidade de editar tarefas existentes.
- **Exclusão de Tarefas**: Possibilidade de excluir tarefas.
- **Marcar como Concluída**: Marcar tarefas como concluídas.

## Como Rodar o Projeto

### Pré-requisitos
- **Java 17**
- **Maven**
- **Node.js**
- **PostgreSQL**

### Passos para Rodar o Backend
1. Clone o repositório:
    ```sh
    git clone https://github.com/silveira24/TodoList-projeto
    cd backend
    ```

2. Configure o banco de dados PostgreSQL:
    - Crie um banco de dados chamado [todos]
    - Atualize as credenciais do banco de dados no arquivo [application.properties]

3. Compile e rode o backend:
    ```sh
    ./mvnw spring-boot:run
    ```

### Passos para Rodar o Frontend
1. Navegue até o diretório do frontend:
    ```sh
    cd frontend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Rode o frontend:
    ```sh
    npm run dev
    ```

### Acessando a Aplicação
- O backend estará rodando em [http://localhost:8080]
- O frontend estará rodando em [http://localhost:5173]

## Estrutura do Projeto

### Backend
- [todolist]: Contém os pacotes de configuração, controladores, entidades, repositórios e serviços.
- `src/main/resources`: Contém os arquivos de configuração do Spring Boot.
- [todolist]: Contém os testes unitários.

### Frontend
- `src`: Contém os arquivos principais do frontend.
- `src/pages/home`: Contém a página principal da aplicação.
- [services]: Contém a configuração do Axios para chamadas à API.

## Licença
Este projeto está licenciado sob a licença MIT.
