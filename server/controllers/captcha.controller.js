const emojis = [
  { name: "😀", description: "Grinning Face" },
  { name: "😂", description: "Face with Tears of Joy" },
  { name: "😇", description: "Smiling Face with Halo" },
  { name: "😍", description: "Smiling Face with Heart-Eyes" },
  { name: "🤩", description: "Star-Struck" },
  { name: "😎", description: "Smiling Face with Sunglasses" },
  { name: "😴", description: "Sleeping Face" },
  { name: "🥱", description: "Yawning Face" },
  { name: "😷", description: "Face with Medical Mask" },
  { name: "🤧", description: "Sneezing Face" },
  { name: "😠", description: "Angry Face" },
  { name: "🤯", description: "Exploding Head" },
  { name: "🤔", description: "Thinking Face" },
  { name: "🤫", description: "Shushing Face" },
  { name: "🤭", description: "Face with Hand Over Mouth" },
  { name: "😶", description: "Face Without Mouth" },
  { name: "🙄", description: "Face with Rolling Eyes" },
  { name: "😳", description: "Flushed Face" },
  { name: "😱", description: "Face Screaming in Fear" },
  { name: "😢", description: "Crying Face" },
  { name: "😞", description: "Disappointed Face" },
  { name: "🥰", description: "Smiling Face with Hearts" },
  { name: "😘", description: "Face Blowing a Kiss" },
  { name: "😗", description: "Kissing Face" },
  { name: "👀", description: "Eyes" },
  { name: "🐶", description: "Dog Face" },
  { name: "🐱", description: "Cat Face" },
  { name: "🐭", description: "Mouse Face" },
  { name: "🐰", description: "Rabbit Face" },
  { name: "🦊", description: "Fox Face" },
  { name: "🐻", description: "Bear Face" },
  { name: "🐼", description: "Panda Face" },
  { name: "🐨", description: "Koala Face" },
  { name: "🐯", description: "Tiger Face" },
  { name: "🦁", description: "Lion Face" },
];
function generateEmojis() {
  const correctIndex = Math.floor(Math.random() * 4);
  const emojisCopy = [...emojis];
  const correctEmoji = emojisCopy.splice(
    Math.floor(Math.random() * emojisCopy.length),
    1
  )[0];
  const options = [correctEmoji];

  for (let i = 1; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * emojisCopy.length);
    options.push(emojisCopy[randomIndex]);
    emojisCopy.splice(randomIndex, 1);
  }

  return {
    description: correctEmoji.description,
    options: options.sort(() => Math.random() - 0.5),
    correctIndex,
  };
}

module.exports = {
  generateEmojis,
};
