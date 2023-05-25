import { SkeletonVisualizationProps } from "./SkeletonVisualization.types";

import s from './SkeletonVisualization.module.scss'
import classNames from "classnames";

export function SkeletonVisualization({}:SkeletonVisualizationProps) {
    return (
        <div className={s.wrapper}>
            <span className={s.left}></span>
            <div className={s.list}>
                <span className={classNames(s.right, s.right__small)}></span>
                <span className={classNames(s.right, s.right__small)}></span>
                <span className={classNames(s.right, s.right__default)}></span>
                <span className={classNames(s.right, s.right__large)}></span>
            </div>
        </div>
    );
};