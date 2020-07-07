import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import {List, Spin, Empty} from 'antd';
import BattleReport from './BattleReport';

const Reports = () => {
    const {battles, searchStatus} = useSelector(
        (state) => ({
            battles: state.battleReducer.battles,
            searchStatus: state.battleReducer.searching,
        }),
        shallowEqual
    );

    return (
        <List
            itemLayout='vertical'
            className="battle-list"
            size='large'
            pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 1,
            }}
            dataSource={battles}
            renderItem={(item) =>
                searchStatus ? (
                    <Empty />
                ) : (
                    <List.Item key={item._id}>
                        <BattleReport report={item} />
                    </List.Item>
                )
            }
        >
            {searchStatus && <Spin className='demo-loading' />}
        </List>
    );
};

export default Reports;
