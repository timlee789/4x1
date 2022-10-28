import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Menu } from '@headlessui/react';
import DropdownLink from './dropdownlink';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession, signOut } from 'next-auth/react';
//import { Cookies } from 'next/dist/server/web/spec-extension/cookies';

function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' });
  };
  return (
    <div>
      <Head>
        <title>{title ? title + '-Bijoux' : '4X Xpression'}</title>
        <meta name="description" content="Destiny Wig Giveaway Event" />
        <link
          rel="image_src"
          href="https://bijouxhair.com/tim/ad/mainbanner.jpg"
        />
        <meta property="og:title" content="Destiny Wig Giveaway Event" />
        <meta
          property="og:image"
          content="https://bijouxhair.com/tim/ad/mainbanner.jpg"
        />
        <meta property="og:description" content="Destiny Wig Giveaway Event" />
        <meta property="og:site_name" content="Beauty Elements" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between ">
            <Link href="/">
              <a className="text-lg font-bold">Beauty Elements</a>
            </Link>

            {status === 'loading' ? (
              'Loading'
            ) : session?.user ? (
              <Menu as="div" className="relative inline-block">
                <Menu.Button className="text-blue-600">
                  {session.user.name}
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link" href="/productlist">
                      Product List
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/products/productinput"
                    >
                      Product Management
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/campaignhistory"
                    >
                      Campaign History
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink
                      className="dropdown-link"
                      href="/admin/campaign/campaigninput"
                    >
                      Campaign Input
                    </DropdownLink>
                  </Menu.Item>

                  {/* {session.user.isAdmin && (
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/admin/dashboard"
                      >
                        Admin Dashboard
                      </DropdownLink>
                    </Menu.Item>
                  )} */}
                  <Menu.Item>
                    <a
                      className="dropdown-link"
                      href="#"
                      onClick={logoutClickHandler}
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            ) : (
              <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
            )}
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner lg: h-50">
          Copyright @2022 Beauty Elements
        </footer>
      </div>
    </div>
  );
}

export default Layout;
