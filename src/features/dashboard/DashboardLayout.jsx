import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import { useRecentStays } from './useRecentStays'
import { useCabins } from '../cabins/useCabins'
import Stats from './Stats'
import SalesChart from './SalesChart'
import Spinner from '../../ui/Spinner'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

export default function DashboardLayout() {
  const { bookings, isLoading: isLoading1 } =
    useRecentBookings()
  const {
    stays,
    confirmedStays,
    numDays,
    isLoading: isLoading2,
  } = useRecentStays()
  const { cabins, isLoading: isLoading3 } = useCabins()

  if (isLoading1 || isLoading2 || isLoading3)
    return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today&apos;s activity</div>
      <div>Chart stay durations</div>
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}
