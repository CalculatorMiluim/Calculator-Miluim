import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import BigNumber from '@/pages/Results/BigNumber/BigNumber.tsx'
import ToggledListItems from '@/pages/Results/ToggledListItems/ToggledListItems.tsx'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import { useResults } from '@/pages/Results/Results.module.tsx'

const Results = () => {
  const { panelsMap, totalAmount } = useResults()

  return (
    <Stack alignItems="flex-start" gap={3}>
      <Typography>סכום הכסף שאתה זכאי לו -</Typography>

      <Box sx={{ display: 'flex' }}>
        <BigNumber amount={totalAmount} />
      </Box>

      <Typography>רשימת הזכויות שמגיעות לך בתור משרת מילואים בתקופת מלחמת חרבות ברזל</Typography>

      <Typography variant="h5">מענק שנכנס לך באופן אוטומטי לחשבון בנק, כמו התגמול הנוסף</Typography>
      <ToggledListItems panels={panelsMap.automaticGrant} />

      <Typography variant="h5">מענק שאתה צריך לבקש, לדוגמא מענק מהאוניברסיטה</Typography>
      <ToggledListItems panels={panelsMap.grant} />

      <Typography variant="h5">שובר למימוש, כמו לדוגמא שובר בשווי 3500 ש״ח לחופשה </Typography>
      <ToggledListItems panels={panelsMap.voucher} />

      <Button variant="outlined" endIcon={<SaveAltIcon />} sx={{ px: 4 }}>
        שמור PDF
      </Button>
    </Stack>
  )
}

export default Results
