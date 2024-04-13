import { components as Core } from 'src/generated/core';
import { components as Forum } from 'src/generated/forum';
import { components as News } from 'src/generated/news';

type AllSchemas = Core['schemas'] & News['schemas'] & Forum['schemas'];

type SchemasOf = {
  core: Core['schemas'];
  news: News['schemas'];
  forum: Forum['schemas'];
};

declare global {
  export type Schema<T extends keyof AllSchemas> = AllSchemas[T];
  export type SchemaOf<X extends keyof SchemasOf, T extends keyof SchemasOf[X]> = SchemasOf[X][T];
}
