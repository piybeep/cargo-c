import { LogoProps } from "./Logo.types";

import s from './Logo.module.scss'

export function Logo({size = 32, ...props} : LogoProps) {
    return (
        <div className={s.logo} style={{width: size, height: size}}>
            <h2 className={s.logo__title}>Logo</h2>
        </div>
    );
};