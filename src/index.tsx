import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './api/firebase'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<RecoilRoot>
				<App />
			</RecoilRoot>
		</BrowserRouter>
	</React.StrictMode>
)
