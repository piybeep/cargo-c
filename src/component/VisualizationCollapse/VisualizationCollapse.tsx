import { Collapse, Typography } from "antd";

import { VisualizationCollapseProps } from "./VisualizationCollapse.types";
import s from './VisualizationCollapse.module.scss'

export function VisualizationCollapse({ data }: VisualizationCollapseProps) {
    const { Panel } = Collapse

    const { Text } = Typography

    return (
        <div className={s.wrapper}>
            <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="Морской контейнер 1 / 3" key="1">
                    <div className={s.list}>
                        {data.map((current: any) => (
                            <div key={current.id} className={s.list__item}>
                                <Text type="secondary">{current.title}</Text>
                                <Text type="secondary">{current.number}</Text>
                            </div>
                        ))}
                    </div>
                </Panel>
            </Collapse>
        </div>
    );
};