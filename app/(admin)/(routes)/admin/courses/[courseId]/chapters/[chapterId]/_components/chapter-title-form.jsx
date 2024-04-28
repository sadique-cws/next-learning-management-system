"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import  * as z  from "zod"

const formSchema = z.object({
    title:z.string().min(1)
})


const ChapterTitleForm = ({initialData, courseId, chapterId}) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues:initialData
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values) => {
        try{
            let data = await axios.patch(`/api/course/${courseId}/chapters/${chapterId}`, values)
            console.log(data);
            toast.success("Chapter updated");
            toggleEdit();
            router.refresh();
        }
        catch(error){
            if(error.response){
                toast.error(`Server responded with ${error.response.status} error`);
            }
            else if(error.request){
                toast.error(`No response recieved from server`);
            }
            else{
                toast.error(`Error: ${error.message}`);
            }
        }
    }
  
  return (
    <div className='mt-6 bg-slate-100 rounded-md p-4 dark:bg-slate-800 '>
       <div className="font-medium flex items-center justify-between">
        Chapter Title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className="text-sm mt-2 dark:text-gray-300">
          {initialData?.title}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 dark:text-gray-300"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction of your course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default ChapterTitleForm