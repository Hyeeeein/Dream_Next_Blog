import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
};

// & : 확장
export type PostData = Post & {
  content: string;
  next: Post | null;
  prev: Post | null;
};

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

// fetch 의 경우 빌드될 때 자동으로 중복제거 해줘서 한번만 불러오도록 하는데 데이터베이스에 접근하거나 파일을 읽는 함수는 중복 제거가 되지 않음
// cache : 호출한 인자가 동일한 인자라면 즉, 이전에 한번 호출되었다면 캐싱된 데이터가 반환, 그래서 위 문제가 해결됨 / 서버가 동작하는 모든 시간에 걸쳐서 캐시를 사용하는 것이 아니라 한번 렌더링되는 사이클에 한에서만 캐시 즉, 페이지가 렌더링되었을 때 그 안의 컴포넌트들이 동일한 함수의 동일한 인자를 썼을 때 발동
export const getAllPosts = cache(async () => {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((post) => post.sort((a, b) => (a.date > b.date ? -1 : 1)));
});

// export async function getAllPosts(): Promise<Post[]> {

// }

export async function getPostContent(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  // 모든 포스트를 불러와서 fileName 과 맞는 path 를 가지고 있는 객체 정보들을 metadata 에 담기
  const posts = await getAllPosts();
  const post = posts.find((post) => post.path === fileName);

  if (!post)
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없습니다.`);

  // 이전, 다음 컨텐츠 정보
  const index = posts.indexOf(post);
  const next = index === 0 ? null : posts[index - 1];
  const prev = index === posts.length ? null : posts[index + 1];
  const content = await readFile(filePath, "utf-8");
  // 엘리 ver
  // const next = index > 0 ? posts[index - 1] : null;
  // const prev = index < posts.length ? posts[index + 1] : null;
  return { ...post, content, next, prev };
}
