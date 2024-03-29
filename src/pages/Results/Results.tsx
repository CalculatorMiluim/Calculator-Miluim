import React, { useEffect } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import BigNumber from '@/pages/Results/BigNumber/BigNumber.tsx'
import ToggledListItems from '@/pages/Results/ToggledListItems/ToggledListItems.tsx'
import { useResults } from '@/pages/Results/Results.module.tsx'
import PrintIcon from '@mui/icons-material/Print';

const Results = () => {
  const { panelsMap, totalAmount } = useResults()
  const [allExpanded, setAllExpanded] = React.useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const printButton = () => {
    return (
      <Button
                sx={{
                  mr:10,
                  ml:10,
                  minWidth: {
                    xs: 150,
                    md: 180,
                  },
                }}
                type="button"
                variant="outlined"
                onClick={() => 
                  {
                    setAllExpanded(true);
                    setTimeout(function(){
                      window.print();
                      setAllExpanded(false);
                  }, 1000);
                    
                  }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                  <Typography sx={{ pb: 0.4, fontFamily: 'PolinBoldFont' }} variant="h5">
                  הדפסה
                  </Typography>
                  <PrintIcon />
                </Box>
              </Button>
    )
  }

  return (
    <Stack alignItems="flex-start" gap={3}>
      <Typography>סכום הכסף שאתה זכאי לו -</Typography>

      <Box sx={{ display: 'flex' , width: '100%'}}>
        <Stack direction={"row"} useFlexGap flexWrap="wrap" justifyItems={'center'} alignItems={'center'} spacing={{ xs: 2, sm: 2 }}>
        <BigNumber amount={totalAmount} />
        {printButton()}
        </Stack>
      </Box>

      <Typography>רשימת הזכויות שמגיעות לך בתור משרת מילואים בתקופת מלחמת חרבות ברזל</Typography>

      <Typography variant="h5">מענק שנכנס לך באופן אוטומטי לחשבון בנק, כמו התגמול הנוסף</Typography>
      <ToggledListItems panels={panelsMap.automaticGrant} allExpanded={allExpanded}/>

      <Typography variant="h5">מענק שאתה צריך לבקש, לדוגמא מענק מהאוניברסיטה</Typography>
      <ToggledListItems panels={panelsMap.grant} allExpanded={allExpanded}/>

      <Typography variant="h5">שובר למימוש, כמו לדוגמא שובר בשווי 3500 ש״ח לחופשה </Typography>
      <ToggledListItems panels={panelsMap.voucher} allExpanded={allExpanded}/>

      <Typography variant="h5">הטבות לא כספיות</Typography>
      <ToggledListItems panels={panelsMap.noMoneyBenefits} allExpanded={allExpanded}/>

    </Stack>
  )
}

export default Results
