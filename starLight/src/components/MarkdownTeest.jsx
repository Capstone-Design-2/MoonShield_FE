import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownTest = () => {
  const markdownText = `
  # 큰 제목
  **굵은 텍스트**
  - 리스트 항목 1
  - 리스트 항목 2
  `;

  return (
    <div>
      <h1>React Markdown Test</h1>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default MarkdownTest;
