import axios, { AxiosInstance } from 'axios';
import { components } from './apiClient';
import { API_BASE_URL } from '../../config';
import { ContentType } from 'types/content';
import { Bot } from 'grammy'

const baseUrl: string = API_BASE_URL;

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
});

export async function getContents(user_id: number, parent_content_id?: number | null): Promise<components['schemas']['ContentRead'][]> {
  let url = `${baseUrl}/contents/parent/${user_id}`;
  if (parent_content_id) {
    url += `/${parent_content_id}`;
  }
  const response = await axiosInstance.get(url);
  return response.data;
}

export async function getFolders(user_id: number, parent_content_id?: number): Promise<components['schemas']['ContentRead'][]> {
  let url = `${baseUrl}/contents/folders/${user_id}`;
  if (parent_content_id) {
    url += `/${parent_content_id}`;
  }
  const response = await axiosInstance.get(url);
  return response.data;
}

export async function renameContent(content_data: ContentType, new_name: string): Promise<components['schemas']['ContentRead']> {
  let url = `${baseUrl}/contents/${content_data.id}`
  content_data.title = new_name
  const response = await axiosInstance.put(url, content_data);
  return response.data;
}



export async function deleteContent(content_id: number): Promise<components['schemas']['ContentRead']> {
  let url = `${baseUrl}/contents/${content_id}`
  const response = await axiosInstance.delete(url);
  return response.data;
}

export async function addFolder(user_id: number, parent_content_id?: number | null | undefined): Promise<components['schemas']['ContentRead']> {
  let url = `${baseUrl}/contents/`
  type CreateContentRequest = components["schemas"]["ContentCreate"];
  let content: CreateContentRequest = {
    "title": "Новая папка",
    "type": 2,
    "user_id": user_id,
  }
  if (parent_content_id) {
    content['parent_content_id'] = parent_content_id
  }
  console.log(content)

  const response = await axiosInstance.post(url, content);
  console.log(response)
  return response.data;
}

export async function getOrCreateUser(telegram_id: number): Promise<components['schemas']['UserRead']> {
  const url = `${baseUrl}/users/${telegram_id}`
  const response = await axiosInstance.get(url);
  console.log(response.data)
  return response.data
}

export async function forwardMessage(chat_id: number, message_id: number) {
  const BOT_TOKEN = "6717689497:AAHD0McVGhxlwWc2SpEmYEL_iH0NeDuLH4M";
  // TODO cleanup
  const bot = new Bot(BOT_TOKEN)
  bot.api.raw.forwardMessage({
    chat_id: chat_id,
    from_chat_id: chat_id,
    message_id: message_id
  })
}
