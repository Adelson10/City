import * as GetById from "./GetById";
import * as create from "./Create";
import * as DeleteById from "./DeleteById";
import * as UpdateById from "./UpdateById";
import * as GetAll from "./GetAll";
import * as Count from "./Count";

export const CidadesProviders = {
    ...create,
    ...DeleteById,
    ...UpdateById,
    ...GetById,
    ...GetAll,
    ...Count
}