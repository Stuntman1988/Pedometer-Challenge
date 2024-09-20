export class User {
    id: number
    name: string
    email: string
    password?: string
    teamId?: number

    constructor(id: number, name: string, email: string, teamId?: number, password?: string) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.teamId = teamId
    }
}