import http from "./httpService";

const ApiEndPoint = "http://localhost:4000/upload";

// will return each product with its stock quantity in each branch
export function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post(ApiEndPoint, formData, config);
}

export function uploadMultipleImage(files) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  console.log(formData);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.post(`${ApiEndPoint}-multiple`, formData, config);
}
