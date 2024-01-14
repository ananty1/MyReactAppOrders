import mysql from "mysql2";
import bcrypt from "bcryptjs";
const JWT_SECRET = "anant";
import jwt from 'jsonwebtoken';

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "123",
    database: "foodiee",
  })
  .promise();

export async function createUser(
  Name,
  UserName,
  Password,
  PhoneNo,
  Email,
  UserType,
  AddressLine1,
  AddressLine2,
  City,
  State,
  PostalCode,
  Country
) {
  // Hashing the password
  let hashedPass = await bcrypt.hash(Password, 10);

  const [row] = await pool.query(
    "INSERT INTO Users (Name, UserName,Password, PhoneNo, Email, UserType,AddressLine1,AddressLine2,City,State,PostalCode, Country) VALUES  (?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      Name,
      UserName,
      hashedPass,
      PhoneNo,
      Email,
      UserType,
      AddressLine1,
      AddressLine2,
      City,
      State,
      PostalCode,
      Country,
    ]
  );
  const result = await getUser(row.insertId);
  return result;
}

export async function getUser(id) {
  const [row] = await pool.query("SELECT * FROM Users WHERE UserID =?", [id]);
  return row[0];
}

export async function getUsers() {
  const [row] = await pool.query("SELECT * FROM Users");
  return row;
}

export async function checkUser(UserName, GivenPassword) {
  let sql = "SELECT * FROM Users WHERE UserName = ?";
  let data = [UserName];
  const [row] = await pool.query(sql, data);
  if (row.length == 0) {
    return {
      status: 0,
      content: "User Does not exist",
    };
  }
  let checkPassword = await bcrypt.compare(GivenPassword, row[0].Password);
  if (checkPassword) {
    console.log("User Verified");
    const data = {
      user: {
        id: row[0].UserID,
      },
    };
    const authToken = jwt.sign(data,JWT_SECRET);
    return {
      status: 1,
      content: "User Verified",
      authToken:authToken
    };
  } else {
    console.log("Hacker! Back Up Soldier Fire in the Hole!!!! ");
    return {
      status: -1,
      content: "User Password are incorrect!",
    };
  }
}

export async function deleteUser(id) {
  const [row] = await pool.query("DELETE FROM Users WHERE UserID = ?", [id]);
  if (row.affectedRows) {
    return "User deletd Successfully";
  }
  return "User does not exist";
}

export async function updateUser(
  Name,
  UserName,
  Password,
  PhoneNo,
  Email,
  UserType,
  AddressLine1,
  AddressLine2,
  City,
  State,
  PostalCode,
  Country,
  id
) {
  let sql =
    "UPDATE Users SET Name = ?, UserName = ?, Password = ?, PhoneNo = ?, Email = ?, UserType = ?, AddressLine1 = ?, AddressLine2 = ?, City = ?, State = ?, PostalCode = ?, Country = ? WHERE UserID = ?";

  let data = [
    Name,
    UserName,
    Password,
    PhoneNo,
    Email,
    UserType,
    AddressLine1,
    AddressLine2,
    City,
    State,
    PostalCode,
    Country,
    id,
  ];

  const [row] = await pool.query(sql, data);
  if (row.affectedRows) {
    return "User Updated Successfully";
  }
  return "User does not exist";
}

// const result  = await createUser("adil","Adil","adil","234234","adil@adil","Customer","durg","bhilai","durg","bhilai","23423","Dubai");
// console.log(result);

// const result = await checkRatUser("Adil", "adil");
// console.log(result);