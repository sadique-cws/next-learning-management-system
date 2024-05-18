"use client"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs'
import SearchInput from './search-input'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BarChart, GraduationCap, Home, LogOut, User } from 'lucide-react'
import { Button } from './ui/button'
import { isTeacher } from '@/lib/teacher'

const NavbarRoutes = () => {

  const { userId } = useAuth();

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
              <Home className='w-4 h-4'/>
              <span>Home</span>
          </Link>
      
          <Link href="/learn"  className='md:flex hidden gap-1 items-center'>
              <GraduationCap className='h-4 w-4'/>
              <span>Courses</span>
          </Link>
          <Link href="#" className='md:flex hidden gap-1 items-center'>
              <BarChart className='w-4 h-4'/>
              <span>Achievements</span>
          </Link>
          
          <SignedOut>
            <SignInButton className="bg-sky-200 py-1 rounded ring-1 px-3 hover:bg-sky-500 hover:text-white" />
            <SignUpButton className="ring-sky-200 py-1 text-sky-500 rounded ring-1 px-3 hover:bg-sky-500 hover:text-white"/>
          </SignedOut>
          <SignedIn>
          {
          isTeacherPage || isPlayerPage ? (
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className='w-4 h-4 mr-2' />
                Exit
              </Button>
            </Link>
          ) : isTeacher(userId) ? (
            <Link href="/admin/courses">
              <Button size="sm" variant="ghost">
                <User className='w-4 h-4 mr-2' />
                Admin Panel
              </Button>
            </Link>
          ) : null
        }
            <UserButton afterSignOutUrl="/" />
            
        </SignedIn>
        </div>
      </div>
    </>
  )
}
export default NavbarRoutes