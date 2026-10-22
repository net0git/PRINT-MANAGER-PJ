import { MarcaRepository } from "../domain/port-in/marcaRepository";
import { Marca } from "../domain/marca";

export class MarcaUseCaseFindAll {

    constructor(private marcaRepository: MarcaRepository) { }

    async execute(): Promise<Marca[]> {
        return await this.marcaRepository.findAll();
    }
}