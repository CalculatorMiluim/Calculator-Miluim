import React from 'react'
import {Box, Button, Stack, Typography} from "@mui/material";
import BigNumber from "@/pages/Results/BigNumber/BigNumber.tsx";
import {PanelData} from "@/pages/Results/ToggledListItems/ToggledListItems.module.ts";
import ToggledListItems from "@/pages/Results/ToggledListItems/ToggledListItems.tsx";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import {useGetResultsMutation} from "@/features/results/resultsApiSlice.ts";
import {useResults} from "@/pages/Results/Results.module.ts";

const panels: PanelData[] = [
    {id: 'panel1', header: 'לשום', Content: <Typography>Content for accordion 1 </Typography>},
    {id: 'panel2', header: 'שדגכשדג', Content: <Typography>Content for accordion 2 </Typography>},
]
const Results = () => {
    const res = useResults()

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
            <ToggledListItems panels={panels}/>
            <Button variant="outlined" endIcon={<SaveAltIcon/>} sx={{px: 4}}>שמור PDF</Button>


        </Stack>
    )
}

export default Results
