// Which env vars hold the Telegram bot token + chat id for each restaurant's
// order notifications. Add an entry here (and to .env.example) before adding
// a new restaurant or a second notified location.
const TELEGRAM_TARGETS = {
  ekranidze: {
    tokenEnv: "TG_BOT_TOKEN_EKRANIDZE",
    chatEnv: "TG_CHAT_ID_EKRANIDZE",
  },
  "mama-hinkali": {
    tokenEnv: "TG_BOT_TOKEN_MAMA_HINKALI",
    chatEnv: "TG_CHAT_ID_MAMA_HINKALI",
  },
};

/**
 * @param {string} restaurantId
 * @returns {{ token: string, chatId: string } | null} null when the
 *   restaurant is unknown, or when its bot token/chat id haven't been
 *   configured yet (stub mode — see index.js).
 */
export function resolveTelegramTarget(restaurantId) {
  const target = TELEGRAM_TARGETS[restaurantId];
  if (!target) return null;

  const token = process.env[target.tokenEnv];
  const chatId = process.env[target.chatEnv];
  if (!token || !chatId) return null;

  return { token, chatId };
}
