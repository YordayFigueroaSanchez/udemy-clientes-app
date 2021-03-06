import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public titulo:string = "Crear Cliente"

  public errores: string[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  public cargarCliente() : void {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id']
        if (id) {
          this.clienteService.getCliente(id).subscribe(
            (cliente) => this.cliente = cliente
          )
        }
      }
    )
  }

  public create() : void {
    // console.log("clicked");
    // console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      json => {

        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente',`Clente ${json.cliente.nombre} se agregado con exito.`,'success')

      },
      err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
        
        }
    )
  }

  public update() : void {
    this.clienteService.update(this.cliente).subscribe(
      cliente => {

        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado',`Clente ${cliente.nombre} se actualizo con exito.`,'success')

      },
      err => {
        this.errores = err.error.errors as string[];
        console.log(err.error.errors);
        
        }
    )
  }

}
