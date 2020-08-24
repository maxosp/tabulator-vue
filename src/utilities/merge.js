import joint from './joint';

export default function merge(objValue, srcValue) {
    if (typeof objValue === 'function' && typeof srcValue === 'function') {
        return joint([objValue, srcValue]);
    }
    return undefined;
}