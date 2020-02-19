// TODO: fix linting errors
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import express from "express";
import passport from "passport";
import Album from "../models/Album";

require("../authentication/passport")(passport);

const router = express.Router();

/**
 * GET all music albums
 * ex: host.com/api/albums
 */
router.get("/", (req, res, next) => {
  Album.find((err, albums) => {
    if (err) return next(err);
    res.json(albums);
  });
});

/**
 * GET a single album by ID
 * ex: host.com/api/albums/123456
 */
router.get("/:id", (req, res, next) => {
  Album.findById(req.params.id, (err, album) => {
    if (err) return next(err);
    res.json(album);
  });
});

/**
 * GET all albums belonging to a given year
 * ex: host.com/api/albums/year/2017
 */
router.get("/year/:year", (req, res, next) => {
  Album.find({ belongs_to_year: req.params.year })
    .sort("createdAt")
    .find((err, albums) => {
      if (err) return next(err);
      res.json(albums);
    });
});

/**
 * Create a new album
 * Authenticated requests only
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Album.create(req.body, (err, album) => {
      if (err) return next(err);
      res.json(album);
    });
  }
);

/**
 * Update an existing album by ID
 * Authenticated requests only
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Album.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true },
      (err, album) => {
        if (err) return next(err);
        res.json(album);
      }
    );
  }
);

/**
 * Delete an existing album by ID
 * Authenticated requests only
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Album.findByIdAndRemove(req.params.id, req.body, (err, album) => {
      if (err) return next(err);
      res.json(album);
    });
  }
);

export default router;
