import { Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Login } from '../interfeces/login'
import { Observable } from 'rxjs';
import { Sesion } from '../interfeces/sesion';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl:string = enviroment.apiUrl + 'usuario/';

  constructor(private http:HttpClient) { }

  iniciarSesion(request: Login): Observable<Sesion>{
    return this.http.post<Sesion>(`${this.baseUrl}login`,request);
  }
}