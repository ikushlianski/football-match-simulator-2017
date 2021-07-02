import { Team } from '../team/team';
import { Stage } from '../stage/stage';
import { DrawRules } from './draw-rules';
import { League } from '../league/league';
import { DrawRoutine } from './draw-routine';

export class DrawService {
  public drawTournament(teams: Team[], stage: Stage, rules?: DrawRules) {
    const { leagues } = stage;

    if (leagues) {
      leagues.forEach((league) => {
        // this is a league
        this.drawLeague(teams, league, rules);
      });
    } else if (stage.teams?.length) {
      // this is a cup tournament
      // todo this.drawCup(teams, rules);
    }
  }

  protected drawLeague(teams: Team[], league: League, rules?: DrawRules): void {
    const teamsToDraw = [...teams];
    const drawRoutine = new DrawRoutine(teamsToDraw);

    do {
      const team = drawRoutine.pullNextTeam();

      if (team) {
        drawRoutine.placeTeamToRandomGroup(team, league.groups);
      }
    } while (teamsToDraw.length > 0);
  }

  // private drawCup(teams: Team[], rules?: DrawRules) {}
}
