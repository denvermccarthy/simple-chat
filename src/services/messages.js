import { client, parseData } from './client';

export async function getMessages() {
  const res = await client
    .from('messages')
    .select()
    .order('created_at', { ascending: false });
  return parseData(res);
}

export async function sendMessage(email, status = 0) {
  if (!email) throw new Error('An email is required to send a message');
  const res = await client.from('messages').insert({ email, status });
  return parseData(res);
}

export function subscribe(onMessage) {
  // TODO: Subscribe to changes for the `messages` table
  // and call `onMessage` with the newly added row
  const subscription = client
    .from('messages')
    .on('*', (payload) => {
      onMessage(payload.new);
    })
    .subscribe();
  console.log(subscription);
}

export function unsubscribe() {
  return client.removeAllSubscriptions();
}
