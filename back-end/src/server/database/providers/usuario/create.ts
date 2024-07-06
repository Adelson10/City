import { PasswordCrypto } from "../../../shared/services";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Iusuario } from "../../models/usuario";

export const create = async (usuario: Omit<Iusuario, 'id'>): Promise< number | Error > => {
    try {

        const Password = await PasswordCrypto.hashPassword(usuario.senha);
        
        const [result] = await Knex(ETableNames.usuario)
        .insert({...usuario, senha: Password})
        .returning('id');

        if(typeof result === 'object') return result.id;
        else if(typeof result === 'number') return result;

        return new Error('Erro ao cadastro o usuario');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastro o usuario');
    }
}