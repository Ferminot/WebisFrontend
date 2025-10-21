
export function registerUser(user) {
  const users = JSON.parse(localStorage.getItem("auth_users") || "[]");
  const exists = users.some(u => u.username === user.username || u.email === user.email);
  if (exists) return { success: false, message: "Usuario o correo ya registrado" };

  users.push(user);
  localStorage.setItem("auth_users", JSON.stringify(users));
  return { success: true };
}

export function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("auth_users") || "[]");
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return { success: false, message: "Usuario o contraseña incorrectos" };
  return { success: true, user };
}
