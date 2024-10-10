import chokidar from 'chokidar';
import path from 'node:path';
import { debounce } from 'lodash-es';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * 每次文件变更，输出新的data
 */
chokidar.watch(path.join(__dirname, '../src')).on(
  'all',
  debounce(async () => {
    await import('./build');
  }, 1000),
);
