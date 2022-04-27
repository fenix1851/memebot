const {Telegraf} = require('telegraf')


const init = async (bot)=>{

}

init(new Telegraf("5302425236:AAHalUIVTdjs3dM-hkbEaHsojjs7RYGR4gA",{polling:true})).then(async(bot)=>{
    await bot.launch()
    console.log(`Launched${new Date}`)
})