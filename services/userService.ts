import axios from "axios";
import { ENV } from "../config/env";
import {
  CreateUserRequest,
  UpdateUserRequest,
  LoginRequest,
  LoginResponse,
  User,
  ApiResponse,
} from "../interfaces/user.interface";
import { direccionInterface } from "../interfaces/direccion.interface";

axios.defaults.withCredentials = true;

export const UserService = {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await axios.post<ApiResponse<LoginResponse>>(
      `${ENV.API_URL}/user/login`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async logout(): Promise<ApiResponse<null>> {
    const response = await axios.post<ApiResponse<null>>(
      `${ENV.API_URL}/user/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  },

  async getUsers(): Promise<User[]> {
    const response = await axios.get<ApiResponse<User[]>>(
      `${ENV.API_URL}/usuarios`,
      { withCredentials: true }
    );
    return response.data.data || [];
  },

  async getUserById(id: string): Promise<User> {
    const response = await axios.get<ApiResponse<User>>(
      `${ENV.API_URL}/usuarios/${id}`,
      { withCredentials: true }
    );
    return response.data.data as User;
  },

  async getUserWithDireccion(id: string): Promise<User> {
    const response = await axios.get<ApiResponse<User>>(
      `${ENV.API_URL}/usuarios/${id}/direccion`,
      { withCredentials: true }
    );
    return response.data.data as User;
  },

  async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    const response = await axios.post<ApiResponse<User>>(
      `${ENV.API_URL}/usuarios`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    const response = await axios.put<ApiResponse<User>>(
      `${ENV.API_URL}/usuarios/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/usuarios/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
