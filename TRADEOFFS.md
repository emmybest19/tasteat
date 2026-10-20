# Trade-offs: TastEat Foods

## 1. Ordering
- **Chose:** a WhatsApp order message
- **Over:** a cart with online payment
- **Why:** the business already sells on WhatsApp, and customers trust it.
- **Cost:** no payment record or order history on the site.

## 2. Menu data
- **Chose:** a typed file, `src/data/products.ts`
- **Over:** a CMS or database
- **Why:** a small menu, free hosting, and type errors show up at build.
- **Cost:** a price change needs a code edit and a deploy.

## 3. Forms
- **Chose:** EmailJS from the browser
- **Over:** an API route with a mail provider
- **Why:** no server to run or secure.
- **Cost:** depends on a third party and its free tier limits.

## 4. Menu assistant
- **Chose:** rule based logic in `src/lib/assistant.ts`
- **Over:** an LLM API
- **Why:** no API key, no running cost, predictable answers.
- **Cost:** it only handles questions it was written for.

## 5. Configuration
- **Chose:** optional env variables with defaults in `src/config/site.ts`
- **Over:** required env variables
- **Why:** the site builds and runs even with nothing set.
- **Cost:** a missing value can go unnoticed because a default fills in.
