import { Producto } from "../models/producto.model";
import {getProductos } from "../services/external-api.service";

export async function fetchProductos(producto: Producto) {
     try {
         const response = await getProductos(producto);
         return response;
     } catch (error) {
         console.error('Error during productos request:', error);
         throw error;
     }
 }