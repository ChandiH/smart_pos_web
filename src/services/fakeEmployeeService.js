const employees = [
  {
    id: 1,
    name: "Sascha Lahy",
    email: "slahy0@trellian.com",
    phone: "6953579061",
    branch: "Shushicë",
    role: "Male",
  },
  {
    id: 2,
    name: "Jeromy Striker",
    email: "jstriker1@ameblo.jp",
    phone: "7515823058",
    branch: "Paurito",
    role: "Male",
  },
  {
    id: 3,
    name: "Serge Poundesford",
    email: "spoundesford2@nifty.com",
    phone: "1301116352",
    branch: "Rancharia",
    role: "Male",
  },
  {
    id: 4,
    name: "Abigael Samsin",
    email: "asamsin3@newsvine.com",
    phone: "7866378501",
    branch: "Beni Khiar",
    role: "Female",
  },
  {
    id: 5,
    name: "Frank Girardengo",
    email: "fgirardengo4@walmart.com",
    phone: "9909919749",
    branch: "Perlez",
    role: "Male",
  },
  {
    id: 6,
    name: "Blithe McAllan",
    email: "bmcallan5@reverbnation.com",
    phone: "6827781736",
    branch: "Ershilipu",
    role: "Female",
  },
  {
    id: 7,
    name: "Malanie Newvell",
    email: "mnewvell6@mozilla.com",
    phone: "1534737151",
    branch: "Mina Clavero",
    role: "Female",
  },
  {
    id: 8,
    name: "Vanya Bette",
    email: "vbette7@weebly.com",
    phone: "4483033388",
    branch: "Narail",
    role: "Female",
  },
  {
    id: 9,
    name: "Karleen Orring",
    email: "korring8@github.io",
    phone: "7762133941",
    branch: "Kiviõli",
    role: "Female",
  },
  {
    id: 10,
    name: "Donella Leicester",
    email: "dleicester9@joomla.org",
    phone: "9229496708",
    branch: "Vilkija",
    role: "Female",
  },
];

export function getEmployees() {
  return employees;
}

export function getEmployee(id) {
  return employees.find((c) => c.id === id);
}

export function saveEmployee(employee) {
  let employeeInDb = employees.find((c) => c.id === employee.id) || {};
  employeeInDb.name = employee.name;
  employeeInDb.contact = employee.contact;
  employeeInDb.visitCount = employee.visitCount;
  employeeInDb.totalSpent = employee.totalSpent;
  employeeInDb.pointCount = employee.pointCount;

  if (!employeeInDb.id) {
    employeeInDb.id = Date.now().toString();
    employees.push(employeeInDb);
  }

  return employeeInDb;
}

export function deleteEmployee(id) {
  let employeeInDb = employees.find((c) => c.id === id);
  employees.splice(employees.indexOf(employeeInDb), 1);
  return employeeInDb;
}
