/*
 * This example shows the usage of the getNearestEntity() function.
 */
const mineflayer = require('mineflayer')
const { utils } = require('mineflayer-utils')

if (process.argv.length < 4 || process.argv.length > 6) {
  console.log('Usage : node getNearestEntity.js <host> <port> [<name>] [<password>]')
  process.exit(1)
}

const bot = mineflayer.createBot({
  host: process.argv[2],
  port: parseInt(process.argv[3]),
  username: process.argv[4] ? process.argv[4] : 'EntityFinder',
  password: process.argv[5]
})

bot.loadPlugin(utils)

bot.on('spawn', () => {
  // Creates a list of all nearby entities matching the given filter
  // The list can contain *up to* a set number of entities, sorted by distance. (Closest to furthest)
  // Here, we are looking for the 3 closest players to the bot.
  const entities = bot.utils.getNearestEntity(entity => entity.type === 'player', 3);

  if (entities.length === 0) {
    bot.chat('There are no players nearby.')
  } else {
    for (const entity of entities) {
      bot.chat(`I can see ${entity.username}`)
    }
  }
})
