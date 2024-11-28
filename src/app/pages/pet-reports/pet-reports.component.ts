import { Chart, registerables } from 'chart.js';
import { PetService } from './../../services/pet.service';
import { Component, inject, OnInit } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-pet-reports',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './pet-reports.component.html',
  styleUrl: './pet-reports.component.css'
})
export class PetReportsComponent implements OnInit{

  chart:any;
  private petService=inject(PetService);
  constructor(){
    Chart.register(...registerables);

  }

  ngOnInit(): void {
    // Llamamos a la función para generar el gráfico después de que la vista esté inicializada
    this.generateChart();
  }
  generateChart():void{
    const data=this.petService.getPetsCountByType();
    const labels = Object.keys(data);
    const values = Object.values(data);
    console.log(labels);
    console.log(values);
      this.chart=new Chart('petChart',{
      type:'bar',
      data:{
        labels:labels,
        datasets:[{
          label:'Pets by Type',
          data:values,
          backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderWidth:1,
        }]
      }
    })

  }
}
