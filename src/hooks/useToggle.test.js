import { renderHook, act } from "@testing-library/react-hooks";
import useToggle from "./useToggle";

describe('useToggle', () => {
  it('should toggle state when invoked', () => {
    const { result } = renderHook((initialState) => useToggle(initialState), {
      initialProps: true
    });
    const [state, toggle] = result.current;
    expect(state).toEqual(true);
    act(() => toggle()); // toggles
    expect(result.current[0]).toEqual(false);
  });
});
