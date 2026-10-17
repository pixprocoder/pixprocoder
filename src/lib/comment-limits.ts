export const ROOT_COMMENT_PAGE_SIZE = 10;
export const MAX_REPLIES_PER_THREAD = 10;
export const MAX_COMMENT_LENGTH = 2000;

export function mentionPrefix(handle: string): string {
  return `@${handle}. `;
}

/** Split comment text so `@handle` tokens can be styled. */
export function splitMentions(
  content: string,
): Array<{ mention: boolean; value: string }> {
  const parts: Array<{ mention: boolean; value: string }> = [];
  const re = /(^|[^a-zA-Z0-9_])(@[a-z0-9]+(?:_[a-z0-9]+)*)/gi;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(content)) !== null) {
    const boundary = match[1] ?? '';
    const handle = match[2] ?? '';
    const start = match.index + boundary.length;
    if (start > last) {
      parts.push({ mention: false, value: content.slice(last, start) });
    }
    parts.push({ mention: true, value: handle });
    last = start + handle.length;
  }
  if (last < content.length) {
    parts.push({ mention: false, value: content.slice(last) });
  }
  return parts.length ? parts : [{ mention: false, value: content }];
}
