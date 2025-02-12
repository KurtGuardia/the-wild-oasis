import toast from 'react-hot-toast'
import { createEditCabin } from '../../services/apiCabins'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

export function useEditCabin() {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isLoading: isEditing } =
    useMutation({
      mutationFn: ({ newCabinData, id }) =>
        createEditCabin(newCabinData, id),
      onSuccess: () => {
        toast.success('Cabin succsessfully edited', {
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

  return { isEditing, editCabin }
}
