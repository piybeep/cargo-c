import { Spin, Result } from "antd";

import s from './Preloader.module.scss'

export function Preloader({isLoading = false, isError = false}) {
    return (
        <div className={s.wrapper}>
            <div className={s.wrapper__spin}>
                {isLoading ?
                    <Spin tip="Загрузка..." size="large">
                        <div className="content" />
                    </Spin>
                    :
                    <></>
                }
                {isError ?
                    <Result
                        status="warning"
                        title="Произошла ошибка..."
                    />
                    :
                    <></>
                }
            </div>
        </div>
    );
};