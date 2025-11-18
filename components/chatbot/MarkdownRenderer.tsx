import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const parseMarkdown = (text: string) => {
    // Tables: | col1 | col2 |
    const tableRegex = /(\|.+\|\n)+/g;
    text = text.replace(tableRegex, (match) => {
      const rows = match.trim().split('\n');
      if (rows.length < 2) return match;
      
      const headers = rows[0].split('|').filter(cell => cell.trim());
      const separator = rows[1];
      const dataRows = rows.slice(2);
      
      let table = '<table class="min-w-full border-2 border-border my-4"><thead class="bg-secondary-background"><tr>';
      headers.forEach(header => {
        table += `<th class="border-2 border-border px-4 py-2 text-left font-semibold">${header.trim()}</th>`;
      });
      table += '</tr></thead><tbody>';
      
      dataRows.forEach(row => {
        const cells = row.split('|').filter(cell => cell.trim());
        table += '<tr>';
        cells.forEach(cell => {
          table += `<td class="border-2 border-border px-4 py-2">${cell.trim()}</td>`;
        });
        table += '</tr>';
      });
      
      table += '</tbody></table>';
      return table;
    });
    
    // Bold: **text** or __text__
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
    
    // Italic: *text* or _text_
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/_(.+?)_/g, '<em>$1</em>');
    
    // Code: `code`
    text = text.replace(/`(.+?)`/g, '<code class="bg-secondary px-1 py-0.5 rounded text-sm">$1</code>');
    
    // Links: [text](url)
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Headers: # H1, ## H2, ### H3
    text = text.replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
    text = text.replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>');
    text = text.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>');
    
    // Lists: - item or * item
    text = text.replace(/^[*-] (.+)$/gm, '<li class="ml-4">• $1</li>');
    
    // Numbered lists: 1. item
    text = text.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>');
    
    // Line breaks
    text = text.replace(/\n\n/g, '<br/><br/>');
    text = text.replace(/\n/g, '<br/>');
    
    return text;
  };

  return (
    <div 
      className="prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
}
