import { Outlet, useChildMatches } from "@tanstack/react-router";
import { some } from "lodash"
import ListPost from "./listPost";


const Posts = () => {
  const childMatches = useChildMatches();
  return (
		<div className="flex flex-col md:flex-row">
      {some(childMatches) ? <Outlet /> : <ListPost />}
    </div>
  )
}

export default Posts