import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import SearchInput from './search-input'

const NavbarRoutes = () => {
  return (
    <div className="flex gap-x-2 ml-auto justify-between flex-1">            
    <SearchInput/>
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
  )
}
export default NavbarRoutes