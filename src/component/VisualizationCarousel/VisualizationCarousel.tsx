import { useRef } from 'react';

import { Carousel } from 'antd';
import { Typography } from 'antd';

import { VisualizationCarouselProps } from './VisualizationCarousel.types';
import s from './VisualizationCarousel.module.scss'
import classNames from 'classnames';

export function VisualizationCarousel({ data, color = false }: VisualizationCarouselProps) {

    const { Title, Text } = Typography;

    const carouselRef = useRef<any>()

    const nextSlide = () => {
        // Оно работает, но почему-то выдаёт предупреждение
        carouselRef?.current?.next()
    }

    const previewSlide = () => {
        // Оно работает, но почему-то выдаёт предупреждение
        carouselRef?.current?.prev()
    }

    return (
        <div className={s.wrapper}>
            <button onClick={previewSlide} className={classNames(s.button, s.button__left)}></button>
            <Carousel ref={carouselRef} dots={false} className={s.carousel}>
                {data.map((current: any) =>
                    color === false ?
                        (
                            <div key={current.id} className={s.list}>
                                <Title className={s.list__title} level={5}>{current.title}</Title>
                                <Text className={s.list__text} type="secondary">{current.size}</Text>
                                <Text type="secondary">{current.text}</Text>
                            </div>
                        )
                        :
                        (
                            <div key={current.id} className={s.list}>
                                <Title className={s.list__title} level={5}>{current.title}</Title>
                                <Text type="danger">{current.total}</Text>
                                <Text type="success">{current.free}</Text>
                            </div>
                        )
                )}
            </Carousel>
            <button onClick={nextSlide} className={classNames(s.button, s.button__right)}></button>
        </div>
    );
};