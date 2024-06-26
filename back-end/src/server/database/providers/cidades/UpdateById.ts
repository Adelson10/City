import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex"
import { ICidades } from "../../models"

export const UpdateById = async (id:number, cidade: Omit<ICidades, 'id'>): Promise<void | Error> => {
    try {        
        const result = await Knex(ETableNames.cidade)
        .update(cidade)
        .where('id','=',id);        
        
        if(result > 0) return;
        return Error('Não foi possivel editar');
    } catch (error) {
        console.log(error);
        return Error('Não foi possivel editar');
    }
}