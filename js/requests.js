SERVER_ADDRESS = "https://manager-web-server.onrender.com";

async function get_books_from_db() {
  try {
    const get_books_route_url = SERVER_ADDRESS + "/get_books";
    const response = await fetch(get_books_route_url);

    if (response.ok) {
      const data = await response.json();
      console.log("BOOKS: ", data["books"]);
      return data["books"];
    } else {
      throw new Error("Error fetching books");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function get_books(refresh) {
  if (BOOKS.length == 0 || refresh) {
    BOOKS = [];
    setLoadingMessage();
    BOOKS = await get_books_from_db();
    console.log("Refreshed Books");
  }
}

async function update_book_in_db(book_data, image_src) {
  try {
    const update_book_route_url = SERVER_ADDRESS + "/update";
    const formData = new FormData();

    // Append the JSON book data as a field in the FormData
    formData.append('json_data', JSON.stringify({
      token: localStorage.getItem("token"),
      insert_type: "book",
      data: book_data,
    }));

    // Check if an image element is provided and append the image file to the FormData
    if (image_src) {
      const image_file = await fetch(image_src).then(response => response.blob());
      formData.append('image', image_file, 'image.png');
    }

    const response = await fetch(update_book_route_url, {
      method: "POST",
      body: formData,
    });

    console.log(response);
    if (response.ok) {
      const data = await response.text();
      return data;
    } else if (response.status == 401) {
      alert("Wrong password / token");
    } else {
      throw new Error("Error updating book");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
