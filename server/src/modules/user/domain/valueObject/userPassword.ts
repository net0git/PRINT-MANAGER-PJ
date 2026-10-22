export class UserPassword {

    private readonly value: string;

    constructor(password: string) {
        this.value = password.trim();
        this.ensureIsValid();
    }

    public getValue(): string {
        return this.value;
    }

    private ensureIsValid(): void {

        if (!this.value) {
            throw new Error("La contraseña no puede estar vacía");
        }

        // // Longitud válida
        // if (this.value.length < 6) {
        //     throw new Error("La contraseña debe tener al menos 8 caracteres");
        // }

    }
}