const LanguageModel = require("../../features-main/language/models/language.model");
const advancedResults =
  (model, populate, querySend = null, origin = null) =>
  async (req, res, next) => {
    let query;
    let reqQuery;


    
    const { ObjectId } = require("mongodb"); // or ObjectID

    // Copy req.query

    reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = [
      "select",
      "sort",
      "page",
      "limit",
      "fields",
      "search",
      "json",
    ];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in|ne)\b/g,
      (match) => `$${match}`
    );

    let find = JSON.parse(queryStr);

    let json = {};
    if (req.query.json) json = JSON.parse(req.query.json);
    if (req.query.fields) {
      const query = {
        $or: req.query.fields.map((property) => ({
          [property]: { $regex: req.query.search, $options: "i" },
        })),
      };
      find = {
        $and: [find, query, json],
      };
    } else {
      find = {
        $and: [find, json],
      };
    }

    if (querySend === "folder") console.log("find", find);
    query = model.find(find);
    // Finding resource

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 3000;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.find(find).countDocuments();

    query = query.skip(startIndex).limit(limit);

    if (populate) query = query.populate(populate);

    // Executing query
    let results = await query;

    const flag =
      req.header("language") === "gb" ? "en" : req.header("language");
    let language = await LanguageModel.findOne({ flag: flag });

    if (!language) language = await LanguageModel.findOne({ flag: "fr" });

    // translate data
   

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.advancedResults = {
      success: true,
      count: results.length,
      pagination: pagination,
      data: results,
      startIndex: startIndex + 1,
      endIndex: results.length,
      totalRecords: total,
      limit: Number(req.query.limit),
      page: page,
    };

    next();
  };

module.exports = advancedResults;
