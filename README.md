# MyMovies 🎬

Um aplicativo completo de catálogo de filmes desenvolvido com **React Native** e **Expo**, projetado para oferecer uma experiência fluida e rica em informações. O app consome dados das APIs **TMDB** e **OMDb** para exibir detalhes profundos, avaliações e muito mais.

## 🚀 Funcionalidades

- **Catálogo de Filmes**: Navegue por listas de filmes populares, bem avaliados e lançamentos.
- **Busca Avançada**: Encontre filmes pelo nome com resultados instantâneos.
- **Detalhes Completos**: Visualize sinopse, elenco, direção, roteiristas, estúdio e data de lançamento.
- **Sistema de Favoritos**: Salve seus filmes preferidos localmente (persisistência de dados com AsyncStorage).
- **Avaliações Múltiplas**: Veja notas do **IMDb**, **Rotten Tomatoes** e **Metacritic** (quando disponíveis).
- **Internacionalização**: Exibição de bandeiras dos países de produção.

## 🛠 Tecnologias Utilizadas

- **React Native** (com Expo SDK 50+)
- **TypeScript** (para tipagem estática e segurança)
- **React Navigation** (Stack e Bottom Tabs)
- **Axios** (Cliente HTTP)
- **Context API** (Gerenciamento de Estado Global)
- **AsyncStorage** (Persistência de Dados Local)
- **Phosphor React Native** (Ícones modernos)

## 📦 Como Rodar o Projeto

### Pré-requisitos

- Node.js (Recomendado v18 ou superior - LTS)
- npm ou yarn
- Dispositivo físico com Expo Go instalado ou Emulador (Android Studio/Xcode)

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/GustavoHenriquePirani/MyMovies.git
    cd movies
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Configuração de Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione suas chaves de API:

    ```env
    TMDB_API_KEY=sua_chave_aqui
    OMDB_API_KEY=sua_chave_aqui
    ```

4.  **Inicie o projeto:**

    ```bash
    npx expo start
    ```

5.  **No seu celular:**
    - Abra o app **Expo Go**.
    - Escaneie o QR Code exibido no terminal.

## 📱 Estrutura do Projeto

- `src/screens`: Telas da aplicação (Home, Details, MyList, Search).
- `src/components`: Componentes reutilizáveis (Cards, Header, Loading).
- `src/contexts`: Gerenciamento de estado (FavoritesContext).
- `src/services`: Configuração do Axios e chamadas à API.
- `src/routes`: Configuração de navegação (Stack e Tabs).
- `src/utils`: Funções auxiliares e formatadores.

---

Desenvolvido por **Gustavo Henrique Pirani**.
