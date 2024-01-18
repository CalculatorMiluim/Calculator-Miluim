import React, {useEffect} from 'react'
import {Box, Typography} from '@mui/material'
import {useHome} from "@/pages/Home/Home.module.ts";
import {useAppDispatch} from "@/hooks/reduxHooks.ts";
import {addInfoMessage, addSuccessMessage} from "@/features/app/appSlice.ts";

const Home = () => {

    const {dummy} = useHome()
    const dispatch=useAppDispatch()
    // useEffect(()=>{
    //     dispatch(addSuccessMessage("sdfasdfdsa"))
    // },[])
    return (
        <Box>
            <Typography textAlign={'left'} sx={{mb: 1, fontSize: 25}}>
                hello2
            </Typography>
        </Box>
    )
}

export default Home
