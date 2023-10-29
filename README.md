<span style="color:#; font-family: ; font-size: 4em;">Fablety</span>

# Innehållsförteckning

1. [Installation](#installation)
2. [Kodbas](#kodbas)
3. [Användning](#användning)
4. [Bidragarna](#bidragarna)
5. [Licens](#licens)

# Installation

To get started with this project, follow the steps below:

Clone the repository to your computer:
git clone https://github.com/zamero/Fablety/tree/master
<br>Navigate to the project directory:
Bash
cd Fablety

Install frontend dependencies with npm:

npm install

Install backend dependencies with npm:
cd ../backend
npm install
Set up MongoDB databas:
Go to index.js in the backend
and change the const dbURI = {your MongoDB URI}
setup .env file

Local setup:

You need to comment out the serverless(app) line and uncomment app.listen()
uncomment the port at the top of the index.js file

```
// const serverless = require("serverless-http")
const PORT = 4000;

...

// module.exports.handler = serverless(app)

app.listen(PORT, () => {
    console.log("Server running on port ${PORT}`);
  });
```

Get it working in localhost:

in the frontend. and create an .env in the frontend with google Oauth key

```
VITE_CLIENT_ID=googleOAUTHAPI
VITE_AWS_LAMBDA=http://localhost:4000/
```

and in the backend you need another .env look at the example.env file

Once you got that solved you can use 2 bash consoles to npm run dev in both the backend file and the chatlabs(frontend file)

# Kodbas

Projektet består av följande kodbaser/komponenter

### 1. **Frontend**:

- Beskrivning: Ansvarar för user interface och client-side functionality, funktionalitet, vilket ger en intuitiv och interaktiv upplevelse för användarna.
- Tekniker/bibliotek: React, HTML, CSS, Typescript etc.
- Struktur:
  - Fablety/: huvudmappen
    - Client/:
      - src/: Innehåller huvudkällkodsfilerna.
      - components/:
        _ AdminDashboard.tsx:
        _ Bookform.tsx:
        _ Bookshelf.css:
        _ Bookshelf.tsx
        ...(components)
        <br>
      - App.tsx:
      - index.css:
      - main.tsx :

### 2. **Backend**:

- Beskrivning: Hanterar logik på serversidan, databehandling och interagerar med databaser eller externa API:er
- Tekniker/bibliotek: Node.js, Express, MongoDB/Mongoose, AWS Lambda serverless etc.
- Struktur:
  - backend/: huvudmappen.
    - index.js:
    - userCRUD.js
    - userSchema.js

# Användning

## Fablety creates personalized stories for kids with the power of LLMS (ChatGPT) and AI generated images.

### Example use case:

You are a parent that love reading a book for your kid, use Fablety and With just a name, mood, gender, and genre, watch in awe as a personalized story unfolds with the power of AI, bringing joy and wonder to your child's world.

Happy reading!
/ Fablety

# Bidragarna

Samer Essam
https://github.com/zamero
https://www.linkedin.com/in/samer-essam-9908b41a2/
