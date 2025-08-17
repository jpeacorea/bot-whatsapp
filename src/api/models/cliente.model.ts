export class Filter {
  AttributeName: string;
  FilterType: string;
  FilterValue: string;
  StartDate: string;
  EndDate: string;

  constructor(
    AttributeName: string,
    FilterType: string,
    FilterValue: string,
    StartDate: string,
    EndDate: string) {
    this.AttributeName = AttributeName;
    this.FilterType = FilterType;
    this.FilterValue = FilterValue;
    this.StartDate = StartDate;
    this.EndDate = EndDate;
  }
}

export class Cliente {
  Draw: number;
  Start: number;
  Length: number;
  SortColumn: string;
  SortDirection: string;
  Filters: Filter[];
  token: string;
  entidad: string;

  constructor(
    Draw: number,
    Start: number,
    Length: number,
    SortColumn: string,
    SortDirection: string,
    Filters: Filter[],
    token: string,
    entidad: string) {
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