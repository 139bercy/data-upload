module.exports = {
  mailHost: process.env['MAIL_HOST'] ?? 'mailhog',
  mailPort: process.env['MAIL_PORT'] ?? 1025,
  mailUsername: process.env['MAIL_USERNAME'] ?? '',
  mailPassword: process.env['MAIL_PASSWORD'] ?? '',
  mailSender: process.env['MAIL_SENDER'] ?? 'amdin@data-upload.finances.gouv.fr',
  templateFolder: './app/templates/'
};
