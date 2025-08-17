import { externalApi } from '../config/axios';
import { Login } from '../models/login.model';
import { Cliente } from '../models/cliente.model';
import dotenv from 'dotenv';
import { Producto } from '../models/producto.model';
import { ProductoResponse } from '../models/producto.response';
import { Procesar } from '../models/procesar.model';
import { ProcesarResponse } from '../models/procesar.response';
import { PDF } from '../models/descargar_pdf.model';
import { PDFResponse } from '../models/descargar_pdf.response';
dotenv.config();

/**
 * Inicio de sesión
 * @param loginData  Login
 * @returns 
 */
export async function getLogin(loginData: Login) {
    try {
        const response: LoginResponse = await externalApi.post(process.env.INICIO_SESION, loginData);
        return response;
    } catch (error) {
        console.error('Error during login request:', error);
        throw error;
    }
}

/**
 * Obtiene la información del cliente.
 * @param cliente Cliente
 * @returns 
 */
export async function getCliente(cliente: Cliente) {
    try {
        const response: ClienteResponse = await externalApi.post(process.env.CLIENTES, cliente);
        return response;
    } catch (error) {
        console.error('Error during cliente request:', error);
        throw error;
    }
}

/**
 * Obtiene la información de productos.
 * @param producto Producto
 * @returns 
 */
export async function getProductos(producto: Producto) {
    try {
        const response: ProductoResponse = await externalApi.post(process.env.PRODUCTOS, producto);
        return response;
    } catch (error) {
        console.error('Error during productos request:', error);
        throw error;
    }
}

/**
 * Procesa la orden
 * @param procesar Procesar
 * @returns 
 */
export async function ProcesarOrden(procesar: Procesar) {
    try {
        const response: ProcesarResponse = await externalApi.post(process.env.PROCESAR_ORDEN, procesar);
        return response;
    } catch (error) {
        console.error('Error during procesar request:', error);
        throw error;
    }
}

export async function getPDF(pdf: PDF) {
    try {
        const response: PDFResponse = await externalApi.post(process.env.DESCARGAR_PDF, pdf);
        return response;
    } catch (error) {
        console.error('Error during pdf request:', error);
        throw error;
    }
}