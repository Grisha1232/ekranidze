import "dotenv/config";
import express from "express";
import cors from "cors";
import { resolveTelegramTarget } from "./targets.js";
import { formatOrderMessage } from "./orderMessage.js";
import { sendTelegramMessage } from "./telegram.js";

const PORT = process.env.PORT || 8787;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "*";

const app = express();
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/api/orders", async (req, res) => {
  const order = req.body ?? {};
  const errors = validateOrder(order);
  if (errors.length > 0) {
    res.status(400).json({ ok: false, error: errors.join("; ") });
    return;
  }

  const orderId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const target = resolveTelegramTarget(order.restaurantId);

  let telegramDelivered = false;
  if (target) {
    try {
      await sendTelegramMessage(target.token, target.chatId, formatOrderMessage(order));
      telegramDelivered = true;
    } catch (err) {
      // Don't fail the order over a Telegram hiccup — the customer still sees
      // confirmation, and this gets investigated from the server logs.
      console.error(`[orders] Telegram send failed for "${order.restaurantId}":`, err);
    }
  } else {
    // Stub mode: no bot configured yet for this restaurant (see
    // server/.env.example). Log the order instead of losing it.
    console.log(
      `[orders] (stub) no Telegram bot configured for "${order.restaurantId}" — order logged only:\n` +
        formatOrderMessage(order),
    );
  }

  res.json({ ok: true, orderId, telegramDelivered });
});

function validateOrder(order) {
  const errors = [];
  if (!order.restaurantId) errors.push("restaurantId is required");
  if (!order.customerName?.trim()) errors.push("customerName is required");
  if (!order.customerPhone?.trim()) errors.push("customerPhone is required");
  if (order.fulfillment === "delivery" && !order.address?.trim()) {
    errors.push("address is required for delivery");
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    errors.push("items must be a non-empty array");
  }
  return errors;
}

app.listen(PORT, () => {
  console.log(`[orders] listening on :${PORT}`);
});
