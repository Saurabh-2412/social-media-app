import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
    async () => {
      const { data } = await axios.get(
        "https://Social-Media.saurabhsharma11.repl.co/v1/posts"
      );
      //console.log(data);
      return data;
    }
);

export function DateSetter(){
    let current = new Date();
    let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
    let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    let dateTime = cDate + ',' + cTime;
    return dateTime;
}

export const createPost = createAsyncThunk("post/createPost",
    async ({ content,image }, { fulfillWithValue, rejectWithValue }) => {
        let postData = {
            userID: "123456",
            desc: content,
            status: "A",
            likes: [],
            comments: [],
            createdDate: DateSetter(),
            modifiedData: DateSetter()
        };

        if (image) {
            const formData = new FormData();
            const fileName = Date().now + image.name;
            formData.append("image", image);
            formData.append("name", fileName);
            try {
                const { data, status } = await axios.post(
                    "https://social-media.saurabhsharma11.repl.co/v1/images/upload",
                    formData
                );
                if (status === 201) {
                    postData.image = data.url;
                }
            } catch (err) {
                console.log(err.message);
            }
        }

        try {
            const { data } = await axios.post(
            "https://social-media.saurabhsharma11.repl.co/v1/posts",
                postData
            );
            return fulfillWithValue(data.post);
        } catch (error) {
            return rejectWithValue(error.response);
        }
    }
);

export const likePost = createAsyncThunk("post/likePost", 
    async (postId, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.post(
          `https://Social-Media.saurabhsharma11.repl.co/v1/posts/likepost/${postId}`,{userId:"123456"}
        );
        console.log(status,data);
        if (status === 201) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const unlikePost = createAsyncThunk(
    "post/unlikePost",
    async (postId, { fulfillWithValue, rejectWithValue }) => {
      try {
        const { status, data } = await axios.post(
          `https://Social-Media.saurabhsharma11.repl.co/v1/posts/unlikepost/${postId}`,{userId:"123456"}
        );
        if (status === 200) {
          return fulfillWithValue(data);
        }
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

export const postComment = createAsyncThunk(
  "post/postComment",
  async ({ postid, comment }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { status, data } = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/comment/${postid}`,
        { userId:"123456", comment }
      );
      if (status === 201) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const dropComment = createAsyncThunk(
  "post/unComment",
  async ({ postid }, { fulfillWithValue, rejectWithValue }) => {
    console.log(postid);
    try {
      const { status, data } = await axios.post(
        `https://Social-Media.saurabhsharma11.repl.co/v1/posts/uncomment/${postid}`,
        { userId:"123456" }
      );
      if (status === 201) {
        return fulfillWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const viewPost = createAsyncThunk("post/viewPost", 
    async (postid, { fulfillWithValue, rejectWithValue }) => {
        try {
          //console.log("slice",postid);
            const { status, data } = await axios.get(
                `https://Social-Media.saurabhsharma11.repl.co/v1/posts/viewpost/${postid}`
            );
            //console.log("api",data);
            if (status === 200) {
                return fulfillWithValue(data.posts);
            }
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const postSlice = createSlice({
    name: "posts",
    initialState: {
        status: "idle",
        error: null,
        posts: [],
        singlePost: "",
    },
    reducers: {},
    extraReducers: {
        [createPost.fulfilled]: (state, action) => {
          state.posts.push(action.payload);
          //console.log("reducer", action.payload.post);
        },
        [loadPosts.pending]: (state) => {
          state.status = "loading";
        },
        [loadPosts.fulfilled]: (state, { payload }) => {
          state.status = "fulfilled";
          state.posts = payload.posts;
        },
        [loadPosts.rejected]: (state, action) => {
          state.status = "error";
          state.error = action.error.message;
        },
        [likePost.pending]: (state) => {
          state.status = "pending";
        },
        [likePost.fulfilled]: (state, action) => {
          state.status = "success";
          const existingPost = state.posts.findIndex((post) => post._id === action.payload._id);
          state.posts.splice(existingPost, 1, action.payload);
        },
        [likePost.rejected]: (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        },
        [unlikePost.pending]: (state) => {
          state.status = "pending";
        },
        [unlikePost.fulfilled]: (state, action) => {
          state.status = "success";
          const existingPost = state.posts.findIndex(
            (post) => post._id === action.payload._id
          );
          state.posts.splice(existingPost, 1, action.payload);
        },
        [unlikePost.rejected]: (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        },
        [postComment.fulfilled]: (state, action) => {
          state.singlePost = action.payload;
        },
        [dropComment.fulfilled]: (state, action) => {
          state.singlePost = action.payload;
        },
        [viewPost.fulfilled]: (state, action) => {
          //console.log("action",action.payload);
          state.singlePost = action.payload;
        }
    }
});

export const { LikeClicked, DisLikeClicked } = postSlice.actions;
export default postSlice.reducer;
