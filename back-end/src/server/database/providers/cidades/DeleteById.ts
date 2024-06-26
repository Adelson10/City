import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const DeleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
        .where('id','=',id)
        .del();
        
        if(result>0) return;
        return new Error('Não foi possivel fazer o delete.');
    } catch (error) {
        console.log(error);
        return new Error('Não foi possivel fazer o delete.');
    }
}