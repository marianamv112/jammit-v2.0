export const registerUser= (username, email, password) => {
  return { 
  type: "REGISTER_USER", 
  username,
  email,
  password
}
}


export default registerUser;
