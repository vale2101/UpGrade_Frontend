"use client";

import { useState } from "react";
import FormInput from "../atoms/FormInput";
import FormTextArea from "../atoms/FormTextArea";
import SubmitButton from "../atoms/SubmitButton";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    contacto: "",
    correo: "",
    duda: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log("Datos del formulario:", formData);
    alert("¡Gracias por tu consulta! Te contactaremos pronto.");
    
    // Limpiar el formulario
    setFormData({
      nombre: "",
      contacto: "",
      correo: "",
      duda: ""
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        ¿Tienes alguna duda?
      </h3>
      <p className="text-gray-600 mb-6 text-center">
        Completa el formulario y nos pondremos en contacto contigo lo antes posible.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Nombre completo"
            type="text"
            name="nombre"
            placeholder="Tu nombre completo"
            required
            value={formData.nombre}
            onChange={handleInputChange}
          />
          
          <FormInput
            label="Teléfono de contacto"
            type="tel"
            name="contacto"
            placeholder="Tu número de teléfono"
            required
            value={formData.contacto}
            onChange={handleInputChange}
          />
        </div>
        
        <FormInput
          label="Correo electrónico"
          type="email"
          name="correo"
          placeholder="tu@email.com"
          required
          value={formData.correo}
          onChange={handleInputChange}
        />
        
        <FormTextArea
          label="Describe tu duda o consulta"
          name="duda"
          placeholder="Escribe aquí tu pregunta, problema o consulta..."
          required
          rows={5}
          value={formData.duda}
          onChange={handleInputChange}
        />
        
        <SubmitButton>
          Enviar Consulta
        </SubmitButton>
      </form>
    </div>
  );
}
