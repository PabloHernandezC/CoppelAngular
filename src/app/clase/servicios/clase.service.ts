import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { ApiResponse } from '../../compartido/interfaces/api-response';
import { Observable } from 'rxjs';
import { Clase } from '../interfaces/clase';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  baseUrl: string = enviroment.apiUrl + 'Clase/'

  constructor(
    private http: HttpClient
  ) { }

  lista(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl + 'ObtenerLista'}`);
  }

  obtenerId(id:number): Observable<ApiResponse>{
    let nURL = this.baseUrl + 'ObtenerId/' + id;
    return this.http.get<ApiResponse>(`${nURL}`);
  }
  
  crear(request:Clase): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl + 'Agregar'}`,request);
  }

  editar(request:Clase): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.baseUrl + 'Editar'}`,request);
  }

  eliminar(id:number): Observable<ApiResponse>{
    let nURL = this.baseUrl + 'Eliminar/' + id;
    return this.http.delete<ApiResponse>(`${nURL}`);
  }
}
