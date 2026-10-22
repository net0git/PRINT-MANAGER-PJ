import { MarcaRepository } from "../domain/port-in/marcaRepository";
import { Marca } from "../domain/marca";

export class MarcaUseCaseCreate {

    constructor(private marcaRepository: MarcaRepository) { }

    async execute(marca: string): Promise<void> {
        const marca_new = new Marca(
            0,
            new Date(),
            marca,
            true
        );
        await this.marcaRepository.create(marca_new);
    }

}