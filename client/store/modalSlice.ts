import { createSlice } from "@reduxjs/toolkit"


interface ModalState {
    isOpen : boolean
}

const initialState : ModalState = {
    isOpen: false,
}


export const modalSlice = createSlice({
    name:'openModal',
    initialState,
    reducers : {
        open : (state) => {
            state.isOpen = true
        },
        close : (state) => {
            state.isOpen = false
        }
    }
})

export const {open , close} = modalSlice.actions
export const selectIsOpen = (state:ModalState) => state.isOpen
export default modalSlice.reducer