import React from 'react'
import {Box, Stack, Typography} from "@mui/material";
import BigNumber from "@/pages/Results/BigNumber/BigNumber.tsx";
import ToggledListItem from "@/pages/Results/ToggledListItem/ToggledListItem.tsx";

const Results = () => {
    return (
        <Stack alignItems="flex-start" gap={3}>
            <Typography>
                סכום הכסף שאתה זכאי לו -
            </Typography>

            <Box sx={{display: "flex"}}>
                <BigNumber amount={20340}/>
            </Box>

            <Typography>
                רשימת הזכויות שמגיעות לך בתור משרת מילואים בתקופת מלחמת חרבות ברזל
            </Typography>
            <ToggledListItem/>

        </Stack>
    )
}

export default Results
