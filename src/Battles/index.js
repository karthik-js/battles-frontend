import React, {useState, useEffect, memo} from 'react';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Layout, Input, Select, Button, Tag} from 'antd';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import {addParams, searchBattles, deleteParam} from '../actions/index';
import Reports from './Reports';

const {Header, Content} = Layout;
const {Option} = Select;

const colors = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'cyan',
    'blue',
    'geekblue',
    'purple',
];

const Battles = () => {
    const dispatch = useDispatch();
    const params = useSelector(
        (state) => state.battleReducer.params,
        shallowEqual
    );
    const [param, setParam] = useState('king');
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        dispatch(searchBattles());
    }, [dispatch]);

    const handleChange = (event) => {
        setError(false);
        setValue(event.target.value);
    };

    const handleSelect = (param) => setParam(param);

    const selectAfter = () => (
        <Select
            defaultValue='king'
            value={param}
            className='select-after'
            onSelect={handleSelect}
        >
            <Option value='king'>king</Option>
            <Option value='location'>location</Option>
            <Option value='type'>type</Option>
        </Select>
    );

    const handleAdd = () => {
        if (!value) {
            setError(true);
            return;
        }
        dispatch(addParams({[param]: value}));
        setValue('');
        setError(false);
    };

    const handleClear = (key) => () => dispatch(deleteParam(key));

    const IsObjectEmpty = (obj) =>
        Object.keys(obj).length === 0 && obj.constructor === Object;

    const handleSearch = () => dispatch(searchBattles(params));

    return (
        <Layout className='layout'>
            <Header>
                <div className='logo'>Battle Report</div>
            </Header>
            <Content style={{padding: '20px 50px'}}>
                <div className='searchBox'>
                    <Input
                        addonAfter={selectAfter()}
                        defaultValue=''
                        value={value}
                        className={error && 'error'}
                        placeholder='Select tag and search'
                        onChange={handleChange}
                    />
                    <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Add
                    </Button>
                </div>
                {error && (
                    <div className='text-error'>Note: Enter a valid input</div>
                )}
                {!IsObjectEmpty(params) && (
                    <div className='tags-wrapper'>
                        {Object.keys(params).map((key) => {
                            var color =
                                colors[
                                    Math.floor(Math.random() * colors.length)
                                ];
                            return (
                                <Tag
                                    key={key}
                                    closable
                                    color={color}
                                    onClose={handleClear(key)}
                                >
                                    {key}: {params[key]}
                                </Tag>
                            );
                        })}
                        <Button
                            type='primary'
                            icon={<SearchOutlined />}
                            onClick={handleSearch}
                        >
                            Search
                        </Button>{' '}
                    </div>
                )}
                <Reports />
            </Content>
        </Layout>
    );
};

export default memo(Battles);
