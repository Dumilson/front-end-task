#  Projecto To Do List

## Requisitos para Rodar o Projeto

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) (gerenciadores de pacotes)
- [Git](https://git-scm.com/) (para clonar o repositório)


## Passos para rodar a aplicação

### 1. Clonar o projeto do GitHub

1. Abra o terminal.
2. Navegue até o diretório onde você deseja clonar o projeto.
3. Execute o comando abaixo para clonar o repositório:

   ```bash
   git clone https://github.com/Dumilson/front-end-task.git
   ```

4. Entre no diretório do projeto:

   ```bash
   cd front-end-task
   ```

### 2. Instalar as dependências

Para instalar as dependências do projeto, execute um dos comandos abaixo, dependendo do gerenciador de pacotes que você está usando:

### Usando npm

```bash
npm install
```

### Usando yarn

```bash
yarn install
```

### 3. Configuração do `.env`

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione as seguintes variáveis de ambiente ao arquivo `.env` :

   ```env
   VITE_API_URL=http://localhost:3000/api
   VITE_API_TIMEOUT=null
   ```

   Ajuste os valores das  variáveis  conforme a configuração do seu projeto.

### 5. Iniciar o servidor de desenvolvimento

Para iniciar a aplicação em ambiente de desenvolvimento, execute o comando abaixo:

### Usando npm

```bash
npm run dev
```

### Usando yarn

```bash
yarn dev
```

