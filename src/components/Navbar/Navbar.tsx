import React from 'react'
import { AppBar, Box, Container, Stack, Toolbar, Typography, useTheme } from '@mui/material'
import { COLORS } from '@/consts/colors.ts'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  return (
    <Box sx={{ mb: 2 }}>
      <AppBar position="static" sx={{ bgcolor: '#FFF' }}>
        <Container>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: { sm: 2 } }}>
            <Stack alignItems="flex-start">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => navigate('/')}
              >
                <Typography
                  variant="h2"
                  sx={{
                    flexGrow: 1,
                    pb: {
                      xs: 1,
                      md: 2,
                    },
                    color: COLORS.BLACK,
                    fontWeight: 600,
                    fontSize: {
                      xs: theme.typography.h4.fontSize,
                      md: theme.typography.h2.fontSize,
                    },
                  }}
                >
                  בזכותך!
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: {
                      xs: theme.typography.h4.fontSize,
                      md: theme.typography.h2.fontSize,
                    },
                  }}
                >
                  🫡
                </Typography>
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  gap: 2,
                  justifyContent: 'flex-start',
                  textAlign: 'start',
                }}
              >
                <Typography>⚔️</Typography>
                <Typography sx={{ color: COLORS.BLACK }}>מחשבון מענקים למלחמת חרבות ברזל למשרת מילואים</Typography>
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Navbar
