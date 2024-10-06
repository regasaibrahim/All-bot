import { Telegraf, Markup } from 'telegraf';
import { message } from 'telegraf/filters';
import express from 'express';

const TOKEN = process.env.bottoken;
const website = 'https://cheerful-biscotti-13bc5d.netlify.app/';
const bot = new Telegraf(TOKEN);

// Express setup (for webhook)
const app = express();

// Set bot commands and replies
bot.start((ctx) => ctx.reply('HI, I am web designer and developer', {
  reply_markup: {
    inline_keyboard: [[Markup.button.webApp('Visit My portfolio', website)]]
  }
}));

bot.help((ctx) => ctx.reply('call me at 0930728383'));

// Set webhook for Render deployment
const PORT = process.env.PORT || 3000;
const URL = process.env.RENDER_EXTERNAL_URL || 'https://your-render-url.com';  // Replace with Render's URL for your service

// Launch the bot in webhook mode
bot.launch({
  webhook: {
    domain: URL,  // Render domain
    port: PORT    // Render-assigned port
  }
});

app.get('/', (req, res) => {
  res.send('Bot is up and running!');
});

// Handle Express errors
app.listen(PORT, () => {
  console.log(`Bot running on port ${PORT}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
