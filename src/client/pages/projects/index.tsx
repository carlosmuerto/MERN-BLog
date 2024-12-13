import { useLocation, useSearch } from "@tanstack/react-router"
import postList from "@/components/posts/postList";

const Projects = () => postList({searchParams: useSearch({ from: "/projects" })})

export default Projects