import { getPostContent } from "@/service/posts";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

const PostPage = async ({ params: { slug } }: Props) => {
  // 1. 전달된 slug에 해당하는 포스트 데이터를 불러오기
  // 2. 데이터를 마크다운뷰어에 표기하면 됨
  const post = await getPostContent(slug);

  return (
    <>
      <h1>{post.title}</h1>
      <pre>{post.content}</pre>
    </>
  );
};

export default PostPage;
