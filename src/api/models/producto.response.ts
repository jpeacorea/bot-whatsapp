export class ProductoResponse {
    constructor(
        public draw:            number,
        public recordsTotal:    number,
        public recordsFiltered: number,
        public data:            Datum[]
    ) {
        this.draw = draw;
        this.recordsTotal = recordsTotal;
        this.recordsFiltered = recordsFiltered;
        this.data = data;
    }
}

export class Datum {
    constructor(
        public CodigoProducto:           number,
        public CodigoProductoPadre:      number,
        public CodigoProductoReferencia: number,
        public CodigoProductoSurtido:    number,
        public Descripcion:              string,
        public Impuesto:                 number,
        public PrecioUni:                number,
        public PorcDescuento:            number,
        public CodigoCabys:              string,
        public CodigoFamilia:            string,
        public EsServicio:               string,
        public PartidaArancelaria:       string,
        public GTIN13:                   string,
        public GTIN14:                   string,
        public Unidad:                   string,
        public FechaCreacion:            string,
        public Existencia:               string,
        public RegistroMedicamento:      string,
        public CodigoFormaFarmaceutica:  string
    ) {
        this.CodigoProducto = CodigoProducto;
        this.CodigoProductoPadre = CodigoProductoPadre;
        this.CodigoProductoReferencia = CodigoProductoReferencia;
        this.CodigoProductoSurtido = CodigoProductoSurtido;
        this.Descripcion = Descripcion;
        this.Impuesto = Impuesto;
        this.PrecioUni = PrecioUni;
        this.PorcDescuento = PorcDescuento;
        this.CodigoCabys = CodigoCabys;
        this.CodigoFamilia = CodigoFamilia;
        this.EsServicio = EsServicio;
        this.PartidaArancelaria = PartidaArancelaria;
        this.GTIN13 = GTIN13;
        this.GTIN14 = GTIN14;
        this.Unidad = Unidad;
        this.FechaCreacion = FechaCreacion;
        this.Existencia = Existencia;
        this.RegistroMedicamento = RegistroMedicamento;
        this.CodigoFormaFarmaceutica = CodigoFormaFarmaceutica;
    }
}
