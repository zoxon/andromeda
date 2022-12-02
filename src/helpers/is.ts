export const isObject = (value: any) => Object(value) === value
export const isArray = Array.isArray || ((value: any) => toString.call(value) === '[object Array]')
