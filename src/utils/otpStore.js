const store = {};

export function generateAndStoreOTP(email, ttl) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  store[email] = { otp, expires: Date.now() + ttl * 1000 };
  return otp;
}

export function verifyOTP(email, otp) {
  const record = store[email];
  if (!record) return false;
  if (Date.now() > record.expires) {
    delete store[email];
    return false;
  }
  if (record.otp === otp) {
    delete store[email];
    return true;
  }
  return false;
}
