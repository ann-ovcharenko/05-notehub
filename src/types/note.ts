export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
  owner: string;
}

export interface NoteCreationData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteListItem {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}
