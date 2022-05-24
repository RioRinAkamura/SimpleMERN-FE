import { Post } from "../components/Dashboard";
import { PostValues } from "../components/FormPost";
import {
  ADD_POST,
  DELETE_POST,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  UPDATE_POST,
} from "../contexts/constants";

export const postReducer = (state: any, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };

    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: Post) => post._id !== payload),
      };

    case UPDATE_POST:
      const newPosts = state.posts.map((post: Post) =>
        post._id === payload._id ? payload : post
      );
      return {
        ...state,
        posts: newPosts,
      };

    default:
      return state;
  }
};
