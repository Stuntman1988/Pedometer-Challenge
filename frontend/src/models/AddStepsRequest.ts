export class AddStepsRequest {
    userId: number;
    steps: number;

    constructor(userId: number, steps: number) {
        this.userId = userId
        this.steps = steps;
    }
}