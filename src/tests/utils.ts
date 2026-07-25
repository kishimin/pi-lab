import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

/**
 * helper of user-event setup
 */
export function userEventSetup(
  options: Parameters<(typeof userEvent)["setup"]>[0] = {},
): ReturnType<(typeof userEvent)["setup"]> {
  return userEvent.setup({
    // useFakeTimer時にjest.advanceTimersByTimeを使ってタイマーを進める
    advanceTimers: vi.advanceTimersByTime,
    ...options,
  });
}
