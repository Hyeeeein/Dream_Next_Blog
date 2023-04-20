import FilterablePosts from "@/components/FilterablePosts";
import { getAllPosts } from "@/service/posts";
import React from "react";

const PostsPage = async () => {
  const posts = await getAllPosts();
  // 카테고리 배열을 가져오기 위해 중복 제거가 되는 set 자료형 이용
  const categories = [...new Set(posts.map((post) => post.category))];
  return <FilterablePosts posts={posts} categories={categories} />;
};

export default PostsPage;
