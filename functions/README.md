# Cloudflare Pages Functions

This folder contains the Cloudflare Pages Functions used in the project.

## What's Included

- `submitForm.js`: Handles form submissions and forwards them to the external webhook
- `_routes.json`: Configuration file for function routing

## How It Works

When a form is submitted on the website, the data is sent to the `/submitForm` endpoint. This function then:
1. Validates the request
2. Forwards the data to the external webhook
3. Returns success/error to the client

## Deployment

These functions are automatically deployed with your Cloudflare Pages site. No manual setup required.

### Requirements
- Your project must be deployed to Cloudflare Pages
- Functions must be enabled in your Cloudflare Pages project settings

## Testing Locally

To test locally with Wrangler:

1. Install Wrangler: `npm install -g wrangler`
2. Run: `wrangler pages dev .`

This will start a local server that includes your Pages Functions. 