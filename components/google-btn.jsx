
import { signInAction, signOutAction } from "@/actions/server-actions"
import { FcGoogle } from "react-icons/fc"

export function SignIn() {
  return (
    <form
      action={signInAction}
    >
      <button type="submit" className="bg-slate-200 items-center justify-center py-3 text-lg rounded flex gap-2 w-full text-slate-800">                        
      <FcGoogle className="w-7 h-7" />
        Signin with Google</button>
    </form>
  )
}
export function SignOut() {
  return (
    <form
      action={signOutAction}
    >
      <button type="submit">Logout</button>
    </form>
  )
} 