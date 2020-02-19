// TODO: fix linting errors
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import express from "express";
import passport from "passport";
import Game from "../models/Game";

require("../authentication/passport")(passport);

const router = express.Router();

/**
 * GET all games
 * ex: host.com/api/games
 */
router.get("/", (req, res, next) => {
  Game.find((err, games) => {
    if (err) return next(err);
    res.json(games);
  });
});

/**
 * GET a single game by ID
 * ex: host.com/api/games/123456
 */
router.get("/:id", (req, res, next) => {
  Game.findById(req.params.id, (err, game) => {
    if (err) return next(err);
    res.json(game);
  });
});

/**
 * GET all games belonging to a given year
 * ex: host.com/api/games/year/2017
 */
router.get("/year/:year", (req, res, next) => {
  Game.find({ belongs_to_year: req.params.year })
    .sort("createdAt")
    .find((err, games) => {
      if (err) return next(err);
      res.json(games);
    });
});

/**
 * Create a new game
 * Authenticated requests only
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Game.create(req.body, (err, game) => {
      if (err) return next(err);
      res.json(game);
    });
  }
);

/**
 * Update an existing game by ID
 * Authenticated requests only
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Game.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true },
      (err, game) => {
        if (err) return next(err);
        res.json(game);
      }
    );
  }
);

/**
 * Delete an existing game by ID
 * Authenticated requests only
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Game.findByIdAndRemove(req.params.id, req.body, (err, game) => {
      if (err) return next(err);
      res.json(game);
    });
  }
);

export default router;
