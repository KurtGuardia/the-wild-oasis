import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { createEditCabin } from '../../services/apiCabins'

export function useCreateCabin() {
  const queryClient = useQueryClient()

  const { mutate: createCabin, isLoading: isCreating } =
    useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success('New Cabin succsessfully created', {
          duration: 2000,
        })
        queryClient.invalidateQueries({
          queryKey: ['cabins'],
        })
      },
      onError: (error) => {
        toast.error(error.message, {
          duration: 2000,
        })
        console.log(error.message)
      },
    })
  return { isCreating, createCabin }
}
