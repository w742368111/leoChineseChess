// The 'chinese_chess' program.
program chinese_chess.aleo {
    record Chessboardrecord {
        // The Chinese Chess Board Status Describe
        // b_state1 and b_state2 is describe the black pieces position
        // r_state1 and r_state2 is describe the red pieces position

        b_state1 : u64,
        b_state2 : u64,
        r_state1 : u64,
        r_state2 : u64,

        // The two player's address
        // b_player is the black player's address
        // r_player is the red player's address
        b_player : address,
        r_player : address,
        owner: address,

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
        // 11 means red accept for the new status
        // 12 means black accept for the new status

        code : u8,
        gates: u64
    }

    transition newgame(
        red:address, 
        black:address, 
        owner:address
    ) -> Chessboardrecord{
    //transition newgame() -> Chessboardrecord{
        // Returns the initialization chess board state
        return Chessboardrecord {

            // The initialization value design please read the design document
            b_state1 : 10001020304050607u64,
            b_state2 : 20819252729313335u64,
            r_state1 : 35456586062647081u64,
            r_state2 : 48283848586878889u64,

            //b_player : aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,
            //r_player : aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,

            b_player : black,
            r_player : red,
            owner: owner,

            code : 2u8,
            gates : 0u64
        };
    }

    // The referee or owner end the game and announced the result
    transition endgame(
        manager:address, 
        result:u8
    ) -> Chessboardrecord{
        // Ensure the caller is the contract owner.
        console.assert_eq(self.caller, manager);
        // Ensure that the game status is not over
        return Chessboardrecord {
            // The initialization value design please read the design document
            b_state1 : 10001020304050607u64,
            b_state2 : 20819252729313335u64,
            r_state1 : 35456586062647081u64,
            r_state2 : 48283848586878889u64,

            b_player : aleo16jzu850465fujncf4xd5gz2hj8x4rhx3qyxlsrfyn9a8qw62puxsv05sn9,
            r_player : aleo163jxv4mu72r4qr3tggks8sja2g98uycmfay66p2wkwnem0kwcy9svf99x5,
            owner: aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,

            code : result,
            gates : 0u64
        };
    }

    //  The player claims a draw or a loss for a timeout
    transition playerappeal
    (
        player:address,
        result:u8
    ) -> Chessboardrecord {
        // check if the address is the player's address
        return Chessboardrecord {
            // The initialization value design please read the design document
            b_state1 : 10001020304050607u64,
            b_state2 : 20819252729313335u64,
            r_state1 : 35456586062647081u64,
            r_state2 : 48283848586878889u64,

            b_player : aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,
            r_player : aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,
            owner: aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,

            code : result,
            gates : 0u64
        };
    }

    // Chess pieces move function
    // nstatus is the new chess board status
    // ostatus is the old chess board status
    // result is the new chess board status

    transition movepiece
    (
        player:address,
        nstatus:u64,
        ostatus:u64,
        result: u8
    ) -> Chessboardrecord {
        // check if the address is the player's address
        return Chessboardrecord {
            // The initialization value design please read the design document
            b_state1 : 10001020304050607u64,
            b_state2 : 20819252729313335u64,
            r_state1 : 35456586062647081u64,
            r_state2 : 48283848586878889u64,

            b_player : aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,
            r_player : aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,
            owner: aleo1fxs9s0w97lmkwlcmgn0z3nuxufdee5yck9wqrs0umevp7qs0sg9q5xxxzh,

            code : result,
            gates : 0u64
        };
    }
}
