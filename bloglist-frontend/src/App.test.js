import React from "react";
import { mount } from "enzyme";
import App from "./App";
import Blog from "./components/Blog";
jest.mock("./services/blogs");
import blogService from "./services/blogs";

const user = {
  name: "Tester",
  token: "HelloWorld"
};

describe("<App />", () => {
  let app;

  describe("When user is not logged", () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä on kirjautuneena
      app = mount(<App />);
    });
    it("Login page is shown", () => {
      app.update();
      /*
        const blogComponents = app.find(Blog);
        expect(blogComponents.length).toEqual(blogService.blogs.length);*/
      const container = app.find(".container");
      expect(container.text()).toContain("Kirjaudu");
      expect(container.text()).toContain("Username");
      expect(container.text()).toContain("Password");
    });
  });

  describe("When user is logged", () => {
    beforeEach(() => {
      // luo sovellus siten, että käyttäjä on kirjautuneena
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      app = mount(<App />);
    });
    it("Blogs are shown", () => {
      app.update();
      console.log(app.debug());
      expect(app.text()).toContain("Welcome " + user.name);
      const blogComponents = app.find(Blog);
      expect(blogComponents.length).toEqual(blogService.blogs.length);
    });
  });
});