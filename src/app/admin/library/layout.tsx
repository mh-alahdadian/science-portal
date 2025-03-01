'use client';
import { useState } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import './index.css';

export default function AdminLayout(props: any) {
  const [title, setTitle] = useState('داشبورد');

  return (
    <>
      <Header title={title} />
      <Sidebar setTitle={setTitle} />
      {props.children}
    </>
  );
}
