import React from "react";

export default function validateForm(userData) {
  const errors = {};

  // Validación del email
  if (!userData.email) {
    errors.email = "El email no puede estar vacío";
  }
  else if (!/\S+@\S+\.\S+/.test(userData.email)) {
    errors.email = "El email no es válido";
  }
  else if (userData.email.length > 35) {
    errors.email = "El email no puede tener más de 10 caracteres";
  }

  // Validación de la contraseña
  if (!userData.password) {
    errors.password = "La contraseña no puede estar vacía";
  }
  else if (!/\d/.test(userData.password)) {
    errors.password = "La contraseña debe contener al menos un número";
  }
  else if (userData.password.length < 6 || userData.password.length > 10) {
    errors.password = "La contraseña debe tener entre 6 y 10 caracteres";
  }

  return errors;
}
