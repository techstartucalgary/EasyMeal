export interface IngredientsResponse {
  results?: Result[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface Result {
  id: number;
  name: string;
  image: string;
}

export interface SearchIngredientsProps {
  query: string;
}
