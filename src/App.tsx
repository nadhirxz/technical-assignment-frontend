import { useEffect, useState } from 'react';
import './App.css';
import api from './utils/api';
import { User } from './utils/types';

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState(false);

	useEffect(() => {
		api.get('/users')
			.then(response => {
				setUsers(response.data);
			})
			.catch(() => {
				setErr(true);
			})
			.then(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className="container">
			{loading ? (
				<p>Loading...</p>
			) : err ? (
				<div className="error">Error loading users</div>
			) : !!users.length ? (
				<table>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email</th>
							<th>Age</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user.id}>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.email}</td>
								<td>{user.age}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="loading">Loading users...</div>
			)}
		</div>
	);
}

export default App;
