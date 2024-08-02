import type { components as Article, paths as ArticlePaths } from 'src/generated/article';
import type { components as Blog, paths as BlogPaths } from 'src/generated/blog';
import type { components as Core, paths as CorePaths } from 'src/generated/core';
import type { components as Feedback, paths as FeedbackPaths } from 'src/generated/feedback';
import type { components as Forum, paths as ForumPaths } from 'src/generated/forum';
import type { components as Fs, paths as FsPaths } from 'src/generated/fs';
import type { components as Library, paths as LibraryPaths } from 'src/generated/library';
import type { components as News, paths as NewsPaths } from 'src/generated/news';

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;

type Services = {
  article: { components: Article; paths: ArticlePaths };
  blog: { components: Blog; paths: BlogPaths };
  core: { components: Core; paths: CorePaths };
  fs: { components: Fs; paths: FsPaths };
  feedback: { components: Feedback; paths: FeedbackPaths };
  forum: { components: Forum; paths: ForumPaths };
  library: { components: Library; paths: LibraryPaths };
  news: { components: News; paths: NewsPaths };
};

type AllSchemas = UnionToIntersection<Services[keyof Services]['components']['schemas']>;

type PathGen<BasePath extends string, Paths> = {
  [k in keyof Paths & string as `${BasePath}${k}`]: Paths[k];
};

type AllPaths = UnionToIntersection<
  {
    [key in keyof Services]: PathGen<`${key}:`, Services[key]['paths']>;
  }[keyof Services]
>;

declare global {
  export type Schema<T extends keyof AllSchemas> = AllSchemas[T];
  export type SchemaOf<
    X extends keyof Services,
    T extends keyof Services[X]['components']['schemas'],
  > = Services[X]['components']['schemas'][T];
  export type ApiPaths = AllPaths;
  // export type MutationData<>
}
