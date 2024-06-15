export function mockTags(): Schema<'TagEntity'>[] {
  return [
    {
      name: 'تگ خیلی بلند',
    },
    {
      name: 'تگ شماره 4',
    },
  ];
}

export interface BlogPostMock extends Omit<Schema<'ArticleResponseDTO'>, 'authorId' | 'authorName'> {
  author: {
    id: number;
    name: string;
    avatar: string;
    followersCount: number;
    postCount: number;
    feedbackStats: { likesCount: number; commentCount: number };
  };
  view: number;
}

const text = `
<p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
<p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
<p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
<p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
<img src="https://s3-alpha-sig.figma.com/img/1e2d/cbad/0a01be49768d3053baa042c2c5640437?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UKSgRW3VT79GSJ-I37T9AnpFWkaK1FAvr129Jh8GdJjv9oDMNdn3i6kGkjH79zJLjqah4iiZyHY2AfG7zxBiPTbuM5mFpvJ6ideBQYVVrhNzRU3crPANHdSwnKQGbuHXdR8rBZIkLXLHaxR-Xk~ybzT7Q7cRgLiwRt0rwqJ8Q13iqws47oUp-UHXYPE~nuJI~0s9oZ941lFVPQqOeRsk0ALRWYnYX-P3V4edMgL4dluBBwhN9OBEYMT8ocAnsaZF7g2XFEpkYVZdLgLnmG-h6MRIpeC8Lq3zql2LEQ7cLfbU96m1Vc40K8ueVqqPjB0fNLdjvG8OftfjiSUSLQCi8Q__"></img>
<p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
<p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
<p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
<p>یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.یک پاراگراف از محتوایی که کاربر نوشته است و در آن برای مثال سوال خود را مطرح کرده است.</p>
`;

export function mockPosts(): Schema<'PageArticleResponseDTO'> {
  const mockImage =
    'https://s3-alpha-sig.figma.com/img/843c/c79a/0258258620eda444731c25cad9a19ee4?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HWQyuI5O~mQ240wiOjPuPVy~8qrWh~m9pF9KBiAC~Ya5JpdWEzaNoqZju2gX2tmLnOmxyBlAK1BFn-dKcoVoRfSbDpowyTurIUlnRNrEeqnT2p7bi3ho9NP-gUk5ZabQ-dpzvadcjhxDTlGqACjmnwhvZ9ezrR2V3WXPVLjtQNDQKICTSsjV8HnEBn3~6lSWqvw26dinlSs7ZHNa0QNmkyYNVbg2boJZS-ixI4Xm6Qz3auj5gHxDFm0mn8L1K5FijYEhHg9RnW0NeOHxrRV-XszT6gdpEpad2XUrCRW1suirKdFL1A6F6VOqFAZYHKtFbuqo8LPsC2cDhiXJiNlarA__';
  const mockAvatar =
    'https://s3-alpha-sig.figma.com/img/4238/f09b/014d0324fec8ef01c81b8b79303c6e40?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qJsE9ixprpb1Vzrv03jVb~vda2fGNlDdYONBb3y2U3CW3FwMPXtxnEg8axjgeny6k8tfu0cN6gBNJxqktbO7AZUCZvNs38JQ31sJ6WDR0eqLI3iwoavrXZslGyhlCuxjBHT1YWeb0P8OUoeaC2d7hP75KKwMRiSrNRkuQWCHQli0R1jJ6qzzn8Gtak~9Jdh8AX4rH5eXKT5Te3BLvSY4iYZG8bAUEAZ7YUbhhFVJ8R4jRXdmenF-rS7wPzi7S6BiMrwretSuNqMiqE52PP08a2YPdFm1z3pjITdV1gki1ekpvGxCaTh9pN5q3Zojs7c94Qvpo-LIdxsAc4DTIsxdng__';
  const content: BlogPostMock[] = [
    {
      id: 1,
      createAt: '2024-04-20 13:56:12',
      title: 'عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد. عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد.',
      author: {
        id: 12,
        name: 'نویسنده بلاگ',
        avatar: mockAvatar,
        feedbackStats: { likesCount: 548, commentCount: 94 },
        postCount: 24,
        followersCount: 36,
      },
      coverImage: mockImage,
      content: text,
      view: 125000,
    },
    {
      id: 2,
      createAt: '2024-04-20 13:56:12',
      title: 'عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد. عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد.',
      author: {
        id: 12,
        name: 'نویسنده بلاگ',
        avatar: mockAvatar,
        feedbackStats: { likesCount: 548, commentCount: 94 },
        postCount: 24,
        followersCount: 36,
      },
      coverImage: mockImage,
      content: text,
      view: 125000,
    },
  ];
  return { content } as any;
}
