import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Notifications from '@/components/Notifications/Notifications.tsx'
import AppModal from '@/components/AppModal/AppModal.tsx'

const NotificationsLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Outlet />
      <Notifications />
      <AppModal />
    </Box>
  )
}

export default NotificationsLayout
