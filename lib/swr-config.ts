/**
 * SWR Configuration
 * Global settings for data fetching with SWR
 */

import type { SWRConfiguration } from "swr"

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  shouldRetryOnError: true,
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  dedupingInterval: 60000,
}
