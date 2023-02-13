import { waitForElementToBeRemoved, render, screen, act } from "@testing-library/react";
/*
 * some learning points:
 * 1. jest.mock has to be outside the it block.
 * 2. axios have to be imported after jest mocks are defined.
 * 3. defining the function definitions in the mock doesn't work. it needs to be supplied via axios.mockImplmentation for some reason
 */
import Loading from "./Loading";
import axios from "axios";

jest.mock('axios');
describe('Loading', () => {
  it('should show loading message when API is loading, show posts when API returns with data', async () => {
    axios.get.mockImplementation(
      jest.fn(
        () => new Promise(
          (resolve) => {
            setTimeout(
              () => resolve(
                {
                  status: 200,
                  data: [{ id: 1, title: 'Test'}],
                }
              ),
              1000
            );
          }
        )
      )
    );
    render(<Loading />);
    // check that "posts are loading" shows up
    await waitForElementToBeRemoved(() => screen.getByText('Posts are loading!'));
    expect(screen.getAllByTestId(/post/i).length).toBeGreaterThan(0);
  });

  it('should display error message when API returns with an error message', async () => {
    axios.get.mockImplementation(
      jest.fn(
        () => new Promise(
          (resolve, reject) => {
            setTimeout(
              () => reject(new Error('Unauthorised')),
              1000
            )
          }
        )
      )
    );

    render(<Loading />);
    await waitForElementToBeRemoved(() => screen.getByText('Posts are loading!'));
    expect(screen.getByText('Unauthorised')).toBeInTheDocument();
  });
});
