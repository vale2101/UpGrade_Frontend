"use client";

import { useState, useEffect } from "react";
import { UserService } from "../services/userService";
import { User } from "../interfaces/user.interface";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await UserService.getUsers();
      setUsers(usersData);
    } catch (err: any) {
      setError(err.message || "Error al cargar los usuarios");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: loadUsers,
  };
}

