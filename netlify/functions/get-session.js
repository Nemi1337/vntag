// netlify/functions/get-session.js
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event) {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = event.queryStringParameters || {};
  const sessionId = params.session_id;
  if (!sessionId) {
    return { statusCode: 400, body: JSON.stringify({ error: "session_id required" }) };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer"],
    });
    return {
      statusCode: 200,
      body: JSON.stringify(session),
    };
  } catch (err) {
    console.error("get-session error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to fetch session" }) };
  }
};
