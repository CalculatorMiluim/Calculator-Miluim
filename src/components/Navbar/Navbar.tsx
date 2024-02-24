import React from 'react'
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography, useTheme } from '@mui/material'
import { COLORS } from '@/consts/colors.ts'
import { useNavigate } from 'react-router-dom'
import ShareIcon from '@mui/icons-material/Share';
import { RWebShare } from "react-web-share";

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
                    fontFamily: 'PolinBoldFont',
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

            <RWebShare
              disableNative={false}
              data={{
                text: "מחשבון מענקים למלחמת חרבות ברזל למשרת מילואים",
                url: "https://calculate-miluim.info/",
                title: "בזכותך!",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button
                sx={{
                  minWidth: {
                    xs: 150,
                    md: 180,
                  },
                }}
                type="button"
                variant="outlined"
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                  <Typography sx={{ pb: 0.4, fontFamily: 'PolinBoldFont' }} variant="h5">
                    שתף
                  </Typography>
                  <ShareIcon />
                </Box>
              </Button>
            </RWebShare>

          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}

export default Navbar
