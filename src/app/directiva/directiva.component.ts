import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

  listaCurso: string[] = ['Curso 01', 'Curso 02', 'Curso 03', 'Curso 04', 'Curso 05'];
  habilitar = true;

  constructor() { }

  ngOnInit(): void {
  }

  setHabilitar(){
    this.habilitar = !this.habilitar;
  }

}
