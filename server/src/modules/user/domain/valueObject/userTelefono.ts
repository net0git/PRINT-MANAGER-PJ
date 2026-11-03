export class UserTelefono {

    private readonly value: string;

    constructor(telefono: string) {
        this.value = telefono.trim();
        this.ensureIsValid();
    }

    public getValue(): string {
        return this.value;
    }


    private ensureIsValid(): void {

        if (!this.value) {
            throw new Error("El teléfono no puede estar vacío");
        }

        // Solo números
        if (!/^\d+$/.test(this.value)) {
            throw new Error("El teléfono solo debe contener números");
        }

        // Longitud válida
        if (this.value.length !== 9 ) {
            throw new Error("El teléfono debe tener 9 digitos");
        }

    }

}