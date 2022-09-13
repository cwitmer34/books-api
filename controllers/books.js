const router = require("express").Router();
const db = require("../models");

// ROUTES

// SEED DATA
router.get("/seed", (req, res) => {
  db.Book.insertMany([
    {
      title: "The Shinobi Initiative",
      description:
        "The reality-bending adventures of a clandestine service agency in the year 2166",
      year: 2014,
      quantity: 10,
      imageURL: "https://imgur.com/LEqsHy5.jpeg",
    },
    {
      title: "Tess the Wonder Dog",
      description: "The tale of a dog who gets super powers",
      year: 2007,
      quantity: 3,
      imageURL: "https://imgur.com/cEJmGKV.jpg",
    },
    {
      title: "The Annals of Arathrae",
      description:
        "This anthology tells the intertwined narratives of six fairy tales.",
      year: 2016,
      quantity: 8,
      imageURL: "https://imgur.com/VGyUtrr.jpeg",
    },
    {
      title: "Wâˆ€RP",
      description:
        "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
      year: 2010,
      quantity: 4,
      imageURL: "https://imgur.com/qYLKtPH.jpeg",
    },
  ])
    .then(
      res.status(200).json({
        message: "Seed successful",
      })
    )
    .catch(
      res.status(400).json({
        message: "Seed unsuccessful",
      })
    );
});

// GET /books
router.get("/", (req, res) => {
  db.Book.find()
    .then((book) => {
      console.log(book);
      res.status(200).json({ book });
    })
    .catch((err) => {
      console.log("error", err);
      res
        .status(500)
        .send(
          "The server encountered an unexpected condition that prevented it from fulfilling the request."
        );
    });
});

// GET /books/:id
router.get("/:id", (req, res) => {
  db.Book.findById(req.params.id)
    .then((book) => {
      console.log(book);
      res.status(200).json({ book });
    })
    .catch((err) => {
      console.log("Error", err);
      res
        .status(500)
        .send(
          "The server encountered an unexpected condition that prevented it from fulfilling the request."
        );
    });
});

// PUT /books/:id
router.put("/:id", (req, res) => {
  db.Book.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => {
      console.log(book);
      // Cannot figure out why my PUT request won't work without the console.log, but works with??? does it need to update the value or something?? weird.
      res.status(200).redirect(`/books/${req.params.id}`);
    })
    .catch((err) => {
      console.log("Error", err);
      res
        .status(500)
        .send(
          "The server encountered an unexpected condition that prevented it from fulfilling the request."
        );
    });
});

// DELETE /books/:id
router.delete("/:id", (req, res) => {
  db.Book.findByIdAndDelete(req.params.id)
    .then(() => {
      res
        .status(200)
        .send(`Book with the ID: ${req.params.id} successfully deleted.`);
    })
    .catch((err) => {
      console.log("Error", err);
      res
        .status(500)
        .send(
          "The server encountered an unexpected condition that prevented it from fulfilling the request."
        );
    });
});

// POST /books
router.post("/", (req, res) => {
  console.log(req.body);
  db.Book.create(req.body).then(() => {
    res.status(200).redirect("/books");
  });
});

module.exports = router;
