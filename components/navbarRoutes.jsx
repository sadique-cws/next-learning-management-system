"use client"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs'
import SearchInput from './search-input'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogOut, User } from 'lucide-react'
import { Button } from './ui/button'

const NavbarRoutes = () => {

  const {userId} = useAuth(); 

  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/admin');
  const isPlayerPage =pathname?.includes('/chapter');

  const isSearchPage = pathname === "/search";

  return (
    <>
    {isSearchPage && (
        <div className='hidden md:block'>
        <SearchInput/>
        </div>
    )}
    
    <div className="flex gap-x-2 ml-auto">    
    {
      isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className='w-4 h-4 mr-2'/>
              Exit
          </Button>
        </Link>
      ) : (
        <Link href="/admin/courses">
          <Button size="sm" variant="ghost">
            <User className='w-4 h-4 mr-2'/>
              Admin Panel
          </Button>
        </Link>
      )
    }        
    <div className='flex gap-2'>
      <SignedOut>
        <SignInButton/>
        <SignUpButton/>
      </SignedOut>
      <SignedIn>
        
        <UserButton afterSignOutUrl="/"/>
      </SignedIn>
    </div>
</div>
</>
  )
}
export default NavbarRoutes