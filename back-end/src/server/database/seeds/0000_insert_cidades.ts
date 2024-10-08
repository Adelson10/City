import { Knex } from 'knex';
import { ETableNames } from "../ETableNames";

export const seed = async ( knex: Knex ) => {
    const [{ count }] = await knex(ETableNames.cidade).count<[{count: number}]>('* as count');
    if(!Number.isInteger(count) || Number(count) > 0 ) return;

    const cidadesInsert = cidadesDoTocantins.map((cidade: string) => ({nome: cidade}));
    await knex(ETableNames.cidade).insert(cidadesInsert);

}

const cidadesDoTocantins = [
'Palmas',
'Araguaína',
'Gurupi',
'Porto Nacional',
'Paraíso do Tocantins',
'Colinas do Tocantins',
'Araguatins',
'Guaraí',
'Tocantinópolis',
'Formoso do Araguaia',
'Miracema do Tocantins',
'Dianópolis',
'Augustinópolis',
'Lagoa da Confusão',
'Pedro Afonso',
'Taguatinga',
'São Miguel do Tocantins',
'Miranorte',
'Goiatins',
'Sítio Novo do Tocantins',
'Paranã',
'Wanderlândia',
'Xambioá',
'Nova Olinda',
'Ananás',
'Buriti do Tocantins',
'Arraias',
'Axixá do Tocantins',
'Peixe',
'Praia Norte',
'Colméia',
'Alvorada',
'Natividade',
'Campos Lindos',
'Araguaçu',
'Babaçulândia',
'Filadélfia',
'Ponte Alta do Tocantins',
'Esperantina',
'Tocantínia',
'Santa Fé do Araguaia',
'Pium',
'Divinópolis do Tocantins',
'Palmeirópolis',
'Itacajá',
'Almas',
'Cristalândia',
'Dois Irmãos do Tocantins',
'Araguacema',
'Darcinópolis',
'Monte do Carmo',
'São Bento do Tocantins',
'Arapoema',
'Couto Magalhães',
'Aragominas',
'Figueirópolis',
'Itaguatins',
'Aliança do Tocantins',
'Silvanópolis',
'Pequizeiro',
'Palmeiras do Tocantins',
'Aparecida do Rio Negro',
'Caseara',
'Barrolândia',
'Rio Sono',
'Palmeirante',
'Combinado',
'Goianorte',
'Brejinho de Nazaré',
'Santa Rosa do Tocantins',
'Marianópolis do Tocantins',
'Nazaré',
'Aguiarnópolis',
'Pindorama do Tocantins',
'Barra do Ouro',
'São Valério',
'Araguanã',
'Dueré',
'Bernardo Sayão',
'Ponte Alta do Bom Jesus',
'Sampaio',
'São Sebastião do Tocantins',
'Pau D Arco',
'Bom Jesus do Tocantins',
'Cariri do Tocantins',
'Novo Acordo',
'Riachinho',
'Conceição do Tocantins',
'Sandolândia',
'Itapiratins',
'Lagoa do Tocantins',
'Fátima',
'Tabocão',
'Recursolândia',
'Bandeirantes do Tocantins',
'Muricilândia',
'Nova Rosalândia',
'Lajeado',
'Aurora do Tocantins',
'Jaú do Tocantins',
'Carrasco Bonito',
'Chapada da Natividade',
'Maurilândia do Tocantins',
'Presidente Kennedy',
'Lizarda',
'Angico',
'Porto Alegre do Tocantins',
'Santa Tereza do Tocantins',
'Mateiros',
'Rio dos Bois',
'Luzinópolis',
'Santa Maria do Tocantins',
'Abreulândia',
'Talismã',
'Santa Terezinha do Tocantins',
'Itaporã do Tocantins',
'Monte Santo do Tocantins',
'São Salvador do Tocantins',
'Piraquê',
'Juarina',
'Novo Jardim',
'Santa Rita do Tocantins',
'Carmolândia',
'Pugmil',
'Centenário',
'Taipas do Tocantins',
'Brasilândia do Tocantins',
'Cachoeirinha',
'Tupirama',
'Tupiratins',
'Novo Alegre',
'São Félix do Tocantins',
'Rio da Conceição',
'Lavandeira',
'Ipueiras',
'Sucupira',
'Chapada de Areia',
'Crixás do Tocantins',
'Oliveira de Fátima',
];

