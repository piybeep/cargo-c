import { LogoProps } from "./Logo.types";

import s from './Logo.module.scss'
import classNames from "classnames";

export function Logo({size = 'default', ...props} : LogoProps) {
    return (
        <div className={classNames(s.logo, s['logo__'+size])}>
            <h2 className={classNames(s.logo__title, s['logo__title_'+size])}>Logo</h2>
        </div>
    );
};