import { Knex } from 'knex';


export const seed = async (knex: Knex) => {
    const [{ count }] = await knex()
}