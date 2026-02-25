export const getEventThumbnail = (content: string): string => {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/;
  const match = content.match(imgRegex);

  if (match && match[1]) {
    return match[1];
  }

  return '/assets/images/backgrounds/default-event.png';
};
