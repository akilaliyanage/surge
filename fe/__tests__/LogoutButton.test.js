import LogoutButton from '../src/components/buttons/logout-button'

describe("The components are rendered", () => {
    it("renders App component without crashing", () => {
      shallow(<LogoutButton />);
    });
  });