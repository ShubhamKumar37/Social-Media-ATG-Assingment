import { User } from '../models/index.js';
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  mailSender,
} from '../utils/index.js';

const resetPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email || !email.trim()) throw new ApiError(400, 'Email is required');

  const userExist = await User.findOne({ email });
  if (!userExist) throw new ApiError(404, 'User not found');

  const passToken = crypto.randomUUID();

  const updateUserDetail = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        passwordResetToken: passToken,
        passwordTokenExpiry: Date.now() + 60 * 60 * 1000,
      },
    },
    { new: true }
  );

  await updateUserDetail.save();

  await mailSender(
    email,
    'Password Reset Link',
    `<a href="${process.env.CLIENT_URL}/reset-password/${passToken}" target="_blank">Reset Password</a>`
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        'Password reset link sent successfully to your mail (check spam too)',
        passToken
      )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;

  if (!token) throw new ApiError(400, 'Token is required');
  if (!password || !password.trim())
    throw new ApiError(400, 'Password is required');

  const userExist = await User.findOne({ passwordResetToken: token });

  if (!userExist || userExist.passwordTokenExpiry < Date.now())
    throw new ApiError(400, 'Token has expired');


  userExist.password = password;
  userExist.passwordResetToken = null;
  userExist.passwordTokenExpiry = null;

  await userExist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, 'Password reset successfully', userExist));
});

export { resetPasswordToken, resetPassword };
