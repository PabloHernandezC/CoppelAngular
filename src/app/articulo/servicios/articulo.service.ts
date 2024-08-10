import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../compartido/interfaces/api-response';
import { Articulo } from '../interfaces/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

   baseUrl: string = enviroment.apiUrl + 'Articulo/'

  constructor(
    private http:HttpClient
  ) { }

  lista(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl + 'ObtenerLista'}`);
  }

  obtenerSku(id:number): Observable<ApiResponse>{
    let nURL = this.baseUrl + 'ObtenerSku/' + id;
    return this.http.get<ApiResponse>(`${nURL}`);
  }
  
  crear(request:Articulo): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl + 'Agregar'}`,request);
  }

  editar(request:Articulo): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.baseUrl + 'Editar'}`,request);
  }

  eliminar(id:number): Observable<ApiResponse>{
    let nURL = this.baseUrl + 'Eliminar/' + id;
    return this.http.delete<ApiResponse>(`${nURL}`);
  }

  existeSku(Sku:number): Observable<ApiResponse>{
    let nURL = this.baseUrl + 'ExisteSku/' + Sku;
    return this.http.get<ApiResponse>(`${nURL}`);
  }
}
