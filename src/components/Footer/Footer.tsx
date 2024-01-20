import React from 'react'
import { Box, Container, Typography, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 6,
        borderTop: '0.1px solid #202020',
      }}
    >
      <Container sx={{ textAlign: 'start' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography display="inline-block" variant="h5" fontWeight={600}>
              💝 פותח באהבה
            </Typography>
            <Typography variant="h5" display="inline-block">
              על ידי NetApp TLV
            </Typography>
          </Box>
          <Box sx={{ display: 'felx', gap: 0.5 }}>
            <Typography>פונט:</Typography>
            <Typography sx={{ fontWeight: 600 }}>פולין</Typography>
            <Typography>(תודה הפונטיה!)</Typography>
          </Box>
        </Box>
        <Typography>
          המידע המוצג אינו מהווה אחריות לתשלום סכומים אלו. נמליץ להשתמש במחשבון זה כדי לקבל תמונה כללית ולא מחייבת של
          התמורות הצפויות. הנתונים שהוזנו במחשבון אינם נשמרים במסדי הנתונים. המידע מונגש כשירות לציבור. האחריות בידי
          המשתמש בלבד. 😊
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
