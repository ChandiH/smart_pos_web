const users = [
  { userName: "Somesh", password: "1234" },
  { userName: "Hirushi", password: "0000" },
  { userName: "Dinithi", password: "0000" },
];

export function authenticate({ userName, password }) {
  return (
    users.find((c) => c.userName === userName && c.password === password) ||
    null
  );
}
