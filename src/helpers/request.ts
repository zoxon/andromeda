import { inRange } from '@/helpers/numbers'

export interface WrappedResponse<D> {
  data: D
  status: number
  statusText: string
  headers: Headers
  options: RequestConfig<D>
  isOk: boolean
  isCreated: boolean
  isBadRequest: boolean
  isForbidden: boolean
  isNotFound: boolean
  isNotAcceptable: boolean
  isSuccessful: boolean
  isClientError: boolean
  isServerError: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function wrapResponse<D = any>(response: Response, data: D, options: RequestConfig<D>): WrappedResponse<D> {
  const { status, statusText, headers } = response

  return {
    data,
    status,
    statusText,
    headers,
    options,
    isOk: status === 200,
    isCreated: status === 201,
    isBadRequest: status === 400,
    isForbidden: status === 403,
    isNotFound: status === 404,
    isNotAcceptable: status === 406,
    isSuccessful: inRange(status, 200, 299),
    isClientError: inRange(status, 400, 499),
    isServerError: inRange(status, 500, 599),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RequestConfig<D = any> extends RequestInit {
  url?: string
  method?: string
  headers?: HeadersInit
  parameters?: URLSearchParams
  data?: D
}

/**
 * Tiny wrapper around fetch
 * @param url
 * @param options
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function request<T = any>(
  url: string,
  options: Omit<RequestConfig<T>, 'url'>
): Promise<WrappedResponse<T>> {
  if (options.parameters) {
    url = `${url}?${options.parameters.toString()}`
  }

  let body
  if (options.data) {
    body = JSON.stringify(options.data)
  }

  const response = await fetch(url, {
    body,
    method: options.method,
    headers: options.headers,
  })

  const data: T = await response.json()
  return wrapResponse<T>(response, data, options)
}
