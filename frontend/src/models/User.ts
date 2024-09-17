export class User {
    id: number
    name: string
    email: string
    password?: string
    teamsId: number

    constructor(id: number, name: string, email: string, teamsId: number, password?: string) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.teamsId = teamsId
    }
}