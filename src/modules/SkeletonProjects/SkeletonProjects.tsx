import { ItemSizeProps, SkeletonProjectsProps } from "./Skeleton.types";

import s from './SkeletonProjects.module.scss'

export function SkeletonProjects({ pageSkeleton = 'projects' }: SkeletonProjectsProps) {
    const ItemSize = ({ size = 5 }: ItemSizeProps) => {
        return (
            <>
                {
                    pageSkeleton === 'projects' || pageSkeleton === 'transport'
                        ?
                        [...Array(size)].map((e, i) =>
                            <div key={i} className={s.item}>
                                <span className={s.item__img}></span>
                                <div className={s.item__info}>
                                    <span className={s.item__text}></span>
                                    <span className={s.item__text}></span>
                                </div>
                            </div>
                        )
                        :
                        <div className={s.item__wrapper}>
                            <div>
                                <span className={s.item__header}>
                                    <span className={s.item__title}></span>
                                </span>
                                {[...Array(size)].slice(0, 3).map((e, i) =>
                                    <div key={i} className={s.item}>
                                        <span className={s.item__img}></span>
                                        <div className={s.item__info}>
                                            <span className={s.item__text}></span>
                                            <span className={s.item__text}></span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <span className={s.item__header}>
                                    <span className={s.item__title}></span>
                                </span>
                                {[...Array(size)].slice(3, 5).map((e, i) =>
                                    <div key={i} className={s.item}>
                                        <span className={s.item__img}></span>
                                        <div className={s.item__info}>
                                            <span className={s.item__text}></span>
                                            <span className={s.item__text}></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                }
            </>
        )
    }

    return (
        <div className={s.wrapper}>
            <div className={s.list}>
                <ItemSize size={5} />
            </div>
        </div>
    );
};