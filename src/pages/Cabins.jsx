import Heading from '../ui/Heading'
import Row from '../ui/Row'
import Button from '../ui/Button'
import CabinTable from '../features/cabins/CabinTable'
import CreateCabinForm from '../features/cabins/CreateCabinForm'
import { useState } from 'react'

function Cabins() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filster / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button
          onClick={() => setShowForm((show) => !show)}
        >
          Add new cabine
        </Button>
        {showForm && <CreateCabinForm/>}
      </Row>
    </>
  )
}

export default Cabins
