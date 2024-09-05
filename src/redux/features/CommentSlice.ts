import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comment: ""
}

const CommentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addComment: (state, action) =>{
            state.comment = action.payload
        }
    }
})

export const {addComment} = CommentSlice.actions

export default CommentSlice.reducer