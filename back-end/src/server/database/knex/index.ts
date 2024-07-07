import knex from "knex";
import 'dotenv/config';
import pg from 'pg';

import { development, production, test } from './Environment';

if(process.env.NODE_ENV === 'production') {
    console.log('deu certo');
    
    pg.types.setTypeParser( 20, 'text', parseInt );
}

const getEnvironment = () => {    
    switch (process.env.NODE_ENV) {
        case 'test': return test;
        case 'production': return production;  

        default: return development;   
    }
}

export const Knex = knex(getEnvironment());