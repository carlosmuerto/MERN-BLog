import PostsAPI from "@/services/Post";
import { APIErros } from "@/Utils";
import { useLocation, useSearch } from "@tanstack/react-router"
import postCard from "./postCard";
import { isEmpty, some } from "lodash";
import { PaginationSearchParams } from "@/routes";

type Props = {searchParams: PaginationSearchParams}

function postList({searchParams}: Props) {
	
  const { data, error, isLoading, isSuccess, isError } = PostsAPI.useAllPostQuery(searchParams);

  return (
    <div className="p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isSuccess && some(data.posts) && data.posts.map((post) => postCard(post))}
      {isSuccess && isEmpty(data.posts) && (<p className='text-xl text-gray-500'>No posts found.</p>)}
      {isLoading && (<div>isLoading</div>)}
      {isError && (<div>{(error as APIErros).message}</div>)}
    </div>
  )

}

export default postList