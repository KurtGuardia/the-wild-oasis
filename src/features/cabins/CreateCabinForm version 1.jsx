import { useForm } from 'react-hook-form'
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import { createCabin } from '../../services/apiCabins'

function CreateCabinForm() {

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
  } = useForm()
  const { errors } = formState

  const queryClient = useQueryClient()

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New Cabien succsessfully credated', {
        duration: 2000,
      })
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      reset()
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 2000,
      })
      console.log(error.message)
    },
  })

  function onSubmit(data) {
    mutate({...data, image: data.image[0]})
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Cabin name'
        error={errors?.name?.message}
      >
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label='maxCapacity'
        error={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least one',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='regularPrice'
        error={errors?.regularPrice?.message}
      >
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label='discount'
        error={errors?.discount?.message}
      >
        <Input
          type='number'
          id='discount'
          disabled={isCreating}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              Number(value) <=
                Number(getValues().regularPrice) ||
              'Discoutn should be aless than regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='description for website'
        error={errors?.description?.message}
      >
        <Input
          type='text'
          id='description'
          disabled={isCreating}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id='image' accept='image/*' {...register('image', {
            required: 'This field is required',
          })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
