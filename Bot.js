    const TelegramBotApi = require('node-telegram-bot-api');
const api = '5039792759:AAGN0xvaOqemRPb0QpZY97bsz0gijin2q9Q';
const bot = new TelegramBotApi(api , {
    polling:{
        interval:300,
        autoStart:true,
        params:{
            timeout:10
        }
    }
});
const helper = require('./helper')
const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text:'1 '  , callback_data:'1 '},{text:'2 ' , callback_data:'2 '}, {text:'3 ' , callback_data:'3 '}],
            [{text:'4 '  , callback_data:'4'},{text:'5 ' , callback_data:'5 '}, {text:'6 ' , callback_data:'6 '}],
            [{text:'7 '  , callback_data:'7'},{text:'8 ' , callback_data:'8 '}, {text:'9 ' , callback_data:'9 '}],
            [{text:'0' , callback_data:'0'}]
            
        ],
      
    })} ;
    const again = {
        reply_markup:JSON.stringify({
            inline_keyboard:[
                [{text:'Qayta urining',callback_data:'/again'}]
            ]
        })
    } ;


    bot.setMyCommands([


    {command: '/start' , description: 'description'} ,
    {command: '/info' , description: 'about yourself'},
    {command: '/game' , description: 'game'},
    {command: '/again' , description: 'again'},
    {command: '/video' , description: 'video'}

    ]) ;
    const startGame = async (chatId) =>{
        await bot.sendMessage(chatId , '0 dan 9 gacha son tanladim')
            const randNum = Math.floor(Math.random() * 10 )
            chats[chatId] = randNum
            return bot.sendMessage(chatId ,'sonni top', gameOptions)
    }
 const start = () => {
    bot.on( 'message' , async  msg =>{
        
        console.log(msg);
        const text = msg.text
        const chatId = msg.chat.id
        const nick = msg.from.first_name
        disabled_notification = false
        if(text === ('/start')){
        return bot.sendMessage(chatId, 'Assalamu alaykum' +"  " + nick + "  " + 'o`yinni boshlsh uchun /game commandasini kiriting' ) 
        
        }
        if(text === ('/info')){
            bot.sendMessage(chatId , helper(msg))
        }
        if(text === ('/video')){
            return bot.sendVideo(chatId , 'https://youtu.be/qYbm8HJlwMs')
        }
        if(text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Blmasaam' )

       
    })
    bot.on('callback_query' , msg =>{
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data === '/again'){
            return startGame(chatId)
        }
        if(data === chats[chatId]){
            return bot.sendMessage(chatId , `Javob togri ${chats[chatId]} + againzzzwwwz`) 
        }
        else{
            return bot.sendMessage(chatId , `Afsus Javob xato ${chats[chatId]} ` ,again)
        }
        // bot.sendMessage(chatId, `Siz ${data} ni tanlading`)
        
        
    })
 
 
 }

 
 start()

 
//  bot.sendMessage(chatId, 'saed x'),{
//     reply_markup:{
//         keyboard:[
//             [{
//                 text:'saed x',
//                 request_contact:true
//             }]
//         ]
//     }
