# Sure Voyager Survey App

React + Tailwind app to collect post-tour feedback for the Japanese Grand Prix group.

## What this app does

- Matches the questions from your existing Zoho survey screenshots.
- Supports 5-star ratings.
- Accepts pre-filled first rating with query string (`?rating=5`).
- Sends completed submissions to `ken@voyagertravel.co.za` via FormSubmit.

## Start locally

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
```

Use Vercel, Netlify, or your preferred host to deploy.

## Important first-time setup (email delivery)

This app posts to FormSubmit:

`https://formsubmit.co/ken@voyagertravel.co.za`

On first submission, FormSubmit sends a verification email.  
Open that email in Ken's inbox and confirm, otherwise emails will not be delivered.

## Email star snippet

Use `EMAIL_5_STAR_SNIPPET.html` in Zoho Campaigns and replace:

- `https://YOUR-SURVEY-URL`

with your deployed survey URL (example: `https://sure-voyager-survey.vercel.app`).
