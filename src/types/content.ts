export type ContentType = {
    title: string;
    type: number;
    parent_content_id?: number | null;
    user_id?: number | null;
    tg_chat_id?: number | null;
    tg_message_id?: number | null;
    body?: string | null;
    attachment?: number | null;
    id: number;
 };