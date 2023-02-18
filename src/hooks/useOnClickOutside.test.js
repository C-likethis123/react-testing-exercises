import { useRef } from "react";
import useOnClickOutside from "./useOnClickOutside";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const TestComponent = ({testHandler}) => {
  const ref = useRef();
  useOnClickOutside(ref, testHandler);
  return (
    <div data-testid="outside">
      <div ref={ref}>I'm Inside!</div>
    </div>
  );
}

describe('useOnClickOutside', () => {
  it('should call handler when clicked outside', () => {
    let testHandler = jest.fn();
    render(<TestComponent testHandler={testHandler} />);

    userEvent.click(screen.getByText("I'm Inside!"));
    expect(testHandler).not.toHaveBeenCalledTimes(1);

    userEvent.click(screen.getByTestId("outside"));
    expect(testHandler).toHaveBeenCalledTimes(1);
  });
  
});
