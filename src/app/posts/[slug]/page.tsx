import { getFeaturedPosts, getPostContent } from "@/service/posts";
import React from "react";
import Image from "next/image";
import PostContent from "@/components/PostContent";
import AdjacentPostCard from "./../../../components/AdjacentPostCard";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title, description } = await getPostContent(slug);
  return {
    title,
    description,
  };
}

const PostPage = async ({ params: { slug } }: Props) => {
  // 1. 전달된 slug에 해당하는 포스트 데이터를 불러오기
  const post = await getPostContent(slug);
  const { title, path, next, prev } = post;

  // 2. 데이터를 마크다운뷰어에 표기하면 됨 => 기능 구현 설명은 지우는 게 좋음
  return (
    <article className="rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4">
      <Image
        className="w-full h-1/5 max-h-[500px]"
        src={`/images/posts/${path}.png`}
        alt={title}
        width={760}
        height={420}
        priority
      />
      <PostContent post={post} />
      <section className="flex shadow-md">
        {prev && <AdjacentPostCard post={prev} type="prev" />}
        {next && <AdjacentPostCard post={next} type="next" />}
      </section>
    </article>
  );
};

export default PostPage;

// 많이 이용하는 페이지에 한에서 ssr
export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }));
}
