"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { productoInterface } from "../interfaces/producto.interface";
import { fichaInterface } from "../interfaces/ficha.interface";
import { FichaService } from "../services/fichaService";
import Swal from "sweetalert2";

export type ProductFormData = {
  nombre: string;
  precio: number;
  categoria: string;
  stock: number;
  tipo: "Nuevo" | "SemiNuevo" | "Reacondicionado";
  color: string;
  capacidad: string;
  foto: string;
  id_ficha: number;
};

interface UseAdministradorProductFormProps {
  product?: productoInterface | null;
  onSave: (product: productoInterface) => Promise<void>;
  onCancel: () => void;
}

export function useAdministradorProductForm({
  product,
  onSave,
  onCancel,
}: UseAdministradorProductFormProps) {
  // Estado para controlar en qué paso estamos: 'ficha' o 'producto'
  const [currentStep, setCurrentStep] = useState<'ficha' | 'producto'>(!product ? 'ficha' : 'producto');
  const [fichaId, setFichaId] = useState<number | null>(product?.id_ficha || null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset,
    setValue,
  } = useForm<ProductFormData>({
    defaultValues: {
      nombre: "",
      precio: 0,
      categoria: "iPhone",
      stock: 0,
      tipo: "Nuevo",
      color: "",
      capacidad: "",
      foto: "",
      id_ficha: 1,
    },
  });

  // Inicializar el formulario cuando hay un producto para editar
  useEffect(() => {
    if (product) {
      reset({
        nombre: product.nombre || "",
        precio: typeof product.precio === 'string' ? parseFloat(product.precio) : (product.precio || 0),
        categoria: product.categoria || "iPhone",
        stock: product.stock || 0,
        tipo: product.tipo || "Nuevo",
        color: product.color || "",
        capacidad: product.capacidad || "",
        foto: product.foto || "",
        id_ficha: product.id_ficha || 1,
      });
      setFichaId(product.id_ficha || null);
    }
  }, [product, reset]);

  // Cambiar al paso de producto cuando se crea la ficha y actualizar el formulario
  useEffect(() => {
    if (fichaId && !product && currentStep === 'ficha') {
      setValue("id_ficha", fichaId);
      setCurrentStep('producto');
    }
  }, [fichaId, product, currentStep, setValue]);

  // Helper functions
  const extractFichaId = (data: any): number | undefined => 
    data?.id_ficha || data?.data?.id_ficha;

  const isSuccessMessage = (msg: string) => 
    msg.toLowerCase().includes('creado') || msg.toLowerCase().includes('correctamente');

  const handleSuccess = (id: number, message: string) => {
    setFichaId(id);
    setValue("id_ficha", id);
    setCurrentStep('producto');
    setTimeout(() => Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      timer: 2000,
      showConfirmButton: false,
    }), 100);
  };

  const showWarning = (message: string) => {
    setCurrentStep('producto');
    setTimeout(() => Swal.fire({
      icon: 'warning',
      title: 'Atención',
      text: message,
      timer: 3000,
    }), 100);
  };

  const handleFichaSave = async (fichaData: fichaInterface): Promise<number | null> => {
    try {
      const response = await FichaService.createFicha(fichaData);
      const isSuccess = response.success || isSuccessMessage(response.message || '');
      const id = extractFichaId(response.data);
      
      if (isSuccess && id) {
        handleSuccess(id, response.message || 'Ficha técnica creada correctamente');
        return id;
      }
      
      if (isSuccess) {
        showWarning('Ficha creada. Si no se asignó el ID, deberás ingresarlo manualmente.');
        return null;
      }
      
      throw new Error(response.message || "Error al crear la ficha técnica");
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'Error al crear la ficha técnica';
      const isSuccess = isSuccessMessage(errorMessage);
      const id = extractFichaId(err?.response?.data);

      if (isSuccess && id) {
        handleSuccess(id, errorMessage);
        return id;
      }
      
      if (isSuccess) {
        showWarning('La ficha se creó, pero no se pudo obtener el ID. Por favor, verifica.');
        return null;
      }
      
      await Swal.fire({ icon: 'error', title: 'Error', text: errorMessage });
      return null;
    }
  };

  const handleFichaCancel = () => {
    setCurrentStep('producto');
    onCancel();
  };

  const onFormSubmit = async (data: ProductFormData) => {
    const idFichaFinal = !product && fichaId ? fichaId : data.id_ficha;
    
    if (!product && !idFichaFinal) {
      await Swal.fire({ icon: 'error', title: 'Error', text: 'Debes crear primero la ficha técnica' });
      return;
    }

    await onSave({
      ...(product?.id_producto && { id_producto: product.id_producto }),
      ...data,
      id_ficha: idFichaFinal,
    });
  };

  return {
    // Estado
    currentStep,
    fichaId,
    
    // Formulario
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    setValue,
    
    // Handlers
    handleFichaSave,
    handleFichaCancel,
    onFormSubmit,
  };
}

