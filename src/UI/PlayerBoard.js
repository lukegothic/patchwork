import React from 'react';
import { PlayerState } from '../Const';
import SVGPatch from './SVGPatch';
import * as FigureHelper from '../FigureHelper';
import PatchPlacer from './PatchPlacer';
const PlayerBoard = ({ size, player, onPlacePatch }) => {
    const cssSize = {
        h: size.h * 40,
        w: size.w * 40
    };
    return (
        /*
        <div className="playerboard" style={{ "height": cssSize.h, "width": cssSize.w }}>
            {Range(0, size.h - 1).map((x) => {
                return (
                    <div className="row" key={`row${x}`} style={{ "height": cssSize.h / size.h }}>
                        {Range(0, size.w - 1).map((y) => {
                            let id = x * size.w + y;
                            return <Cell cellW={cssSize.w / size.w} data={board[id]} onCellClick={onCellClick ? (() => onCellClick(id)): undefined } key={`cell${id}`} />
                        })}
                    </div>
                )})
            }
        </div>
        */
        <div className="playerboard" style={{ "height": cssSize.h, "width": cssSize.w }}>
            <svg className="patch" height={cssSize.h} width={cssSize.w}>
                {player.patches.map(patch => <SVGPatch key={`${player.name}${patch.id}`} vertex={FigureHelper.Move(patch.vertex, patch.at)} />)}
            </svg>
            {player.state === PlayerState.PLACING_PATCH && <PatchPlacer player={player} size={size} onPlacePatch={onPlacePatch} />}
        </div>
    )
}
export default PlayerBoard;