import { ChangeEvent, FC } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { IContacts, IPizzeria } from 'dto/pizzerias.dto'

import AdminData from './AdminData'
import ChangeStatus from './ChangeStatus'
import AddContact from './addContact'

import {Wrapper, HeaderTitle, Row} from './Styles.elements'
import { useActions } from 'hooks/useActions'

interface IProps {
	state: IPizzeria | null
	setState: Function
	handleSave: ()=>void
	handleCancel: ()=>void
}

const OwnerAndContacts: FC<IProps> = ({ state, setState, handleSave, handleCancel }) => {
	const { deleteContactById } = useActions()
  const handleChangeContacts = (contact: any): void => {
    if (contact.uuid) {
      setState((prev: any) => ({
        ...prev,
        contacts: [
          ...prev.contacts.filter((el: any) => el.uuid !== contact.uuid),
          { ...contact, pizzeria_id: state?.id },
        ],
      }))
    } else {
      setState((prev: any) => ({
        ...prev,
        contacts: prev.contacts.map((el: IContacts) =>
          el.id === contact.id ? contact : el
        ),
      }))
    }
	}

	const handleDeleteContact = async (id: number): Promise<void> => {
    await deleteContactById(id)
    setState((prev: IPizzeria) => ({
      ...prev,
      contacts: prev?.contacts?.filter(
        (contact: IContacts) => contact.id !== id
      ),
    }))
    /* const newData =  newPizzeria.pizzerias.map(el=>({...el, contacts: el.contacts.filter(contact=> contact.id !== action.payload)})) */
	}

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>): void => {
    setState((prev: IPizzeria) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

	return (
		<Wrapper>
			<HeaderTitle>Владелец</HeaderTitle>
			<AdminData state={state} setState={setState} />
			<TextField
					value={state?.orderMail}
					name='orderMail'
					onChange={handleChangeData}
					sx={{ marginTop: '5px', marginBottom: '5px' }}
					size='small'
					id='outlined-basic-orderMail'
					label='Email для уведомлений о заказе'
					fullWidth
					variant='outlined'
					type='email'
				/>

			<HeaderTitle>Статус пиццерии</HeaderTitle>
			<ChangeStatus state={state} setState={setState} />

			<AddContact
				state={state?.contacts}
				setState={handleChangeContacts}
				deleteContactById={handleDeleteContact}
			/>

			<Row>
        <Button onClick={handleSave} variant='text'>
          Сохранить
        </Button>
        <Button onClick={handleCancel} color='error' variant='text'>
          Отмена
        </Button>
      </Row>
		</Wrapper>
	)
}

export default OwnerAndContacts
