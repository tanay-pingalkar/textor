import {
  NormalComponents,
  SpecialComponents,
} from "react-markdown/src/ast-to-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export const syntaxComponents = (
  dark: boolean
): Partial<NormalComponents & SpecialComponents> => {
  return {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          PreTag="div"
          {...props}
          style={dark ? dracula : docco}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
};
