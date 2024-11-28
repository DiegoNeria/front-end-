"use client";
import React, { useState } from "react";

function CrearUsuario() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      photo: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("firstName", formData.firstName);
    formDataToSend.append("lastName", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    if (formData.photo) formDataToSend.append("photo", formData.photo);

    try {
      const response = await fetch("http://localhost:8000/crear-usuario", {
        method: "POST",
        body: formDataToSend,
      });
      
      if (response.ok) {
        const data = await response.json();
        alert("Usuario creado exitosamente");
        console.log(data);
      } else {
        alert("Error al crear el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al crear el usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Crear Usuario
        </h1>
        <form id="createUserForm" className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            id="firstName"
            placeholder="Nombre"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            id="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="email"
            id="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            type="password"
            id="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="file_input"
            >
              Foto de Usuario
            </label>
            <input
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              id="file_input"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="p-3 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition duration-300"
          >
            Crear Usuario
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearUsuario;
