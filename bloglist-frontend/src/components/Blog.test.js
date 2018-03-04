import React from "react";
import { shallow } from "enzyme";
import Blog from "./Blog";

describe.only("<Blog />", () => {
  it("renders content", () => {
    const blog = {
      id: "102",
      title: "Otsikko",
      author: "Testaaja",
      likes: 8,
      user: {
        name: "Ripa"
      }
    };

    const user = "Ripa";

    const deleteBlog = jest.fn();

    const likeBlog = jest.fn();

    const noteComponent = shallow(
      <Blog
        key={blog.id}
        user={user}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
        blog={blog}
      />
    );
    const cardDiv = noteComponent.find(".card-title");
    const showMore = noteComponent.find(".showmore");
    const deleteBtn = noteComponent.find(".deleteButton");
    expect(cardDiv.text()).toContain(blog.title + " by " + blog.author);
    expect(showMore.text()).toContain("Show more info");
    expect(deleteBtn.text()).toContain("Delete");
  });

  it("show all", () => {
    const blog = {
      id: "102",
      title: "Otsikko",
      author: "Testaaja",
      likes: 8,
      user: {
        name: "Ripa"
      }
    };

    const user = "Ripa";

    const deleteBlog = jest.fn();

    const likeBlog = jest.fn();

    const noteComponent = shallow(
      <Blog
        key={blog.id}
        user={user}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
        blog={blog}
      />
    );
    const showMoreBtn = noteComponent.find(".showmore");
    showMoreBtn.simulate("click");

    const showMoreBtn2 = noteComponent.find(".showmore");
    expect(showMoreBtn2.text()).toContain("Hide");

    const likeAmount = noteComponent.find(".likeAmount");
    expect(likeAmount.text()).toContain(blog.likes + " likes");

    const likeBtn = noteComponent.find(".likeButton");
    expect(likeBtn.text()).toContain("Like");

    const deleteBtn = noteComponent.find(".deleteButton");
    expect(deleteBtn.text()).toContain("Delete");
  });
});