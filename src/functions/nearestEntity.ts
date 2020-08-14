import { Entity } from "prismarine-entity";
import { Bot } from "mineflayer";

export type EntityFilter = (entity: Entity) => boolean;

export function getNearestEntity(bot: Bot, filter: EntityFilter = () => true, count: number = 1): Entity[] {
    let entities: Entity[] = []

    for (const entityName in bot.entities) {
        const entity = bot.entities[entityName];
        
        if (entity === bot.entity) continue;
        if (!filter(entity)) continue;

        entities.push(entity);
    }

    const pos = bot.entity.position;
    entities.sort((a, b) => a.position.distanceSquared(pos) - b.position.distanceSquared(pos));

    if (entities.length > count)
        entities = entities.splice(0, count);

    return entities;
}