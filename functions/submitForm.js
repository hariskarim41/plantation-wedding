export async function onRequest(context) {
  // Only allow POST requests
  if (context.request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    // Get form data from request body
    const formData = await context.request.json();
    
    // Add metadata
    const webhookData = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: "plantation-wedding.com"
    };
    
    // Forward to external webhook
    const response = await fetch("https://flows.brandrap.co/webhook/ea0f6340-ffd7-453b-a597-1f7f8da3e783", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(webhookData)
    });
    
    // Check response from webhook
    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`);
    }
    
    // Return success response
    return new Response(JSON.stringify({ success: true, message: "Form submitted successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // Allow requests from any origin
      }
    });
  } catch (error) {
    // Return error response
    return new Response(JSON.stringify({ success: false, message: "Failed to submit form" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
} 