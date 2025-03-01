'use client';
import Header from './library/components/Header/Header';
import Sidebar from './library/components/Sidebar';
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
