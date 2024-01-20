import React from 'react'
import { Box, Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Notifications from '@/components/Notifications/Notifications.tsx'
import AppModal from '@/components/AppModal/AppModal.tsx'
import Navbar from '@/components/Navbar/Navbar.tsx'
import Footer from '@/components/Footer/Footer.tsx'

const NotificationsLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }}>
      <Navbar />
      <Container>
        <Outlet />
        <Notifications />
        <AppModal />
      </Container>
      <Footer />
    </Box>
  )
}

export default NotificationsLayout
