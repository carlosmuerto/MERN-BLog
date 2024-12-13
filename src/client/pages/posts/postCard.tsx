import { Post } from "@/services/Post"
import noImageAvailable from '@assets/No_Image_Available.jpg'
import { Link } from "@tanstack/react-router"
import { Button } from "flowbite-react"

const postCard = (post: Post) => {
	return (
		<div className="wfull bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<Link
				to="/posts/$postId"
				params={{ postId: post.id }}
			>
				<img className="h-48 rounded-t-lg object-cover w-full" src={post.image ?? noImageAvailable} alt='post cover' />
			</Link>
			<div className="p-3 flex flex-col gap-2">
				<Link
					className=""
					to="/posts/$postId"
					params={{ postId: post.id }}
				>
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{post.title}</h5>
				</Link>

				<div className="p-3 flex flex-col gap-2">
					<p className="text-lg font-semibold line-clamp-2 text-gray-700 dark:text-gray-400">
						{post.content}
					</p>

					<Link
						to={`/search?category=${post.category}`}
						className=''
					>
						<Button color='gray' pill size='xs'>
							{post.category}
						</Button>
					</Link>


					<Link
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						to="/posts/$postId"
						params={{ postId: post.id }}
					>
						Read more
						<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
						</svg>
					</Link>


				</div>
			</div>
		</div>
		/*
		<div className=''>
			<h1 className='h1'>{post.title}</h1>
			<h6 className='h6'>{post.author?.username}</h6>
			<p>{post.content}</p>
			<span>{post.category}</span>
		</div>
		*/
	)
}

export default postCard