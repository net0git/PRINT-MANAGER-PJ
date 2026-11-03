import { Modelo } from "../domain/modelo";
import { ModeloRepository } from "../domain/port-in/modeloRepository";

export class ModeloUseCaseFindById {

    constructor(private modeloRepository: ModeloRepository) { }

    async execute(id_modelo: number): Promise<Modelo | undefined> {
        return await this.modeloRepository.findById(id_modelo);
    }
}