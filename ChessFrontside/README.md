# ChineseChess
react + typescript

Project install
cd /yourproject
```bash
npm i
```

Open the project 
```bash
npm start
```
You can see the effect on http://localhost:8000


Build the project
```bash
npm run build
```


## Project Structure

```bash
├── /public/            # 
│ ├── index.html        # main html
├── /src/               # 
│ ├── /assets/          # 
│ ├── /components/      # UI
│ │ ├── /AI/            # AI
│ │ ├── /button/        # button style
│ │ └── /chess/         # piece style
│ ├── /models/          # 
│ │ ├── buttonClick.ts  # the button event
│ │ ├── chessClick.ts   # deal the click event
│ │ ├── chessInfo.ts    # the chess info
│ │ └── index.ts        # game status design
│ ├── /routes/          # 
│ │ └── ChessBoard.tsx  # design the chess borad
│ ├── index.css         # css
│ ├── index.js          # main index.js
│ └── router.js         # router config     
├── package.json        # package config
├── .eslintrc           # Eslint config
├── .roadhogrc          # roadhog config
└── tsconfig.json       # typescript config
```
