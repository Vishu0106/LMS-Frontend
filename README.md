# LMS Frontend

### setup Instructions

1. clone the project

```
     git clone https://github.com/Vishu0106/LMS-Frontend.git
```
2. Move into the directory

```
    cd lms-frontend
```
3. Install dependencies

```
    npm i
```
4. Run the server

```
    npm run dev
```

### How to setup tailwind in your project[Link]
(https://tailwindcss.com/docs/guides/vite)

1. Install tailwind and other dependencies

```
    npm install -D tailwindcss postcss atuoprefixer
```

2. Create the `tailwind.config.js` file

```
    npx tailwindcss init -p
```

3. Add the files and extension to tailwind config in hte content property

```
    content:[
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
```
4. Add the tailwind directives on the top of index.css

```
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
```
5. Then run the server , tailwind should be integrated

```
    npm run dev
```