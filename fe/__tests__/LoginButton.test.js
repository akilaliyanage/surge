import LoginButton from '../src/components/buttons/login-button'

describe("The components are rendered", () => {
    it("renders App component without crashing", () => {
      shallow(<LoginButton />);
    });
  });