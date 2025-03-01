'use client';
import Header from '@/admin-components/Header/Header';
import Sidebar from '@/admin-components/Sidebar';
import './index.css';

export default function AdminLayout(props: any) {
  return (
    <>
      <Header />
      <Sidebar />
      {props.children}
    </>
  );
}
