/**
 * Checks if the current environment is offline.
 *
 * This function returns true if running in a browser and the navigator indicates
 * that the user is offline.
 *
 * @returns {boolean} True if offline, false otherwise.
 */
export const isOffline = () =>
  typeof window !== 'undefined' && !window.navigator.onLine

/**
 * Executes an action based on the network status.
 *
 * When called, this function checks whether the client is offline. If so, it executes
 * the provided `offlineAction`. If online, it attempts to execute `onlineAction` and
 * returns its result. In case `onlineAction` throws a network-related error (e.g., "Failed to fetch" or "Network error"),
 * it falls back to executing `offlineAction`.
 *
 * @template T
 * @param {() => Promise<T>} onlineAction - An asynchronous function to execute when the client is online.
 * @param {() => T | Promise<T>} offlineAction - A function to execute when the client is offline or a network error occurs.
 * @returns {Promise<void>} The result of the executed action.
 * @throws Will rethrow errors from `onlineAction` that are not network-related.
 */
export const withNetworkCheck = async <T>(
  onlineAction: () => Promise<T>,
  offlineAction: () => T | Promise<T>
): Promise<void> => {
  if (isOffline()) {
    offlineAction()
    return
  }

  try {
    await onlineAction()
  } catch (error) {
    // If a network error occurred during the execution of the request,
    // trying to use offline data
    if (
      error instanceof Error &&
      (error.message.includes('Failed to fetch') ||
        error.message.includes('Network error'))
    ) {
      await offlineAction()
    }
  }
}

/**
 * Wraps an asynchronous server action with offline handling.
 * - If the user is offline, the function immediately returns `null` without executing the action.
 * - If an error occurs during execution, it also returns `null` instead of throwing the error.
 *
 * @template T - A function that returns a Promise.
 * @param {T} serverAction - The async function to execute if the user is online.
 * @returns {(args: Parameters<T>) => Promise<ReturnType<T> | null>}
 *          A wrapped function that either executes the action or returns `null` if offline.
 */
export const withOfflineHandler =
  <T extends (...args: any[]) => Promise<any>>(serverAction: T) =>
  async (...args: Parameters<T>): Promise<ReturnType<T> | null> => {
    const isOfflineStatus = isOffline()

    if (isOfflineStatus) {
      return null
    }

    try {
      return await ((await serverAction(...args)) as ReturnType<T>)
    } catch (error) {
      return null
    }
  }
