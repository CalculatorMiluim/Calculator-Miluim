import React from 'react'
import {Box, Button, Stack, Typography} from "@mui/material";
import BigNumber from "@/pages/Results/BigNumber/BigNumber.tsx";
import ToggledListItems from "@/pages/Results/ToggledListItems/ToggledListItems.tsx";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useResults} from "@/pages/Results/Results.module.tsx";


const Results = () => {
    const {panels, isLoading, totalAmount} = useResults()

    return (
        <Stack alignItems="flex-start" gap={3}>
            <Typography>
                סכום הכסף שאתה זכאי לו -
            </Typography>

            <Box sx={{display: "flex"}}>
                <BigNumber amount={totalAmount}/>
            </Box>

            <Typography>
                רשימת הזכויות שמגיעות לך בתור משרת מילואים בתקופת מלחמת חרבות ברזל
            </Typography>
            <ToggledListItems panels={panels}/>
            <Button variant="outlined" endIcon={<SaveAltIcon/>} sx={{px: 4}}>שמור PDF</Button>


        </Stack>
    )
}

export default Results
