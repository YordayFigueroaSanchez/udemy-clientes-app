import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { map, catchError } from 'rxjs/operators'
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Context':'application/json'});

  constructor(private http:HttpClient,
    private router:Router) { }

  getClientes():Observable<Cliente[]> {
    /* return of(CLIENTES); */
    /* return this.http.get<Cliente[]>(this.urlEndPoint); */
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');  
        return throwError(e);
      })
    );
  }

  getCliente(id: String):Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        this.router.navigate(['/clientes']);
        swal.fire('Error al editar',e.error.mensaje,'error');  
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente) : Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');  
        return throwError(e);
      })
    );
  }

  delete(id: number) : Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        console.log(e.error.mensaje);
        swal.fire(e.error.mensaje,e.error.error,'error');  
        return throwError(e);
      })
    );
  }
}
