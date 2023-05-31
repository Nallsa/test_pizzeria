import {
  Typography,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Avatar,
} from '@mui/material'
import moment from 'moment'

interface Inotifications {
  id: number
  title: string
  description: string
  avatar: null | string
  type: string
  createdAt: Date
  isUnRead: boolean
}

interface Iprops {
  notification: Inotifications
}

const NotificationItem: React.FC<Iprops> = ({ notification }) => {
  const { avatar, title } = renderContent(notification)
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant='caption'
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            {/* <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} /> */}
            {moment(notification.createdAt, 'YYYYMMDD').fromNow()}
          </Typography>
        }
      />
    </ListItemButton>
  )
}

export default NotificationItem

function renderContent(notification: Inotifications) {
  const title = (
    <Typography variant='subtitle2'>
      {notification.title}
      <Typography
        component='span'
        variant='body2'
        sx={{ color: 'text.secondary' }}
      >
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  )

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src='/static/icons/ic_notification_package.svg'
        />
      ),
      title,
    }
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src='/static/icons/ic_notification_shipping.svg'
        />
      ),
      title,
    }
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src='/static/icons/ic_notification_mail.svg'
        />
      ),
      title,
    }
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src='/static/icons/ic_notification_chat.svg'
        />
      ),
      title,
    }
  }
  return {
    avatar: notification.avatar ? (
      <img alt={notification.title} src={notification.avatar} />
    ) : null,
    title,
  }
}
