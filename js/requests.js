SERVER_ADDRESS = "https://scarlet-publishing.com/api"
// SERVER_ADDRESS = "http://127.0.0.1:5000";
IMAGES_ADDRESS = "https://scarlet-publishing.com/images/api";

async function get_books_from_db() {
  try {
    const get_books_route_url = SERVER_ADDRESS + "/get_books";
    const response = await fetch(get_books_route_url);

    if (response.ok) {
      const data = await response.json();
      return data["books"];
    } else {
      throw new Error("Error fetching books");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function get_banners(refresh) {
  if (BANNERS.length == 0 || refresh) {
    BANNERS = [];
    setLoadingMessage(banners_list);
    BANNERS = await get_banners_from_db();
    for (var banner of BANNERS) {
      banner.ImageURL = IMAGES_ADDRESS + "/" + banner.ImageURL;
      var timestamp = new Date().getTime();
      banner.ImageURL = banner.ImageURL.split("?")[0] + "?" + timestamp;
    }
    console.log("Refreshed BANNERS", BANNERS);
  }
}

async function get_books(refresh) {
  if (BOOKS.length == 0 || refresh) {
    BOOKS = [];
    setLoadingMessage(books_list);
    BOOKS = await get_books_from_db();
    for (var book of BOOKS) {
      if (book.ImageURL) {
        book.ImageURL = IMAGES_ADDRESS + "/" + book.ImageURL;
        var timestamp = new Date().getTime();
        book.ImageURL = book.ImageURL.split("?")[0] + "?" + timestamp;
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
      formData.append("image", image_file, "image.jpeg");
    }

    const response = await fetch(update_book_route_url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.text();
      return data;
    } else if (response.status == 401) {
      alert("סיסמה שגויה");
    } else {
      throw new Error(`Error updating book ${response.text()}`);
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function delete_book_in_db(book_catalog_number) {
  try {
    const delete_book_route_url = SERVER_ADDRESS + "/delete";
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

async function get_news_letters_emails_from_db() {
  try {
    const get_newsletters_emails_route_url =
      SERVER_ADDRESS + "/get_newsletter_emails";

    const response = await fetch(get_newsletters_emails_route_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data["news_letters"];
    } else {
      throw new Error("Error fetching newsletter emails");
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

async function get_banners_from_db() {
  try {
    const get_banners_route_url = `${SERVER_ADDRESS}/get_banners`;
    const response = await fetch(get_banners_route_url);

    if (response.status === 204) {
      return [];
    }

    if (response.ok) {
      const data = await response.json();
      return data["banners"];
    } else {
      throw new Error("Error fetching banners");
    }
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

async function insert_banner_to_db(banner_data, image_src) {
  try {
    const insert_route_url = SERVER_ADDRESS + "/insert";
    const formData = new FormData();

    // Append the JSON book data as a field in the FormData
    formData.append(
      "json_data",
      JSON.stringify({
        token: localStorage.getItem("token"),
        insert_type: "banner",
        data: banner_data
      })
    );

    // Check if an image element is provided and append the image file to the FormData
    if (image_src) {
      const image_file = await fetch(image_src).then((response) =>
        response.blob()
      );
      formData.append("image", image_file, "image.jpeg");
    }

    const response = await fetch(insert_route_url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.text();
      return data;
    } else if (response.status == 401) {
      alert("סיסמה שגויה");
    } else {
      throw new Error(`Error updating book ${response.text()}`);
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
