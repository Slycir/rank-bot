const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json') ;
const jokes = require('./jokes.json') ;
const ape = require('./ape.json') ;
const bible = require('./en_bbe.json') ;
const { send } = require('process');
const { error } = require('console');
const totalChap = 66 ;
var books = new Array();
var abbrev = new Array();
var apeB = 1
var rank = 1;
var yomama = 0 ;
var forHelper;
var consoleChan = "845108383245795339";
const checkRate = 1000 * 10;
var currentdate = new Date();
var MIN_INTERVAL = 1000 * 15;
var member = '450471321525157913';
var chanID = true;

const mod = 1000 * 60
const timeout = 1000 * 60 * 5
const apeCool = 1000 * 30

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
  })

for (forHelper = 0; forHelper < totalChap; forHelper++) {
	books.push(bible[forHelper].name);
	abbrev.push(bible[forHelper].abbrev);
}

//Embeds
//Help
const helpEnbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Rank Help')
	.setDescription('Use !rank to get your rank!')
	.setTimestamp()
//Commands
const commandEnbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Commands')
	.addField('Command list', `!rank \n!runk \n!rankhelp \n!rankcommands \n!requestform \n!avatar \n!ape \n!yomama <1-846>`, true)
const bibleEnbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Bible Books')
	.addField('Book Titles', books, true)
	.addField('Book Abreviations', abbrev, true)
//Ready
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('!rank', {type: 'PLAYING'})
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error) ;
});

client.login(config.key);

client.on('message', message => {

	if (message.content.substring(0, 2) == '666') {
		message.delete()
			.catch(console.error) ;
	}
	if ((message.channel.id == consoleChan) && (!message.author.bot) && (chanID)) {
		console.log(message.author + ": " + message.content);
	}
	if (message.channel == consoleChan && !message.author.bot && !chanID) {
		console.log(message.author + ": " + message.content);
	}

	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (message.content.charAt(0) == config.prefix) {
		//Rank
		if (command === 'rank') {
			if ((message.guild.id == '742138221852360845') && (rank == 1)) {
				message.channel.send("Wow, you're funny.");


				message.member.roles.add('758036544375357592')
					.catch(error => message.reply(`You deserve a timeout, but I cant because of: ${error}`));
				console.log(`Timeout attempted on ${message.author}`);

				setTimeout(() => {
					message.member.roles.remove('758036544375357592')
						.catch(error => message.reply(`Your timeout has ended, but I cant remove the role because of: ${error}`));
					console.log(`Timeout ended on ${message.author}`);
				}, timeout);
			}
		//modpls
		} else if (command === 'modpls') {
			message.reply("You have mod for 1 minute");
			message.delete()
				.catch(console.error) ;

			message.member.roles.add('778696103737819147')
				.catch(error => message.reply(`I tried to give you mod, but I cant because of: ${error}`));
			console.log(`Modding attempted on ${message.author}`);
			client.channels.cache.get('778696711631667220').send(`${message.author}`).then(msg => {
				msg.delete();	
			}) ;

			setTimeout(() => {
				message.member.roles.remove('778696103737819147')
					.catch(error => message.reply(`I tried to remove mod, but I cant remove the role because of: ${error}`));
				console.log(`Mod ended on ${message.author}`);
			}, mod);
		//Runk
		} else if (command == 'runk'){
			message.channel.send('hahahahahahaha');
		//Rank help
		} else if (command == 'rankhelp') {
			message.channel.send(helpEnbed) ;
		//Rank commands
		} else if (command == 'rankcommands') {
			message.channel.send(commandEnbed) ;
			
		//Request form
		} else if (command == 'requestform') {
			message.channel.send(`Use this form to request a new feature \nhttps://forms.gle/HL6cZw662VFVgbZN8`)
		//Avatar
		} else if (command == 'avatar') {
			if(!args.length) {
				message.channel.send(message.author.displayAvatarURL()) ;
			}
		//ape
		} else if (command == 'ape') {
			if (apeB == 1) {
				var bpe = Math.floor(Math.random() * (ape.apes.length))
				message.channel.send(ape.apes[bpe]) ;
				apeB = 0

				setTimeout(() => {
					apeB = 1
				}, apeCool);
			}
			
		//yomama
		} else if (command == 'yomama') {
			if(!args.length) {
				yomama = Math.floor(Math.random() * 846)
				message.channel.send('Yo mama joke ' + (yomama + 1) + '. \n' + jokes.fat[yomama]) ;
			} else {
				if ((args >= 1) && (args <= 846)) {
					yomama = args
					message.channel.send('Yo mama joke ' + yomama + '. \n' + jokes.fat[(yomama - 1)]) ;
				} else {
					message.reply('please enter a number 1-846.') ;
				}
			}
		//devtool ranktoggle
		} else if (command == 'ranktoggle') {
			if ((message.author.id == '194623741093740545') && (rank = 1)) {
				rank = 0
				message.channel.send('!rank disabled'); 
			} else if ((message.author.id == '194623741093740545') && (rank = 0)) {
				rank = 1
				message.channel.send('!rank enabled');
			}
			message.delete()
				.catch(console.error) ;
		//sourcecode
		} else if (command == 'sourcecode') {
			message.author.send({
				files: [
					'./index.js'
				]
			});
			message.delete();
			console.log('Code sent to ' + message.author) ;
		//Bible
		} else if (command == 'bible') {
			if(!args.length) {
				message.channel.send(bibleEnbed) ;
			} else if (args[0] >= 1) {
				if(args.length != 4) {
					bibleVerse(args[0] - 1, args, message.channel)
				} else {
					bibleVerseRange(i, args, message.channel)
				}
			} else if (args.length != 4){
				var i ;
				for (i = 0; i < totalChap; i++) {
					if (args[0] == bible[i].abbrev) {
						bibleVerse(i, args, message.channel) ;
					}
				}
			} else {
				var i ;
				for (i = 0; i < totalChap; i++) {
					if (args[0] == bible[i].abbrev) {
						bibleVerseRange(i, args, message.channel)
					}
				}
			}
		} else if (command == 'argstest') {
			message.channel.send(args) ;
		} else if (command == 'lol') {
			message.channel.send(`<:funnee:778453575499120660><:funnee:778453575499120660><:funnee:778453575499120660>`)
		} else if (command == 'botsend') {

			if (message.author.id != '194623741093740545') return;

			consoleChan = args[0];
			console.log("Channel is now set to: " + args[0]);
			message.delete()
				.catch(console.error());
		}
	}
	
});

function bibleVerse(book, args, channel) {
	var boolChap = 0 
	var boolVer = 0
	var chapter = Math.floor(Math.random() * (bible[book].chapters.length)) ;

	if (args[1]) {
		chapter = args[1] - 1 ;
			boolChap = 1 ;
	}

	var verse = Math.floor(Math.random() * (bible[book].chapters[chapter].length)) ;
					
	if (args[2]) {
		verse = args[2] - 1 ;
		boolVer = 1 ;
	}
	channel.send(bible[book].name + ' ' + (chapter + 1) + ':' + (verse + 1) + ' \n' + bible[book].chapters[chapter][verse]) ;
}

function bibleVerseRange(book, args, channel) {
	var chapter = args[1] - 1 ;
	var verse = args[2] - 1 ;
	var upper = args[3] - 1 ;
	var current = verse ;
	var range = upper - verse ;

	channel.send(bible[book].name + ' ' + (chapter + 1) + ':' + (verse + 1) + '-' + (chapter + 1) + ':' + (upper + 1)) ;

	for(var i = 0; i <= range; i++) {
		channel.send(bible[book].chapters[chapter][current]) ;
		current++;
	}
}

client.once('ready', () => {
	sendRefresh();
});

function sendRefresh() {
	readline.question('', name => {

		const args = name.slice(config.conPre.length).trim().split(' ');
		const command = args.shift().toLowerCase();
		if (name.startsWith(config.conPre)) {
			if (command == "botsend") {
				consoleChan = args[0];
				console.log("Channel is now set to: " + args[0]);
			chanID = true;
			} else if (command == "deletemess") {
				client.channels.cache.get(consoleChan).messages.delete(args[0])
					.catch(console.error());
			} else if (command == "newchan") {
				client.guilds.fetch("742138221852360845")
					.then(guild => guild.channels.create(args[0]))
					.catch(console.error());
			} else if (command == "dm") {
				client.guilds.fetch("742138221852360845") 
					.then(guild => consoleChan = guild.members.fetch(args[0]))
					.then(GuildMember => GuildMember.createDM())
					.then(DMChannel => consoleChan = args[0])
				console.log("Channel set to DM: " + args[0])
				chanID = false;
			}
				
		}


		if (!name.startsWith(config.conPre)) {
			if (chanID = true) {
				client.channels.fetch(consoleChan)
					.then(channel => channel.send(name))
			} else {
				consoleChan.send(name);
			}
		}

		sendRefresh();
	  })
}

/*setInterval(function(){
    currentdate = new Date();
    if (currentdate.getDay() != 0 && currentdate.getDay() != 1) {
		if((currentdate.getHours() == 8) && (currentdate.getMinutes() == 55) && (currentdate.getSeconds() < 15)) {
			member
          		.kick('Scheduled kick')
          		.catch(err => {
            		member.send('I was unable to kick you');
            		console.error(err);
			  });
		} else if((currentdate.getHours() == 15) && (currentdate.getMinutes() == 55) && (currentdate.getSeconds() < 15)) {
			member.send('https://discord.gg/fS8EHS92PS');
		}
    }
}, MIN_INTERVAL); */


