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
      cliente => {

        this.router.navigate(['/clientes'])
        swal.fire('Nuevo Cliente',`Clente ${cliente.nombre} se agregado con exito.`,'success')

      }
    )
  }

  public update() : void {
    this.clienteService.update(this.cliente).subscribe(
      cliente => {

        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado',`Clente ${cliente.nombre} se actualizo con exito.`,'success')

      }
    )
  }

}
