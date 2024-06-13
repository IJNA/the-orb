import React, { useEffect } from "react";
import { useNostrEvents } from "nostr-react";
import { nip19, kinds } from "nostr-tools";

export const GetBookContentByNoteId = (noteId) => {
    const decodedId = canDecode(noteId) ? nip19.decode(noteId) : null;
    const { events: page, isLoading } = useNostrEvents({
        filter: {
            search: noteId,
            kinds: [kinds.LongFormArticle],
            authors: decodedId ? [decodedId.data.pubkey] : null,
        },
        enabled: !!decodedId && !!noteId
    });
    return { pageContent: page?.at(0)?.content, isLoading };
};

function canDecode(identifier) {
    if (identifier?.length < 8 || identifier?.charAt(0) !== 'n') return false;
    return true;
  }