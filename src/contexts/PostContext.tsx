import axios from "axios";
import { createContext, ReactNode, useReducer } from "react";
import { Post } from "../components/Dashboard";
import { PostValues } from "../components/FormPost";
import { postReducer } from "../reducers/postReducer";
import {
  ADD_POST,
  apiUrl,
  DELETE_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from "./constants";

interface PostContextProviderProps {
  children: ReactNode;
}

export const PostContext = createContext<any>(null);

export const PostContextProvider = ({ children }: PostContextProviderProps) => {
  // State
  const [postState, dispatch] = useReducer(postReducer, {
    post: [],
    postLoading: true,
  });

  // Get all post
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`);

      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.posts });
      }
    } catch (error: any) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // Add post
  const addPost = async (newPost: PostValues) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost);
      if (response.data.success) {
        dispatch({ type: ADD_POST, payload: response.data.post });
      }
      return response.data;
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete post
  const deletePost = async (postId: string) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);
      if (response.data.success) {
        dispatch({ type: DELETE_POST, payload: postId });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  // Update post
  const updatedPost = async (updatedPost: Post) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost
      );
      if (response.data.success) {
        dispatch({ type: UPDATE_POST, payload: response.data.post });
        return response.data;
      }
    } catch (error: any) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Post context data
  const postContextData = {
    getPosts,
    postState,
    addPost,
    deletePost,
    updatedPost,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};
