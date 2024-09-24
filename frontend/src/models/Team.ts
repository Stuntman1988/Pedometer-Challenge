export class Team {
    id: number
    stepsGoal: number
    createdAt: Date

    constructor(id: number, stepsGoal: number, createdAt: Date) {
        this.id = id
        this.stepsGoal = stepsGoal
        this.createdAt = createdAt
    }
}