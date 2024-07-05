import * as getByEmail from './GetByEmail';
import * as create from './create';

export const UsuariosProviders = {
    ...create,
    ...getByEmail,
}