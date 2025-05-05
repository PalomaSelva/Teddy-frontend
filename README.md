# Micro Frontend Angular - Teddy Open Finance

Este projeto é um desafio técnico para a Teddy Open Finance, implementado como uma aplicação Angular utilizando a arquitetura de Micro Frontends. O objetivo é demonstrar conhecimentos em desenvolvimento frontend, arquitetura de software e boas práticas de programação.


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
- @angular-architects/native-federation

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
├── host/                 # Aplicação principal (Container)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Componentes compartilhados
│   │   │   └── services/      # Serviços compartilhados
│   │   └── assets/           # Recursos estáticos
├── mf-login/            # Micro frontend de Login
│   ├── src/
│   │   └── app/
│   │       ├── components/    # Componentes de login
│   │       └── services/      # Serviços de autenticação
└── mf-customers/        # Micro frontend de Clientes
    ├── src/
    │   └── app/
    │       ├── components/    # Componentes de gerenciamento de clientes
    │       └── services/      # Serviços de clientes
```

## 🔄 Fluxo de Desenvolvimento

1. Desenvolvimento local:
   - Cada micro frontend pode ser desenvolvido independentemente
   - Use `npm run start:all` para desenvolvimento local
   - Implemente as funcionalidades seguindo os requisitos especificados

2. Integração:
   - Os micro frontends são integrados através do host
   - O host gerencia o carregamento dinâmico dos módulos
   - Implemente a navegação entre as telas conforme especificado

3. Deploy:
   - Cada micro frontend pode ser deployado separadamente
   - O host precisa ser atualizado com as novas versões dos micro frontends
   - Garanta que todas as funcionalidades estejam operacionais em produção

## 🎯 Critérios de Avaliação

- Implementação correta da arquitetura de Micro Frontends
- Qualidade do código e organização do projeto
- Funcionalidades implementadas conforme especificado
- Experiência do usuário e interface responsiva
- Tratamento de erros e validações
- Testes unitários e E2E
- Documentação do código e do projeto





