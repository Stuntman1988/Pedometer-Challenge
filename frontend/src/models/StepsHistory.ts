export class StepsHistory {
    id: number
    steps: number
    createdAt: Date

    constructor(id: number, steps: number, createdAt: Date) {
        this.id = id
        this.steps = steps
        this.createdAt = createdAt
    }
}