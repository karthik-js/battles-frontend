import React from 'react';
import {Card, Collapse} from 'antd';

const {Meta} = Card;
const {Panel} = Collapse;

const BattleReport = ({report}) => {
    const {
        name,
        attacker_king,
        defender_king,
        battle_type,
        attacker_commander,
        defender_commander,
        region,
        attacker_size,
        defender_size,
        note,
        location,
        attacker_outcome,
    } = report;
    const won = attacker_outcome === 'win';
    return (
        <Card className='battle-card'>
            <Meta title={name} className='battle-meta' />
            <div className='card-body'>
                <div className={`attacker ${won ? 'win' : 'loose'}`}>
                    {attacker_king}
                </div>
                <div className='war'>VS</div>
                <div className={`defender ${!won ? 'win' : 'loose'}`}>
                    {defender_king}
                </div>
            </div>
            <Collapse defaultActiveKey='1'>
                <Panel
                    showArrow={false}
                    header={`${location}(${region}) - ${battle_type}`}
                    key='1'
                >
                    <div className='attack-details'>
                        <div className='attacker-details'>
                            <div>Commander : {attacker_commander}</div>
                            <div>Strength: {attacker_size}</div>
                        </div>
                        <div className='defender-details'>
                            <div>Commander : {defender_commander}</div>
                            <div>Strength: {defender_size}</div>
                        </div>
                    </div>
                    {note && (
                        <div>
                            Note: <strong>{note}</strong>
                        </div>
                    )}
                </Panel>
            </Collapse>
        </Card>
    );
};

export default BattleReport;
