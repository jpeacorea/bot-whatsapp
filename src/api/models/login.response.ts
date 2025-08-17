interface LoginResponse {
  success: boolean;
  usuario: Usuario;
  mantenerSesion: boolean;
}

interface Usuario {
  Entidad: string;
  Usuario: string;
  Password: string;
  Nombre: string;
  Activo: string;
  NombreLegal: string;
  Telefono: string;
  Fax: string;
  Direccion: string;
  Correo: string;
  RotuloLegal: string;
  Imagen: string;
  Token: string;
}