export class AddToTeamRequest {
    userId?: number
    teamId?: number

    constructor(userId?: number, teamId?: number) {
        this.userId = userId
        this.teamId = teamId
    }
}