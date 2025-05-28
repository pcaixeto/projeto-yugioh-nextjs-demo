# Projeto Yugioh Next.js Demo

## Visão Geral

Aplicação Next.js que consome a API Yu-Gi-Oh (db.ygoprodeck.com) para listar cartas e exibir detalhes individuais.

## Tecnologias

* Next.js 15.3 (App Router)
* React 19

## Detalhamento dos Arquivos Principais

### 1. src/app/page.js

* **Objetivo:**

  1. Busca as primeiras 8 cartas do tipo "Normal Monster" via API.
  2. Gerencia estados de carregamento, erro e dados com `useState` e `useEffect`.
  3. Renderiza:

     * Título (`<h1>`) com classe `.title`.
     * Subtítulo (`<p>`) com classe `.subtitle`.
     * Botão de filtro (`<button>`) com classe `.filter`.
     * Grade de cartas (`<div>`) usando o componente `<Card />`, com layout em grid via `.cardGrid`.

* **CSS Modules (`page.module.css`):**

  * `.container`: padding e alinhamento central
  * `.title`: tamanho e peso da fonte
  * `.subtitle`: cor secundária e margin-bottom
  * `.buttons` / `.filter`: estilo e layout dos botões de filtro
  * `.cardGrid`: grid responsivo (4 colunas → 2 tablets → 1 mobile)
  * *Media queries* adaptam padding, tipografia e colunas conforme largura da tela.

### 2. src/app/component/Card.js

* **Objetivo:** Exibe uma carta individual como link clicável:

* **CSS Modules (`Card.module.css`):**

  * `.card`: dimensões, bordas arredondadas e sombra para o container do cartão.
  * `.card img`: largura total, display block e bordas arredondadas.
  * `.cardsContainer` (opcional): grid interno para usos avançados.

### 3. src/app/\[cardName]/page.js

* **Objetivo:**

  1. Recebe `params.cardName`, decodifica espaços e caracteres especiais.
  2. Faz fetch à API para obter detalhes da carta específica.
  3. Em caso de falha, invoca `notFound()` para 404.
  4. Renderiza:

     * Nome (`<h1>`) com classe `.title`.
     * Imagem principal (`<img>`) com classe `.image`.
     * Atributos (Type, ATK, DEF, Level, Attribute, Card Code) num contêiner `.details`.
     * Descrição completa em `<p>` com classe `.description`.

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
