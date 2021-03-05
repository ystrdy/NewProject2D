/**
 * 角度转弧度
 * @param deg 角度
 */
export function deg2rad(deg: float): float {
    return deg * (Math.PI / 180);
}

/**
 * 弧度转角度
 * @param rad 弧度
 */
export function rad2deg(rad: float): float {
    return rad * (180 / Math.PI);
}