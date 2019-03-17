export default function jsonResponse(response: object, inChannel = false): object {
    return Object.assign(response, {
        response_type: inChannel ? 'in_channel' : 'ephemeral', // eslint-disable-line @typescript-eslint/camelcase
    });
}
