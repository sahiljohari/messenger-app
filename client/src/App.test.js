import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mount } from "enzyme";

configure({ adapter: new Adapter() });

describe("Initialization", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Component structure", () => {
  it("contains all the child components", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find("Login")).toBeTruthy();
    expect(wrapper.find("Chat")).toBeTruthy();
  });
});
