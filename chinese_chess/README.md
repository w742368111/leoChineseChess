# chinese_chess.aleo

## Build Guide

To compile this Aleo program, run:
```bash
aleo build
```

To start for a new game
```bash
leo run newgame redAddress:address blackAddress:address ownerAddress:address
```

The global chess status

```
// Chinese code means now status
// 1 means game start 
// 2 means black move
// 3 means red move
// 4 means game end red is winner
// 5 means game end black is winner
// 6 means game end both sides tied
// 7 means red ask for a draw
// 8 means red ask for black negative over time
// 9 means black ask for a draw
// 10 means black ask for red negative over time
// 11 red accept for the new status
// 12 black accept for the new status
code : u8
```

To end for a game

```bash
leo run endgame managerAddress:address result:u8
```

Player asked for end the game: overtime or tie
```
leo run playerappeal managerAddress:address result:u8
```

Player move the chess piece function 
```
leo run movepiece player:address nstatus:u64 ostatus:u64 result:u8
```
