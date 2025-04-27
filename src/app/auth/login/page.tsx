import Link from 'next/link';
import { FC } from 'react';
import { ChevronLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import Login from '@/components/auth/Login';

const Page: FC = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default Page;