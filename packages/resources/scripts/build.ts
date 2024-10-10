/*
 * 作用就是输出一个json文件
 */

import { glob } from 'glob';
import path from 'node:path';
import fs from 'fs-extra';
import { toJSON } from 'seroval';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/*
 * 先获取所有的第几册书籍
 */

const base = './src/course-list';

const books = await glob('./*', { cwd: base });

/*
 * 获取每册下的具体课程
 */

const lessons = await Promise.all(
  books.map((item) => {
    return glob('./*', {
      cwd: path.join(base, item),
    }).then((data) => {
      return {
        book: item,
        lessons: data,
      };
    });
  }),
);

/*
 * 把每一课下面的内容都输出出来
 */

export interface Text {
  text: TextStructure | null;
  americanAccent: string | null;
  englishPronunciation: string | null;
  illustration: Array<string>;
}

export type List = Map<string, Map<string, Text>>;

const toNumber = (str: string) => str.match(/\d+/)![0];

const getText = async (p: string) => {
  const getFile = (additional: string) => {
    return path.join(p, additional);
  };

  const obj: Text = {
    text: null,
    americanAccent: null,
    englishPronunciation: null,
    illustration: [],
  };
  const textPath = path.join(process.cwd(), getFile('data.json'));
  if (fs.existsSync(textPath)) {
    try {
      obj.text = require(textPath);
    } catch {
      console.error(`解析json发生错误，路径：\n${textPath}`);
    }
  }
  if (fs.existsSync(getFile('tape-american-music/course.mp3'))) {
    obj.americanAccent = getFile('tape-american-music/course.mp3');
  }
  if (fs.existsSync(getFile('tape-english/course.mp3'))) {
    obj.englishPronunciation = getFile('tape-english/course.mp3');
  }
  if (fs.existsSync(getFile('illustration'))) {
    obj.illustration = await glob('./*', { cwd: getFile('illustration') });
  }

  return obj;
};

const map: List = new Map();

for (const item of lessons) {
  const volume = toNumber(item.book);
  const lessonMap = new Map<string, Text>();
  await Promise.all(
    item.lessons.map((lesson) => {
      return getText(path.join(base, item.book, lesson)).then((data) => {
        lessonMap.set(toNumber(lesson), data);
      });
    }),
  );

  map.set(volume, lessonMap);
}

/*
 * 输出json文件
 */

await fs.writeJSON('./data.json', toJSON(map), {
  spaces: 2,
});
console.log(`输出 json 完成`);

export type TextStructure = {
  lesson: string;
  title: string;
  introduction: Array<string>;
  text_and_translation: Array<{
    text: string;
    translation: string;
  }>;
  notes: Array<{
    title: string;
    describe: string;
  }>;
  vocabulary: Array<{
    word: string;
    pronunciation: string;
    type: string;
    definition: string;
  }>;
};
