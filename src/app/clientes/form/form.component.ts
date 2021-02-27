import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
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

}
