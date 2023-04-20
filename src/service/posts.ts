import { readFile } from "fs/promises";
import path from "path";

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
};

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => post.featured));
}

export async function getNonFeaturedPosts(): Promise<Post[]> {
  return getAllPosts() //
    .then((posts) => posts.filter((post) => !post.featured));
}

export async function getAllPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), "data", "posts.json");
  return readFile(filePath, "utf-8")
    .then<Post[]>(JSON.parse)
    .then((post) => post.sort((a, b) => (a.date > b.date ? -1 : 1)));
}

export async function getPostContent(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), "data", "posts", `${fileName}.md`);
  // 모든 포스트를 불러와서 fileName 과 맞는 path 를 가지고 있는 객체 정보들을 metadata 에 담기
  const metadata = await getAllPosts().then((posts) =>
    posts.find((post) => post.path === fileName)
  );
  if (!metadata)
    throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없습니다.`);
  const content = await readFile(filePath, "utf-8");
  return { ...metadata, content };
}
