import { APIErros, APIResponseBase } from "@/Utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// post Interface
export interface Post {
	author: {
		id: string;
		username: string;
		profileImg: string;
	},
	id: string;
	title: string;
	content: string;
	image: string;
	category: string,
  updatedAt: string, 
  createdAt: string,
	// slug?: String,
}

export interface APIAllPostResponse extends APIResponseBase {
  page: number,
  count: number,
  pages: number,
  posts: Post[]
}

export interface APIOnePostResponse extends APIResponseBase {
  post: Post
}


// actions CONSTANTS
const ACTION_PREPEND = "API/Post";
// Define a service using a base URL and expected endpoints
const PostsAPI = createApi({
  reducerPath: ACTION_PREPEND,
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/post",
  }),
  endpoints: (builder) => ({
    onePost: builder.query<APIOnePostResponse, string >({
      query: (postId) => ({
        url: "/" + postId
      }),
      transformErrorResponse: (err):APIErros => {
        if ('data' in err) {
          return err.data as APIErros;
        }
        return {
          messageStack: {},
          statusCode: 500,
          message: err.error
        };
      },
    }),

    allPost: builder.query<APIAllPostResponse, {page?:number, category?:string, title?:string} >({
      query: (params) => ({
        url: "",
				params
      }),
      transformErrorResponse: (err):APIErros => {
        if ('data' in err) {
          return err.data as APIErros;
        }
        return {
          messageStack: {},
          statusCode: 500,
          message: err.error
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the de

export default PostsAPI;