export interface UserAttributes {
  id?: number;
  nombres: string;
  apellidos: string;
  alias: string;
  fechaNacimiento: string;
  password?: string;
}

export interface PostAttributes {
  id?: number;
  mensaje: string;
  autorAlias: string;
  likes: number;
  fecha?: Date;
}