// import { Category, PrefixSupplier, Argument, Command } from "discord-akairo";
// import {
//   Collection,
//   Message,
//   MessageEmbed,
//   MessageCollector,
//   ReactionCollector,
//   MessageReaction,
//   User
// } from "discord.js";
// import ms from "ms";
// export default class HelpCommand extends Command {
//   public constructor() {
//     super("help", {
//       aliases: ["help", "h"],
//       description: {
//         content: "Sends the interactive help menu for Atomic",
//         usage: "$help [command]",
//         examples: ["$help", "$help p", "$help ping"]
//       },
//       category: "Information",
//       cooldown: 3000,
//       clientPermissions: ["ADD_REACTIONS"],
//       args: [
//         {
//           id: "command",
//           type: Argument.union("command", "commandAlias"),
//           default: null,
//           match: "content"
//         }
//       ]
//     });
//   }

//   public async exec(
//     message: Message,
//     { command }: { command: Command | null }
//   ): Promise<any> {
//     let SearchCollector: MessageCollector;
//     const prefix = await (this.handler.prefix as PrefixSupplier)(message);
//     if (!command || command === null) {
//       const Home: MessageEmbed = new MessageEmbed()
//         .setTitle("Atomic Help | Home")
//         .addFields([
//           {
//             name: "🏠 | Home",
//             value: "Returns to this page"
//           },
//           {
//             name: "📚 | Commands",
//             value: "Shows all categories along with their commands"
//           },
//           {
//             name: "🔎 | Search",
//             value: "Search for any command or alias"
//           },
//           {
//             name: "🔧 | Customs",
//             value: "Show all custom commands for this guild"
//           }
//         ])
//         .setThumbnail(this.client.user?.displayAvatarURL({ dynamic: true }) as string)
//         .setColor("RANDOM")
//         .setFooter(
//           `Requested by ${message.author.tag}`,
//           message.author.displayAvatarURL({ dynamic: true })
//         )
//         .setTimestamp();

//       const Commands: MessageEmbed = new MessageEmbed()
//         .setTitle("Atomic Help | Commands")
//         .setDescription(
//           `View all commands and their categories below\nFor further info about a specific command, use \`${prefix}help <Command>\``
//         )
//         .setColor("RANDOM");
//       this.handler.categories.each(
//         (c: Category<string, Command>, s: string) => {
//           Commands.addField(
//             `❯ ${s} [${c.size}]`,
//             `\`${c.map((c) => c.id).join("`, `")}\``
//           );
//         }
//       );

//       const Search: MessageEmbed = new MessageEmbed()
//         .setTitle("Atomic Help | Search")
//         .setDescription("Find commands or aliases by typing a query")
//         .setColor("RANDOM");

//       const Customs: MessageEmbed = new MessageEmbed()
//         .setTitle("Under Construction")
//         .setDescription("This feature is currently still being developed.")
//         .setColor("RANDOM");

//       const msg: Message = await message.reply(Home);
//       try {
//         await msg.react("🏠");
//         await msg.react("📚");
//         await msg.react("🔎");
//         await msg.react("🔧");
//       } catch (er) {
//         console.log(er);
//       }

//       const collector: ReactionCollector = msg.createReactionCollector(
//         (r: MessageReaction, u: User) => {
//           return ["🏠", "📚", "🔎", "🔧"].includes(r.emoji.name) && !u.bot;
//         },
//         { time: 3e5 }
//       );

//       collector.on("collect", async (r: MessageReaction, u: User) => {
//         if (u.bot) return;
//         if (!["🏠", "📚", "🔎", "🔧"].includes(r.emoji.name)) return;
//         r.users.remove(u.id);
//         switch (r.emoji.name) {
//           case "🏠":
//             msg.edit(Home);
//             if (SearchCollector?.client) SearchCollector.stop();
//             break;

//           case "📚":
//             msg.edit(Commands);
//             if (SearchCollector?.client) SearchCollector.stop();
//             break;
//           case "🔎":
//             msg.edit(Search);
//             SearchCollector = msg.channel.createMessageCollector(
//               (m: Message, u: User) => {
//                 return !m.author.bot && !u.bot && u.id === message.author.id;
//               },
//               { time: 3e5 }
//             );
//             SearchCollector.on("collect", (m: Message) => {
//               if (m.content.toLowerCase() === "cancel") {
//                 message.channel.send(
//                   new MessageEmbed().setTitle("Cancelling").setColor("RANDOM")
//                 );
//                 SearchCollector.stop();
//                 return msg.edit(Home);
//               }
//               let res: Collection<string, Command> =
//                 this.handler.modules.filter((c: Command) => {
//                   return (
//                       //@ts-ignore
//                     c.id.toLowerCase().match(new RegExp(m.content.toLowerCase(), "g"))?.length >
//                     0
//                   );
//                 }) ||
//                 this.handler.modules.filter((c) => {
//                   return c.aliases.some((v) => {
//                     return (
//                       //@ts-ignore
//                       v
//                         .toLowerCase()
//                         .match(new RegExp(m.content.toLowerCase(), "g"))
//                         ?.length > 0
//                     );
//                   });
//                 });

//               const Result: MessageEmbed = new MessageEmbed()
//                 .setTitle("Search Results")
//                 .setColor("RANDOM");
//               if (!res.first()) {
//                 Result.setDescription("No commands or aliases have been found");
//                 SearchCollector.stop();
//                 msg.edit(Result);
//                 return m.delete();
//               }
//               //@ts-ignore
//               if (Object.keys(res.first())?.includes("category")) {
//                 Result.setDescription("Found an Command");
//                 Result.addField(
//               //@ts-ignore
//                   res.first().id,
//               //@ts-ignore
// `**❯** Name: ${res.first().id}
//                 **❯** Aliases: ${res.first().aliases.join(", ")}
//                 **❯** Category: ${res.first().categoryID}
//                 **❯** Description: ${res.first().description.content}
//                 **❯** Cooldown: ${ms(
//                   res.first().cooldown ?? this.handler.defaultCooldown,
//                   {
//                     long: true
//                   }
//                 )}
//                 **❯** Usage: ${res.first().description.usage}
//                 **❯** Examples: \n${res.first().description.examples.join("\n")}
//                 ${res.first().ownerOnly ? "**Developer Only!**" : ""}`
//                 ).setThumbnail(
//                   message.author.displayAvatarURL({ dynamic: true })
//                 );
//               }
//               msg.edit(Result);
//             });
//             break;

//           case "🔧":
//             if (SearchCollector?.client) SearchCollector.stop();
//             msg.edit(Customs);
//             break;
//         }
//       });
//     } else {
//       let Embed: MessageEmbed = new MessageEmbed()
//         .setTitle("Atomic Help | Command Result")
//         .addField(
//           command.id,
//           `
//       **** Name: ${command.id}
//       **** Aliases: ${command.aliases.join(", ")}
//       **** Category: ${command.categoryID}
//       **** Description: ${command.description.content}
//       **** Cooldown: ${ms(command.cooldown ?? this.handler.defaultCooldown, {
//         long: true
//       })}
//       **** Usage: ${command.description.usage}
//       **\\>** Examples: \n${command.description.examples.join("\n")}
//       ${command.ownerOnly ? "**Developer Only!**" : ""}`
//         )
//         .setColor("RANDOM")
//         .setFooter(`Requested by: ${message.author.tag}`)
//         .setThumbnail(this.client.user?.displayAvatarURL({ dynamic: true }) as string)
//         .setTimestamp();
//       message.channel.send(Embed);
//     }
//   }
// }