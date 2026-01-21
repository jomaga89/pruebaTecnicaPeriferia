export interface User {
  nombres: string;
  apellidos: string;
  alias: string;
  fechaNacimiento: string;
}

export interface Post {
  id: number;
  mensaje: string;
  autorAlias: string;
  likes: number;
  createdAt: string;
}