import * as Yup from 'yup';
import type { NoteTag } from '../../types/note';

const validTags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Заголовок має бути не менше 3 символів')
    .max(50, 'Заголовок має бути не більше 50 символів')
    .required("Заголовок є обов'язковим полем"),

  content: Yup.string()
    .max(500, 'Контент має бути не більше 500 символів')
    .optional(),

  tag: Yup.string()
    .oneOf(validTags, 'Виберіть коректний тег')
    .required("Тег є обов'язковим полем"),
});