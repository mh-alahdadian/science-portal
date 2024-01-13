import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outside Scope',
};

export default function OutsideScopeLayout({ children, header }: LayoutProps<'header'>) {
  return (
    <>
      {header}
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
