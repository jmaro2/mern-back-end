const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../_helpers/db");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("test");
  db_connect
    .collection("collections")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("collections")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    title: req.body.title,
    enable_web_output: req.body.enable_web_output,
    repository: req.body.repository,
    classification: req.body.classification,
    subclass: req.body.subclass,
    collection_identifier: req.body.collection_identifier,
    record_series: req.body.classification + "/" + req.body.subclass + "/" + req.body.collection_identifier,
    sort_title: req.body.sort_title,
    normal_date_start: req.body.normal_date_start,
    normal_date_end: req.body.normal_date_end,
    inclusive_date: req.body.inclusive_date,
    predominant_date: req.body.predominant_date,
    material_type: req.body.material_type,
    extent: req.body.extent,
    extent_unit: req.body.extent_unit,
    finding_aid_author: req.body.finding_aid_author,
    creators: req.body.creators,
    primary_creator: req.body.primary_creator,
    abstract: req.body.abstract,
    scope: req.body.scope,
    arrangement: req.body.arrangement,
    alt_extent_stmt: req.body.alt_extent_stmt,
    biographical_historical_note: req.body.biographical_historical_note,
    biographical_historical_author: req.body.biographical_historical_author,
    subjects: req.body.subjects,
    languages: req.body.languages,
    initial_date_acquired: req.body.initial_date_acquired,
    source: req.body.source,
    method: req.body.method,
    appraisal_info: req.body.appraisal_info,
    accruals_additions: req.body.accruals_additions,
    custodial_history: req.body.custodial_history,
    access_general: req.body.access_general,
    use_rights: req.body.use_rights,
    physical: req.body.physical,
    technical: req.body.technical,
    other_url: req.body.other_url,
    other_note: req.body.other_note,
    books: req.body.books,
    related_materials: req.body.related_materials,
    related_materials_url: req.body.related_materials_url,
    related_publications: req.body.related_publications,
    separated_materials: req.body.separated_materials,
    original_copy_note: req.body.original_copy_note,
    original_copy_url: req.body.original_copy_url,
    preferred_citation: req.body.preferred_citation,
    rules_used: req.body.rules_used,
    processing_info: req.body.processing_info,
    revision_history: req.body.revision_history,
    publication_date: req.body.publication_date,
    publication_note: req.body.publication_note,
    written_in: req.body.written_in,
  };
  db_connect.collection("collections").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      title: req.body.title,
      enable_web_output: req.body.enable_web_output,
      repository: req.body.repository,
      classification: req.body.classification,
      subclass: req.body.subclass,
      collection_identifier: req.body.collection_identifier,
      record_series: req.body.classification + "/" + req.body.subclass + "/" + req.body.collection_identifier,
      sort_title: req.body.sort_title,
      normal_date_start: req.body.normal_date_start,
      normal_date_end: req.body.normal_date_end,
      inclusive_date: req.body.inclusive_date,
      predominant_date: req.body.predominant_date,
      material_type: req.body.material_type,
      extent: req.body.extent,
      extent_unit: req.body.extent_unit,
      finding_aid_author: req.body.finding_aid_author,
      creators: req.body.creators,
      primary_creator: req.body.primary_creator,
      abstract: req.body.abstract,
      scope: req.body.scope,
      arrangement: req.body.arrangement,
      alt_extent_stmt: req.body.alt_extent_stmt,
      biographical_historical_note: req.body.biographical_historical_note,
      biographical_historical_author: req.body.biographical_historical_author,
      subjects: req.body.subjects,
      languages: req.body.languages,
      initial_date_acquired: req.body.initial_date_acquired,
      source: req.body.source,
      method: req.body.method,
      appraisal_info: req.body.appraisal_info,
      accruals_additions: req.body.accruals_additions,
      custodial_history: req.body.custodial_history,
      access_general: req.body.access_general,
      use_rights: req.body.use_rights,
      physical: req.body.physical,
      technical: req.body.technical,
      other_url: req.body.other_url,
      other_note: req.body.other_note,
      books: req.body.books,
      related_materials: req.body.related_materials,
      related_materials_url: req.body.related_materials_url,
      related_publications: req.body.related_publications,
      separated_materials: req.body.separated_materials,
      original_copy_note: req.body.original_copy_note,
      original_copy_url: req.body.original_copy_url,
      preferred_citation: req.body.preferred_citation,
      rules_used: req.body.rules_used,
      processing_info: req.body.processing_info,
      revision_history: req.body.revision_history,
      publication_date: req.body.publication_date,
      publication_note: req.body.publication_note,
      written_in: req.body.written_in,
    },
  };
  db_connect
    .collection("collections")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("collections").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes;
