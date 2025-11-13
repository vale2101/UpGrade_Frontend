"use client";

import { useForm } from "react-hook-form";
import FormInput from "../atoms/FormInput";
import FormTextArea from "../atoms/FormTextArea";
import SubmitButton from "../atoms/SubmitButton";

interface ContactFormData {
  nombre: string;
  contacto: string;
  correo: string;
  duda: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    defaultValues: {
      nombre: "",
      contacto: "",
      correo: "",
      duda: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("¡Gracias por tu consulta! Te contactaremos pronto.");
      reset();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar tu consulta. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-md">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        ¿Tienes alguna duda?
      </h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 text-center">
        Completa el formulario y nos pondremos en contacto contigo lo antes posible.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput<ContactFormData>
            label="Nombre completo"
            type="text"
            name="nombre"
            placeholder="Tu nombre completo"
            required
            register={register("nombre", {
              required: "El nombre es requerido",
              minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
            }) as any}
            errors={errors}
          />
          
          <FormInput<ContactFormData>
            label="Teléfono de contacto"
            type="tel"
            name="contacto"
            placeholder="Tu número de teléfono"
            required
            register={register("contacto", {
              required: "El teléfono es requerido",
              minLength: { value: 10, message: "El teléfono debe tener al menos 10 caracteres" },
            }) as any}
            errors={errors}
          />
        </div>
        
        <FormInput<ContactFormData>
          label="Correo electrónico"
          type="email"
          name="correo"
          placeholder="tu@email.com"
          required
          register={register("correo", {
            required: "El correo es requerido",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo electrónico inválido",
            },
          }) as any}
          errors={errors}
        />
        
        <FormTextArea<ContactFormData>
          label="Describe tu duda o consulta"
          name="duda"
          placeholder="Escribe aquí tu pregunta, problema o consulta..."
          required
          rows={5}
          register={register("duda", {
            required: "La consulta es requerida",
            minLength: { value: 10, message: "La consulta debe tener al menos 10 caracteres" },
          }) as any}
          errors={errors}
        />
        
        <SubmitButton loading={isSubmitting}>
          Enviar Consulta
        </SubmitButton>
      </form>
    </div>
  );
}
