import { RedirectType, redirect } from 'next/navigation';

export default function X() {
  redirect('admin/dashboard', RedirectType.replace);
}
