import { IPizzeria } from 'dto/pizzerias.dto'
import React from 'react'
import ItemMenu from '../itemMenu'
import {
  Column,
  Contacts,
  HeaderTitle,
  Row,
  Wrapper,
  ColumnsContainer,
} from './Styles.elements'

interface IProps {
  pizzeria: IPizzeria
  edit: Function
}

const PizzeriaCard: React.FC<IProps> = ({ pizzeria, edit }) => {
  return (
    <Wrapper>
      <ColumnsContainer>
        <Column>
          <Row>
            <HeaderTitle>
              {`Название: `}
              {pizzeria?.name ?? 'Пиццерия'}
            </HeaderTitle>
          </Row>
          <Row>
            <HeaderTitle>
              {`Город: `}
              {pizzeria?.address?.city ?? ''}
            </HeaderTitle>
          </Row>
          <Row>
            <HeaderTitle>
              {`Улица: `}
              {pizzeria?.address?.street ?? ''}
            </HeaderTitle>
          </Row>
          <Row>
            <HeaderTitle>
              {`Дом: `} {pizzeria?.address?.house ?? ''}
            </HeaderTitle>
          </Row>
          <Row>
            <HeaderTitle>
              {`Корпус: `}
              {pizzeria?.address?.housing ?? ''}
            </HeaderTitle>
          </Row>
          <Row>
            <HeaderTitle>
              {`Этаж: `}
              {pizzeria?.address?.floor ?? ''}
            </HeaderTitle>
          </Row>
          <Row>
            <HeaderTitle>
              {`Комментарий: `}
              {pizzeria?.address?.description ?? ''}
            </HeaderTitle>
          </Row>
        </Column>
        <Column>
          Контакты:{' '}
          {pizzeria?.contacts?.map((el, index) => (
            <Contacts key={index}>
              {el.contact_type}: <HeaderTitle>{el.contact}</HeaderTitle>
            </Contacts>
          ))}
        </Column>
        <Column>Администраторы:</Column>
      </ColumnsContainer>
      <ItemMenu item={pizzeria} edit={edit} />
    </Wrapper>
  )
}

export default PizzeriaCard
