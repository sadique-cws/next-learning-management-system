"use client"
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import  * as z  from "zod"

const formSchema = z.object({
    categoryId: z.string().min(1),
})


const CategoryForm = ({initialData, courseId, options}) => {

    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm({
        resolver:zodResolver(formSchema),
        defaultValues: {
            categoryId: initialData?.categoryId || "",
        },
    })

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async(values) => {
        try{
            let data = await axios.patch(`/api/course/${courseId}`, values)
            console.log(data);
            toast.success("Course title updated");
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

    const selectedOption = options.find(
        (option) => option.value === initialData.categoryId
    );
  
  return (
    <div className='mt-6 bg-slate-100 rounded-md p-4 dark:bg-slate-800 '>
       <div className="font-medium flex items-center justify-between">
        Course Category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
                <p
                    className={cn(
                        "text-sm mt-2",
                        !initialData.categoryId && "text-slate-500 italic"
                    )}
                >
                    {selectedOption?.label || "No category"}
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                   <Combobox options={...options} {...field}/>
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

export default CategoryForm