import axios, { AxiosInstance } from 'axios';
import { components } from './schemas';
import { ContentType } from '../../types/content';


const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
});

export async function authUser(initData: string) {
    console.log(initData)
    const response = await api.post(`/users/auth`, {
      grant_type: "password",
      initData: initData,
    });
    
    console.log(response.data);
    return response.data;
}

export async function getLocalization(lang: string) {
  const response = await api.get(`/localization/miniapp_strings/${lang}`)
  console.log(response.data);
  return response.data;
}

export async function getContents(token: string, parent_content_id?: number | null): Promise<components['schemas']['ContentRead'][]> {
  let url = `/contents/parent`;
  if (parent_content_id) {
    url += `/${parent_content_id}`;
  }
  
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response)
  return response.data;
}

export async function getContent(token: string, id?: number | null): Promise<components['schemas']['ContentRead'] | null> {
  if (!id) return null;
  let url = `/contents/${id}`;
  
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response)
  return response.data;
}



export async function getFolders(token: string, parent_content_id?: number): Promise<components['schemas']['ContentRead'][]> {
  let url = `/contents/folders`;
  if (parent_content_id) {
    url += `/${parent_content_id}`;
  }
  const response = await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function renameContent(token: string, content_data: ContentType, new_name: string): Promise<components['schemas']['ContentRead']> {
  let url = `/contents/${content_data.id}`
  content_data.title = new_name
  const response = await api.put(url, content_data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteContent(token: string, content_id: number): Promise<components['schemas']['ContentRead']> {
  let url = `/contents/${content_id}`
  const response = await api.delete(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function addFolder(token: string, name: string | null | undefined, user_id: number, parent_content_id?: number | null | undefined): Promise<components['schemas']['ContentRead']> {
  let url = `/contents/`
  type CreateContentRequest = components["schemas"]["ContentCreate"];
  let content: CreateContentRequest = {
    "title": name ?? "Новая папка",
    "type": 2,
    "user_id": user_id,
  }
  if (parent_content_id) {
    content['parent_content_id'] = parent_content_id
  }
  console.log(content)

  const response = await api.post(url, content, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response)
  return response.data;
}

export async function forwardMessage(token: string, content_id: number): Promise<void> {
  const url = `/contents/forward_message/${content_id}`
  const response = await api.post(url, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response)  
}
