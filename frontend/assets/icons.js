import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

export const GroupIcon = ({ width, height, fill }) => {
    return (
        <Svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
            <G id="group">
                <Path d="M24,15.9c0-2.8-1.5-5-3.7-6.1C21.3,8.8,22,7.5,22,6c0-2.8-2.2-5-5-5c-2.1,0-3.8,1.2-4.6,3c0,0,0,0,0,0c-0.1,0-0.3,0-0.4,0c-0.1,0-0.3,0-0.4,0c0,0,0,0,0,0C10.8,2.2,9.1,1,7,1C4.2,1,2,3.2,2,6c0,1.5,0.7,2.8,1.7,3.8C1.5,10.9,0,13.2,0,15.9V20h5v3h14v-3h5V15.9z M17,3c1.7,0,3,1.3,3,3c0,1.6-1.3,3-3,3c0-1.9-1.1-3.5-2.7-4.4c0,0,0,0,0,0C14.8,3.6,15.8,3,17,3z M13.4,4.2C13.4,4.2,13.4,4.2,13.4,4.2C13.4,4.2,13.4,4.2,13.4,4.2z M15,9c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S15,7.3,15,9z M10.6,4.2C10.6,4.2,10.6,4.2,10.6,4.2C10.6,4.2,10.6,4.2,10.6,4.2z M7,3c1.2,0,2.2,0.6,2.7,1.6C8.1,5.5,7,7.1,7,9C5.3,9,4,7.7,4,6S5.3,3,7,3z M5.1,18H2v-2.1C2,13.1,4.1,11,7,11v0c0,0,0,0,0,0c0.1,0,0.2,0,0.3,0c0,0,0,0,0,0c0.3,0.7,0.8,1.3,1.3,1.8C6.7,13.8,5.4,15.7,5.1,18z M17,21H7v-2.1c0-2.8,2.2-4.9,5-4.9c2.9,0,5,2.1,5,4.9V21z M22,18h-3.1c-0.3-2.3-1.7-4.2-3.7-5.2c0.6-0.5,1-1.1,1.3-1.8c0.1,0,0.2,0,0.4,0v0c2.9,0,5,2.1,5,4.9V18z" fill={fill} />
            </G>
        </Svg>
    );
}


export const User = ({ width, height, fill }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
            <G id="add">
                <Path fill={fill} d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/>
                <Path fill={fill} d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/>
            </G>
        </Svg>
    );
}
export const Car = ({ width, height, fill }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
            <G id="car">
                <Path fill={fill} d="M24,8.5A1.5,1.5,0,0,0,22.5,7s-.584,0-.625.008a29.709,29.709,0,0,0-2.562-3.959,3.884,3.884,0,0,0-1.978-1.357c-1.761-.856-8.909-.856-10.67,0A3.884,3.884,0,0,0,4.687,3.049,29.709,29.709,0,0,0,2.125,7.008C2.084,7,1.5,7,1.5,7A1.5,1.5,0,0,0,0,8.5V15a4,4,0,0,0,2,3.463V20a3,3,0,0,0,6,0V19h8v1a3,3,0,0,0,6,0V18.463A4,4,0,0,0,24,15ZM6.274,4.266a1.9,1.9,0,0,1,.967-.659c1.519-.751,8-.751,9.518,0a1.9,1.9,0,0,1,.967.659,28.618,28.618,0,0,1,3.72,6.49,65.424,65.424,0,0,0-18.892,0A28.618,28.618,0,0,1,6.274,4.266ZM6,20a1,1,0,0,1-2,0V19H6Zm14,0a1,1,0,0,1-2,0V19h2Zm0-3H4a2,2,0,0,1-2-2V12.857A75.853,75.853,0,0,1,12,12a75.853,75.853,0,0,1,10,.857V15A2,2,0,0,1,20,17ZM6,15a1,1,0,0,1-2,0A1,1,0,0,1,6,15Zm14,0a1,1,0,0,1-2,0A1,1,0,0,1,20,15Z"/>
            </G>
        </Svg>
    );
}
export const Transmissions = ({ width, height, fill }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
            <G id="transmissions">
                <Path fill={fill} d="M24,16v5a3,3,0,0,1-3,3H16a8,8,0,0,1-6.92-4,10.968,10.968,0,0,0,2.242-.248A5.988,5.988,0,0,0,16,22h5a1,1,0,0,0,1-1V16a5.988,5.988,0,0,0-2.252-4.678A10.968,10.968,0,0,0,20,9.08,8,8,0,0,1,24,16ZM17.977,9.651A9,9,0,0,0,8.349.023,9.418,9.418,0,0,0,0,9.294v5.04C0,16.866,1.507,18,3,18H8.7A9.419,9.419,0,0,0,17.977,9.651Zm-4.027-5.6a7.018,7.018,0,0,1,2.032,5.46A7.364,7.364,0,0,1,8.7,16H3c-.928,0-1-1.275-1-1.666V9.294A7.362,7.362,0,0,1,8.49,2.018Q8.739,2,8.988,2A7.012,7.012,0,0,1,13.95,4.051Z"/>
            </G>
        </Svg>
    );
}
export const Messageries = ({ width, height, fill }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
            <G id="messageries">
                <Path fill={fill} d="M12.85,.03C9.38-.21,5.97,1.06,3.51,3.52,1.06,5.97-.21,9.38,.03,12.85c.43,6.25,5.84,11.15,12.31,11.15h6.66c2.94,0,5-2.4,5-5.85v-5.82C24,5.87,19.1,.46,12.85,.03Zm9.15,18.12c0,2.3-1.21,3.85-3,3.85h-6.66c-5.42,0-9.95-4.08-10.31-9.28-.2-2.9,.86-5.74,2.9-7.79,1.88-1.88,4.43-2.93,7.09-2.93,.23,0,.47,0,.7,.02,5.21,.36,9.28,4.89,9.28,10.31v5.82Z"/>
            </G>
        </Svg>
    );
}