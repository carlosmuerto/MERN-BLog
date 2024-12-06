import PostsAPI from "@/services/Post";
import { APIErros } from "@/Utils";
import { useSearch } from "@tanstack/react-router"
import postCard from "./postCard";
import { isEmpty, some } from "lodash";


const Posts = () => {

  const { page } = useSearch({
    from: "/posts"
  })

  const { data, error, isLoading, isSuccess, isError } = PostsAPI.useAllPostQuery(page);

  return (
    <div className="p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {isSuccess && some(data.posts) && data.posts.map((post) => postCard(post))}
      {isSuccess && isEmpty(data.posts) && (<p className='text-xl text-gray-500'>No posts found.</p>)}
      {isLoading && (<div>isLoading</div>)}
      {isError && (<div>{(error as APIErros).message}</div>)}
    </div>
  )
  
}

export default Posts