import React from "react";
import { shallow } from "enzyme";
import SimpleBlog from "./SimpleBlog";

describe.only("<SimpleBlog />", () => {
  it("renders content", () => {
    const blog = {
      title: "Otsikko",
      author: "Testaaja",
      likes: 8
    };

    const noteComponent = shallow(<SimpleBlog blog={blog} onClick={null} />);
    const contentDiv = noteComponent.find(".title-author");
    const likeDiv = noteComponent.find(".likes");

    expect(contentDiv.text()).toContain(blog.title + " " + blog.author);
    expect(likeDiv.text()).toContain("blog has " + blog.likes + " likes");
  });

  it("click handler", () => {
    const blog = {
      title: "Otsikko",
      author: "Testaaja",
      likes: 8
    };

    const mockHandler = jest.fn();
    const noteComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );

    expect(mockHandler.mock.calls.length).toBe(0);
    const button = noteComponent.find("button");
    button.simulate("click");
    expect(mockHandler.mock.calls.length).toBe(1);
  });
});