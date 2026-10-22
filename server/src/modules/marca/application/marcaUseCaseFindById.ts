import { MarcaRepository } from "../domain/port-in/marcaRepository";
import { Marca } from "../domain/marca";

export class MarcaUseCaseFindById {

    constructor(private marcaRepository: MarcaRepository) { }

    async execute(id_marca: number): Promise<Marca | undefined> {
        return await this.marcaRepository.findById(id_marca);
    }
}