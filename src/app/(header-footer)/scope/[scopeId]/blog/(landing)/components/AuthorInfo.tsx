interface Props {
  author: AuthorDTO | { id: number, name: string, avatar: string } & any;
}

export type AuthorDTO = Schema<'AuthorDTO'> & { avatar: string; read: number; view: number };

export function AuthorInfo({ author }: Props) {
  return (
    <>
      <div className="avatar placeholder">
        <div className="w-10 rounded-full">
          <img src={author.avatar} alt="test image" />
        </div>
      </div>
      <p className="flex-1">
        {author.name || `${author.firstName} ${author.lastName}`}
      </p>
    </>
  );
}
