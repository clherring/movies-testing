//receive some selector and wait around until we see it onscreen
const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    //check the DOM EVERY 30 miliseconds for selector
    const interval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve();
      }
    }, 30);
    //give it 2 seconds to resolve, otherwise reject
    const timeout = setTimeout(() => {
      clearInterval(interval);
      reject();
    }, 2000);
  });
};

//this is a "hook" provided by mocha after every test we're going to delete
// widget being displayed on screen and start from scratch for next test.
// globally defined by mocha, to set up test environment for every test
beforeEach(() => {
  //first line is to make sure that whatever autocomplete widget is in here is
  // kicked out. start from scratch every time
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    //for the purposes of this test we will return dummy data instead of making
    // an actual network request. This is something you deem necessary or not but
    // network requests can be expensive and slow depending on the application.
    //  for this project we will simply test widget fuction, not the network request
    //so it should see pop up appear, some results, and exact number of results,
    // we should also make sure we don't see a drop down menu right off the bat
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not Another Teen Movie" },
        { Title: "Back to the Future" },
        { Title: "Taken" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});

//with mocha we use "it"function, which is made globally available
it("Dropdown starts closed", () => {
  const dropdown = document.querySelector(".dropdown");

  expect(dropdown.className).not.to.include("is-active");
});

it("After searching, dropdown opens up", async () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");
  git;
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});

it("After searching, displays some results", async () => {
  const input = document.querySelector("input");
  input.value = "avengers";
  input.dispatchEvent(new Event("input"));

  await waitFor(".dropdown-item");

  const items = document.querySelectorAll(".dropdown-item");

  expect(items.length).to.equal(4);
});
