export interface Articulo {
    idArticulo: number,
    sku: number,
    article: string,
    marca: string,
    modelo: string,
    idDepartamento: number,
    nombreDepartamento: string,
    idClase: number,
    nombreClase: string,
    idFamilia: number,
    nombreFamilia: string,
    stock: number,
    cantidad: number,
    descontinuado: number,
    fechaAlta: Date,
    fechaBaja: Date
}

export interface TipoArticulo {
    nuevoSKU : string,
    nuevoArticulo?: Articulo
}
