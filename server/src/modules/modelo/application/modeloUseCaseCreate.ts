import { ModeloRepository } from "../domain/port-in/modeloRepository";
import { Modelo } from "../domain/modelo";

export class ModeloUseCaseCreate {

    constructor(private modeloRepository: ModeloRepository) { }

    async execute(modelo: string, id_marca: number, id_tipo_equipo: number): Promise<void> {
        const modelo_new = new Modelo(
            0,
            new Date(),
            modelo,
            true,
            id_marca,
            id_tipo_equipo
        );
        await this.modeloRepository.create(modelo_new);
    }

}