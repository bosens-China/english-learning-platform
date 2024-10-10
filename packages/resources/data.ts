import { fromJSON } from 'seroval';
import data from './data.json';
import { List } from './scripts/build';

const map = fromJSON(data as any) as List;

export default map;
