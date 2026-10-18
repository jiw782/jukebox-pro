import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 20; i++) {
    await createTrack("Track " + i, i * 50000);
  }

  const users = [
    await createUser("alice", "password123"),
    await createUser("bob", "password123"),
  ];

  for (const [index, user] of users.entries()) {
    const playlist = await createPlaylist(
      `${user.username}'s playlist`,
      "lorem ipsum playlist description",
      user.id,
    );
    for (let i = 1; i <= 5; i++) {
      await createPlaylistTrack(playlist.id, index * 5 + i);
    }
  }
}
