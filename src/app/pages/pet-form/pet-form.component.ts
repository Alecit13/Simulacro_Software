import { PetService } from './../../services/pet.service';
import { inject } from '@angular/core';
import { PetBody } from './../../shared/models/pet-body.model';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'; 
@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, 
   MatCardModule,MatFormFieldModule,MatSelectModule,
    MatInputModule,MatButtonModule,MatTableModule, 
  ],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
  petForm:FormGroup;
  petTypes: string[] = ['Dog', 'Cat', 'Bird', 'Fish', 'Reptile'];
  displayedColumns: string[] = ['name', 'type', 'breed', 'age'];
  dataSource = new MatTableDataSource<PetBody>();
  selectedPetType:string='';
  totalPets:number=0;
  averageAge:number=0;
  private fb=inject(FormBuilder);
  private petService=inject(PetService);
  constructor(){
    this.petForm=this.fb.group({
      name:['',Validators.required],
      type:['',Validators.required],
      breed:['',Validators.required],
      age:[null,[Validators.required,Validators.min(0)]],
    });
  }
  onSubmit():void{ 
    if(this.petForm.valid){
      const {name,type,age,breed}=this.petForm.value;
      const newPet:PetBody={name,type,age,breed};
      this.petService.addPet(newPet);
      this.updateData();
      this.petForm.reset();
    }

  }
  updateData():void{
    this.dataSource.data=this.petService.getPets();
    this.updateStatistics();
  }
  updateStatistics():void{
    this.totalPets=this.petService.getTotalPets();
    this.averageAge=this.petService.getAvgAge();
  }
  filterByType(type:string):void{
    this.selectedPetType=type;
    if(type===''){
      this.dataSource.data=this.petService.getPets();
    }else{
      const filteredPets=this.petService.getPetsByType(type);
      this.dataSource.data=filteredPets;
    }

  }

}
