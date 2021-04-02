import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError} from 'rxjs';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { map, catchError, tap } from 'rxjs/operators'
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';


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
      tap(response =>{
        console.log('tap 1 - ClienteService');
        let clientes = response as Cliente[];
        clientes.forEach(element => {
          console.log(element.nombre);
        });
      }),
      map( response => {
        let clientes = response as Cliente[];
        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          // cliente.createAt = formatDate(cliente.createAt,'EEEE dd, MMMM yyyy','es');
          let datePipe = new DatePipe('en-US');
          // cliente.createAt = datePipe.transform(cliente.createAt,'dd/MM/yyyy');
          return cliente;
        });
      }),
      tap(response =>{
        console.log('tap 2 - ClienteService');
        
        response.forEach(element => {
          console.log(element.nombre);
        });
      })
    );
  }

  create(cliente: Cliente) : Observable<any> {
    return this.http.post<any>(this.urlEndPoint, cliente, {headers:this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);  
        }
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
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
      map( (response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);  
        }
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
