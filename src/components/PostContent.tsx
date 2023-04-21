import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { AiTwotoneCalendar } from "react-icons/ai";
import { PostData } from "@/service/posts";
import MarkdownViewer from "./MarkdownViewer";

const PostContent = ({ post }: { post: PostData }) => {
  const { title, description, date, content } = post;

  return (
    <section className="flex flex-col p-4">
      <div className="flex items-center self-end">
        <AiTwotoneCalendar />
        <p className="font-semibold ml-2">{date.toString()}</p>
      </div>

      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-xl font-bold">{description}</p>
      <div className="w-44 border-2 border-sky-600 mt-4 mb-8" />

      {/* 테일윈드에서 기본으로 타이포그래피를 리셋함 그래서 타이포그래피 플러그인 사용 */}
      <MarkdownViewer content={content} />
    </section>
  );
};

export default PostContent;
