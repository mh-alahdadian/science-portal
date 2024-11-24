export function getFirstParagraph(content: string, paragraphSize = 150) {
  const start = content.indexOf('<p>') || 0;
  const end = content.indexOf('</p>') || start + paragraphSize;
  const limitedEnd = Math.min(end, start + paragraphSize);
  return start ? content.substring(start, limitedEnd) : '';
}
