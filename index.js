/***************************************************
 * Serveur WEB                                     *
 ***************************************************/

// pour que le BOT soit toujours démarré, on va mettre en place  
// un serveur web que l'on appelera toutes les 15 minutes.       

const express = require('express');
const app = express();
const https = require('https');
const moment = require('moment');
moment.locale('fr');

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};


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

const package = require('./package.json')

const osutils = require('os-utils');

const ms = require("ms");









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


bot.on("message", async function (message) {
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

    if (command === "tos") {
        let tosembed = new Discord.MessageEmbed()

            .addField('Je respecte les TOS de discord faites de même', `https://discord.com/guidelines\nhttps://discord.com/terms`)
            .setImage('https://cdn.discordapp.com/attachments/869504794425982976/880789894509760522/dcaf2c86b44c5497a59b18e607fced5d.gif')

        message.channel.send(tosembed);
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

    var imageskill = ["https://cdn.discordapp.com/attachments/862039734288121906/883432537039458394/Akame_ga_Kill.gif", "https://cdn.discordapp.com/attachments/862039734288121906/883432535621771354/tenor_15.gif", "https://cdn.discordapp.com/attachments/862039734288121906/883432533121974302/tumblr_meber1O6Rz1rmpytho1_500.gif", "https://cdn.discordapp.com/attachments/862039734288121906/883432532144713808/R_9.gif", "https://cdn.discordapp.com/attachments/862039734288121906/883432529766527056/tenor_16.gif", "https://cdn.discordapp.com/attachments/862039734288121906/883432527333851156/OIP_64.jpg", "https://cdn.discordapp.com/attachments/862039734288121906/883433158513688576/c94c3b0c391a8fcaf1d056ba1a7d1f9aa62f011b_hq.gif", "https://cdn.discordapp.com/attachments/862039734288121906/883433159751000064/R_10.gif"];
    var image = Math.floor(Math.random() * images.length);


    if (command === `kill`) {
        if (message.mentions.members.size == 1) {
            let member = message.mentions.members.first()

            let killembed = new Discord.MessageEmbed()

                .addField('\u200B', `:crossed_swords:  **${message.author} tue ${member}**`)
                .setImage(imageskill[image])

            message.channel.send(killembed);
        }

    }
    var imagegifht = ["https://cdn.discordapp.com/attachments/865683498308599808/873552901358899220/tumblr_n4nbpfK8EN1tpso7yo1_500.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552898376749086/naruto_kun.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552884791394334/kakashi_bbou.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552879825338409/dsxgx.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552873164779581/cvncnc.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552869301829642/ab6720ae3b40d4f0b79cd2ad6a259066.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552877073870898/dfa65baad7f63329064bb95881d34299.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552866634248273/560e3d83a2136eab78377f646ef2eba4.gif", "https://cdn.discordapp.com/attachments/865683498308599808/873552857801043998/200.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881895560393662484/Naruto-697-1.png", "https://cdn.discordapp.com/attachments/880809764995596329/881895561832312903/anime-fight-gif-22.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881895568459317309/88fb93eeb76ddb11b1cbcd7ddd405b56.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881895810047049748/tumblr_oe9mgne53U1tiivhqo3_500.gif"];
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

    var imagepunch = ["https://cdn.discordapp.com/attachments/880809764995596329/881892776285982810/one-punch-man-manga-gif-6.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881892775967219722/05b88d1ae8f0a40bb7217ec51750032b.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881892773060567091/Anime_c10742_6403239.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881892763300417546/tumblr_ov4gyyMRdj1vz54q7o3_r1_540.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881892761316507698/976c1e11a5d1af939aeaf882b85efda1.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881892760263745536/2fa003f06ecbf2dcfd6e3026a4a2589e.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881892740969926706/OIP_63.jpg", "https://cdn.discordapp.com/attachments/880809764995596329/881894698464182283/9ab6139f71834e73850fea827356640f.gif", "https://cdn.discordapp.com/attachments/880809764995596329/881894698497761290/6d4f309c17f550236ab2a1ce14a32bec.gif", ""];
    var image = Math.floor(Math.random() * images.length);

    if (command === `punch`) {
        if (message.mentions.members.size == 1) {
            let member = message.mentions.members.first()

            let punchembed = new Discord.MessageEmbed()

                .addField('\u200B', ` **${message.author} explose ${member}**`)
                .setImage(imagepunch[image])

            message.channel.send(punchembed);
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
    if (command === "test") {

        const embed = new Discord.MessageEmbed()
            .setColor(Math.floor(Math.random() * 16777215))
            .addField('IDEs and Text Editors', 'There are many different ways to edit code, from code' +
                ' editors to Integrated Development Environments ("IDEs"). Here are some' +
                ' differences between the two and some examples of each:')
            .addField('IDEs:', 'IDEs (Integrated Development Environment) are programs that' +
                ' include a code editor, but also integrations with various other' +
                ' development tools (linters, version control,' +
                ' intellisense/autocomplete, automatic refactoring, database' +
                ' management, etc.).')
            .addField('Code Editors:', 'Code editors are text editors that usually include syntax' +
                ' highlighting, simple project management, and other helpful code' +
                ' editing tools.')
            .addField('WebStorm/PHPStorm (or any other JetBrains Product)', 'These IDEs, as they have a full suite of tools for' +
                ' development. Additionally they have a plugin system for anything' +
                ' that they do not automatically include. [Webstorm Download](https://www.jetbrains.com/webstorm/), [PHPStorm Download](https://www.jetbrains.com/phpstorm/)')
            .addField('Visual Studio', 'Visual studio is a full IDE made by microsoft. It works well' +
                ' with .NET based languages, as they are made by the same people.' +
                ' They also include a plugin system. [Download](https://visualstudio.microsoft.com/)')
            .addField('Atom', 'Atom is a code editor based on web technology. It\'s made by' +
                ' GitHub, and has a massive community, with plugins for everything. [Download](https://atom.io/)')
            .addField('VS Code', 'VS Code is another editor based off of web technology, but' +
                ' is better optimized and runs faster. This is built by microsoft' +
                ' and has a large set of plugins as well. [Download](https://code.visualstudio.com/)')
            .addField('Sublime Text', 'Sublime text starts off as a nice small and fast editor.' +
                ' It\'s the fastest text editor that I\'ve seen. There is also a' +
                ' wide selection of plugins. [Download](https://www.sublimetext.com/)')
            .setFooter(`© Shiido Bot}`);

        message.channel.send({ embed });
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

        let region = {
            "brazil": "Brazil",
            "eu-central": "Central Europe",
            "singapore": "Singapore",
            "us-central": "U.S. Central",
            "sydney": "Sydney",
            "us-east": "U.S. East",
            "us-south": "U.S. South",
            "us-west": "U.S. West",
            "eu-west": "Western Europe",
            "vip-us-east": "VIP U.S. East",
            "london": "London",
            "amsterdam": "Amsterdam",
            "hongkong": "Hong Kong"
        }

        const { guild } = message;
        const embedserv = new Discord.MessageEmbed()
            .setAuthor(`${guild.name} (${guild.id})`, guild.iconURL())
            .setThumbnail(guild.iconURL())
            .addField('Créé le', guild.createdAt.toLocaleString(), true)
            .addField('Owner', guild.owner.user.tag)
            .addField('Membres totaux', guild.memberCount, true)
            .addField('Total réel de Membres', guild.members.cache.filter(member => !member.user.bot).size, true)
            .addField('Total Bots', guild.members.cache.filter(member => member.user.bot).size, true)
            .addField('Total Channels', guild.channels.cache.size, true)
            .addField('Total Texte Channels', guild.channels.cache.filter(ch => ch.type === 'text').size, true)
            .addField('Total Voix Channels', guild.channels.cache.filter(ch => ch.type === 'voice').size, true)
            .addField("Region", region[message.guild.region], true)

            .setColor('#5CC5FF')
            .setDescription(`${guild.roles.cache.map(role => role.toString()).join(' ')}`);
        message.channel.send(embedserv);


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
            if (message.author.id === message.mentions.users.first()) return message.reply("Vous ne pouvez pas vous auto kick:facepalm:");
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

    if (command === "tempban") {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour ban une personne. Réessaye")
            return;
        }
        if (args.length < 1) {
            console.log('manque un paramètre');
        }
        else {
            let toban = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if (!toban) return message.reply("Je ne trouve pas l'utilisateur");
            let bantime = args[1];
            if (!bantime) return message.reply("Vous n'avez pas défini de temps pour la personne ban");

            message.mentions.members.first().ban().then((member) => {
                user = message.mentions.members.first();
                if (message.author.id != user.id)
                    message.channel.send(":wave: " + member.displayName + " a bien été banni du serveur et ne reviendra pas\nhttps://cdn.discordapp.com/attachments/824631830154051644/862412788419526686/tenor_3.gif");

                const tempbanembed = new Discord.MessageEmbed()
                    .setColor(0x00FFFF)
                    .setTimestamp()
                    .addField('Action:', 'Temp ban')
                    .addField('User:', `${toban.username}#${toban.discriminator} (${toban.id})`)
                    .addField('Moderateur:', `${message.author.username}#${message.author.discriminator}`)
                    .addField('Durée', ms(ms(bantime)))
                    .setFooter(`© Shiido`);
                message.channel.send(tempbanembed)



            })

            setTimeout(function () {
                message.guild.members.unban(toban)
                message.channel.send(`<@${toban.id}> a été unban`)
            }, ms(bantime));
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


    if (command === `loveletter`) {
        if (message.mentions.members.size == 1) {

            if (!message.member.hasPermission("SEND_MESSAGES")) {
                message.reply("Jeune padawan, Vous n'avez pas les perms pour ban une personne. Réessaye")


            }
            else {
                let loveEmbed = new Discord.MessageEmbed()
                    .setTitle('💌 Tu as reçu une lettre d\'amour 💌')
                    .setColor('#E75A70')
                    .setThumbnail('https://cdn.discordapp.com/attachments/544697145664602132/673778637018759168/love-letter.png')
                    .setDescription(`Tu as reçu une lettre d'amour de <@${message.author.id}>`)

                user = message.mentions.members.first();
                user.send(loveEmbed)
                message.channel.send("Lettre d'amour envoyée")
            }
        }
    }


    if (command === `invitebot`) {
        {

            if (!message.member.hasPermission("SEND_MESSAGES")) {
                message.reply("Jeune padawan, Vous n'avez pas les perms pour ban une personne. Réessaye")


            }
            else {
                let inviteEmbed = new Discord.MessageEmbed()
                    .setTitle('Tu as reçu unn nouveau message !')
                    .setColor('#E75A70')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Voici le lien d'invitation pour ajouter le bot à ton serveur ;))`)
                    .addField('\u200B', 'https://discord.com/api/oauth2/authorize?client_id=880812526340821022&permissions=8&scope=bot')

                member = message.author
                member.send(inviteEmbed)
                message.channel.send("Lien du bot envoyé")
            }
        }
    }

    if (command === `support`) {
        {

            if (!message.member.hasPermission("SEND_MESSAGES")) {
                message.reply("Tu n'as pas les perms dommage :(")


            }
            else {

                message.reply("Voici le serv support bg\nhttps://discord.gg/VGYcq559RS")
            }
        }
    }

    if (command === "clear") {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Invalid permissions.").then(msg => msg.delete(10000));
        if (!args[0]) return message.channel.send("S'il vous plaît précisez le nombre de messages que vous voulez clear").then(msg => msg.delete(5000));
        if (args[0] > 100) return message.channel.send("Veuillez fournir un nombre de messages inférieur à 100 à supprimer.").then(msg => msg.delete(5000));
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} Mesages ont été supprimés dans <#${message.channel.id}>.`).then(msg => msg.delete(10000));
        });
    }


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

    if (command === "locktime") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour lock un channel. Réessaye")
            console.log("pas owner");
            return;
        }

        else {


            let locktime = args[0];
            if (!locktime) return message.reply("Vous n'avez pas défini de temps pour la durée du lock");

            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });

            const lockeembed = new Discord.MessageEmbed()
                .setColor(0x00FFFF)
                .setTimestamp()
                .addField('Action:', 'Lock tempo ')
                .addField('Moderateur:', `${message.author.username}`)
                .addField('Durée', ms(ms(locktime)))
                .setFooter(`© Shiido`);
            message.channel.send(lockeembed);



            setTimeout(function () {

                message.channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
                message.channel.send(`Unlock **${message.channel.name}**`)

            }, ms(locktime));

        }



    };
    if (command === "nuke") {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.channel.send('Vous n\'avez pas la permission pour faire ça !')
            return;
        }
        else {
            message.channel.clone().then(channel => {
                channel.setPosition(message.channel.position)
                channel.send('https://i.gifer.com/6Ip.gif')
            })
            message.channel.delete()

        };
    }

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
    if (command === "tempmute") {
        if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour mute une personne.")
            return;
        }
        if (args.length < 1) {
            console.log('manque un paramètre');
        }
        else {

            let tomute = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if (!tomute) return message.reply("Je ne trouve pas l'utilisateur");
            if (message.author.id === message.mentions.users.first()) return message.reply("You can't mute yourself:facepalm:");
            let muteRole = message.guild.roles.cache.find(val => val.name === "Muted");
            if (!muteRole) {
                try {
                    muteRole = await message.guild.roles.create({
                        data: {
                            name: "Muted",
                            color: "#000000",
                            permissions: [],
                            position: 3
                        }
                    });
                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muteRole, {
                            SEND_MESSAGES: false,
                            MANAGE_MESSAGES: false,
                            READ_MESSAGES: false,
                            ADD_REACTIONS: false


                        });
                    });
                } catch (e) {
                    console.log(e.stack);
                }
            }
            let mutetime = args[1];
            if (!mutetime) return message.reply("Vous n'avez pas défini de temps pour la personne mute");

            const tempmuteembed = new Discord.MessageEmbed()
                .setColor(0x00FFFF)
                .setTimestamp()
                .addField('Action:', 'Temp Mute')
                .addField('User:', `${tomute.username}#${tomute.discriminator} (${tomute.id})`)
                .addField('Moderateur:', `${message.author.username}#${message.author.discriminator}`)
                .addField('Durée', ms(ms(mutetime)))
                .setFooter(`© Shiido`);
            message.channel.send(tempmuteembed);

            message.guild.member(tomute).roles.add(muteRole);

            setTimeout(function () {
                message.guild.member(tomute).roles.remove(muteRole)
                message.channel.send(`<@${tomute.id}> a été unmute`)
            }, ms(mutetime));

        }



    };

    if (command === "mute") {
        if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour mute une personne.")
            return;
        }
        if (args.length < 1) {
            console.log('manque un paramètre');
        }
        else {

            let tomute = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if (!tomute) return message.reply("Je ne trouve pas l'utilisateur");
            if (message.author.id === message.mentions.users.first()) return message.reply("You can't mute yourself:facepalm:");
            let muteRole = message.guild.roles.cache.find(val => val.name === "Muted");
            if (!muteRole) {
                try {
                    muteRole = await message.guild.roles.create({
                        data: {
                            name: "Muted",
                            color: "#000000",
                            permissions: [],
                            position: 3
                        }
                    });
                    message.guild.channels.cache.forEach(async (channel, id) => {
                        await channel.createOverwrite(muteRole, {
                            SEND_MESSAGES: false,
                            MANAGE_MESSAGES: false,
                            READ_MESSAGES: false,
                            ADD_REACTIONS: false


                        });
                    });
                } catch (e) {
                    console.log(e.stack);
                }
            }

            const muteembed = new Discord.MessageEmbed()
                .setColor(0x00FFFF)
                .setTimestamp()
                .addField('Action:', 'Mute')
                .addField('User:', `${tomute.username}#${tomute.discriminator} (${tomute.id})`)
                .addField('Moderateur:', `${message.author.username}#${message.author.discriminator}`)
                .setFooter(`© Shiido`);
            message.channel.send(muteembed);

            message.guild.member(tomute).roles.add(muteRole);


        }



    };

    if (command === "unmute") {
        if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR")) {
            message.reply("Jeune padawan, Vous n'avez pas les perms pour mute une personne.")
            return;
        }
        if (args.length < 1) {
            console.log('manque un paramètre');
        }
        else {

            let tomute = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            if (!tomute) return message.reply("Je ne trouve pas l'utilisateur");
            if (message.author.id === message.mentions.users.first()) return message.reply("You can't unmute yourself:facepalm:");
            let muteRole = message.guild.roles.cache.find(val => val.name === "Muted");

            const unmuteembed = new Discord.MessageEmbed()
                .setColor(0x00FFFF)
                .setTimestamp()
                .addField('Action:', 'Unmute')
                .addField('User:', `${tomute.username}#${tomute.discriminator} (${tomute.id})`)
                .addField('Moderateur:', `${message.author.username}#${message.author.discriminator}`)
                .setFooter(`© Shiido`);
            message.channel.send(unmuteembed);

            message.guild.member(tomute).roles.remove(muteRole);


        }
    }




    if (command === "help") {
        const helpmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle("Préfix `?`")
            .addField('Modération', '`kick` `ban` `unban` `tempban` `warn` `lock` `unlock` `locktime` `clear` `nuke` `antilink` `tempmute` `mute` `unmute` `addrole` `removerole` ')
            .addField('Fun', '`kiss` `slap` `hug` `fight` `nsfw` `cat` `roulette` `8ball` `punch` `kill` `flip`')
            .addField('Utiles', '`ticket` `close-ticket` `avatar` `profil` `snipe` `météo` `serveur` `statbot` `invitebot` `support`')
            .addField('Musique', '`play` `skip` `stop`')
            .setThumbnail("https://cdn.discordapp.com/avatars/688655906384379961/a_17e47b92401f9d9365b9c55809971965.gif")
        message.channel.send(helpmbed);
    }


    if (command === "unban") {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.reply(` Vous n'avez pas les permissions pour deban des personnes.`)
        }

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            message.reply(`**${message.author.username}**, Je n'ai pas les permissions pour deban des gens.`)
        }

        let userID = args[0]
        message.guild.fetchBans().then(bans => {
            if (bans.size == 0) return
            let bUser = bans.find(b => b.user.id == userID)
            if (!bUser) return
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
        if (!msg) return message.channel.send(embedd)
        const embed = new Discord.MessageEmbed()
            .setAuthor(msg.author, msg.avatar)
            .setDescription(msg.content)
            .setColor("#0099ff")
            .setTimestamp()
        if (msg.image) embed.setImage(msg.image)

        message.channel.send(embed)


    }
    if (command === `say`) {

        message.reply(args.join(" "));
        message.delete()


    }

    if (command === `user`) {
        let user = message.author;
        let muser = message.member;

        let status = ""
        if (status === null) status = "No Game"
        if (muser.presence.activities[0].type == 'CUSTOM_STATUS') {
            let cstatus = muser.presence.activities[0].state
            if (muser.presence.activities[0].emoji) {
                if (muser.presence.activities[0].emoji.animated == true) {
                    cstatus = `<a:${muser.presence.activities[0].emoji.name}:${muser.presence.activities[0].emoji.id}> ${cstatus}`
                }
                if (muser.presence.activities[0].emoji.animated !== true) {
                    cstatus = `<:${muser.presence.activities[0].emoji.name}:${muser.presence.activities[0].emoji.id}>${cstatus}`
                }
            }
            status = `Custom Status:\n${cstatus}\nApp:\n${muser.presence.activities[0].name}`
        } else {
            status = `${muser.presence.activities[0].type.toLowerCase()}: ${muser.presence.activities[0].name}`
        }

        const embed = new Discord.MessageEmbed();
        embed.addField("Username", `${user.username}#${user.discriminator}`, true)
            .addField("ID", `${user.id}`, true)
            .setColor(3447003)
            .setThumbnail(`${user.avatarURL()}`)
            .setTimestamp()
            .setURL(`${user.avatarURL()}`)
            .addField('Actuellement', `${muser.presence.status.toUpperCase()}`, true)
            .addField('Joue à', status, true)
            .addField('A rejoins discord', `${moment(user.createdAt).toString().substr(0, 15)}\n(${moment(user.createdAt).fromNow()})`, true)
            .addField('A rejoins le serveur', `${moment(muser.joinedAt).toString().substr(0, 15)}\n(${moment(muser.joinedAt).fromNow()})`, true)
            .addField('Roles', `${muser.roles.cache.array()}`, true)
            .addField('Bot ?', `${user.bot.toString().toUpperCase()}`, true)

        message.channel.send({ embed });


    }

    if (command === `roulette`) {

        let randomPer = message.guild.members.cache.random().user;
        message.channel.send(`${randomPer}`)



    }
    if (command === 'statbot') {

        var milliseconds = parseInt((bot.uptime % 1000) / 100),
            seconds = parseInt((bot.uptime / 1000) % 60),
            minutes = parseInt((bot.uptime / (1000 * 60)) % 60),
            hours = parseInt((bot.uptime / (1000 * 60 * 60)) % 24);
        days = parseInt((bot.uptime / (1000 * 60 * 60 * 24)) % 60);
        days = (days < 10) ? "0" + days : days;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        osutils.cpuUsage(function (v) {
            const embed = new Discord.MessageEmbed()
                .setColor(0x7289DA)
                .setThumbnail(bot.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setURL(bot.user.avatarURL({ format: 'png', dynamic: true, size: 2048 }))
                .setTimestamp()
                .addField("Shiido le bg de la street magl", "Show the bot's stats.")
                .addField("-------------------------------------------------------------------------------", "----------------------------------------------------------------------------")
                .addField("Server Prefix", "?", true)
                .addField("Global Prefix", config.prefix, true)
                .addField("Total Commands", `41 commands`, true)
                .addField("Total Servers", `${bot.guilds.cache.size}`, true)
                .addField("Total Channels", `${bot.channels.cache.size}`, true)
                .addField("Total Users", `${bot.users.cache.size}`, true)
                .addField("Bot Version", package["version"], true)
                .addField("Library", "Discord.js v12", true)
                .addField("Developpeur", `${package["author"]}`, true)
                .addField("-------------------------------------------------------------------------------", "----------------------------------------------------------------------------")
                .addField("Platforme", osutils.platform(), true)
                .addField("VPS CPU Cores", osutils.cpuCount() + " Cores", true)
                .addField("CPU Usage", `${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}%`, true)
                .addField("Total Mémoire", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB", true)
                .addField("RAM Usage Of VPS", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB`, true)
                .addField("RAM Usage Of Bot", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB", true)
                .addField("RAM Usage Of VPS %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`, true)
                .addField("Ping", Math.round(bot.ws.ping) + "ms", true)
                .addField("Uptime", days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s", true)
                .setFooter(`© ${package["author"]} bot`);
            message.channel.send({ embed });

        })
    }


    var reponses = ["effectivement", "nan", "Oui", "je ne préfère pas répondre à cette question", "dur à dire", "y'a que la vérité qui blesse", "clairement", "nan heureusement pour lui"]
    var text = Math.floor(Math.random() * reponses.length);
    if (command === `8ball`) {

        message.channel.send(reponses[text]);



    }

    var reponseflip = ["pile", "face"]
    var text = Math.floor(Math.random() * reponseflip.length);
    if (command === `flip`) {
        const flipembed = new Discord.MessageEmbed()

            .setTitle(message.author.username)
            .addField('\u200b',reponseflip[text])
            .setColor(0xffffff)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(flipembed);

    }

    var reponsepfc = ["pierre", "papier", "ciseaux"]
    var text = Math.floor(Math.random() * reponsepfc.length);
    if (command === `pfc`) {

        const pfcembed = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('\u200b', message.author.username + " a choisi " + args[0] + " et le bot a choisi " + reponsepfc[text])
            .setColor(0xffffff)

        message.channel.send(pfcembed);

    }

    if (command === "addrole") {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Vous n'avez pas les permissions requises.")

        } else {
            if (message.mentions.members.first() && message.mentions.roles.first()) {
                member = message.mentions.members.first()
                role = message.mentions.roles.first()

                member.roles.add(role);
                message.channel.send("rôle ajouté")
            }


        }


    }

    if (command === "removerole") {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("Vous n'avez pas les permissions requises.")

        } else {
            if (message.mentions.members.first() && message.mentions.roles.first()) {
                member = message.mentions.members.first()
                role = message.mentions.roles.first()

                member.roles.remove(role);
                message.channel.send("rôle supprimé")


            }
        }
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

    bot.user.setActivity("💖・Luna  le best bot. Prefix [?]", {
        type: "WATCHING"
    });
});

bot.snipes = new Discord.Collection();

bot.on('messageDelete', function (message) {
    if (message.author.bot) return;

    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        avatar: message.author.displayAvatarURL({ dynamic: true }),
        member: message.member,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })


});





