import express from "express";

import PropertyType from "../models/propertyType.model.js";
import ProofType from "../models/proofType.model.js";
import Category from "../models/category.model.js";
import EducationalQualification from "../models/educationalQualification.model.js";

import {
  create,
  getAll,
  getById,
  update,
  remove,
} from "../controllers/masterData.controller.js";

const router = express.Router();

/* =========================
   Property Types
========================= */

router.post(
  "/property-types",
  create(PropertyType)
);

router.get(
  "/property-types",
  getAll(PropertyType)
);

router.get(
  "/property-types/:id",
  getById(PropertyType)
);

router.patch(
  "/property-types/:id",
  update(PropertyType)
);

router.delete(
  "/property-types/:id",
  remove(PropertyType)
);


/* =========================
   Proof Types
========================= */

router.post(
  "/proof-types",
  create(ProofType)
);

router.get(
  "/proof-types",
  getAll(ProofType)
);

router.get(
  "/proof-types/:id",
  getById(ProofType)
);

router.patch(
  "/proof-types/:id",
  update(ProofType)
);

router.delete(
  "/proof-types/:id",
  remove(ProofType)
);


/* =========================
   Categories
========================= */

router.post(
  "/categories",
  create(Category)
);

router.get(
  "/categories",
  getAll(Category)
);

router.get(
  "/categories/:id",
  getById(Category)
);

router.patch(
  "/categories/:id",
  update(Category)
);

router.delete(
  "/categories/:id",
  remove(Category)
);


/* =========================
   Educational Qualifications
========================= */

router.post(
  "/educational-qualifications",
  create(EducationalQualification)
);

router.get(
  "/educational-qualifications",
  getAll(EducationalQualification)
);

router.get(
  "/educational-qualifications/:id",
  getById(EducationalQualification)
);

router.patch(
  "/educational-qualifications/:id",
  update(EducationalQualification)
);

router.delete(
  "/educational-qualifications/:id",
  remove(EducationalQualification)
);

export default router;