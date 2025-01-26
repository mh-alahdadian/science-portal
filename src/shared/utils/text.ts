import DOMPurify from 'dompurify';

export function getFirstParagraph(content: string, paragraphSize = 150) {
  const dom = DOMPurify.sanitize(content, { RETURN_DOM: true });
  content = Array.from(dom.childNodes).find((x) => x instanceof HTMLElement)?.innerText || '';
  return content.substring(0, paragraphSize);
}
