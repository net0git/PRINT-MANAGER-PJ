import { ModeloRepository } from "../domain/port-in/modeloRepository";
import { Modelo } from "../domain/modelo";

export class ModeloUseCaseUpdate {

    constructor(private modeloRepository: ModeloRepository) { }

    async execute(id_modelo: number, modelo: string, estado: boolean, id_marca: number, id_tipo_equipo: number): Promise<void> {
        const modelo_update = new Modelo(
            id_modelo,
            new Date(),
            modelo,
            estado,
            id_marca,
            id_tipo_equipo
        );
        await this.modeloRepository.update(modelo_update);
    }
}