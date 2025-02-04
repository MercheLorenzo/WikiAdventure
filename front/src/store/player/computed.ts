import { computed } from "vue";
import { ownerId, players, selfId, winnerId } from "./state";
import { Player } from "./type";

export const isOwner = computed(() => selfId.value == ownerId.value);

export const isWinner = computed(() => selfId.value == winnerId.value);

export const owner = computed(():Player<unknown> | undefined => {
    return ownerId.value != -1 ? players.value.find(p=>p.id==ownerId.value) : undefined;
});

export const winner = computed(():Player<unknown> | undefined => {
    return winnerId.value != -3 ? players.value.find(p=>p.id==winnerId.value) : undefined;
});

export const selfPlayer = computed(():Player<unknown> | undefined => {
    return selfId.value != -1 ? players.value.find(p=>p.id==selfId.value) : undefined;
});

export const playersByScore = computed(():Player<unknown>[] => {
    return players.value.sort((a,b)=>a.score-b.score);
});

export const playersConnected = computed(():Player<unknown>[] => {
    return players.value.filter(p => p.isConnected);
});

export const playersVoteSkip = computed(():Player<unknown>[] => {
    return players.value.filter(p => p.isConnected && p.voteSkip);
});
