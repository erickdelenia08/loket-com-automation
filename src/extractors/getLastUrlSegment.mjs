function getLastUrlSegment(url) {
  return url.split('/').filter(Boolean).pop();
}

export default getLastUrlSegment