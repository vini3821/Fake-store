# Plataforma E-commerce React

## Descrição do Projeto

Uma solução sofisticada de e-commerce construída com React e TypeScript, oferecendo uma experiência de compra completa com navegação de produtos, visualizações detalhadas de produtos e autenticação segura de usuários. Este projeto demonstra padrões avançados de desenvolvimento frontend e integração com APIs externas.

## Tecnologias Principais

- **React** (v18.2.0): Biblioteca frontend para construção da interface do usuário
- **TypeScript** (v5.2.0): Para código com tipagem segura e experiência de desenvolvedor aprimorada
- **Material UI** (v5.14.0): Biblioteca de componentes que fornece elementos de UI elegantes
- **React Router** (v6.20.0): Para navegação perfeita entre as visualizações da aplicação
- **Axios** (v1.6.0): Cliente HTTP baseado em promises para comunicação com API
- **Vite** (v5.0.0): Ferramentas frontend de próxima geração para desenvolvimento mais rápido

## Requisitos do Sistema

- Node.js (v16 ou mais recente)
- npm (v8 ou mais recente) ou yarn

## Processo de Instalação

Siga estas etapas para configurar o ambiente de desenvolvimento:

```bash
# Etapa 1: Obtenha o código-fonte
git clone https://github.com/sua-organizacao/plataforma-ecommerce-react.git

# Etapa 2: Navegue até a pasta do projeto
cd plataforma-ecommerce-react

# Etapa 3: Instale as dependências do projeto
npm install
# Alternativa com yarn
yarn install

# Etapa 4: Inicie o servidor de desenvolvimento
npm run dev
# Alternativa com yarn
yarn dev
```

Após a execução, acesse a aplicação em `http://localhost:5173` no seu navegador.

## Arquitetura do Projeto

A aplicação segue uma arquitetura modular com clara separação de responsabilidades:

```
src/
├── components/          # Blocos de construção de UI reutilizáveis
│   ├── ProtectedRoute/  # Componente de proteção de autenticação
│   └── ProfileAvatar/   # Componente de avatar do usuário
├── pages/               # Contêineres de visualização da aplicação
│   ├── Login/           # Interface de autenticação
│   ├── Products/        # Interface de catálogo de produtos
│   └── ProductDetail/   # Visualização detalhada do produto
├── services/            # Camada de interação com API externa
├── assets/              # Recursos estáticos
└── utils/               # Funções auxiliares
```

## Sistema de Autenticação

A plataforma implementa autenticação baseada em token com persistência de sessão:

- **Armazenamento de Token**: localStorage do navegador para persistência de sessão
- **Rotas Protegidas**: Seções que requerem autenticação são protegidas
- **Credenciais de Login**: O acesso é gerenciado através da FakeStoreAPI

Para testes de desenvolvimento, use:
- **Nome de usuário**: admin123
- **Senha**: 123admin

## Gerenciamento de Dados

Os dados dos produtos são obtidos da FakeStoreAPI, fornecendo:
- Catálogo de produtos com imagens, descrições e categorias
- Detalhes individuais de produtos
- Endpoints de autenticação

## Recursos da Interface do Usuário

- **Design Responsivo**: Adapta-se a visualizações em dispositivos móveis, tablets e desktops
- **Material Design**: Segue princípios modernos de UI/UX
- **Elementos Interativos**: Tabelas dinâmicas, cards e componentes de navegação
- **Estados de Carregamento**: Feedback claro durante operações assíncronas

## Opções de Personalização

### Modificação de Tema

O design visual pode ser personalizado editando a configuração do tema em `src/main.tsx`:

```typescript
const theme = createTheme({
  palette: {
    // Modifique os esquemas de cores aqui
    primary: {
      main: '#5c6bc0', // Altere para a cor da sua marca
    },
    // Opções adicionais de paleta
  },
  // Tipografia, estilos de componentes, etc.
});
```

### Substituição da Fonte de Dados

Para integrar com uma API de produtos diferente:

1. Modifique a URL base da API em `src/services/api.ts`
2. Garanta a compatibilidade da estrutura de dados ou adapte as definições de interface

## Implantação em Produção

Prepare a aplicação para ambientes de produção:

```bash
# Gere build otimizado
npm run build
# ou
yarn build

# Visualize o build de produção localmente (opcional)
npm run preview
# ou
yarn preview
```

A aplicação compilada estará disponível no diretório `dist`.

## Licença

Este projeto está disponível sob a Licença MIT.