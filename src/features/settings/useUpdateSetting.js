import toast from 'react-hot-toast'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { updateSetting as updateSettingApi } from '../../services/apiSettings'

export function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { mutate: updateSetting, isLoading: isUpdating } =
    useMutation({
      mutationFn: updateSettingApi,
      onSuccess: () => {
        toast.success('Setting successfully edited', {
          duration: 2000,
        })
        queryClient.invalidateQueries({
          queryKey: ['settings'],
        })
      },

      onError: (error) => {
        toast.error(error.message, {
          duration: 2000,
        })
        console.log(error.message)
      },
    })

  return { isUpdating, updateSetting }
}
