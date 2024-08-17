import { createBrowserRouter } from 'react-router-dom'
import Home from 'pages/Home.tsx'
import Layout from 'layout/Layout.tsx'

export const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Layout>
				<Home />
			</Layout>
		)
	}
])
