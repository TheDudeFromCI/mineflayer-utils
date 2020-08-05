import { Bot } from "mineflayer";

class Subscription
{
    constructor(readonly eventName: string,
        readonly callback: Function)
    {
    }
}

export class TemporarySubscriber
{
    private readonly subscriptions: Subscription[] = [];

    constructor(readonly bot: Bot)
    {
    }

    /**
     * Adds a new temporary event listener to the bot.
     * 
     * @param event - The event to subscribe to.
     * @param callback - The function to execute.
     */
    subscribeTo(event: string, callback: Function)
    {
        this.subscriptions.push(new Subscription(event, callback));

        // @ts-ignore
        this.bot.on(event, callback);
    }

    /**
     * Removes all attached event listeners from the bot.
     */
    cleanup()
    {
        for (const sub of this.subscriptions)
            // @ts-ignore
            this.bot.removeListener(sub.eventName, sub.callback);
    }
}