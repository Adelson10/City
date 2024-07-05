import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Iusuario } from "../../models/usuario";

export const GetByEmail = async (email: string): Promise< Iusuario | Error > => {
    try {
        const result = await Knex(ETableNames.usuario)
        .select('*')
        .where('email','=',email)
        .first();
        
        if(result) return result;
        return new Error('Não foi encontrado esse Resultado.');
    } catch (error) {
        console.log(error);
        return new Error('Não foi encontrado esse registro.');
    }
}