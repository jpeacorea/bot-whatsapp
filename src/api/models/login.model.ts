export class Login {
  private usuario: number;
  private password: number;
  private mantenerSesion: number;

  constructor(usuario: number, password: number, mantenerSesion: number) {
    this.usuario = usuario;
    this.password = password;
    this.mantenerSesion = mantenerSesion;
  }
}