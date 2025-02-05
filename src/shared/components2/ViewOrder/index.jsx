import Count from './Count'
import Section from './Section'
import DropDown from '../ui/DropDown'
const ViewOrder = () => {
  return (
    <div className='[direction:rtl] flex items-center gap-4'>
      <Count />
      {/* <Section /> */}
      <DropDown />
    </div>
  )
}

export default ViewOrder