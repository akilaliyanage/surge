import App from '../src/app'

describe("The components are rendered", () => {
    it("renders App component without crashing", () => {
      shallow(<App />);
    });
  
  });