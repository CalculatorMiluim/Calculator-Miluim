import {Alert, Box, Snackbar} from '@mui/material'
import {removeMessage, selectMessages} from '@/features/app/appSlice.ts'
import {useAppDispatch, useAppSelector} from '@/hooks/reduxHooks.ts'

const AUTO_HIDE_TIME = 1500

const Notifications = () => {
    const messages = useAppSelector(selectMessages)
    const dispatch = useAppDispatch()

    const handleAutoHide = (id: string) => {
        dispatch(removeMessage(id))
    }

    return (
        <Box>
            {messages.map(({content, id, type}, index) => (
                <Snackbar
                    key={id}
                    open={true}
                    autoHideDuration={AUTO_HIDE_TIME}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                    sx={{marginBottom: `${index * 60}px`}}
                >
                    <Alert onClose={() => handleAutoHide(id)} severity={type} sx={{width: '100%'}}>
                        {content}
                    </Alert>
                </Snackbar>
            ))}
        </Box>
    )
}

export default Notifications
