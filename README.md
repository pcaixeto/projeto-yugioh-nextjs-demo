# Projeto Yugioh Next.js Demo

## Visão Geral

Aplicação Next.js que consome a API Yu-Gi-Oh (db.ygoprodeck.com) para listar cartas e exibir detalhes individuais.

## Tecnologias

* Next.js 15.3 (App Router)
* React 19
* Fetch API
* ESLint

## Estrutura de Pastas Principais

```bash
.
├── public/                   # Arquivos estáticos (favicon, imagens)
├── src/
│   └── app/                  # App Router (Next.js)
│       ├── layout.js         # Root Layout (estrutura HTML e import global de estilos)
│       ├── page.module.css   # CSS Module para a Home (page.js)
│       ├── page.js           # Home Page (lista de cartas)
│       ├── component/        # Componentes reutilizáveis
│       │   ├── Card.js       # Componente Card
│       │   └── Card.module.css # CSS Module para o Card
│       └── [cardName]/       # Rota dinâmica de detalhes
│           ├── page.module.css # CSS Module para detalhes de carta
│           └── page.js         # Dynamic Page (detalhes da carta)
├── .gitignore                # Arquivos e pastas ignorados pelo Git
├── package.json              # Dependências e scripts
└── README.md                 # Documentação do projeto
```

## Detalhamento dos Arquivos Principais

### 1. src/app/layout.js

* **Tipo:** Server Component
* **Objetivo:** Envolve todas as rotas criando a estrutura básica de HTML (`<html>`, `<body>`) e importa estilos globais (se houver `globals.css`).
* **Exemplo de Uso:**

```js
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
```

### 2. src/app/page.js

* **Tipo:** Client Component (`"use client"`)
* **Objetivo:**

  1. Busca as primeiras 8 cartas do tipo "Normal Monster" via API.
  2. Gerencia estados de carregamento, erro e dados com `useState` e `useEffect`.
  3. Renderiza:

     * Título (`<h1>`) com classe `.title`.
     * Subtítulo (`<p>`) com classe `.subtitle`.
     * Botão de filtro (`<button>`) com classe `.filter`.
     * Grade de cartas (`<div>`) usando o componente `<Card />`, com layout em grid via `.cardGrid`.
* **Importa:**

  ```js
  import styles from "./page.module.css";
  import Card from "./component/Card";
  ```
* **CSS Modules (`page.module.css`):**

  * `.container`: padding e alinhamento central
  * `.title`: tamanho e peso da fonte
  * `.subtitle`: cor secundária e margin-bottom
  * `.buttons` / `.filter`: estilo e layout dos botões de filtro
  * `.cardGrid`: grid responsivo (4 colunas → 2 tablets → 1 mobile)
  * *Media queries* adaptam padding, tipografia e colunas conforme largura da tela.

### 3. src/app/component/Card.js

* **Tipo:** Client Component
* **Objetivo:** Exibe uma carta individual como link clicável:

  ```js
  export default function Card({ image, name }) {
    const cardName = encodeURIComponent(name);
    return (
      <Link href={`/${cardName}`} className={styles.card}>
        <img src={image.image_url_small} alt={name} />
        <p>{name}</p>
      </Link>
    );
  }
  ```
* **Importa:**

  ```js
  import Link from 'next/link';
  import styles from './Card.module.css';
  ```
* **CSS Modules (`Card.module.css`):**

  * `.card`: dimensões, bordas arredondadas e sombra para o container do cartão.
  * `.card img`: largura total, display block e bordas arredondadas.
  * `.cardsContainer` (opcional): grid interno para usos avançados.

### 4. src/app/\[cardName]/page.js

* **Tipo:** Server Component
* **Objetivo:**

  1. Recebe `params.cardName`, decodifica espaços e caracteres especiais.
  2. Faz fetch à API para obter detalhes da carta específica.
  3. Em caso de falha, invoca `notFound()` para 404.
  4. Renderiza:

     * Nome (`<h1>`) com classe `.title`.
     * Imagem principal (`<img>`) com classe `.image`.
     * Atributos (Type, ATK, DEF, Level, Attribute, Card Code) num contêiner `.details`.
     * Descrição completa em `<p>` com classe `.description`.
* **Importa:**

  ```js
  import { notFound } from 'next/navigation';
  import styles from './page.module.css';
  ```
* **CSS Modules (`page.module.css`):**

  * `.container`: padding lateral e largura máxima centralizada.
  * `.title`: tipografia de destaque.
  * `.image`: tamanho máximo e sombra.
  * `.details`: layout flex-column para listar atributos.
  * `.description`: texto corrido com `line-height`.
  * *Media queries* para responsividade (tablets e mobile).

## Scripts Disponíveis

```bash
npm run dev    # Inicia o servidor de desenvolvimento
npm run build  # Gera build de produção
npm run start  # Executa em produção
npm run lint   # Roda ESLint
```

## Execução Rápida

1. `npm install`
2. `npm run dev`
3. Acesse `http://localhost:3000`
