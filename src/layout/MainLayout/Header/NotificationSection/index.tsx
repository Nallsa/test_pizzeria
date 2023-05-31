import { useState } from 'react'

// material-ui
import { alpha, styled } from '@mui/material/styles'
import {
  Box,
  Button,
  Divider,
  Typography,
  Badge,
  Popover,
  Tooltip,
  IconButton,
  List,
  ListSubheader,
} from '@mui/material'

import NotificationItem from './NotificationItem'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { AiOutlineBell } from 'react-icons/ai'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'

const ArrowStyle = styled('span')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    top: -7,
    zIndex: 1,
    width: 12,
    right: 20,
    height: 12,
    content: "''",
    position: 'absolute',
    borderRadius: '0 0 4px 0',
    transform: 'rotate(-135deg)',
    background: theme.palette.background.paper,
    borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
  },
}))

interface Inotifications {
  id: number
  title: string
  description: string
  avatar: null | string
  type: string
  createdAt: Date
  isUnRead: boolean
}

const NotificationSection: React.FC = () => {
  /* const [open, setOpen] = useState<boolean>(false); */
  /* const [value, setValue] = useState<string>(''); */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [notifications, setNotifications] = useState<Inotifications[]>([
    {
      id: 1,
      title: 'You have new mail',
      description: 'sent from Guido Padberg',
      avatar: null,
      type: 'mail',
      createdAt: new Date(),
      isUnRead: true,
    },
    {
      id: 2,
      title: 'Delivery processing',
      description: 'Your order is being shipped',
      avatar: null,
      type: 'order_shipped',
      createdAt: new Date(),
      isUnRead: false,
    },
  ])
  const open = Boolean(anchorEl)

  const totalUnRead = notifications.filter(
    item => item.isUnRead === true
  ).length

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({
        ...notification,
        isUnRead: false,
      }))
    )
  }
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  /* const anchorRef = useRef(null); */

  /* const handleToggle = (): void => {
		setOpen((prevOpen) => !prevOpen);
	}; */

  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null)
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <IconButton
        size='large'
        color='inherit'
        onClick={handleClick}
        aria-controls={open ? 'menu-list-grow' : undefined}
      >
        <Badge badgeContent={totalUnRead} color='error'>
          <AiOutlineBell />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(open)}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 360,
            overflow: 'inherit',
          },
        }}
      >
        <ArrowStyle className='arrow' />
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>Уведомления</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              Непрочитанных сообщений: {totalUnRead}
            </Typography>
          </Box>
          {totalUnRead > 0 && (
            <Tooltip title=' Отметить прочитанными'>
              <IconButton color='primary' onClick={handleMarkAllAsRead}>
                <IoCheckmarkDoneOutline />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <PerfectScrollbar
          style={{
            height: '100%',
            maxHeight: 'calc(100vh - 205px)',
            overflowX: 'hidden',
          }}
        >
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                Новые сообщения
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: 'overline' }}
              >
                Ранее
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>
        </PerfectScrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            Посмотреть все
          </Button>
        </Box>
      </Popover>
    </>
  )
}

export default NotificationSection
