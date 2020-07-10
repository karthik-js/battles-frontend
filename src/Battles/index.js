import React, {useState, useEffect, memo} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Layout, AutoComplete} from 'antd';
import {searchBattles, getLocations} from '../actions/index';
import Reports from './Reports';

const {Header, Content} = Layout;

const Battles = () => {
	const dispatch = useDispatch();
	const locations = useSelector((state) => state.battleReducer.locations, shallowEqual);
	const [location, setLocation] = useState('');

	useEffect(() => {
		dispatch(searchBattles());
		dispatch(getLocations());
	}, [dispatch]);

	const handleSelect = (data) => {
		setLocation(data);
		if (data) {
			dispatch(searchBattles({location: data}));
		}
	};

	return (
		<Layout className='layout'>
			<Header>
				<div className='logo'>Battle Report</div>
			</Header>
			<Content style={{padding: '20px 50px'}}>
				<div className='searchBox'>
					<AutoComplete
						value={location}
						options={locations.map((location) => ({value: location}))}
						onSelect={handleSelect}
						placeholder='search for a location'
					/>
				</div>
				<Reports />
			</Content>
		</Layout>
	);
};

export default memo(Battles);
