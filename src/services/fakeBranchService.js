export const branches = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Moratuwa" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Colombo" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Negombo" },
];

export function getBranches() {
  return branches.filter((g) => g);
}
