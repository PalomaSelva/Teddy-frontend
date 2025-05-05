# Micro Frontend Angular

Este projeto é uma aplicação Angular que utiliza a arquitetura de Micro Frontends, permitindo o desenvolvimento e deploy independente de diferentes partes da aplicação.

## 🌐 URLs

### Produção
- Aplicação: [https://v0-teddy-six.vercel.app/](https://v0-teddy-six.vercel.app/)

### Desenvolvimento
- Host: http://localhost:4200
- MF Login: http://localhost:4201
- MF Customers: http://localhost:4202

## 🚀 Tecnologias Utilizadas

### Core
- Angular 19
- TypeScript
- RxJS
- Webpack Module Federation

### UI/UX
- Bootstrap 5
- Font Awesome
- Ngx Mask
- Ngx Spinner
- SweetAlert2

### Desenvolvimento
- ESLint
- Prettier
- Conventional Commits

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 9 ou superior)
- Angular CLI (versão 19)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

Para rodar o projeto em modo de desenvolvimento:

```bash
# Inicia o host e todos os micro frontends
npm run start:all

# Ou para rodar apenas o host
ng serve host

# Para rodar apenas um micro frontend específico
ng serve mf-login
ng serve mf-customers
```

O projeto estará disponível em:
- Host: http://localhost:4200
- MF Login: http://localhost:4201
- MF Customers: http://localhost:4202

### Build

Para criar uma build de produção:

```bash
# Build de todos os projetos
npm run build:all

# Build apenas do host
npm run build:host

# Build de um micro frontend específico
npm run build:mf-login
npm run build:mf-customers
```

## 🧪 Testes

### Executando os Testes Unitários

```bash
# Executa todos os testes unitários
npm run test:all

# Testes de um projeto específico
ng test host
ng test mf-login
ng test mf-customers
```

### Executando os Testes E2E (Cypress)

1. Inicie a aplicação (todos os micro frontends):
```bash
npm run start:all
```

2. Em outro terminal, rode o Cypress:
```bash
# Para abrir a interface do Cypress
npm run cypress:open

# Para rodar os testes E2E em modo headless
npm run cypress:run
```

Os testes E2E estão localizados em `cypress/e2e/`.

### Estrutura dos Testes

Os testes estão organizados seguindo as melhores práticas do Angular:
- Testes unitários para serviços e componentes
- Mocks para serviços externos
- Testes E2E com Cypress para fluxos completos da aplicação

## 📁 Estrutura do Projeto

```
projects/
├── host/                 # Aplicação principal
├── mf-login/            # Micro frontend de Login
└── mf-customers/        # Micro frontend de Clientes
```

## 🔄 Fluxo de Desenvolvimento

1. Desenvolvimento local:
   - Cada micro frontend pode ser desenvolvido independentemente
   - Use `npm run start:all` para desenvolvimento local

2. Integração:
   - Os micro frontends são integrados através do host
   - O host gerencia o carregamento dinâmico dos módulos

3. Deploy:
   - Cada micro frontend pode ser deployado separadamente
   - O host precisa ser atualizado com as novas versões dos micro frontends





