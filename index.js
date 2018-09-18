const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');

client.on("ready", () => {
  console.log("Ativado.");
   let gameloop = require('./comando_dono/loop.js');
    gameloop.run(client);
})

client.on("guildCreate", guild => {
	if(guild.id === "1" || guild.id === "2"){
		
		guild.owner.send(`O seu servidor (**${guild.name}**) foi banido do Hiroki e não vai poder usar o bot Hiroki! **Para saber o motivo do banimento entre em https://discord.gg/Q65Q49G**`)
		guild.leave()
	}else{
		const entrei = new Discord.RichEmbed()
			.setAuthor(`${guild.name} | Adicionado`)
			.setDescription(`Entrei no servidor **${guild.name}** (id: ${guild.id})`)
			.addField("**Membros**", `Com **${guild.memberCount - guild.members.filter(m=>m.user.bot).size}** membro(s) e **${guild.members.filter(m=>m.user.bot).size}** bot(s)`)
			.addField("**Dono**", `**${guild.owner.user.tag}** (ID: ${guild.owner.id})`)
			.setColor("#ff0000")
			.setFooter(`No momento estou em ${client.guilds.size} servidores!`)
		
		client.channels.get("470704046655930379").send(entrei);
		const channel = client.channels.get("470704131376414732");
    channel.setName(`💻 | SERVIDORES: ${client.guilds.size}`)
    const membros = client.channels.get("470705090106359848");
    membros.setName(`👤 | MEMBROS: ${client.users.size}`)
		const adms = guild.members.filter(r => r.hasPermission('MANAGE_GUILD')).map(pessoa => `${pessoa.id}`)
    		for(var c in adms){
        		const adm = guild.members.get(adms[c]);
        		adm.send(`Olá ${adm}, tudo bem? eu sou o HypeMine, um BOT criado para uma Loja de Minecraft.\n`).catch(O_o=>{});
    		}
	}
});

client.on('message', message =>{
	if(message.content == '<@480892970422501388>'){
	  message.channel.send(`Olá ${message.author}, Sou conhecido como HypeBot, Fui criado para uma Loja de Minecraft Conhecida como HypeMine Caso precise de Ajuda **h!ajuda**`);
    }
});



client.on("guildMemberAdd", function(member) {
	let role = member.guild.roles.find("name", "👥| Membro");
	member.addRole(role).catch(console.error);
});

client.on('guildMemberAdd', member => {
  const bemvindo = member.guild.channels.find('name', '👋entrada')

  var canalentradaesaida = new Discord.RichEmbed()
    .setColor('00FF00')
    .setAuthor(member.user.tag + '', member.user.displayAvatarURL)
    .setDescription(`👋 **|** Bem-vindo **${member.user.tag}** ao servidor!`)
    .setFooter(`Entrou`)
    .setTimestamp()
    return bemvindo.send(canalentradaesaida);
});
client.on('guildMemberRemove', member => {
  const canalsaiu = member.guild.channels.find('name', '🤙saida')

  var canalentradaesaida = new Discord.RichEmbed()
    .setColor('#FF0000')
    .setAuthor(member.user.tag + '', member.user.displayAvatarURL)
    .setDescription(`:anger:  **|** **${member.user.tag}** saiu do servidor!`)
    .setFooter(`Saiu`)
    .setTimestamp()
    return canalsaiu.send(canalentradaesaida);
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.channel.type == "dm") return;
  if (!message.content.startsWith(config.prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    message.channel.send("Este Comando Não Existe.").then(msg => msg.delete(4000));
  }
 
});
 
client.login(config.token);
console.log("Logado!");
