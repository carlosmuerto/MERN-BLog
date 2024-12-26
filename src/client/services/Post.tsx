import { APIResponseBaseError, APIResponseBase, baseTransformErrorResponse } from "@/Utils";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";

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
  }) as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError | APIResponseBaseError, {}, FetchBaseQueryMeta>,
  endpoints: (builder) => ({
    onePost: builder.query<APIOnePostResponse, string >({
      query: (postId) => ({
        url: "/" + postId
      }),
      transformErrorResponse: baseTransformErrorResponse,
    }),

    deletePost: builder.mutation<APIOnePostResponse, string>({
      query: (postId) => ({
        url: "/" + postId,
        method: 'DELETE',
      }),
      transformErrorResponse: baseTransformErrorResponse,
    }),

    allPost: builder.query<APIAllPostResponse, {page?:number, category?:string, title?:string} >({
      query: (params) => ({
        url: "",
				params
      }),
      transformErrorResponse: baseTransformErrorResponse,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the de

export default PostsAPI;