
export class TotalStepsOfUsers {
    userId: number
    name: string;
    totalSteps: number;

    constructor(userId: number, name: string, totalSteps: number) {
        this.userId = userId;
        this.name = name;
        this.totalSteps = totalSteps;
    }
}