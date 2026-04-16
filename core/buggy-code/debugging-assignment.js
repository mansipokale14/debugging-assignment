const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" }
];

const notes = [
  { id: 1, title: "Note 1", content: "Content 1", userId: 1 },
  { id: 2, title: "Note 2", content: "Content 2", userId: 2 }
];

// ✅ FIX 1: userList → allUsers
app.get("/users", (req, res) => {
  const allUsers = users;
  res.send(allUsers);
});

// ✅ FIX 2: id type mismatch (string vs number)
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  res.send(user);
});

// ✅ FIX 3: missing return
function getUserById(id) {
  return users.find(u => u.id === id);
}

// ✅ FIX 4: lenght → length
app.get("/notes/count", (req, res) => {
  const total = notes.length;
  res.send({ total });
});

// ✅ FIX 5: missing await + undefined function handled
async function fetchExternalData() {
  return { message: "External data fetched" };
}

app.get("/external-data", async (req, res) => {
  const data = await fetchExternalData();
  res.send(data);
});

// ✅ FIX 6: = → ===
app.get("/notes", (req, res) => {
  if (notes.length === 0) {
    console.log("No notes found");
  }
  res.send(notes);
});

// ✅ FIX 7: proper ID generation
function generateNoteId() {
  return Math.floor(Math.random() * 1000);
}

// ✅ FIX 8: call function
app.post("/notes", (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content) {
    return res.send("Invalid input");
  }

  const newNote = {
    id: generateNoteId(),
    title,
    content,
    userId
  };

  notes.push(newNote);
  res.send(newNote);
});

// ✅ FIX 9: id type + safety check
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === id);

  if (noteIndex === -1) {
    return res.send({ message: "Note not found" });
  }

  notes.splice(noteIndex, 1);
  res.send({ message: "Note deleted" });
});

// ✅ FIX 10: username → name
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) return res.send("User not found");

  user.name = name;

  res.send(user);
});

// ✅ FIX 11: = → ===
app.get("/user-notes/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const userNotes = notes.filter(n => n.userId === userId);
  res.send(userNotes);
});

// ✅ FIX 12: && instead of ||
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "123456") {
    res.send({ message: "Login successful" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
});

// ✅ FIX 13: filter → find
app.get("/profile/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) return res.send("User not found");

  res.send(user.name);
});

// ✅ FIX 14: ensure numbers
app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  const total = Number(a) + Number(b);
  res.send({ total });
});

// ✅ FIX 15: correct port message
app.listen(3000, () => {
  console.log("Server running on port 3000");
});