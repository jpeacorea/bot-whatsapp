export class Filter {
    constructor(
        public AttributeName: string,
        public FilterType: string,
        public FilterValue: string,
        public StartDate: string,
        public EndDate: string
    ) {
        this.AttributeName = AttributeName;
        this.FilterType = FilterType;
        this.FilterValue = FilterValue;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
    }
}

export class Producto {
    constructor(
        public Draw: number,
        public Start: number,
        public Length: number,
        public SortColumn: string,
        public SortDirection: string,
        public Filters: Filter[],
        public token: string,
        public entidad: string
    ) {
        this.Draw = Draw;
        this.Start = Start;
        this.Length = Length;
        this.SortColumn = SortColumn;
        this.SortDirection = SortDirection;
        this.Filters = Filters;
        this.token = token;
        this.entidad = entidad;
    }
}
