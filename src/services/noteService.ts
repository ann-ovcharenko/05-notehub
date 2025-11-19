import type { Note, NoteCreationData, NoteListItem } from "../types/note";
import axios, { type AxiosResponse } from "axios";

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  data: NoteListItem[];
  meta: {
    total: number; 
    pages: number; 
    page: number;
    perPage: number;
  };
}

const BASE_URL = "https://notehub-public.goit.study/api";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

if (typeof TOKEN !== 'string' || !TOKEN) {
  throw new Error("Не знайдено токен авторизації VITE_NOTEHUB_TOKEN. Перевірте файл .env.local.");
}

const noteApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<any> = await noteApi.get(
    "/notes",
    {
      params: {
        page,
        perPage,
        ...(search && { search }),
      },
    }
  );

  const apiData = response.data;
  
  return {
    data: apiData.notes, 
    meta: {
      total: apiData.totalPages * perPage, 
      pages: apiData.totalPages,
      page: page,
      perPage: perPage,
    },
  };
};

export const createNote = async (data: NoteCreationData): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteApi.post("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteApi.delete(`/notes/${id}`);
  return response.data;
};