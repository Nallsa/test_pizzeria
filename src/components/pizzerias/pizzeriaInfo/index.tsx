import { IPizzeria } from 'dto/pizzerias.dto'
import { FC } from 'react'
import { Wrapper } from './Styles.elements'

interface IProps {
  pizzeria: IPizzeria | null
}

const PizzeriaInfo: FC<IProps> = ({ pizzeria }) => {
  return <Wrapper>{pizzeria?.address?.city}</Wrapper>
}

export default PizzeriaInfo
