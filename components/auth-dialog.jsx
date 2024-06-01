import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SignIn } from "./google-btn"


const AuthDialog = () => {
    return (
        <Dialog>
            <DialogTrigger className="bg-sky-200 py-1 rounded ring-1 px-3 hover:bg-sky-500 hover:text-white">Login
            </DialogTrigger>
            <DialogContent className="max-w-[300px] flex flex-col gap-5">
                <DialogHeader>
                    <DialogTitle className="text-slate-500 text-center">Login Here</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <SignIn />
                </DialogDescription>
            </DialogContent>
        </Dialog>

    )
}

export default AuthDialog