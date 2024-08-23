import { useSearchParams } from 'react-router-dom'
import Select from './Select'

export default function SortBy({ options }) {
  const [searchParams, setSearhParams] = useSearchParams()
  const sortBy = searchParams.get('sortBy') || ''

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value)
    setSearhParams(searchParams)
  }

  return (
    <Select
      options={options}
      type='white'
      value={sortBy}
      onChange={handleChange}
    />
  )
}
