module.exports = {
    secret: process.env['SECRET'] ?? "my-secret",
    ttl: process.env['TTL_TOKEN'] ?? 86400,  // 24 hours
    passwordValidation: process.env['PASSWORD_STRENGH_VALIDATION'] === "true" ?? true
  };
