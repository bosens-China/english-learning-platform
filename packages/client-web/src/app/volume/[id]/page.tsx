import { FC } from 'react';
import resources from 'resources';

export const generateStaticParams = async () => {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];
};

interface Props {
  params: { id: string };
  // searchParams: {};
}

const Volume: FC<Props> = ({ params: { id } }) => {
  const lessonsMap = resources.get(id);

  if (!lessonsMap) {
    return <p>没有找到相关课程</p>;
  }

  // 过滤掉暂时没有相关内容的课程
  const lessons = Array.from(lessonsMap?.keys() || [])
    .toSorted((a, b) => +a - +b)
    .filter((f) => {
      const data = lessonsMap.get(`${f}`);
      return data?.text;
    });

  return (
    <ul>
      {lessons.map((item) => {
        const data = lessonsMap.get(`${item}`);
        return (
          <li key={item}>
            <span>{data?.text?.lesson}</span>
            <span className="ml-12px">{data?.text?.title}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Volume;
