package lobby.gameLoop.phase;

import lobby.gameLoop.Phase.VanillaPhaseType;
import config.Lang.LangTools;
import lobby.Lobby.LobbyType;
import js.node.Timers;
import lobby.wikiAPI.WikiTools;
import lobby.gameLoop.Phase.PhaseType;
using lobby.player.PlayersExtension;
using config.twitch.TwitchBotExtension;
using Lambda;

@:build(hxasync.AsyncMacro.build())
class Voting extends Phase {
    
    @async public override function onStart():Any {
        if (lobby.type == Twitch) {
            var l = cast(lobby, TwitchLobby);
            l.twitchPlayerList.sayAll(LangTools.getTwitchVoteOpen(l.lang));
        }
        lobby.players.voteReset();
        lobby.players.pageHistoryReset();
        return null;
    }
    //call the next phase with an end and start page picked from player vote
    
    @async public override function onEnd():Any {
        if (lobby.type == Twitch) {
            var l = cast(lobby, TwitchLobby);
            l.twitchPlayerList.sayAll(LangTools.getTwitchVoteClose(l.lang));
        }
        return @await WikiTools.selectPage(lobby.players.map(p -> p.vote), lobby.lang);
        
    }
    
    public function new(lobby:Lobby, duration:Int = 60) {
        super(lobby, duration);
        type = VanillaPhaseType.Voting;
    }

}
