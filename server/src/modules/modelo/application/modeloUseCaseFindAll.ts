import { ModeloRepository } from "../domain/port-in/modeloRepository";
import { Modelo } from "../domain/modelo";

export class ModeloUseCaseFindAll {

    constructor(private modeloRepository: ModeloRepository) { }

    async execute(): Promise<Modelo[]> {
        return await this.modeloRepository.findAll();
    }
}