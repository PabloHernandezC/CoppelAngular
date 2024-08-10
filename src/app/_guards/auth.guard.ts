import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CompartidoService } from '../compartido/compartido.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const compartidoService = inject(CompartidoService);
  const router = inject(Router);

  const usuarioToken = compartidoService.obtenerSesion();

  if(usuarioToken != null){
    return true
  } else {
    router.navigate(['login']);
    return false;  
  }
  
};
