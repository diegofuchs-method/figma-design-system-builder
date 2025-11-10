# Design System Builder

A comprehensive Figma plugin for building design system components, including icon sets and individual icons with optimized stroke weights.

## Features

- **Icon Set Builder** - Create icon component sets with 7 size variants (12, 16, 20, 24, 32, 40, 48px) with optimized stroke weights
- **Single Icon Builder** - Create individual 24px icon components
- **Batch Mode** - Process multiple frames at once for faster workflows
- **Feedback Form** - Submit feedback about the plugin directly from Figma

## Setup

### For the Plugin

1. Clone this repository
2. Run `npm install`
3. Run `npm run build` to build the plugin
4. Load `code.js` and `ui.html` into Figma as a development plugin

### For the Feedback Feature (Optional)

See [FEEDBACK_SETUP.md](./FEEDBACK_SETUP.md) for detailed instructions on setting up the feedback form with Vercel and SendGrid.

## Development

Watch for changes and rebuild automatically:
```bash
npm run dev
```

## File Structure

- `code.ts` - Main plugin code that routes messages between the UI and builders
- `ui.html` - Plugin UI with landing screen, builders, and feedback form
- `iconSet.ts` - Icon Set Builder implementation
- `iconSingle.ts` - Single Icon Builder implementation
- `iconUtils.ts` - Shared icon creation utilities
- `shared.ts` - Shared validation and extraction functions
- `api-feedback.ts` - Vercel Function for handling feedback submissions (deploy to Vercel)
- `FEEDBACK_SETUP.md` - Setup guide for the feedback feature

## License

MIT
