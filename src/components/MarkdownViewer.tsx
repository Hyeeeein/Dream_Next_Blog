"use client";

import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Image from "next/image";

const MarkdownViewer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      className="prose max-w-none"
      remarkPlugins={[remarkGfm]}
      components={{
        // 코드 스타일 커스터마이징
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              language={match[1]}
              PreTag="div"
              {...props}
              style={materialDark} // 스타일을 마지막에 해야 에러가 안남
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },

        // 이미지도 커스터마이징
        img: (image) => (
          <Image
            className="w-full max-h-60 object-cover"
            src={image.src || ""}
            alt={image.alt || ""}
            width={500}
            height={350}
          />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
