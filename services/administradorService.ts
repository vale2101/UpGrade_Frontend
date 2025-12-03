import axios from "axios";
import { ENV } from "../config/env";
import {
  CreateAdministradorRequest,
  UpdateAdministradorRequest,
  LoginAdministradorRequest,
  LoginAdministradorResponse,
  Administrador,
  ApiResponse,
} from "../interfaces/administrador.interface";

axios.defaults.withCredentials = true;

export const AdministradorService = {
  async login(data: LoginAdministradorRequest): Promise<ApiResponse<LoginAdministradorResponse>> {
    const response = await axios.post<ApiResponse<LoginAdministradorResponse>>(
      `${ENV.API_URL}/administradores/login`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async logout(): Promise<ApiResponse<null>> {
    const response = await axios.post<ApiResponse<null>>(
      `${ENV.API_URL}/administradores/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  },

  async getAdministradores(): Promise<Administrador[]> {
    const response = await axios.get<ApiResponse<Administrador[]>>(
      `${ENV.API_URL}/administradores`,
      { withCredentials: true }
    );
    return response.data.data || [];
  },

  async getAdministradorById(id: string): Promise<Administrador> {
    const response = await axios.get<ApiResponse<Administrador>>(
      `${ENV.API_URL}/administradores/${id}`,
      { withCredentials: true }
    );
    return response.data.data as Administrador;
  },

  async createAdministrador(data: CreateAdministradorRequest): Promise<ApiResponse<Administrador>> {
    const response = await axios.post<ApiResponse<Administrador>>(
      `${ENV.API_URL}/administradores`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async updateAdministrador(id: string, data: UpdateAdministradorRequest): Promise<ApiResponse<Administrador>> {
    const response = await axios.put<ApiResponse<Administrador>>(
      `${ENV.API_URL}/administradores/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async deleteAdministrador(id: string): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/administradores/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
