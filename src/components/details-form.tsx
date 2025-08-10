"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Spinner } from "./ui/spinner"
import { Textarea } from "./ui/textarea"
import { useFormContext } from "@/context/form-context"
import { formSchema, type FormData } from "@/schemas/form"
import { generateId } from "@/lib/utils"

type DetailsFromProps = {
  closeModal?: () => void
  defaultValues?: {
    id?: number
    name?: string
    description?: string
  }
}

export const DetailsForm = ({
  defaultValues,
  closeModal,
}: DetailsFromProps) => {
  const { dispatch } = useFormContext();
  const router = useRouter();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || ""
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (defaultValues?.id) {
        // Update existing form
        dispatch({
          type: 'UPDATE_FORM_DETAILS',
          payload: {
            id: defaultValues.id,
            name: data.name,
            description: data.description || ""
          }
        });
        
        toast({ 
          title: "Success", 
          description: "Form details updated successfully" 
        });
        closeModal?.();
        return;
      }

      // Create new form
      const newFormId = Date.now();
      const newShareId = generateId();
      
      dispatch({
        type: 'CREATE_FORM',
        payload: {
          name: data.name,
          description: data.description || "",
          content: [],
          status: "DRAFT" || "",
          shareId: newShareId,
          visits: 0,
          submissions: 0,
          updatedAt: new Date().toISOString()
        }
      });

      toast({ 
        title: "Success", 
        description: "Form created successfully" 
      });
      
      closeModal?.();
      router.push(`/dashboard/builder/${newFormId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving the form",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting ? <Spinner /> : "Save"}
        </Button>
      </form>
    </Form>
  )
}