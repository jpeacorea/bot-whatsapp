export class ProcesarResponse {
    constructor(
        public Estatus: string,
        public Errores: string,
        public CodigoUnico: string,
        public Consecutivo: string,
        public ClaveNumerica: string
    ) {
        this.Estatus = Estatus;
        this.Errores = Errores;
        this.CodigoUnico = CodigoUnico;
        this.Consecutivo = Consecutivo;
        this.ClaveNumerica = ClaveNumerica;
    }   
}
