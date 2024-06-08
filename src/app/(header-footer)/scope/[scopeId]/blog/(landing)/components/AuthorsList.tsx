import { TextIcon } from '@/components';
import { Eye, ReadCvLogo } from '@phosphor-icons/react';
import humanFormat from 'human-format';
import { AuthorDTO, AuthorInfo } from './AuthorInfo';

const mockAuthors: AuthorDTO[] = [
  {
    firstName: 'نویسنده',
    lastName: 'بلاگ',
    avatar:
      'https://s3-alpha-sig.figma.com/img/4238/f09b/014d0324fec8ef01c81b8b79303c6e40?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qJsE9ixprpb1Vzrv03jVb~vda2fGNlDdYONBb3y2U3CW3FwMPXtxnEg8axjgeny6k8tfu0cN6gBNJxqktbO7AZUCZvNs38JQ31sJ6WDR0eqLI3iwoavrXZslGyhlCuxjBHT1YWeb0P8OUoeaC2d7hP75KKwMRiSrNRkuQWCHQli0R1jJ6qzzn8Gtak~9Jdh8AX4rH5eXKT5Te3BLvSY4iYZG8bAUEAZ7YUbhhFVJ8R4jRXdmenF-rS7wPzi7S6BiMrwretSuNqMiqE52PP08a2YPdFm1z3pjITdV1gki1ekpvGxCaTh9pN5q3Zojs7c94Qvpo-LIdxsAc4DTIsxdng__',
    read: 23,
    view: 125000,
  },
  {
    firstName: 'اسم',
    lastName: 'فامیل',
    avatar:
      'https://s3-alpha-sig.figma.com/img/4238/f09b/014d0324fec8ef01c81b8b79303c6e40?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qJsE9ixprpb1Vzrv03jVb~vda2fGNlDdYONBb3y2U3CW3FwMPXtxnEg8axjgeny6k8tfu0cN6gBNJxqktbO7AZUCZvNs38JQ31sJ6WDR0eqLI3iwoavrXZslGyhlCuxjBHT1YWeb0P8OUoeaC2d7hP75KKwMRiSrNRkuQWCHQli0R1jJ6qzzn8Gtak~9Jdh8AX4rH5eXKT5Te3BLvSY4iYZG8bAUEAZ7YUbhhFVJ8R4jRXdmenF-rS7wPzi7S6BiMrwretSuNqMiqE52PP08a2YPdFm1z3pjITdV1gki1ekpvGxCaTh9pN5q3Zojs7c94Qvpo-LIdxsAc4DTIsxdng__',
    read: 23,
    view: 125000,
  },
];

export function AuthorsList(props: {}) {
  const authors = mockAuthors;
  return (
    <ol className="flex flex-col gap-4">
      {authors.map((author, i) => (
        <li className="flex items-center gap-4" key={i}>
          <AuthorInfo author={author} />
          <TextIcon Icon={ReadCvLogo} text={author.read} />
          <TextIcon Icon={Eye} text={humanFormat(author.view)} />
        </li>
      ))}
    </ol>
  );
}
