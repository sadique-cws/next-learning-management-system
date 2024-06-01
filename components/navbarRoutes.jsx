"use client"
import SearchInput from './search-input'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BarChart, GraduationCap, Home, LogOut, User } from 'lucide-react'
import { Button } from './ui/button'
import { isTeacher } from '@/lib/teacher'
import AuthDialog from './auth-dialog'
import SignInAvatar from './signin-avatar'

const NavbarRoutes = ({ session }) => {

  const userId = session?.userId;

  const pathname = usePathname();
  const isTeacherPage = pathname?.startsWith('/admin');
  const isPlayerPage = pathname?.includes('/chapter');
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className='hidden md:block'>
          <SearchInput />
        </div>
      )}

      <div className="flex gap-x-2 ml-auto ">
        <div className='flex gap-x-4 items-center'>
          <Link href="/" className='md:flex hidden gap-1 items-center'>
            <Home className='w-4 h-4' />
            <span>Home</span>
          </Link>

          <Link href="/learn" className='md:flex hidden gap-1 items-center'>
            <GraduationCap className='h-4 w-4' />
            <span>Courses</span>
          </Link>
         

          {!session?.user ? (<AuthDialog />) :
            (isTeacherPage || isPlayerPage ? (
              <>
                <Link href="/">
                  <Button size="sm" variant="ghost">
                    <LogOut className='w-4 h-4 mr-2' />
                    Exit
                  </Button>
                </Link>
                <SignInAvatar session={session} />
              </>


            ) : isTeacher(userId) ? (
              <>
                <Link href="/admin/courses">
                  <Button size="sm" variant="ghost">
                    <User className='w-4 h-4 mr-2' />
                    Admin Panel
                  </Button>
                </Link>
                <SignInAvatar session={session} />
              </>
            ) : (
              <>
                <Link href="/dashboard">
                  <Button size="sm" variant="ghost">
                    <User className='w-4 h-4 mr-2' />
                    My Learning
                  </Button>
                </Link>
                <SignInAvatar session={session} />

              </>)
            )}



        </div>
      </div>
    </>
  )
}
export default NavbarRoutes

