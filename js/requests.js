SERVER_ADDRESS = "https://scarlet-publishing.com/api"
IMAGES_ADDRESS = "https://scarlet-publishing.com/images/api"

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
    for (var book of BOOKS) {
      if (book.ImageURL) {
        book.ImageURL = IMAGES_ADDRESS + "/" + book.ImageURL;
        var timestamp = new Date().getTime();
        book.ImageURL = book.ImageURL.split('?')[0] + '?' + timestamp;
        console.log(book.ImageURL);
      }
      book.hidden = true;
    }
    console.log("Refreshed Books", BOOKS);
  }
}

async function update_book_in_db(book_data, image_src) {
  try {
    const update_book_route_url = SERVER_ADDRESS + "/update";
    const formData = new FormData();

    // Append the JSON book data as a field in the FormData
    formData.append(
      "json_data",
      JSON.stringify({
        token: localStorage.getItem("token"),
        insert_type: "book",
        data: book_data,
      })
    );

    // Check if an image element is provided and append the image file to the FormData
    if (image_src) {
      const image_file = await fetch(image_src).then((response) =>
        response.blob()
      );
      formData.append("image", image_file, "image.png");
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
      alert("סיסמה שגויה");
    } else {
      throw new Error("Error updating book");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function delete_book_in_db(book_catalog_number) {
  try {
    const delete_book_route_url = SERVER_ADDRESS + "/delete";
    console.log(delete_book_route_url);
    const formData = new FormData();

    // Append the JSON book data as a field in the FormData
    formData.append(
      "json_data",
      JSON.stringify({
        token: localStorage.getItem("token"),
        insert_type: "book",
        item_id: book_catalog_number,
      })
    );

    const response = await fetch(delete_book_route_url, {
      method: "POST",
      body: formData,
    });

    console.log(response);
    if (response.ok) {
      const data = await response.text();
      return data;
    } else if (response.status == 401) {
      alert("סיסמה שגויה");
    } else {
      throw new Error("Error delete book");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function get_image_from_db(file_name) {
  const get_image_route_url = SERVER_ADDRESS + "/get_image/" + file_name;

  try {
    const response = await fetch(get_image_route_url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);

    return imgUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}
