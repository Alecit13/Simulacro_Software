import { Injectable } from "@angular/core";
import { PetBody } from "../shared/models/pet-body.model";

@Injectable({providedIn: 'root'})
export class PetService {
    private pets:PetBody[]=[];

    constructor(){}

    addPet(pet:PetBody):void{
        this.pets.push(pet);
    }
    getPets():PetBody[]{
        return this.pets;
    }
    getPetsByType(type:string):PetBody[]{
        return this.pets.filter(pet=>pet.type===type);
    }
    getTotalPets():number{
        return this.pets.length;
    }
    getAvgAge():number{
        const totalAge=this.pets.reduce((sum,pet)=>sum+pet.age,0);
        return totalAge/this.pets.length;
    }
    getPetsCountByType(): { [key: string]: number } {
        return this.pets.reduce((count, pet) => {
            count[pet.type] = (count[pet.type] || 0) + 1;
            return count;
        }, {} as { [key: string]: number });
    }
}