export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/pdf-buddy`;

//fetch function to upload pdf
export async function uploadFileUsingFetch(file, authToken) {
  try {
    const formData = new FormData();
    formData.append("myPdf", file);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        authToken,
      },
      body: formData,
    });
    const toJson = await response.json();
    return toJson;
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// fetch function to fetch the pdfs
export async function fetchFileUsingFetch(authToken) {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        authToken,
      },
    });
    const toJson = await response.json();
    return toJson.data;
  } catch (error) {
    return [];
  }
}

// fetch function to delete pdf files
export async function deleteFileUsingFetch(id, authToken) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        authToken,
      },
    });
    const toJson = await response.json();
    return toJson;
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// fetch function to extract pdf pages
export async function manipulatePdf(pages, file, authToken) {
  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
      body: JSON.stringify({ pages, file }),
    });
    return response;
  } catch (error) {
    return { success: false, message: error.message };
  }
}
