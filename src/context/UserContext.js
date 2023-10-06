import { createContext } from "react";

const users = [
  {
    name: "John Doe",
    userRole: "Owner",
    branch: "sth",
    telephoneNumber: "123-456-7890",
    address: "123 Main St, Cityville, USA",
    username: "johndoe123",
    
  },
  {
    name: "Jane Smith",
    userRole: "Branch Manager",
    branch: "sthelse",
    telephoneNumber: "987-654-3210",
    address: "456 Oak St, Townsville, USA",
    username: "janesmith456",
    
  },
  // Add more users as needed
];

const UserContext = createContext(users);

export default UserContext;
