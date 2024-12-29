const { Telegraf, Markup } = require("telegraf");
const express = require("express");

// Your bot's token
const TOKEN = "7703960355:AAGqOlEtWbthFbnP7MqnFSFhmmp3BCHyI80";
const bot = new Telegraf(TOKEN);
const app = express();
app.use(express.json());

// Your web and community links
const web_link = "https://tgapp-beta.vercel.app/";
const community_link = "https://t.me/MysteriousUpdates";

// Bot start command handler
bot.start((ctx) => {
    // Retrieve the startPayload (referral or extra data passed when starting)
    const startPayload = ctx.startPayload;

    // Generate the referral URL dynamically
    const urlSent = `${web_link}?ref=${startPayload}`; // Fixed string interpolation

    // Retrieve user information
    const user = ctx.message.from;
    const userName = user.username ? `@${user.username}` : user.first_name;

    // Send the welcome message with inline keyboard
    ctx.replyWithMarkdown(
        `*Hey, ${userName}! Welcome to Mysterious Mine!*\n\n` +
        `MYST Token will list soon on SOL.\nStart mining now and be among the biggest players earning MYST.\n\n` +
        `Got friends, relatives, co-workers?\nBring them all into the game.\nMore squad power, more MYST tokens!`,
        {
            reply_markup: Markup.inlineKeyboard([
                [Markup.button.webApp("Start Now", urlSent)], // Start mining button
                [Markup.button.url("Join our Community", community_link)] // Join community button
            ])
        }
    );
});

// Start the bot and connect to Telegram
bot.launch();

// Express server (optional if you're using webhooks)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});