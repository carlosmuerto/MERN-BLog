type Props = {
	id: string,
	title: string,
	contect: string,
	author: {
		name: string,
		image: string,
	},
	date: Date
}

const postCard = (props: Props) => {
	return (
		<div className='text-3xl font-bold underline'>{props.title}</div>
	)
}

export default postCard