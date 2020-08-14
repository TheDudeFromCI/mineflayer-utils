import { Bot } from 'mineflayer';
import { getNearestEntity, EntityFilter } from './functions/nearestEntity';

export * from './classes';

export function utils(bot: Bot)
{
    //@ts-ignore
    bot.utils = {
        getNearestEntity: (filter: EntityFilter = () => true, count: number = 1) => getNearestEntity(bot, filter, count)
    };
}