const { Telegraf } = require("telegraf");
const searchMeme = require("../src/services/searchMeme")

const init = async (bot) => {
  bot.start((ctx) => {
    return ctx.replyWithMarkdown(`
Hi! This is images inline bot!
Just type in any chat [@images_inline_bot](t.me/images_inline_bot) <image-name>
and you will receive the some images for this query
`);
  });

  bot.on("inline_query", async (ctx) => {
    const result = await searchImage(ctx.inlineQuery.query);
    if (!ctx.inlineQuery.query) return;
    const data = result.data.hits.map((hit) => {
      return {
        type: "photo",
        id: hit.id,
        photo_url: hit.largeImageURL,
        thumb_url: hit.previewURL,
        title: hit.tags,
        decription: hit.tags,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `${hit.likes} ❤️`,
                url: hit.pageURL,
              },
            ],
            [
              {
                text: "Share bot with friends",
                switch_inline_query: "",
              },
            ],
          ],
        },
      };
    });
    ctx.answerInlineQuery(data);
  });
  return bot
};

init(
  new Telegraf("5302425236:AAHalUIVTdjs3dM-hkbEaHsojjs7RYGR4gA", {
    polling: true,
  })
).then(async (bot) => {
  await bot.launch();
  console.log(`Launched${new Date()}`);
});
