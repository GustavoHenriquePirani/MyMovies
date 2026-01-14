
/**
 * Traduz manualmente termos comuns de prêmios do inglês para o português.
 * @param text Texto em inglês
 * @returns Texto traduzido manualmente
 */
export function translatePremios(text: string): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .replace(/wins/gi, 'vitórias')
    .replace(/win/gi, 'vitória')
    .replace(/won/gi, 'Venceu')
    .replace(/&/g, 'e')
    .replace(/nomination total/gi, 'nomeação no total')
    .replace(/nominations total/gi, 'nomeações no total')
    .replace(/Nominated for/gi, 'Nomeado para')
    .replace(/nominations/gi, 'nomeações');
}

export function translateGenres(genres: string): string {
    const genreMap: { [key: string]: string } = {
      Action: "Ação",
      Adventure: "Aventura",
      Animation: "Animação",
      Comedy: "Comédia",
      Crime: "Crime",
      Documentary: "Documentário",
      Drama: "Drama",
      Family: "Família",
      Fantasy: "Fantasia",
      History: "História",
      Horror: "Terror",
      Music: "Musical",
      Mystery: "Mistério",
      Romance: "Romance",
      "Science Fiction": "Ficção Científica",
      Short: "Curta-metragem",
      Sport: "Esporte",
      "TV Movie": "Filme para TV",
      Thriller: "Suspense",
      War: "Guerra",
      Western: "Faroeste",
    };
    return genres
      .split(", ")
      .map((genre) => genreMap[genre.trim()] || genre)
      .join(", ");
  };

  // Função para traduzir países do inglês para português
export function translateCountry(countries: string): Array<{ original: string; traducao: string }> {
  const countryMap: { [key: string]: string } = {
    "United States": "Estados Unidos",
    "United States of America": "Estados Unidos",
    India: "Índia",
    China: "China",
    Japan: "Japão",
    Nigeria: "Nigéria",
    "South Korea": "Coreia do Sul",
    France: "França",
    Brazil: "Brasil",
    Germany: "Alemanha",
    Italy: "Itália",
    "United Kingdom": "Reino Unido",
    Russia: "Rússia",
    Mexico: "México",
  };
  return countries
    .split(", ")
    .map((country) => ({
      original: country.trim(),
      traducao: countryMap[country.trim()] || country.trim(),
    }));
}
