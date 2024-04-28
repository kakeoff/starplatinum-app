import axios from "@/plugins/axios";
import { UploadFileResponse } from "@/types/fileTypes";

export async function uploadFile(file: FormData): Promise<string> {
  try {
    const res = await axios.post<UploadFileResponse[]>(`/files/upload`, file);
    const fileName = res.data[0].filename
    return fileName
  } catch (err) {
    return Promise.reject(err)
    }
  }
