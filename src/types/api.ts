import { components as Core } from 'src/generated/core';
import { components as Forum } from 'src/generated/forum';
import { components as News } from 'src/generated/news';

type AllSchemas = Core['schemas'] & News['schemas'] & Forum['schemas'];

declare global {
  export type Schema<T extends keyof AllSchemas> = AllSchemas[T];
}
