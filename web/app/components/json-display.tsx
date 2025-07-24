import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface JsonDisplayProps {
  data: any
  className?: string
}

export function JsonDisplay({ data, className = '' }: JsonDisplayProps) {
  const jsonString = JSON.stringify(data, null, 2)

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      <SyntaxHighlighter
        language='json'
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          background: 'transparent'
        }}
        showLineNumbers={false}
        wrapLines={true}
        wrapLongLines={true}
      >
        {jsonString}
      </SyntaxHighlighter>
    </div>
  )
}
