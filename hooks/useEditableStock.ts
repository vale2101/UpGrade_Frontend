"use client";

import { useState } from "react";

interface UseEditableStockReturn {
  editingStock: { id: number; stock: number } | null;
  updatingId: number | null;
  handleStockChange: (id: number, currentStock: number) => void;
  handleStockBlur: (
    productId: number,
    oldStock: number,
    onUpdate: (id: number, stock: number) => Promise<{ success: boolean }>
  ) => Promise<void>;
  handleKeyPress: (
    e: React.KeyboardEvent,
    productId: number,
    oldStock: number,
    onUpdate: (id: number, stock: number) => Promise<{ success: boolean }>
  ) => void;
  resetEditing: () => void;
}

export function useEditableStock(): UseEditableStockReturn {
  const [editingStock, setEditingStock] = useState<{ id: number; stock: number } | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleStockChange = (id: number, currentStock: number) => {
    setEditingStock({ id, stock: currentStock });
  };

  const handleStockBlur = async (
    productId: number,
    oldStock: number,
    onUpdate: (id: number, stock: number) => Promise<{ success: boolean }>
  ) => {
    if (!editingStock || editingStock.id !== productId) return;
    
    const newStock = editingStock.stock;
    
    if (newStock === oldStock) {
      setEditingStock(null);
      return;
    }

    if (isNaN(newStock) || newStock < 0) {
      setEditingStock(null);
      return;
    }

    try {
      setUpdatingId(productId);
      await onUpdate(productId, newStock);
      setEditingStock(null);
    } catch (error) {
    } finally {
      setUpdatingId(null);
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    productId: number,
    oldStock: number,
    onUpdate: (id: number, stock: number) => Promise<{ success: boolean }>
  ) => {
    if (e.key === 'Enter') {
      handleStockBlur(productId, oldStock, onUpdate);
    } else if (e.key === 'Escape') {
      setEditingStock(null);
    }
  };

  const resetEditing = () => {
    setEditingStock(null);
  };

  return {
    editingStock,
    updatingId,
    handleStockChange,
    handleStockBlur,
    handleKeyPress,
    resetEditing,
  };
}

