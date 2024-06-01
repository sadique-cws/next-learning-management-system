
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { db } from "@/lib/db"
import { ChevronDown } from "lucide-react"
import Link from "next/link"


const UserItems = ({image,name, email}) => (
  <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Options{" "}
                <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandList>
                  <CommandGroup>
                    <CommandItem >
                      <Link href="" className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                      <p>View Details</p>
                      <p className="text-sm text-muted-foreground">
                        Can view Course Details.
                      </p>
                      </Link>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
)

export async function LatestMembers() {
  let users = await db.user.findMany();


  return (
    <Card className="max-h-[500px] overflow-auto">
      <CardHeader>
        <CardTitle>New Members</CardTitle>
        <CardDescription>
          All members who have joined
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
          {
            users.map((user,id) => <UserItems key={id} {...user}/>)
          }
      </CardContent>
    </Card>
  )
}