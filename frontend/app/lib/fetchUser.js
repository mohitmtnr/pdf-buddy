export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

//fetch function to upload pdf
export async function signupUsingFetch(data) {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const toJson = await response.json();
    return toJson;
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// fetch function to fetch the pdfs
export async function loginUsingFetch(data) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const toJson = await response.json();
    return toJson;
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// forgot password link
export async function forgotPasswordResetUsingFetch(receiverEmail) {
  try {
    const response = await fetch(`${API_URL}/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverEmail }),
    });

    const toJson = await response.json();
    return toJson;
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// reset password
export async function resetPasswordUsingFetch({
  newPassword,
  confirmPassword,
  token,
}) {
  try {
    const response = await fetch(`${API_URL}/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        forgotPasswordToken: token,
      },
      body: JSON.stringify({ newPassword, confirmPassword }),
    });
    const toJson = await response.json();
    return toJson;
  } catch (error) {
    return { success: false, message: error.message };
  }
}
