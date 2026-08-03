import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function MarkdownRenderer({ content }: { content: string }) {
  const parsedContent = content.replace(
    /\+1\s*929-597-1197(?!\s*<\/a>|\]|<\/span>)/g, 
    '<span class="text-[#c1eb40]">+1 929-597-1197</span>'
  );

  return (
    <ReactMarkdown
      components={{
        h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-white" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-white" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-white" {...props} />,
        p: ({node, ...props}) => <p className="mb-4 text-neutral-300 leading-relaxed" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2 text-neutral-300" {...props} />,
        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-neutral-300" {...props} />,
        li: ({node, ...props}) => <li {...props} />,
        a: ({node, ...props}) => <a className="text-[#c1eb40] hover:underline" {...props} />,
        strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
      }}
      rehypePlugins={[rehypeRaw]}
    >
      {parsedContent}
    </ReactMarkdown>
  );
}
