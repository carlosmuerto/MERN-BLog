import postList from "@/components/posts/postList";
import { useLocation, useSearch } from "@tanstack/react-router"

const Posts = () => postList({searchParams:useSearch({ from: "/posts" })})

export default Posts