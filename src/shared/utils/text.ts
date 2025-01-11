export function getFirstParagraph(content: string, paragraphSize = 150) {
  let start = content.indexOf('<p>');
  start = start >= 0 ? start + 3 : 0;
  const end = content.indexOf('</p>') || start + paragraphSize;
  const limitedEnd = Math.min(end, start + paragraphSize);
  return content.substring(start, limitedEnd);
}
