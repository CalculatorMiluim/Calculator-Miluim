import React from 'react'
import {AppBar, Box, Button, Stack, Toolbar, Typography} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import {COLORS} from "@/consts/colors.ts";

const Navbar = () => {
    return (
        <Box sx={{mb: 2}}>
            <AppBar position="static" sx={{bgcolor: "#FFF"}}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center", pb: 2}}>
                    <Stack alignItems="flex-start">
                        <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
                            <Typography variant="h2" sx={{flexGrow: 1, pb: 2, color: COLORS.BLACK, fontWeight: 600}}>
                                בזכותך!
                            </Typography>
                            <Typography variant="h2">
                                🫡
                            </Typography>
                        </Box>
                        <Box sx={{display: "flex", gap: 2}}>
                            <Typography>
                                ⚔️
                            </Typography>
                            <Typography sx={{color: COLORS.BLACK}}>
                                מחשבון מענקים למלחמת חרבות ברזל למשרת מילואים
                            </Typography>
                        </Box>
                    </Stack>


                    <Button variant="outlined" endIcon={<ShareIcon/>}
                            sx={{color: "fff", minWidth: 150}}>
                        שתף
                    </Button>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar
