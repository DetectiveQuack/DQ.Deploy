export class WebClient {
    public constructor() {
        return {
            chat: {
                postEphemeral: () => {},
            },
            dialog: {
                open: () => {},
            },
        };
    }
}
