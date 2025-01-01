export class EditPersonalInfoRequest {
    userId: number
    name: string
    email: string

    constructor(userId: number, name: string, email: string) {
        this.userId = userId
        this.name = name
        this.email = email
    }
}