import axios from "axios";
import { ENV } from "../config/env";
import {
  CreateTrabajadorRequest,
  UpdateTrabajadorRequest,
  LoginTrabajadorRequest,
  LoginTrabajadorResponse,
  Trabajador,
  ApiResponse,
} from "../interfaces/trabajador.interface";

axios.defaults.withCredentials = true;

export const TrabajadorService = {
  async login(data: LoginTrabajadorRequest): Promise<ApiResponse<LoginTrabajadorResponse>> {
    const response = await axios.post<ApiResponse<LoginTrabajadorResponse>>(
      `${ENV.API_URL}/trabajadores/login`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async logout(): Promise<ApiResponse<null>> {
    const response = await axios.post<ApiResponse<null>>(
      `${ENV.API_URL}/trabajadores/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  },

  async getTrabajadores(): Promise<Trabajador[]> {
    const response = await axios.get<ApiResponse<Trabajador[]>>(
      `${ENV.API_URL}/trabajadores`,
      { withCredentials: true }
    );
    return response.data.data || [];
  },

  async getTrabajadorById(id: string): Promise<Trabajador> {
    const response = await axios.get<ApiResponse<Trabajador>>(
      `${ENV.API_URL}/trabajadores/${id}`,
      { withCredentials: true }
    );
    return response.data.data as Trabajador;
  },

  async createTrabajador(data: CreateTrabajadorRequest): Promise<ApiResponse<Trabajador>> {
    const response = await axios.post<ApiResponse<Trabajador>>(
      `${ENV.API_URL}/trabajadores`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async updateTrabajador(id: string, data: UpdateTrabajadorRequest): Promise<ApiResponse<Trabajador>> {
    const response = await axios.put<ApiResponse<Trabajador>>(
      `${ENV.API_URL}/trabajadores/${id}`,
      data,
      { withCredentials: true }
    );
    return response.data;
  },

  async deleteTrabajador(id: string): Promise<ApiResponse<null>> {
    const response = await axios.delete<ApiResponse<null>>(
      `${ENV.API_URL}/trabajadores/${id}`,
      { withCredentials: true }
    );
    return response.data;
  },
};
