import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingButton from "../components/LoadingButton";
import "@testing-library/jest-dom";
import React from "react";

describe("LoadingButton", () => {
  it("renders children when not loading", () => {
    render(<LoadingButton>Click me</LoadingButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders loader when loading", () => {
    render(<LoadingButton isLoading>Click me</LoadingButton>);
    expect(screen.getByRole("img", { hidden: true })).toHaveClass(
      "animate-spin"
    );
    expect(screen.queryByText("Click me")).not.toBeInTheDocument();
  });

  it("is disabled when loading", () => {
    render(<LoadingButton isLoading>Click me</LoadingButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is enabled when not loading", () => {
    render(<LoadingButton>Click me</LoadingButton>);
    expect(screen.getByRole("button")).toBeEnabled();
  });
});
