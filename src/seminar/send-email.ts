type Email = string & { __branded: 'Email' };

function getEmail(username: string) {
  return `${username}@example.com` as Email;
}

function sendEmail(to: Email, text: string) {
  console.log(to, text);
}

const email = getEmail('agalabov');

sendEmail(email, 'hello world'); // Works

// sendEmail('test', 'hello world'); // Error
// sendEmail('test@example.com', 'hello world'); // Error
