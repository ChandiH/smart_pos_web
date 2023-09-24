const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/static`;

export function getImageUrl(imageName) {
  return `${ApiEndPoint}/image/${imageName}`;
}
