import React, { useEffect } from "react";
import { useNostrEvents } from "nostr-react";
import { nip19, kinds } from "nostr-tools";

export const GetBookContentByNoteId = (noteId) => {
    const decodedId = nip19.decode(noteId);
    const { events: page } = useNostrEvents({
        filter: {
            search: noteId,
            kinds: [kinds.LongFormArticle],
            authors: [decodedId.data.pubkey],
        },
    });
    return page?.at(0)?.content;
};
