import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  bodyParser: false,
};

export async function handler(event) {
  const sig = event.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    );

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      const customerEmail = session.customer_details?.email;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      await fetch("https://formspree.io/f/xqadrzkk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Stripe Order",
          email: "pliesen@proton.me",
          subject: "Нове замовлення POSTERIUM",
          message: `Клієнт: ${customerEmail}\nПостери: ${JSON.stringify(
            lineItems.data,
            null,
            2
          )}`,
        }),
      });
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  } catch (err) {
    console.error("Webhook error:", err);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
}
