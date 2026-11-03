export class UserUsername {

    private readonly value: string;

    constructor(username: string) {
        this.value = username.trim();
        this.ensureIsValid();
    }

    public getValue(): string {
        return this.value;
    }


    private ensureIsValid(): void {

        if (!this.value) {
            throw new Error("El nombre de usuario no puede estar vacío");
        }

        // no menor a 4 caracteres
        if (this.value.length < 4) {
            throw new Error("El nombre de usuario debe tener al menos 4 caracteres");
        }
    }
}