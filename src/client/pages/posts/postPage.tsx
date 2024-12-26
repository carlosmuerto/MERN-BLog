import PostsAPI from '@/services/Post';
import {APIResponseBaseError, isAPIResponseBaseError} from '@utils'
import { Link, useParams } from '@tanstack/react-router';
import { Button, Spinner } from 'flowbite-react';
import noImageAvailable from '@assets/No_Image_Available.jpg'
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/authSlice';


const postPage = () => {

	const currentUser = useSelector(selectCurrentUser);

	const { postId } = useParams({
		from: "/posts/$postId"
	})

	const { data, error, isLoading, isSuccess, isError } = PostsAPI.useOnePostQuery(postId);


	if (isLoading) return (
		<div className='flex justify-center items-center min-h-screen'>
			<Spinner size='xl' />
		</div>
	);

	if (isError) {
		if (isAPIResponseBaseError(error)) {
			return (
				<div className='flex justify-center items-center min-h-screen'>
					<p className='text-xl text-gray-500'>{error.message}</p>
				</div>
			)
		}
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<p className='text-xl text-gray-500'>ERROR Not Posible state</p>
			</div>
		)
	};


	if (isSuccess && data) {
		const { post } = data;

		return (
			<main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
				<h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
					{post.title}
				</h1>
				<Link
					to={`/search?category=${post.category}`}
					className='self-center mt-5'
				>
					<Button color='gray' pill size='xs'>
						{post.category}
					</Button>
				</Link>
				<img
					src={post.image ?? noImageAvailable}
					alt={post.title}
					className='mt-10 p-3 max-h-[600px] w-full object-cover'
				/>
				<div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
					<span>{new Date(post.createdAt).toLocaleDateString()}</span>
					<span className='italic'>
						{(post.content.length / 1000).toFixed(0)} mins read
					</span>
				</div>
				<div
					className='p-3 max-w-2xl mx-auto w-full post-content border-b border-slate-500'	>
					{post.content}
				</div>

				{currentUser && currentUser.isAdmin &&
					<div className="p-3 max-w-2xl mx-auto w-full text-red-500 flex justify-between mt-5">
						<div />
						<span onClick={() => { console.log("delete post: " + post.title ) }} className="cursor-pointer">
							Delete Post
						</span>
					</div>
				}



			</main>
		);
	}

	return (
		<div className='flex justify-center items-center min-h-screen'>
			<p className='text-xl text-gray-500'>ERROR Not Posible state</p>
		</div>
	);

}

export default postPage