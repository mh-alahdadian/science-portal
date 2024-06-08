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

export function mockPosts(): Schema<'PageArticleResponseDTO'> {
  const content = [
    {
      id: 1,
      title: 'عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد. عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد.',
      authorName: 'نویسنده بلاگ',
      coverImage:
        'https://s3-alpha-sig.figma.com/img/a2e5/b041/399e46ec81cd011be4a42a4561c2de39?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H75LXp4mpoPlTgON8VfRMLqtmpNqMWQ6Ixrlw2Zdd67S~7zcgRc3h1bV3JHwrSdWcwMDKdapEK9tzWem~zRYEAHFrE5xUO-tHI0zbd4TEvUBNnUloqRTnrgQdcFb2~TwgomhU3VBbqE3tAR5~DHLDXcwPWcREXxVDhEuDVOp6jw6kXMOAhKQs6Nj3OKclrhOtB5lcFw~VOSWQevaxT-j47SUkP0nC4354QIIFGvOhLFOTWN1xxPkGipQmt6lGXZWSUBSaFouP71zg9-qK-RgOHlcru1KhaKPzDWvSKHQJpu5zP6nKbHXEpY~RFXjmJy6GTfkvYpW5JsoRcFVLQbfqA__',
      view: 125000,
    },
    {
      id: 2,
      title: 'عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد. عنوان مطلب که می‌تواند به اندازه خوبی طولانی باشد.',
      authorName: 'نویسنده بلاگ',
      coverImage:
        'https://s3-alpha-sig.figma.com/img/a2e5/b041/399e46ec81cd011be4a42a4561c2de39?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H75LXp4mpoPlTgON8VfRMLqtmpNqMWQ6Ixrlw2Zdd67S~7zcgRc3h1bV3JHwrSdWcwMDKdapEK9tzWem~zRYEAHFrE5xUO-tHI0zbd4TEvUBNnUloqRTnrgQdcFb2~TwgomhU3VBbqE3tAR5~DHLDXcwPWcREXxVDhEuDVOp6jw6kXMOAhKQs6Nj3OKclrhOtB5lcFw~VOSWQevaxT-j47SUkP0nC4354QIIFGvOhLFOTWN1xxPkGipQmt6lGXZWSUBSaFouP71zg9-qK-RgOHlcru1KhaKPzDWvSKHQJpu5zP6nKbHXEpY~RFXjmJy6GTfkvYpW5JsoRcFVLQbfqA__',
      view: 125000,
    },
  ];
  return { content };
}
