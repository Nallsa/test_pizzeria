import React, { Ref } from 'react'

import { useSelector } from 'react-redux'

import { RootState } from 'dataStore/state'

import { useActions } from 'hooks/useActions'
import { useRole } from 'hooks/useRole'

import { IQuestion } from 'dto/questions.dto'

import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
import moment from 'moment'

import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import Chip from 'components/chip'
import { ColorTypes } from 'components/chip/Styles.elements'
import { Wrapper } from './Styles.element'
import QuestionDetails from './details/QuestionDetails'
import { IPizzeria } from 'dto/pizzerias.dto'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const QuestionsPage: React.FC = () => {
  const { questions } = useSelector((state: RootState) => state.questions)
  const { pizzerias } = useSelector((state: RootState) => state.pizzerias)
  const { users } = useSelector((state: RootState) => state.users)

  const { getAllPizzerias, getAllUsers } = useActions()

  const { userId } = useRole()

  const [selected, setSelected] = React.useState<IQuestion | null>(null)

  const handleClose = (): void => {
    setSelected(null)
  }

  const handleOpen = (order: IQuestion): void => {
    setSelected(order)
  }

  React.useEffect(() => {
    getAllUsers()
    getAllPizzerias()
  }, [])

  const getPizzeria = (id: number) => {
    const pizzeriaAddress = pizzerias.filter(el => el.id === id)
    if (pizzeriaAddress[0] === undefined) return ''
    return `${pizzeriaAddress[0]?.address?.city}, ${pizzeriaAddress[0]?.address?.street}`
  }

  const getFilteredQuestions = () => {
    let filteredQuestions: IQuestion[] = []

    questions.forEach(question => {
      const pizzeriaId = pizzerias.filter(
        el => el.id === question.pizzeria_id
      )[0]
      if (userId && pizzeriaId?.adminsIds!.includes(userId)) {
        filteredQuestions.push(question)
      }
    })

    if (filteredQuestions.length > 0) return filteredQuestions
    return questions
  }

  const columns = React.useMemo<MRT_ColumnDef<IQuestion>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '№',
        size: 0,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'pizzeria_id',
        header: 'Отделение',
        size: 180,
        enableColumnFilter: false,
        accessorFn: row => getPizzeria(row.pizzeria_id),
      },
      {
        accessorKey: 'name',
        header: 'Имя',
        size: 0,
      },
      {
        accessorKey: 'is_viewed',
        header: 'Статус',
        size: 0,
        enableColumnFilter: false,
        accessorFn: row => (
          <Chip
            style={{ width: 'fit-content' }}
            color={ColorTypes[row.is_viewed ? 'light_blue' : 'red']}
          >
            {row.is_viewed ? 'Прочитано' : 'Не прочитано'}
          </Chip>
        ),
      },
      {
        accessorKey: 'viewerId',
        header: 'Просмотрел',
        size: 0,
        accessorFn: row => (
          <>
            {users?.filter(user => user.id === row.viewerId)[0]?.first_name ??
              ''}{' '}
            {users?.filter(user => user.id === row.viewerId)[0]?.last_name ??
              ''}
          </>
        ),
      },
      {
        accessorKey: 'is_agree',
        header: 'Согласие',
        size: 0,
        enableColumnFilter: false,
        accessorFn: row => (row?.is_agree ? 'Согласен' : 'Не согласен'),
      },
      {
        accessorKey: 'create_at',
        header: 'Создан',
        size: 0,
        accessorFn: row => (
          <>
            {moment(row.create_at).format('L')}{' '}
            {moment(row.create_at).format('LT')}
          </>
        ),
      },
      {
        accessorKey: 'update_at',
        header: 'Отредактирован',
        size: 0,
        accessorFn: row => (
          <>
            {moment(row.create_at).format('L')}{' '}
            {moment(row.create_at).format('LT')}
          </>
        ),
      },
    ],
    [pizzerias]
  )

  return (
    <Wrapper>
      <MaterialReactTable
        muiTablePaperProps={{
          elevation: 0,
          sx: { width: '100%', overflowY: 'auto' },
        }}
        muiTablePaginationProps={{
          rowsPerPageOptions: [9, 30, 50, 100],
        }}
        initialState={{
          pagination: { pageSize: 9, pageIndex: 0 },
          showColumnFilters: true,
        }}
        state={{ showSkeletons: questions.length > 0 ? false : true }}
        columns={columns}
        data={getFilteredQuestions() ?? []}
        memoMode={'rows'}
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            handleOpen(row.original)
          },
        })}
      />

      <Dialog
        disableEscapeKeyDown
        open={Boolean(selected)}
        onClose={handleClose}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              X
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Данные заказа
            </Typography>
            <Button autoFocus color='inherit' onClick={handleClose}>
              Сохранить
            </Button>
          </Toolbar>
        </AppBar>
        <QuestionDetails state={selected} />
      </Dialog>
    </Wrapper>
  )
}

export default QuestionsPage
