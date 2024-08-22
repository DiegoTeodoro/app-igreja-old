export interface Usuario {
  id: number;
  login: string;
  senha?: string;
  token?: string;  // Certifique-se de que essa linha está presente
}