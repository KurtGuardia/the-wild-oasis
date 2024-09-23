import toast from 'react-hot-toast'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { updateCurrentUser } from '../../services/apiAuth'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  const { mutate: updateUser, isLoading: isUpdating } =
    useMutation({
      mutationFn: updateCurrentUser,
      onSuccess: ({ user }) => {
        toast.success('User account successfully updated', {
          duration: 3000,
        })
        queryClient.setQueriesData(['user'], user)
        queryClient.invalidateQueries({
          queryKey: ['user'],
        })
      },
      onError: (error) => {
        toast.error(error.message, {
          duration: 3000,
        })
        console.log(error.message)
      },
    })

  return { updateUser, isUpdating }
}
