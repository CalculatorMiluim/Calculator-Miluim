import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.scss'
import theme from "@/theme.ts";
import {ThemeProvider} from "@mui/material";
import {cacheRtl} from "@/rtl-plugin.ts";
import {CacheProvider} from "@emotion/react";
import {store} from "@/store.ts";
import {Provider} from 'react-redux'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {BrowserRouter, Route, Routes} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'he'}>
                    <BrowserRouter>
                        <Provider store={store}>
                            <Routes>
                                <Route path="/*" element={<App/>}/>
                            </Routes>
                        </Provider>
                    </BrowserRouter>
                </LocalizationProvider>
            </ThemeProvider>
        </CacheProvider>

    </React.StrictMode>,
)
