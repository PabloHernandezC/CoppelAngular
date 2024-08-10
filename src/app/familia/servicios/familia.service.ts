import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../compartido/interfaces/api-response';
import { Observable } from 'rxjs';
import { Familia } from '../interfaces/familia';

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  baseUrl: string = enviroment.apiUrl + 'Familia/'

  constructor(
    private http: HttpClient
  ) { }

  lista(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${this.baseUrl + 'ObtenerLista'}`);
  }

  obternerId(id:number): Observable<ApiResponse>{
    let nURL = this.baseUrl + 'ObtenerId/' + id;
    return this.http.get<ApiResponse>(`${nURL}`);
  }
  
  crear(request:Familia): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${this.baseUrl+ 'Agregar'}`,request);
  }

  editar(request:Familia): Observable<ApiResponse>{
    return this.http.put<ApiResponse>(`${this.baseUrl + 'Editar'}`,request);
  }

  eliminar(id:number): Observable<ApiResponse>{
    let nURL = this.baseUrl + 'Eliminar/' + id;
    return this.http.delete<ApiResponse>(`${nURL}`);;
  }
}
