# VitaExpress — Sistema de Delivery de Alimentos Saudáveis

![VitaExpress Banner](https://d2xsxph8kpxj0f.cloudfront.net/310519663489084205/UvKr6qSHGGsL9eLKZPKe9u/hero-banner-Aw8eYbgx26NDF9PgNPGzX5.webp)

> Projeto acadêmico desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas — UNIVALI.

## Sobre o Projeto

O **VitaExpress** é um sistema web de delivery de alimentos saudáveis idealizado para atender microempreendedores individuais (MEIs) que trabalham com refeições saudáveis. O sistema permite ao empreendedor divulgar seus produtos e ao cliente realizar pedidos de forma prática, segura e intuitiva.

## Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Cadastro e Login | Autenticação de clientes com persistência via localStorage |
| Cardápio | Listagem de pratos com filtros por categoria e busca |
| Informações Nutricionais | Calorias, proteínas, carboidratos e gorduras por prato |
| Carrinho de Compras | Adição, remoção e ajuste de quantidades |
| Finalização de Pedido | Endereço de entrega + escolha de forma de pagamento |
| Rastreamento de Pedido | Barra de progresso animada (Recebido → Preparando → A Caminho → Entregue) |
| Dashboard | Histórico de pedidos com estatísticas do cliente |
| Perfil | Visualização e edição de dados pessoais |
| Cancelamento | Possibilidade de cancelar pedidos com status "Recebido" |

## Tecnologias Utilizadas

- **Frontend:** React 19 + TypeScript + Vite
- **Estilização:** TailwindCSS 4 + shadcn/ui
- **Roteamento:** Wouter
- **Persistência:** localStorage (sem backend)
- **Ícones:** Lucide React
- **Animações:** Framer Motion + CSS Animations

## Estrutura do Projeto

```
client/
  src/
    pages/
      Login.tsx         ← Autenticação e cadastro
      Cardapio.tsx      ← Listagem de produtos
      Pedido.tsx        ← Checkout
      PedidoRealizado.tsx ← Confirmação e rastreamento
      Dashboard.tsx     ← Histórico de pedidos
      Perfil.tsx        ← Dados do usuário
    components/
      Layout.tsx        ← Navbar + mobile bottom nav
      ProtectedRoute.tsx ← Proteção de rotas
    contexts/
      AppContext.tsx     ← Estado global (auth, cart, orders)
```

## Como Rodar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/xXGuilasXx/vita-express.git
cd vita-express

# 2. Instale as dependências
pnpm install

# 3. Rode em modo de desenvolvimento
pnpm dev

# 4. Acesse no navegador
# http://localhost:3000
```

## Equipe

| Integrante | E-mail |
|---|---|
| Guilherme Amaral Cardoso | gui.a.cardoso@edu.univali.br |
| Juliano Boaventura | juliano.8333009@edu.univali.br |
| Alisson Guilherme Formento | alisson.formento@edu.univali.br |

Projeto desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas — UNIVALI (2026).

## Licença

Este projeto é de uso acadêmico e não comercial.
