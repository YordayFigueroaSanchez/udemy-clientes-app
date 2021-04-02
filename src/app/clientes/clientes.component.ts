import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes : Cliente[] = [];


  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().pipe(
      tap(clientes => {
        console.log('tap 3 - ClienteComponent');
        
        clientes.forEach(element => {
          console.log(element.nombre);
        });
      })
    )
    .subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    swalWithBootstrapButtons.fire({
      title: 'Eliminando cliente...',
      text: `Se elimina el cliente ${cliente.apellido},${cliente.nombre} !!!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminarlo',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(

          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Eliminado.',
              `El cliente ${cliente.apellido},${cliente.nombre} fue eliminado`,
              'success'
            )
          }
        )
      }
    })
  }

}
