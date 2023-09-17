import http from "./httpService";

const ApiEndPoint = "http://localhost:4000/static";

export function getImageUrl(imageName) {
  return `${ApiEndPoint}/image/${imageName}`;
}
