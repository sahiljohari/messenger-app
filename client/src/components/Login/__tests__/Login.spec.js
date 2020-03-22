import React from "react";
import App from "../../../App";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";

configure({ adapter: new Adapter() });

describe("<Login />", () => {
  describe("Initialization", () => {
    const wrapper = mount(<App />);
    const login = wrapper.find("Login");
    it("renders without crashing", () => {
      expect(() => {
        login;
      }).not.toThrow();
      expect(login.exists()).toEqual(true);
    });
  });
});
