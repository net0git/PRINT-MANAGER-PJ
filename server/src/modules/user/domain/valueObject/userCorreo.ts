export class UserCorreo {

    private readonly value: string;

    constructor(correo: string) {

        if (!correo) {
            throw new Error("El correo electrónico es requerido");
        }
        this.value = correo.trim();
        this.ensureIsValid();
    }
    
    public getValue(): string {
        return this.value;
    }


    private ensureIsValid(): void {

        if (!this.value) {
            throw new Error("El correo electrónico no puede estar vacío");
        }

        // formato válido
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.value)) {
            throw new Error("El correo electrónico no es válido");
        }

        // Longitud válida
        if (this.value.length > 255) {
            throw new Error("El correo electrónico debe tener 255 caracteres como máximo");
        }

    }
}