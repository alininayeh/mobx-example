// We'll use this to generate a fake list of messages
export const generateMessages = (n) => {
  const messages = [];

  for (let i = 0; i < n; i++) {
    messages.push({
      subject: `Message ${i + 1}`,
      description: 'Hello world!',
      read: false
    });
  }

  return messages;
};