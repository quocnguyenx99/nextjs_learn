import { toast } from "@/hooks/use-toast"
import { EntityError } from "@/lib/http"
import { clsx, type ClassValue } from "clsx"
import { UseFormSetError } from "react-hook-form"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const handleErrorApi = ({error, setError, duration} : {
  error: any,
  setError?: UseFormSetError<any>,
  duration?: number,
}) => { 
  if(error instanceof EntityError && setError) {
    error.payload.errors.forEach(err => {
      setError(err.field, {
        type: "server",
        message: err.message,
      })
    })
  } else {
    toast({
      title: 'Lỗi', 
      description: error?.payload?.message?? 'Lỗi không xác định', 
      variant: 'destructive', 
      duration: duration?? 5000,
    })
  }
}
