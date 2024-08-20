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
import { createEditCabin } from '../../services/apiCabins'

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit
  const isEditSession = Boolean(editId)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState,
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  })
  const { errors } = formState

  const queryClient = useQueryClient()

  const { mutate: createCabin, isLoading: isCreating } =
    useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success('New Cabin succsessfully created')
        queryClient.invalidateQueries({
          queryKey: ['cabins'],
        })
        reset()
      },
      onError: (error) => {
        toast.error(error.message)
        console.log(error.message)
      },
    })

  const { mutate: editCabin, isLoading: isEditing } =
    useMutation({
      mutationFn: ({ newCabinData, id }) =>
        createEditCabin(newCabinData, id),
      onSuccess: () => {
        toast.success('Cabin succsessfully edited')
        queryClient.invalidateQueries({
          queryKey: ['cabins'],
        })
        reset()
      },
      onError: (error) => {
        toast.error(error.message)
        console.log(error.message)
      },
    })

  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image =
      typeof data.image === 'string'
        ? data.image
        : data.image[0]

    if (isEditSession)
      editCabin({
        newCabinData: { ...data, image },
        id: editId,
      })
    else createCabin({ ...data, image: image })
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession
              ? false
              : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession
            ? 'Edit cabin'
            : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
