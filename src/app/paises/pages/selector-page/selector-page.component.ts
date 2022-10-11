import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm : FormGroup = this.fb.group({
    region : ['', Validators.required],
    pais : ['', Validators.required],
    frontera : ['', Validators.required],
  })

  regiones : string[] = [];
  paises : PaisSmall[] =[];
  fronteras : string[] =[];

  cargando : boolean = false;

  constructor( private fb: FormBuilder, private paisesService : PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //Cuando cambio la region
    this.myForm.get('region')?.valueChanges
    .pipe(
      tap(( _ ) => { //tap permite transformar la data recibida 
        this.myForm.get('pais')?.reset('');
        this.cargando = true;
      }),
      //swithMap recibe el valor del primer Observable y ejecuta otro
      switchMap( region => this.paisesService.getCountriesByRegion(region))
    )
    .subscribe(paises  =>{
    this.paises = paises ;
    this.cargando = false;    
    })

    //Cuando cambio el pais
    this.myForm.get('pais')?.valueChanges
    .pipe(
      tap(() => {
        this.myForm.get('frontera')?.reset('');
        this.cargando = true;

      }),
      switchMap( codigo => this.paisesService.getCountrieByCode(codigo) )
    )
    .subscribe( pais => { 
      (pais) ? this.fronteras = pais[0]?.borders : this.fronteras = [];
      this.cargando = false;    

    })

  }

  save(){
    console.log(this.myForm.value)
  }
}
