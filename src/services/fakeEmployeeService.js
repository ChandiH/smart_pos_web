const userRoles = [
  {
    userRole_id: 101,
    name: "Owner",
    description:
      "The owner role has full control and authority over the business or organization. Owners make critical decisions and have access to all resources.",
  },
  {
    userRole_id: 102,
    name: "Manager",
    description:
      "Managers are responsible for overseeing daily operations and supervising staff. They have access to most resources and can make important decisions within their department.",
  },
  {
    userRole_id: 103,
    name: "Cashier",
    description:
      "Cashiers handle customer transactions, manage the cash register, and provide customer service. They have limited access to administrative functions.",
  },
  {
    userRole_id: 104,
    name: "Sales Associate",
    description:
      "Sales associates assist customers, promote products, and process sales. They have limited access to administrative functions and focus on sales-related tasks.",
  },
  {
    userRole_id: 105,
    name: "Guest",
    description:
      "Guests are customers or visitors who do not have any administrative privileges. They can browse products or services but cannot access the system's internal functions.",
  },
];

const employees = [
  {
    id: 1,
    name: "Sascha Lahy",
    email: "slahy0@trellian.com",
    phone: "6953579061",
    branch: "Moratuwa",
    userRole_id: 102,
  },
  {
    id: 2,
    name: "Jeromy Striker",
    email: "jstriker1@ameblo.jp",
    phone: "7515823058",
    branch: "Anuradhapura",
    userRole_id: 102,
  },
  {
    id: 3,
    name: "Serge Poundesford",
    email: "spoundesford2@nifty.com",
    phone: "1301116352",
    branch: "Awissawella",
    userRole_id: 102,
  },
  {
    id: 4,
    name: "Abigael Samsin",
    email: "asamsin3@newsvine.com",
    phone: "7866378501",
    branch: "Moratuwa",
    userRole_id: 103,
  },
  {
    id: 5,
    name: "Frank Girardengo",
    email: "fgirardengo4@walmart.com",
    phone: "9909919749",
    branch: "Anuradhapura",
    userRole_id: 103,
  },
  {
    id: 6,
    name: "Blithe McAllan",
    email: "bmcallan5@reverbnation.com",
    phone: "6827781736",
    branch: "Awissawella",
    userRole_id: 103,
  },
  {
    id: 7,
    name: "Malanie Newvell",
    email: "mnewvell6@mozilla.com",
    phone: "1534737151",
    branch: "Moratuwa",
    userRole_id: 103,
  },
  {
    id: 8,
    name: "Vanya Bette",
    email: "vbette7@weebly.com",
    phone: "4483033388",
    branch: "Moratuwa",
    userRole_id: 104,
  },
  {
    id: 9,
    name: "Karleen Orring",
    email: "korring8@github.io",
    phone: "7762133941",
    branch: "Anuradhapura",
    userRole_id: 104,
  },
  {
    id: 10,
    name: "Donella Leicester",
    email: "dleicester9@joomla.org",
    phone: "9229496708",
    branch: "Awissawella",
    userRole_id: 104,
  },
];

export function getUserRoles() {
  return userRoles.filter((u) => u);
}

export function getEmployees() {
  const allEmployees = [...employees];
  allEmployees.forEach((employee) => {
    const userRole = userRoles.find(
      (c) => c.userRole_id === employee.userRole_id
    );
    employee.userRole_name = userRole.name;
    employee.userRole_description = userRole.description;
  });

  return allEmployees;
}

export function getEmployee(id) {
  return employees.find((c) => c.id === id);
}

export function saveEmployee(employee) {
  let employeeInDb = employees.find((c) => c.id === employee.id) || {};
  employeeInDb.name = employee.name;
  employeeInDb.email = employee.email;
  employeeInDb.branch = employee.branch;
  employeeInDb.phone = employee.phone;
  employeeInDb.userRole_id = employee.userRole_id;

  if (!employeeInDb.id) {
    employeeInDb.id = employees.length + 1;
    employees.push(employeeInDb);
  }

  return employeeInDb;
}

export function deleteEmployee(id) {
  let employeeInDb = employees.find((c) => c.id === id);
  employees.splice(employees.indexOf(employeeInDb), 1);
  return employeeInDb;
}
