export class PDF {
    constructor(
        public TipoDoc: string,
        public NumConsecutivo: string,
        public ClaveNumerica: string,
        public token: string,
        public entidad: string,
        public formatoPDF: string,
    ) {
        this.TipoDoc = TipoDoc;
        this.NumConsecutivo = NumConsecutivo;
        this.ClaveNumerica = ClaveNumerica;
        this.token = token;
        this.entidad = entidad;
        this.formatoPDF = formatoPDF;
    }

}
