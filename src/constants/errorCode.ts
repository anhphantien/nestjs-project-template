export enum ERROR_CODE {
  ACCESS_DENIED = 'Access is denied',
  EXPIRED_TOKEN = 'The token has expired',
  INVALID_DECODED_ACCESS_TOKEN = 'Invalid decoded access token',
  INVALID_EMAIL_ADDRESS = 'Invalid email address',
  INVALID_OTP = 'Invalid OTP',
  INVALID_PASSWORD = 'Invalid password',
  // INVALID_PHONE_NUMBER = 'Invalid phone number',
  INVALID_REFRESH_TOKEN = 'Invalid refresh token',
  TEMPLATE_NOT_FOUND = 'Template not found',
  TOO_MANY_REQUESTS_TO_RECEIVE_OTP = 'Too many requests to receive OTP',
  USER_NOT_ACTIVATED = 'User not activated',
  USER_NOT_FOUND = 'User not found',
}
