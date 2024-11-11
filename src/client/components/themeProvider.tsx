import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { selectDarkMode } from '../redux/darkModeSlice'

type Props = {
	children: ReactNode
}

const ThemeProvider = ({ children }: Props) => {

	const darkMode = useSelector(selectDarkMode)
	const className = darkMode.isActive ? 'dark' : 'ligth'
	return (
		<div className={className}>
			<div className="bg-white text-gray-700 dark:text-gray-200 min-h-screen dark:bg-[rgb(16,23,42)]">
				{children}
			</div>
		</div>
	)
}

export default ThemeProvider