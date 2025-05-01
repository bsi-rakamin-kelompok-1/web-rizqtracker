'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useAuthDataStore } from '@/store/AuthDataStore';
import { useUserStore } from '@/store/UserStore';
import { useRouter } from 'next/navigation';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = useAuthDataStore((state) => state.token);
  const userStore = useUserStore();
  const router = useRouter();

  const handleDashboardClick = () => {
    router.push('/dashboard');
  };
  const handleTransferClick = () => {
    router.push('/transactions/transfer');
  };
  const handleTopupClick = () => {
    router.push('/transactions/topup');
  };
  const handleProfileClick = () => {
    router.push('/profile');
  };
  const handleLogOut = () => {
    localStorage.removeItem('auth-store');
    localStorage.removeItem('all-transactions-store');
    localStorage.removeItem('cashflow-store');
    localStorage.removeItem('expense-history-store');
    localStorage.removeItem('transaction-history-store');
    localStorage.removeItem('transaction-type-store');
    localStorage.removeItem('user-store');
    document.cookie = `isLoggedIn=; SameSite=Lax;`;

    router.push('/auth/login');
  };

  return (
    <header className='bg-[#32BAA3]'>
      <div className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex-1 md:flex md:items-center md:gap-12'>
            <a className='block' href='#'>
              <span className='sr-only'>Home</span>
              <Image
                src={'/Logo.svg'}
                alt='Walled'
                width={20}
                height={20}
                className='h-14 w-30 dark:bg-white'
              />
            </a>
          </div>

          <div className='md:flex md:items-center md:gap-12'>
            <nav aria-label='Global' className='hidden md:block'>
              <ul className='flex items-center gap-6 text-sm'>
                <li>
                  <a
                    className='text-white transition hover:text-gray-500/75'
                    href='#'
                    onClick={handleDashboardClick}
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    className='text-white transition hover:text-gray-500/75'
                    href='#'
                    onClick={handleTransferClick}
                  >
                    Transfer
                  </a>
                </li>
                <li>
                  <a
                    className='text-white transition hover:text-gray-500/75'
                    href='#'
                    onClick={handleTopupClick}
                  >
                    Topup
                  </a>
                </li>
                <li>
                  <a
                    className='text-white transition hover:text-gray-500/75'
                    href='#'
                    onClick={handleLogOut}
                  >
                    Keluar
                  </a>
                </li>
              </ul>
            </nav>

            <div className='hidden md:relative md:block'>
              <button
                type='button'
                className='overflow-hidden cursor-pointer rounded-full border border-gray-300 shadow-inner'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className='sr-only'>Toggle dashboard menu</span>
                <Image
                  src={userStore.avatar_url ?? '/cat-wink.png'}
                  alt=''
                  width={20}
                  height={20}
                  className='size-10 object-cover'
                />
              </button>

              {isMenuOpen && (
                <div
                  className='absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg'
                  role='menu'
                >
                  <div className='p-2 cursor-pointer'>
                    <a
                      onClick={handleProfileClick}
                      className='block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                      role='menuitem'
                    >
                      Detail Profil
                    </a>
                  </div>
                  <div className='p-2'>
                    <form method='POST' action='#'>
                      <button
                        type='submit'
                        className='flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50'
                        role='menuitem'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='size-4'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3'
                          />
                        </svg>
                        Keluar
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* INI TOMBOL KRABBY PATTY */}
            <div className='block md:hidden'>
              <button className='rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='size-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
