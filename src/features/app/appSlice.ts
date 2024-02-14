import { AlertColor } from '@mui/material'
import { PayloadAction, createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { RootState } from '@/store'
import { ALERTS_AMOUNT_LIMIT } from '@/consts/general.consts'
import { Prettify } from '@/types/general.types'

export interface Message {
  id: string
  type: AlertColor
  content: string
}

interface AppSlice {
  messages: Message[]
}

type MessagePayload = Prettify<Omit<Message, 'id'> & { id?: string }>

export const REMOVE_MESSAGE_TIMEOUT = 2500

const initialState: AppSlice = { messages: [] }
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addMessage: {
      reducer: (state, { payload }: PayloadAction<Message>) => {
        state.messages.push(payload)
      },
      prepare: (message: MessagePayload) => {
        const id = message.id || nanoid()
        return { payload: { ...message, id } }
      },
    },
    removeMessage: (state, { payload }: PayloadAction<string>) => {
      state.messages = state.messages.filter((error) => error.id !== payload)
    },
    clearMessages: (state) => {
      state.messages = []
    },
  },
})

const createAsyncMessageAction = (type: AlertColor) => {
  return createAsyncThunk(
    `app/add${type.charAt(0).toUpperCase() + type.slice(1)}Message`,
    async (content: string, { dispatch, getState }) => {
      const currentState = getState() as RootState
      if (currentState.app.messages.length < ALERTS_AMOUNT_LIMIT) {
        const id = nanoid()
        dispatch(addMessage({ content, id, type }))
        setTimeout(() => {
          dispatch(removeMessage(id))
        }, REMOVE_MESSAGE_TIMEOUT)
      }
    },
  )
}

export const addInfoMessage = createAsyncMessageAction('info')
export const addSuccessMessage = createAsyncMessageAction('success')
export const addWarningMessage = createAsyncMessageAction('warning')
export const addErrorMessage = createAsyncMessageAction('error')

export const { addMessage, removeMessage, clearMessages } = appSlice.actions
export default appSlice.reducer
export const selectMessages = (state: RootState) => state.app.messages
