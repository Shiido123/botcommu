/***************************************************
 * Serveur WEB                                     *
 ***************************************************/

// pour que le BOT soit toujours démarré, on va mettre en place  
// un serveur web que l'on appelera toutes les 15 minutes.       

const express = require('express');
const app = express();
const https = require('https');


// port pour les appels web
// process.env.PORT correspond au port positionné dans Heroku
const port = process.env.PORT || 5000;

// on positionne le systeme de template en ejs
app.set('view engine', 'ejs');

// on dit à express d'utiliser le répertoire public pour les objets web (css/js/img)
app.use(express.static(__dirname + '/public'));

// la route pour l'appel en direct (la home ou /)
app.get('/', (request, response) => {
    // on dit à ejs d'exploiter directement le fichier index.ejs présent dans le répertoire views (c'est là qu'il regarde par défaut)
    response.render('index');
});
app.get('/help', (request, response) => {
    // on dit à ejs d'exploiter directement le fichier index.ejs présent dans le répertoire views (c'est là qu'il regarde par défaut)
    response.render('help');
});

// là où on dit à notre app de se lancer
app.listen(port, () => {
    // on affiche dans les logs du serveur le message qu'il est lancé et écoute
    console.log('Our app is running on http://localhost:' + port);
});

/***************************************************
 * Fin du Serveur WEB                              *
 ***************************************************/

const Discord = require("discord.js");

// chargement des apramètres de configuration du bot
const config = require("./config.json");





// création du bot en activant les fonction partials qui servirons pour les mesages qui sont hors cache 
const bot = new Discord.Client(({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }));

// connexion au serveur Discord avec le token adéquat
bot.login(config.token);

const ytdl = require('ytdl-core');

const queue = new Map();

bot.once("ready", () => {
    console.log("Ready!");
});

bot.once("reconnecting", () => {
    console.log("Reconnecting!");
});

bot.once("disconnect", () => {
    console.log("Disconnect!");
});



      
  



bot.on("message", function (message) {
    if (message.author.bot) return;


    if (message.content.includes('discord.gg/' || 'discordapp.com/invite/')) { //if it contains an invite link
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.delete() //delete the message
                .then(message.channel.send('Lien détecté: **Les liens d\'invites ne sont pas permis sur ce serveur**'))
        }


    }
    // et des messages qui ne sont pas préfixés par notre préfixe
    if (!message.content.startsWith(config.prefix)) return;

    // système pour prendre en compte des paramètres dans les messages envoyés
    // on commence par garder ce qui est à gauche du préfixe
    const commandBody = message.content.slice(config.prefix.length);
    // on crée un tableau avec deux infos [commande, argument]
    const args = commandBody.split(' ');
    // on positionne la comand avec le premier élément du tableau et en forçant des minuscules
    const command = args.shift().toLowerCase();

    if (message.content === '<@!880812526340821022>') {
        message.channel.send("mon préfix est `?` Pour voir toutes mes comandes faites `?help`")
    }
    if (command === "ping") {

        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! j'ai traité ce message en ${timeTaken}ms.`);
    };
    if (command === "beep") {
        message.channel.send('Boop.');
    } else if (command === "server") {
        message.channel.send(`Nom du serveur: **${message.guild.name}**\nTotal members: **${message.guild.memberCount}**`);
    }



    var images = ["https://cdn.discordapp.com/attachments/865683498308599808/873484851062407169/tenor.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873484872843411456/tenor_6.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873484878170165258/yqud.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873484842384371742/kisss.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873484807739437096/3189878693_1_2_bjyBvoeK.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873484810620895282/anime-kiss.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873484810620895282/anime-kiss.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873484836281659392/kiss.gif"];
    var image = Math.floor(Math.random() * images.length);


    if (command === `kiss`) {
        if (message.mentions.members.size == 1) {
            let member = message.mentions.members.first()

            let kissembed = new Discord.MessageEmbed()

                .addField('\u200B', `:sparkling_heart: **${message.author} embrasse ${member}**`)
                .setImage(images[image])

            message.channel.send(kissembed);
        }

    }
    var imagegifht = ["https://cdn.discordapp.com/attachments/865683498308599808/873552901358899220/tumblr_n4nbpfK8EN1tpso7yo1_500.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552898376749086/naruto_kun.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552884791394334/kakashi_bbou.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552879825338409/dsxgx.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552873164779581/cvncnc.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552869301829642/ab6720ae3b40d4f0b79cd2ad6a259066.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552877073870898/dfa65baad7f63329064bb95881d34299.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552866634248273/560e3d83a2136eab78377f646ef2eba4.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552857801043998/200.gif"];
    var image = Math.floor(Math.random() * images.length);

    if (command === `fight`) {
        if (message.mentions.members.size == 1) {
            let member = message.mentions.members.first()

            let fightembed = new Discord.MessageEmbed()

                .addField('\u200B', ` **${message.author} attaque ${member}**`)
                .setImage(imagegifht[image])

            message.channel.send(fightembed);
        }
    }

    var imagecat = ["https://cdn.discordapp.com/attachments/843466167347838989/881530246254460948/OIP_55.jpg", "https://cdn.discordapp.com/attachments/843466167347838989/881530247747612682/OIP_54.jpg", "https://cdn.discordapp.com/attachments/843466167347838989/881530250041888818/30c562a660ebc9848280506e7289ac6e.gif", "https://cdn.discordapp.com/attachments/843466167347838989/881530253351190528/OIP_53.jpg", "https://cdn.discordapp.com/attachments/843466167347838989/881530256429809684/4610f13ad34f165af0fa18ab7ea8bf6f.gif", "https://cdn.discordapp.com/attachments/843466167347838989/881530258589904926/R_4.gif", "https://cdn.discordapp.com/attachments/843466167347838989/881530867959336970/OIP_57.jpg", "https://cdn.discordapp.com/attachments/843466167347838989/881530866982092830/1035848237.jpg", "https://cdn.discordapp.com/attachments/843466167347838989/881530869108604969/OIP_56.jpg"];
    var image = Math.floor(Math.random() * images.length);

    if (command === `cat`) {


        let catembed = new Discord.MessageEmbed()

            .setTitle('**Cat**', '\u200B')
            .addField('\u200B', '**N\'est il pas trop mignon ?**')
            .setImage(imagecat[image])
        .setThumbnail('https://cdn.discordapp.com/attachments/843466167347838989/881531424447012874/standard.gif')
        message.channel.send(catembed);

    }

    var imagedog = ["https://cdn.discordapp.com/attachments/843466167347838989/881533017351422032/R_8.gif", "https://cdn.discordapp.com/attachments/843466167347838989/881533021239541760/OIP_61.jpg", "https://cdn.discordapp.com/attachments/843466167347838989/881533023240224788/1796611_10152275769498254_1258234241_n1.jpg", "https://cdn.discordapp.com/attachments/843466167347838989/881533023319896134/R_5.gif", "https://cdn.discordapp.com/attachments/843466167347838989/881533023538020412/R_6.gif", "https://cdn.discordapp.com/attachments/843466167347838989/881533024410411039/R_7.gif", "https://cdn.discordapp.com/attachments/843466167347838989/881533025547075614/R.jpg", "https://cdn.discordapp.com/attachments/843466167347838989/881533029191921694/OIP_59.jpg"];
    var image = Math.floor(Math.random() * images.length);

    if (command === `dog`) {


        let dogembed = new Discord.MessageEmbed()

            .setTitle('**Dog**', '\u200B')
            .addField('\u200B', '**N\'est il pas trop mignon ?**')
            .setImage(imagedog[image])
        .setThumbnail('https://cdn.discordapp.com/attachments/843466167347838989/881531424447012874/standard.gif')
        message.channel.send(dogembed);

    }

    if (command == "nsfw") {
        var imagesnsfw = ["https://cdn.discordapp.com/attachments/694605602470494268/698716157569400963/PPNVxIi.gif", "https://cdn.nekos.life/lewd/lewd_neko518.jpg", "https://cdn.nekos.life/lewd/lewd_neko776.jpg", "https://cdn.nekos.life/lewd/lewd_neko399.jpeg", "https://cdn.nekos.life/lewd/lewd_neko211.png", "https://cdn.nekos.life/lewd/lewd_neko_419.jpg", "https://cdn.nekos.life/lewd/lewd_neko801.jpg", "https://cdn.nekos.life/lewd/lewd_neko577.jpeg", "https://cdn.nekos.life/lewd/lewd_neko_156.jpg", "https://cdn.nekos.life/lewd/lewd_neko339.jpeg", "https://cdn.nekos.life/lewd/lewd_neko248.jpeg", "https://cdn.nekos.life/lewd/lewd_neko388.jpeg"];
        var image = Math.floor(Math.random() * images.length);

        // You can get the Channel class (which contains the nsfw property) using the Message class.
        if (message.channel.nsfw) {
            let nsfwembed2 = new Discord.MessageEmbed()

                .addField('\u200B', `**NSFW**`)
                .setImage(imagesnsfw[image])

            message.channel.send(nsfwembed2);

        } else {
            message.channel.send("Ce channel n'est pas NSFW !");
        }
    }

    var imageshug = ["https://cdn.discordapp.com/attachments/865683498308599808/873513530475831347/anime-hug-37.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873513532073861140/027e0ab608f8b84a25b2d2b1d223edec.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873513532698804295/anime-hug-79.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873513536800821248/bb841fad2c0e549c38d8ae15f4ef1209.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873513540185645137/FaroffHauntingHermitcrab-size_restricted.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873513541355859998/FrenchShimmeringAmericanmarten-size_restricted.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873513543708835850/ntqYLGl.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873513545277517854/tenor.gif"];
    var image = Math.floor(Math.random() * images.length);

    if (command === `hug`) {
        if (message.mentions.members.size == 1) {
            let member = message.mentions.members.first()

            let hugembed = new Discord.MessageEmbed()

                .addField('\u200B', `**${message.author} fais un câlin à ${member}**`)
                .setImage(imageshug[image])

            message.channel.send(hugembed);
        }

    }
    var images = ["https://cdn.discordapp.com/attachments/824631830154051644/879335062255042620/tenor.gif", "https://cdn.discordapp.com/attachments/824631830154051644/879335166538051604/TerribleLightBagworm-max-1mb.gif", "https://cdn.discordapp.com/attachments/824631830154051644/879335285509476403/4e9ea150354ad3159339b202cbc6cad9.gif", "https://cdn.discordapp.com/attachments/824631830154051644/879335422042456094/UnacceptableWavyCod-max-1mb.gif", "https://cdn.discordapp.com/attachments/824631830154051644/879335944216518686/anime-girl.gif", "https://cdn.discordapp.com/attachments/824631830154051644/879335944463986708/girl-slap.gif"];
    var image = Math.floor(Math.random() * images.length);

    if (command === `slap`) {
        if (message.mentions.members.size == 1) {
            let member = message.mentions.members.first()

            let slapembed = new Discord.MessageEmbed()

                .addField('\u200B', `**${message.author} fracasse ${member}**`)
                .setImage(images[image])

            message.channel.send(slapembed);
        }

    }

    if (command === "profil") {
        if (message.mentions.members.size == 1) {
            member = message.mentions.members.first().user
        } else {
            member = message.author
        }
        let profilembed = new Discord.MessageEmbed()
            .setTitle(member.username)
            .addField('\u200b', `:clipboard: pseudo: **${member.username}** `)
            .addField('\u200b', ` :id:: **${member.id}** `)
            .addField('\u200b', ` Compte créé le: **${member.createdAt}** `)
            .setThumbnail((member.displayAvatarURL({ dynamic: true })))
            .setFooter('By shiido', 'https://cdn.discordapp.com/attachments/869504794425982976/880789895700971601/f2d69086820368250a4ce7166f38c7f1.gif');


        message.channel.send(profilembed);
    }
    if (command === "météo") {
        const profilembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Météo France")
            .addField('\u200B', 'https://meteofrance.com/')
            .setImage("https://cdn.discordapp.com/attachments/847188650395041843/880548219061436436/img-meteo.jpg")
        message.channel.send(profilembed);
    }
    if (command === "avatar") {
        if (message.mentions.members.size == 1) {
            member = message.mentions.members.first().user
        } else {
            member = message.author
        }
        let AVATARembed = new Discord.MessageEmbed()
            .setTitle(member.username)
            .setImage(member.displayAvatarURL({ dynamic: true }))

        message.channel.send(AVATARembed);

    };

    if (command === "serveur") {
        const memberEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(message.author.username)
            .addField('\u200B', `Total members: **${message.guild.memberCount}**\nNom du serveur: **${message.guild.name}**`)
            .setImage(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter('By Shiido', 'https://cdn.discordapp.com/emojis/868906708452405278.gif?v=1');
        message.channel.send(memberEmbed);

    }


    if (command === "ticket") {
        message.guild.channels.create(`ticket-${message.author.username}`, {
            type: 'text', //This create a text channel, you can make a voice one too, by changing "text" to "voice"
            permissionOverwrites: [

            ],
        }).then(ch => {

            const embed = new Discord.MessageEmbed()
                .setColor(0xffffff)
                .setTitle(`Nouveau ticket créé par ${message.author.username}`)
                .setDescription('Merci de nous décrire votre problème !')
                .addField('Notre modérateur vous répondra le plus vite possible !', 'Tout ticket inutile créé sera sanctionné.')
                .addField(`Si vous souhaitez fermer le ticket`, `type : ?close-ticket `)
                .setImage("https://cdn.discordapp.com/attachments/865683498308599808/871717398699462716/image0.gif")
            ch.send(embed).then(msg => {
                //   setTimeout(() => {  console.log("Waiting 2second"); }, 2000);
                // msg.react(':key:')


            })


        })

    }




    if (command === "close-ticket") {
        if (message.channel.name === `ticket-${message.author.username}`.toLowerCase()) {

            const embed = new Discord.MessageEmbed()
                .setTitle("Shiido - JS")
                .addField('on the road!', `Nous allons fermer le ticket ${message.channel.name} dans exactement 5 secondes.`)
                .setColor(0xffffff)
            message.channel.send(embed).then(del => {



                sleep(5000)
                message.channel.delete()
            })
        }

        else {
            const embed = new Discord.MessageEmbed()
                .setTitle("Shiido - JS")
                .addField('Nope', `Vous êtes dans le mauvais channel vous ne pouvez pas close le ticket`)
                .setImage("https://cdn.discordapp.com/attachments/695565290112811068/864846192789291028/e7d58ef153ca6ccd916a474ece2a5270.gif")
                .setColor(0xffffff)
            message.channel.send(embed)



        }


    };
    if (command === "kick") {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour kick une personne. Réessaye")
            return;
        }
        if (args.length < 1) {
            console.log('manque un paramètre');
        }
        else {
            message.mentions.members.first().kick().then((member) => {
                user = message.mentions.members.first();
                message.channel.send(":wave: " + member.displayName + " a bien été expulsé du serveur\nhttps://cdn.discordapp.com/attachments/824631830154051644/862412884793491516/tenor_4.gif");


            })
        };
    };
    if (command === "ban") {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour ban une personne. Réessaye")
            return;
        }
        if (args.length < 1) {
            console.log('manque un paramètre');
        }
        else {
            message.mentions.members.first().ban().then((member) => {
                user = message.mentions.members.first();
                if (message.author.id != user.id)
                    message.channel.send(":wave: " + member.displayName + " a bien été banni du serveur et ne reviendra pas\nhttps://cdn.discordapp.com/attachments/824631830154051644/862412788419526686/tenor_3.gif");


            })
        };
    };
    if (command === `warn`) {
        if (message.mentions.members.size == 1) {

            if (!message.member.hasPermission("KICK_MEMBERS")) {
                message.reply("Jeune padawan, Vous n'avez pas les perms pour ban une personne. Réessaye")


            }
            else {
                user = message.mentions.members.first();
                args.splice(args.indexOf(`<@!${user.id}>`), 1);
                message.channel.send(" " + user.displayName + " a bien été warn sur le serveur.");
                user.send("Tu as été warn pour **" + args.join(" ") + "**")
            }
        }
    }
    if (command === "clear") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("vous n'avez pas les permissions pour clear messages.")
            console.log("pas owner");
            return;
        }
        if (args.length < 1) {
            console.log('manque un paramètre');
        }

        else {
            message.channel.bulkDelete(args[0])
                .then(messages => message.channel.send(`Messages supprimés par ${message.author}`))
                .catch(console.error);




        }

    };
    if (command === "lock") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour lock un channel. Réessaye")
            console.log("pas owner");
            return;
        }

        else {

            // message.channel.updateOverwrite(message.channel.guild.roles, { SEND_MESSAGES: false })
            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
            message.channel.send(`Lock avec succès **${message.channel.name}**`)

        };
    };
    if (command === "unlock") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour lock un channel. Réessaye")
            console.log("pas owner");
            return;
        }

        else {

            // message.channel.updateOverwrite(message.channel.guild.roles, { SEND_MESSAGES: false })
            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true
            });
            message.channel.send(`Unlock **${message.channel.name}**`)

        };
    };
    if (command === "mute") {
        if (!message.member.hasPermission("MUTE_MEMBERS")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour mute une personne.")
            return;
        }
        if (args.length < 1) {
            console.log('manque un paramètre');
        }
        else {
            const mutedRole = message.guild.roles.cache.find(
                (role) => role.name === 'Muted'
            );
            message.mentions.members.first().roles.add(mutedRole).catch((e) => console.log(e));

        }
        if (!mutedRole)
            return message.channel.send('Il n\'y a pas de rôle mute dans ce serveur');


        message.reply(`ce cassos a bien été mute`);
        message.mentions.members.first().send("tu as été mute sur le serveur")


    };
    if (command === "help") {
        const helpmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Préfix `?`")
            .addField('Modération', '`kick` `ban` `unban` `warn` `lock` `unlock` `clear` `nuke` `antilink` ')
            .addField('Fun', '`kiss` `slap` `hug` `fight` `nsfw` `cat`')
            .addField('Utiles', '`ticket` `close ticket` `avatar` `profil` `météo` `snipe`')
            .addField('Musique', '`play` `skip` `stop`')
            .setThumbnail("https://cdn.discordapp.com/avatars/688655906384379961/a_17e47b92401f9d9365b9c55809971965.gif")
        message.channel.send(helpmbed);
    }
    if(command === "unban"){
        if(!message.member.hasPermission("BAN_MEMBERS")) {
          message.reply(` Vous n'avez pas les permissions pour deban des personnes.`)
        }
        
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
          message.reply(`**${message.author.username}**, Je n'ai pas les permissions pour deban des gens.`)
        }
        
        let userID = args[0]
          message.guild.fetchBans().then(bans=> {
          if(bans.size == 0) return 
          let bUser = bans.find(b => b.user.id == userID)
          if(!bUser) return
          message.guild.members.unban(bUser.user)
        message.reply('cette personne a bien été deban')
    })
        
}

    const serverQueue = queue.get(message.guild.id);

    if (command === "play") {
        execute(message, serverQueue);
        return;
    } else if (command === "skip") {
        skip(message, serverQueue);
        return;
    } else if (command === "stop") {
        stop(message, serverQueue);
        return;
    }
    if (command === "snipe") {

        const msg = bot.snipes.get(message.channel.id)
        const embedd = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setDescription(" :x:| Il y a rien a snipe!")
          if(!msg) return message.channel.send(embedd)
          const embed = new Discord.MessageEmbed()
          .setAuthor(msg.author , msg.avatar)
          .setDescription(msg.content)
          .setColor("#0099ff")
          .setTimestamp() 
          if(msg.image)embed.setImage(msg.image)
          
          message.channel.send(embed)

      
    }

    



});
async function execute(message, serverQueue) {
    const args = message.content.split(" ");

    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
        return message.channel.send(
            "Vous devez être en vocal pour écouter de la musique!"
        );


    const songInfo = await ytdl.getInfo(args[1]);
    const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url
    };

    if (!serverQueue) {
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(message.guild.id, queueContruct);

        queueContruct.songs.push(song);

        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, queueContruct.songs[0]);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    } else {
        serverQueue.songs.push(song);
        return message.channel.send(`${song.title}a été ajouté à la queue!`);
    }
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
            "Vous devez être en vocal pour skipp la musique!"
        );
    if (!serverQueue)
        return message.channel.send("Il n’y a pas de chanson que je pourrais sauter!");
    serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
    if (!message.member.voice.channel)
        return message.channel.send(
            "Vous devez être en vocal pour stopper la musique!"
        );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Début: **${song.title}**`);
}









bot.on('ready', async () => {
    // "ready" isn't really ready. We need to wait a spell.
    console.log("Bot online!");

    bot.user.setActivity("💖・Chi le best bot. Prefix `?`", {
        type: "WATCHING"
    });
});

bot.snipes = new Discord.Collection();

bot.on('messageDelete', function (message) {
    if (message.author.bot) return;

    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        avatar: message.author.displayAvatarURL({dynamic : true }),
        member: message.member,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })


});




