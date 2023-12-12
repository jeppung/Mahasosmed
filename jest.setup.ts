import "@testing-library/jest-dom";
import { useSearchParams } from "next/navigation";

// This need to be added to tackle window.matchMedia is not a function error
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

/* 
    useRouter must be mocked to be used in testing 
    to tackle "invariant expected app router to be mounted" error,
    also for testing routing location, search params
*/
jest.mock("next/navigation", () => {
  const { useRouter } = require("next-router-mock");

  const useSearchParams = () => {
    const router = useRouter();
    return new URLSearchParams(router.query);
  };

  return {
    useRouter,
    useSearchParams,
  };
});
