// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (value: any) => Object(value) === value

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isArray = Array.isArray || ((value: any) => toString.call(value) === '[object Array]')
