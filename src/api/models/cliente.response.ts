interface ClienteResponse {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: Datum[];
}

interface Datum {
  CodigoCliente: string;
  NombreCliente: string;
  CodigoZona: number;
  Direccion: string;
  Correo: string;
  Telefono: string;
  Cedula: string;
  Moneda: string;
  Plazo: string;
  OrdenCompra: string;
  TipoIdentificacion: string;
  Condicion: string;
  Pais: string;
  Extranjero: string;
  CodigoAgente: string;
  EnviarFactura: string;
  EnviarFacturaFE: string;
  Inactivo: string;
  TipoServicio: string;
  CorreosEnvioRecibo: string;
  NumeroAreaTelefono: string;
  FechaCreacion: string;
  Provincia: string;
  Canton: string;
  Distrito: string;
  Barrio: string;
  Saldo: number;
  Observaciones: string;
  ActividadEconomica: string;
}