import supabase, { supabaseUrl } from './supabase'

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error)
    throw new Error('bookings could not be loaded')
  }

  return data
}

export async function createEditCabin(newCabin, id) {
  console.log("🚀 ~ createEditCabin ~ newCabin:", newCabin)
  const hasImgPath = newCabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${
    newCabin.image.name
  }`.replaceAll('/', '')
  const imagePath = hasImgPath
  ? newCabin.image.at[0]
  : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // 1 create the cabin
  let query = supabase.from('cabins')

  // 1.1 Create
  if (!id)
    query = query.insert(
      !newCabin.image[0] ? { ...newCabin, image: imagePath } : { ...newCabin }
    );

  // 1.2 Edit
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select()

  const { data, error } = await query.select().single()

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be created')
  }

  //2 Upload image
  if (hasImgPath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)
    console.error(storageError)
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created',
    )
  }

  return data
}

export async function deleteCabin(id) {
  const { error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }
}
