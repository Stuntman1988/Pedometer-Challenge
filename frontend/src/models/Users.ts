export class Users{
    id: number
    name: string
    stepsGoal: number

    constructor(id: number, name: string, stepsGoal: number){
        this.id = id
        this.name = name
        this.stepsGoal = stepsGoal;
    }
}