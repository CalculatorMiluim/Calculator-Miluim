import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import NotificationsLayout from '@/components/NotificationsLayout/NotificationsLayout.tsx'
import AuthGuard from '@/components/Guards/AuthGuard/AuthGuard.tsx'
import { UserRole } from '@/consts/general.consts.ts'
import Home from '@/pages/Home/Home.tsx'
import { RoutesValues } from '@/consts/routes.ts'
import NotFound from '@/pages/NotFound/NotFound.tsx'
import Results from '@/pages/Results/Results.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NotificationsLayout />}>
        <Route element={<AuthGuard allowedRoles={[UserRole.BASIC]} />}>
          <Route index element={<Home />} />
          <Route path={RoutesValues.BENEFITS} element={<Results />} />
        </Route>
      </Route>
      <Route path={RoutesValues.FALLBACK} element={<NotFound />} />
    </Routes>
  )
}

export default App
