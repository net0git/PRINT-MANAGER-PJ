import { MarcaRepository } from "../domain/port-in/marcaRepository";
import { Marca } from "../domain/marca";

export class MarcaUseCaseUpdate {

    constructor(private marcaRepository: MarcaRepository) { }

    async execute(id_marca: number, marca: string, estado: boolean): Promise<void> {
        const marca_update = new Marca(
            id_marca,
            new Date(),
            marca,
            estado
        );
        await this.marcaRepository.update(marca_update);
    }
}