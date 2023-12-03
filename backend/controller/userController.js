import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../email/forgotPasswordEmail.js";
const pepper = "PdfBuddy@mohitmtnr";

// signup
export const signup = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_VERIFICATION_SECRET;
    const accountActivationLink = `${process.env.ROOT_URL}/api/user/verify`;
    let { username, email, password } = req.body;
    username = username.trim();
    email = email.trim();
    const isDuplicate = await User.findOne({ email });
    if (isDuplicate) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists!" });
    }
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password + pepper, salt);
    const saveUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    if (!saveUser) {
      return res
        .status(500)
        .json({ success: false, message: "Signup failed!" });
    }

    const user = await User.findOne({ email }).select("_id");
    const data = { user: { _id: user._id } };
    const token = jwt.sign(data, JWT_SECRET, {
      expiresIn: "30m",
    });

    const updateToken = await User.findByIdAndUpdate(
      user,
      { $set: { activationToken: token } },
      { new: true }
    );

    if (!updateToken) {
      throw new Error("Something went wrong!");
    }

    // timing function to delete user if user is not verified
    setTimeout(async () => {
      await User.deleteOne({
        _id: user._id,
        isVerified: false,
      });
    }, 30 * 60 * 1000);
    // Email body
    const emailBody = `
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        * {
            font-family: Arial, Helvetica, sans-serif;
            color: #111827 !important;
            line-height: 2em;
        }

        .link {
            margin-left: 4em;
            padding: 10px 20px;
            border-radius: 10px;
            background-color: #059669;
            color:white !important;
            text-decoration: none;
            font-weight: 500;
        }

        .content {
            margin-bottom: 2em;
        }

        .closing {
            margin-top: 2em;
            line-height: 0.2em;
        }

        body {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        main {
            width: 80%;
            margin: 0;
        }
    </style>
</head>

<body>
    <main>
        <h4>Hello ${username},</h4>
        <div>
            <p class="content">
                Please click on the below button to activate your account.
            </p>
            <a class="link" href="${accountActivationLink}/${token}">Activate Account</a>
            <p class="content" style="margin-top: 2em;">
                Note : This link will be valid for 30 minutes.
            </p>
            <p class="closing">
                Thanks,
            </p>
            <p class="closing">
                Team Pdf Buddy
            </p>
        </div>
    </main>
</body>
</html>
`;

    sendEmail(
      {
        receiverEmail: email,
        emailBody,
        subject: "Account Activation",
      },
      (error, info) => {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: error.message });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "Verification email sent!" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// activate account/ verify account

export const verifyAccount = async (req, res) => {
  try {
    const userId = req.user;
    const activateAccount = await User.findByIdAndUpdate(
      userId,
      { $set: { isVerified: true, activationToken: "Activated" } },
      { new: true }
    );

    if (!activateAccount) {
      throw new Error("Something went wrong!");
    }

    return res
      .status(200)
      .send(`<h1>Account successfully verified, please go to login page!</h1>`);
  } catch (error) {
    return res.status(500).send(`<h1>${error.message}</h1>`);
  }
};

// login
export const login = async (req, res) => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { email, password } = req.body;
    let user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter correct credentials!" });
    }
    let comparePassword = await bcrypt.compare(
      password + pepper,
      user.password
    );
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter correct credentials!" });
    }

    const data = { user: { _id: user._id } };
    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      username: user.username,
      authToken,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//forgot password email
export const forgotPassword = async (req, res) => {
  try {
    const JWT_RESET_PASSWORD_SECRET = process.env.JWT_RESET_PASSWORD_SECRET;
    const resetPasswordLink = `${process.env.RESET_PASSWORD_URL}/auth/resetPassword`;
    const { receiverEmail } = req.body;
    const isUserExist = await User.findOne({
      email: receiverEmail,
      isVerified: true,
    }).select("_id username");
    if (!isUserExist) {
      return res
        .status(404)
        .json({ success: false, message: "Please Enter Correct Email!" });
    }
    const data = { user: { _id: isUserExist._id } };
    const token = jwt.sign(data, JWT_RESET_PASSWORD_SECRET, {
      expiresIn: "30m",
    });
    const insertToken = await User.findByIdAndUpdate(
      isUserExist,
      { $set: { forgotPasswordToken: token } },
      { new: true }
    );

    if (!insertToken) {
      return res
        .status(500)
        .json({ success: false, message: "Something went Wrong!" });
    }

    // Email body
    const emailBody = `
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        * {
            font-family: Arial, Helvetica, sans-serif;
            color: #111827 !important;
            line-height: 2em;
        }

        .link {
            margin-left: 4em;
            padding: 10px 20px;
            border-radius: 10px;
            background-color: #059669;
            color:white !important;
            text-decoration: none;
            font-weight: 500;
        }

        .content {
            margin-bottom: 2em;
        }

        .closing {
            margin-top: 2em;
            line-height: 0.2em;
        }

        body {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        main {
            width: 80%;
            margin: 0;
        }
    </style>
</head>

<body>
    <main>
        <h4>Hello ${isUserExist.username},</h4>
        <div>
            <p class="content">
                Please click on the below button to reset your password.
            </p>
            <a class="link" href="${resetPasswordLink}?forgotPasswordToken=${token}">Reset Password</a>
            <p class="content" style="margin-top: 2em;">
                Note : This link will be valid for 30 minutes.
                <br>
                Feel free to generate the link again in case you face issue with the current link.
            </p>
            <p class="closing">
                Thanks,
            </p>
            <p class="closing">
                Team Pdf Buddy
            </p>
        </div>
    </main>
</body>
</html>
`;

    sendEmail(
      {
        receiverEmail,
        emailBody,
        subject: "Password Reset",
      },
      (error, info) => {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: error.message });
        } else {
          return res
            .status(200)
            .json({ success: true, message: "Email Sent Successfully!" });
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update user
export const resetPassword = async (req, res) => {
  try {
    let { newPassword, confirmPassword } = req.body;
    newPassword = newPassword.trim();
    confirmPassword = confirmPassword.trim();
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter same password in both fields!",
      });
    }
    const userId = req.user;
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(newPassword + pepper, salt);
    const isPasswordUpdated = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashPassword, forgotPasswordToken: "updated" } },
      { new: true }
    );

    if (!isPasswordUpdated) {
      throw new Error("Something went wrong!");
    }

    return res.status(200).json({
      success: true,
      message: "Password Successfully Updated!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
